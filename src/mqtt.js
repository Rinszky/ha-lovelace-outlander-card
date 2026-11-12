/**
 * Outlander PHEV Lovelace Card — MQTT Subsystem
 * Supports:
 * 1. Home Assistant Internal MQTT WebSocket API (hass.connection.subscribeMessage / mqtt.publish service)
 * 2. Direct WebSocket MQTT Client (pure native WebSocket MQTT v3.1.1 with zero external dependencies)
 * 3. Deep Vehicle Register Decoding (0x01, 0x04, 0x05, 0x10, 0x15, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x24)
 * 4. Taper-aware charging duration & ETA estimation
 */

import { SETTING_DEFINITIONS } from './helpers.js';

/**
 * Estimates remaining charging minutes using Mitsubishi Outlander PHEV CC-CV taper curve.
 */
export function estimateRemainingChargingMins(soc) {
  const s = Math.max(0, Math.min(100, Math.round(soc)));
  if (s >= 100) return 0;

  let mins = 0;
  for (let p = s; p < 100; p++) {
    if (p < 80) {
      mins += 1.8;
    } else if (p < 90) {
      mins += 2.4;
    } else if (p < 95) {
      mins += 3.2;
    } else {
      mins += 4.5;
    }
  }
  return Math.max(5, Math.round(mins));
}

function parseBool(val) {
  if (val === null || val === undefined) return false;
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val > 0;
  const s = String(val).toLowerCase().trim();
  return (
    s === '1' ||
    s === 'true' ||
    s === 'on' ||
    s === 'open' ||
    s === 'connected' ||
    s === 'charging' ||
    s === 'yes' ||
    s === 'nyitva'
  );
}

function parseDaysString(raw) {
  if (!raw) return 'Everyday';
  const s = String(raw).trim();
  if (s.toLowerCase() === 'everyday') return 'Everyday';
  if (s.toLowerCase() === 'weekdays') return 'Weekdays';
  if (s.toLowerCase() === 'weekends') return 'Weekends';
  return s;
}

/**
 * Lightweight Zero-Dependency Native WebSocket MQTT v3.1.1 Client
 */
export class NativeMqttWsClient {
  constructor(callbacks = {}) {
    this.callbacks = {
      onConnect: callbacks.onConnect || (() => {}),
      onMessage: callbacks.onMessage || (() => {}),
      onClose: callbacks.onClose || (() => {}),
      onError: callbacks.onError || (() => {}),
      onLog: callbacks.onLog || (() => {}),
    };
    this.ws = null;
    this.connected = false;
    this.packetId = 1;
    this.pingTimer = null;
    this.reconnectTimer = null;
    this.config = null;
    this.shouldReconnect = false;
  }

  connect(config) {
    this.disconnect();
    this.config = config;
    this.shouldReconnect = true;

    let url = (config.brokerUrl || '').trim();
    const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
    if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
      url = `${isHttps ? 'wss://' : 'ws://'}${url}`;
    } else if (isHttps && url.startsWith('ws://')) {
      url = 'wss://' + url.slice(5);
    }

    try {
      this.callbacks.onLog(`[Native MQTT WS] Connecting to ${url}...`);
      this.ws = new WebSocket(url, ['mqtt', 'mqttv3.1', 'mqttv3.1.1']);
      this.ws.binaryType = 'arraybuffer';

      this.ws.onopen = () => {
        this._sendConnectPacket();
      };

      this.ws.onmessage = (event) => {
        this._handleIncomingBytes(new Uint8Array(event.data));
      };

      this.ws.onerror = (err) => {
        this.callbacks.onError(err);
      };

      this.ws.onclose = () => {
        const wasConnected = this.connected;
        this.connected = false;
        clearInterval(this.pingTimer);
        this.callbacks.onClose(wasConnected);
        if (this.shouldReconnect) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = setTimeout(() => {
            if (this.shouldReconnect) this.connect(this.config);
          }, 5000);
        }
      };
    } catch (err) {
      this.callbacks.onError(err);
    }
  }

  disconnect() {
    this.shouldReconnect = false;
    clearTimeout(this.reconnectTimer);
    clearInterval(this.pingTimer);
    if (this.ws) {
      try {
        this.ws.close();
      } catch (_) {}
      this.ws = null;
    }
    this.connected = false;
  }

  _encodeUtf8(str) {
    return new TextEncoder().encode(str);
  }

  _decodeUtf8(bytes) {
    return new TextDecoder().decode(bytes);
  }

  _sendConnectPacket() {
    const clientId = this.config.clientId || `ha_phev_${Math.random().toString(16).slice(2, 8)}`;
    const username = this.config.username || '';
    const password = this.config.password || '';

    let flags = 0x02; // Clean session
    if (username) flags |= 0x80;
    if (password) flags |= 0x40;

    const protocolName = this._encodeUtf8('MQTT');
    const clientIdBytes = this._encodeUtf8(clientId);
    const userBytes = username ? this._encodeUtf8(username) : null;
    const passBytes = password ? this._encodeUtf8(password) : null;

    let varLen = 2 + protocolName.length + 1 + 1 + 2; // name, level 4, flags, keepalive 60s
    let payloadLen = 2 + clientIdBytes.length;
    if (userBytes) payloadLen += 2 + userBytes.length;
    if (passBytes) payloadLen += 2 + passBytes.length;

    const remainingLength = varLen + payloadLen;
    const packet = [];
    packet.push(0x10); // CONNECT packet type
    this._writeRemainingLength(packet, remainingLength);

    // Variable Header
    packet.push(0x00, protocolName.length);
    for (const b of protocolName) packet.push(b);
    packet.push(0x04); // Protocol Level 4 (v3.1.1)
    packet.push(flags);
    packet.push(0x00, 60); // Keepalive 60s

    // Payload
    packet.push(0x00, clientIdBytes.length);
    for (const b of clientIdBytes) packet.push(b);

    if (userBytes) {
      packet.push((userBytes.length >> 8) & 0xff, userBytes.length & 0xff);
      for (const b of userBytes) packet.push(b);
    }
    if (passBytes) {
      packet.push((passBytes.length >> 8) & 0xff, passBytes.length & 0xff);
      for (const b of passBytes) packet.push(b);
    }

    this.ws.send(new Uint8Array(packet));
  }

  _writeRemainingLength(packet, len) {
    let x = len;
    do {
      let encodedByte = x % 128;
      x = Math.floor(x / 128);
      if (x > 0) encodedByte |= 128;
      packet.push(encodedByte);
    } while (x > 0);
  }

  subscribe(topicFilter) {
    if (!this.connected || !this.ws) return;
    const pid = this.packetId++;
    const topicBytes = this._encodeUtf8(topicFilter);
    const remainingLength = 2 + (2 + topicBytes.length + 1); // PacketID + (Len + Topic + QoS 0)

    const packet = [0x82];
    this._writeRemainingLength(packet, remainingLength);
    packet.push((pid >> 8) & 0xff, pid & 0xff);
    packet.push((topicBytes.length >> 8) & 0xff, topicBytes.length & 0xff);
    for (const b of topicBytes) packet.push(b);
    packet.push(0x00); // Requested QoS 0

    this.ws.send(new Uint8Array(packet));
  }

  publish(topic, payload, retain = false) {
    if (!this.connected || !this.ws) return;
    const topicBytes = this._encodeUtf8(topic);
    const payloadBytes = typeof payload === 'string' ? this._encodeUtf8(payload) : payload;
    const remainingLength = 2 + topicBytes.length + payloadBytes.length;

    let header = 0x30; // PUBLISH QoS 0
    if (retain) header |= 0x01;

    const packet = [header];
    this._writeRemainingLength(packet, remainingLength);
    packet.push((topicBytes.length >> 8) & 0xff, topicBytes.length & 0xff);
    for (const b of topicBytes) packet.push(b);
    for (const b of payloadBytes) packet.push(b);

    this.ws.send(new Uint8Array(packet));
  }

  _sendPing() {
    if (this.connected && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(new Uint8Array([0xc0, 0x00])); // PINGREQ
    }
  }

  _handleIncomingBytes(bytes) {
    if (bytes.length < 2) return;
    let idx = 0;

    while (idx < bytes.length) {
      const packetType = bytes[idx] >> 4;
      const flags = bytes[idx] & 0x0f;
      idx++;

      let multiplier = 1;
      let remainingLength = 0;
      let digit = 0;
      do {
        if (idx >= bytes.length) return;
        digit = bytes[idx++];
        remainingLength += (digit & 127) * multiplier;
        multiplier *= 128;
      } while ((digit & 128) !== 0);

      const packetEnd = idx + remainingLength;
      if (packetEnd > bytes.length) return;

      if (packetType === 2) {
        // CONNACK
        const returnCode = bytes[idx + 1];
        if (returnCode === 0) {
          this.connected = true;
          this.callbacks.onConnect();
          clearInterval(this.pingTimer);
          this.pingTimer = setInterval(() => this._sendPing(), 30000);
        } else {
          this.callbacks.onError(new Error(`MQTT connection rejected with code ${returnCode}`));
          this.disconnect();
        }
      } else if (packetType === 3) {
        // PUBLISH
        let pIdx = idx;
        const topicLen = (bytes[pIdx] << 8) | bytes[pIdx + 1];
        pIdx += 2;
        const topic = this._decodeUtf8(bytes.subarray(pIdx, pIdx + topicLen));
        pIdx += topicLen;

        const qos = (flags >> 1) & 0x03;
        if (qos > 0) {
          pIdx += 2; // skip Packet Identifier
        }

        const payloadStr = this._decodeUtf8(bytes.subarray(pIdx, packetEnd));
        this.callbacks.onMessage(topic, payloadStr);
      } else if (packetType === 13) {
        // PINGRESP — Keepalive OK
      }

      idx = packetEnd;
    }
  }
}

/**
 * High-Level Hybrid MQTT & Vehicle State Coordinator
 */
export class PhevMqttManager {
  constructor(card) {
    this.card = card;
    this.hass = null;
    this.config = {};
    this.connected = false;
    this.connecting = false;
    this.mode = 'auto'; // 'auto' | 'ha_mqtt' | 'direct_mqtt' | 'entities'
    this.haUnsub = null;
    this.wsClient = null;

    // Vehicle Telemetry State Cache
    this.state = {
      connected: false,
      lastSeen: null,
      battery: {
        soc: null,
        charging: false,
        plugged: false,
        remainingMins: 0,
        completionTime: null,
      },
      doors: {
        locked: null,
        driver: false,
        passenger: false,
        rearLeft: false,
        rearRight: false,
        bonnet: false,
        boot: false,
      },
      climate: {
        mode: 'off',
        cool: false,
        heat: false,
        windscreen: false,
        remainingMins: 0,
        stopTime: '--:--',
        duration: '10',
        delay: '0',
        startedAt: null,
      },
      lights: {
        headlights: false,
        parklights: false,
        hazard: false,
      },
      diagnostics: {
        vin: null,
        ecuVersion: null,
        ignition: 'off',
        alarm: 'disarmed',
        lastAlarmEvent: null,
        carClock: null,
        batteryThermal: null,
        batteryWarming: false,
        batteryWarning: false,
        wifiSsid: null,
        wifiChannel: null,
        wifiAlwaysOn: false,
        registeredPhones: null,
        waitingForTimer: false,
      },
      timers: {
        climateMaster: false,
        chargeMaster: false,
        climateMode: 'heat',
        climateSlots: [
          { slot: 1, enabled: false, time: '07:30', duration: '20', days: 'Weekdays' },
          { slot: 2, enabled: false, time: '17:00', duration: '20', days: 'Weekdays' },
          { slot: 3, enabled: false, time: '08:00', duration: '20', days: 'Weekends' },
          { slot: 4, enabled: false, time: '12:00', duration: '20', days: 'Everyday' },
          { slot: 5, enabled: false, time: '18:00', duration: '20', days: 'Everyday' },
        ],
        chargeSlots: [
          { slot: 1, enabled: false, start: '22:00', end: '06:00', fullCharge: true, days: 'Everyday' },
          { slot: 2, enabled: false, start: '13:00', end: '16:00', fullCharge: true, days: 'Weekends' },
          { slot: 3, enabled: false, start: '01:00', end: '05:00', fullCharge: true, days: 'Everyday' },
          { slot: 4, enabled: false, start: '08:00', end: '12:00', fullCharge: true, days: 'Weekdays' },
          { slot: 5, enabled: false, start: '19:00', end: '23:00', fullCharge: true, days: 'Everyday' },
        ],
      },
      settings: {},
    };

    // Pre-populate settings catalog
    if (typeof SETTING_DEFINITIONS === 'object') {
      for (const [k, def] of Object.entries(SETTING_DEFINITIONS)) {
        const defOpt = def.options ? (typeof def.options[0] === 'object' ? def.options[0].value : def.options[0]) : '';
        this.state.settings[k] = def.default || defOpt || '';
      }
    }
  }

  updateConfig(config, hass) {
    const prevMode = this.mode;
    const prevBroker = this.config.mqtt_broker_url;
    const prevPrefix = this.config.mqtt_topic_prefix;
    const prevVin = this.config.mqtt_vin;

    this.config = { ...config };
    this.hass = hass;
    this.mode = config.connection_mode || 'auto';

    if (this.mode === 'entities') {
      this.disconnect();
      return;
    }

    const needsReconnect =
      !this.connected ||
      this.mode !== prevMode ||
      this.config.mqtt_broker_url !== prevBroker ||
      this.config.mqtt_topic_prefix !== prevPrefix ||
      this.config.mqtt_vin !== prevVin;

    if (needsReconnect) {
      this.connect();
    }
  }

  setHass(hass) {
    const oldHass = this.hass;
    this.hass = hass;
    if (this.mode !== 'entities' && !this.connected && !this.connecting && hass?.connection) {
      this.connect();
    }
  }

  async connect() {
    if (this.mode === 'entities') return;
    this.disconnect();

    const brokerUrl = (this.config.mqtt_broker_url || '').trim();
    const useDirectWs = this.mode === 'direct_mqtt' || (this.mode === 'auto' && brokerUrl);

    if (useDirectWs && brokerUrl) {
      this._connectDirectWs(brokerUrl);
    } else if (this.hass?.connection) {
      await this._connectHaInternal();
    }
  }

  _connectDirectWs(brokerUrl) {
    this.connecting = true;
    this.card._updateMqttStatus?.('connecting');

    this.wsClient = new NativeMqttWsClient({
      onConnect: () => {
        this.connected = true;
        this.connecting = false;
        this.card._updateMqttStatus?.('connected');

        const prefix = (this.config.mqtt_topic_prefix || 'phev').replace(/\/+$/, '');
        const patterns = new Set([`${prefix}/#`, 'phev/#']);
        if (this.config.mqtt_vin) {
          const vin = this.config.mqtt_vin.trim();
          patterns.add(`${vin}/#`);
          patterns.add(`phev/${vin}/#`);
        }
        for (const p of patterns) {
          this.wsClient.subscribe(p);
        }

        // Trigger refresh
        setTimeout(() => {
          this.publish('settings/dump', '1');
          this.publish('set/refresh', '3');
          this.publish('set/register/06', '03');
        }, 300);
      },
      onMessage: (topic, payload) => {
        this._handleMqttPacket(topic, payload);
      },
      onClose: () => {
        this.connected = false;
        this.connecting = false;
        this.card._updateMqttStatus?.('disconnected');
      },
      onError: (err) => {
        console.warn('[PHEV Card MQTT WS Error]', err);
        this.connected = false;
        this.connecting = false;
        this.card._updateMqttStatus?.('error');
      },
    });

    this.wsClient.connect({
      brokerUrl,
      username: this.config.mqtt_username,
      password: this.config.mqtt_password,
    });
  }

  async _connectHaInternal() {
    if (!this.hass?.connection) return;
    this.connecting = true;
    this.card._updateMqttStatus?.('connecting');

    const prefix = (this.config.mqtt_topic_prefix || 'phev').replace(/\/+$/, '');
    const topicPattern = `${prefix}/#`;

    try {
      this.haUnsub = await this.hass.connection.subscribeMessage(
        (msg) => {
          this.connected = true;
          this.connecting = false;
          this._handleMqttPacket(msg.topic, msg.payload);
        },
        { type: 'mqtt/subscribe', topic: topicPattern }
      );

      this.connected = true;
      this.connecting = false;
      this.card._updateMqttStatus?.('connected');

      // Also subscribe to VIN prefix if provided
      if (this.config.mqtt_vin) {
        const vin = this.config.mqtt_vin.trim();
        if (vin !== prefix) {
          try {
            await this.hass.connection.subscribeMessage(
              (msg) => this._handleMqttPacket(msg.topic, msg.payload),
              { type: 'mqtt/subscribe', topic: `${vin}/#` }
            );
          } catch (_) {}
        }
      }

      // Request vehicle dump
      setTimeout(() => {
        this.publish('settings/dump', '1');
        this.publish('set/refresh', '3');
        this.publish('set/register/06', '03');
      }, 300);
    } catch (err) {
      console.warn('[PHEV Card HA MQTT subscribe failed]', err);
      this.connected = false;
      this.connecting = false;
      this.card._updateMqttStatus?.('disconnected');
    }
  }

  disconnect() {
    this.connected = false;
    this.connecting = false;
    if (this.wsClient) {
      this.wsClient.disconnect();
      this.wsClient = null;
    }
    if (this.haUnsub) {
      try {
        if (typeof this.haUnsub === 'function') this.haUnsub();
      } catch (_) {}
      this.haUnsub = null;
    }
    this.card._updateMqttStatus?.('disconnected');
  }

  publish(subTopic, payload, retain = false) {
    const prefix = (this.config.mqtt_topic_prefix || this.config.mqtt_vin || 'phev').replace(/\/+$/, '');
    const cleanSub = subTopic.replace(/^\/+/, '');
    const fullTopic = `${prefix}/${cleanSub}`;
    const payloadStr = typeof payload === 'object' ? JSON.stringify(payload) : String(payload);

    if (this.wsClient && this.wsClient.connected) {
      this.wsClient.publish(fullTopic, payloadStr, retain);
      if (this.config.mqtt_vin && prefix === 'phev') {
        this.wsClient.publish(`${this.config.mqtt_vin}/${cleanSub}`, payloadStr, retain);
      }
      return;
    }

    if (this.hass) {
      this.hass.callService('mqtt', 'publish', {
        topic: fullTopic,
        payload: payloadStr,
        qos: 1,
        retain,
      });
      if (this.config.mqtt_vin && prefix === 'phev') {
        this.hass.callService('mqtt', 'publish', {
          topic: `${this.config.mqtt_vin}/${cleanSub}`,
          payload: payloadStr,
          qos: 1,
          retain,
        });
      }
    }
  }

  _decodeRegister(regId, hexVal) {
    const clean = hexVal.replace(/[^0-9a-fA-F]/g, '');
    const reg = regId.toLowerCase().replace(/^0x/, '');
    const d = this.state;

    const toBytes = (hex) => {
      const arr = [];
      for (let i = 0; i < hex.length; i += 2) {
        arr.push(parseInt(hex.slice(i, i + 2), 16));
      }
      return arr;
    };

    // Register 0x05 / 5: Climate Timers
    if (reg === '5' || reg === '05') {
      if (clean.length >= 32) {
        const bytes = toBytes(clean);
        for (let slot = 0; slot < 5; slot++) {
          const offset = 1 + slot * 3;
          if (offset + 2 >= bytes.length) break;
          const b0 = bytes[offset];
          const b1 = bytes[offset + 1];
          const b2 = bytes[offset + 2];

          while (d.timers.climateSlots.length <= slot) {
            d.timers.climateSlots.push({ slot: slot + 1, enabled: false, time: '07:30', duration: '20', days: 'Weekdays' });
          }
          const sl = d.timers.climateSlots[slot];

          if (b0 === 0x00 && b1 === 0xfe && b2 === 0x07) {
            sl.enabled = false;
            continue;
          }

          const val = (b2 << 16) | (b1 << 8) | b0;
          const durIdx = val & 0x3;
          const durationMins = (durIdx + 1) * 10;
          const sun = (val >> 2) & 1;
          const mon = (val >> 3) & 1;
          const tue = (val >> 4) & 1;
          const wed = (val >> 5) & 1;
          const thu = (val >> 6) & 1;
          const fri = (val >> 7) & 1;
          const sat = (val >> 8) & 1;
          const minTens = (val >> 9) & 0x7;
          const min = minTens * 10;
          const hr = (val >> 12) & 0x1f;
          const enabled = Boolean((val >> 17) & 1);

          const daysArr = [];
          if (mon) daysArr.push('Mon');
          if (tue) daysArr.push('Tue');
          if (wed) daysArr.push('Wed');
          if (thu) daysArr.push('Thu');
          if (fri) daysArr.push('Fri');
          if (sat) daysArr.push('Sat');
          if (sun) daysArr.push('Sun');

          sl.enabled = enabled;
          sl.time = `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
          sl.duration = String(durationMins);
          sl.days = daysArr.length === 7 ? 'Everyday' : (daysArr.length === 5 && !sun && !sat ? 'Weekdays' : (daysArr.length === 2 && sun && sat ? 'Weekends' : daysArr.join(', ')));
        }
        d.timers.climateMaster = d.timers.climateSlots.some((s) => s.enabled);
      }
    }

    // Register 0x1d: Battery SOC & Park Lights
    else if (reg === '1d') {
      if (clean.length >= 2) {
        const bytes = toBytes(clean);
        const soc = bytes[0];
        if (soc > 0 && soc <= 100) {
          d.battery.soc = soc;
        } else if (soc === 0 && (!d.battery.soc || d.battery.soc <= 5)) {
          d.battery.soc = 0;
        }
        if (bytes.length >= 3) {
          d.lights.parklights = bytes[2] === 1;
        }
      }
    }

    // Register 0x10: AC Status
    else if (reg === '10') {
      if (clean.length >= 2) {
        const bytes = toBytes(clean);
        const st = bytes[0];
        if (st === 0 || st === 3) {
          d.climate.mode = 'off';
          d.climate.cool = false;
          d.climate.heat = false;
          d.climate.windscreen = false;
          d.climate.remainingMins = 0;
          d.climate.stopTime = '--:--';
          d.climate.startedAt = null;
        }
      }
    }

    // Register 0x1c: AC Mode
    else if (reg === '1c') {
      // Vehicle ETACS memory mode setting; do not override live climate operational state
    }

    // Register 0x1e: Charge Plug Status
    else if (reg === '1e') {
      if (clean.length >= 4) {
        const bytes = toBytes(clean);
        const connected = bytes[1] === 1 || bytes[1] === 2 || bytes[0] > 0;
        d.battery.plugged = connected;
        if (bytes[0] > 0) d.battery.charging = true;
        d.diagnostics.waitingForTimer = bytes[1] === 1 && bytes[0] === 0;
        if (!connected) {
          d.battery.charging = false;
          d.battery.remainingMins = 0;
          d.battery.completionTime = null;
        }
      }
    }

    // Register 0x1f: Charging Status & Remaining Time
    else if (reg === '1f') {
      if (clean.length >= 2) {
        const bytes = toBytes(clean);
        d.battery.charging = bytes[0] > 0;
        if (d.battery.charging) d.battery.plugged = true;
        if (bytes.length >= 3 && bytes[2] !== 0xff) {
          const rem = (bytes[2] << 8) | bytes[1];
          if (rem > 0 && rem < 1440) {
            d.battery.remainingMins = rem;
          } else if (rem === 0) {
            d.battery.remainingMins = 0;
          }
        }
      }
    }

    // Register 0x24: Door & Lock Status
    else if (reg === '24') {
      if (clean.length >= 2) {
        const bytes = toBytes(clean);
        const rawLocked = bytes[0] === 1;
        d.doors.locked = Boolean(this.config.invert_lock ? !rawLocked : rawLocked);
        if (bytes.length >= 10) {
          d.doors.driver = bytes[3] === 1;
          d.doors.passenger = bytes[4] === 1;
          d.doors.rearRight = bytes[5] === 1;
          d.doors.rearLeft = bytes[6] === 1;
          d.doors.boot = bytes[7] === 1;
          d.doors.bonnet = bytes[8] === 1;
          d.lights.headlights = bytes[9] === 1;
        }
      }
    }

    // Register 0x15: VIN & Smartphone registrations
    else if (reg === '15') {
      if (clean.length >= 38) {
        const bytes = toBytes(clean);
        let ascii = '';
        for (let i = 1; i <= 17 && i < bytes.length; i++) {
          if (bytes[i] >= 32 && bytes[i] <= 126) ascii += String.fromCharCode(bytes[i]);
        }
        if (ascii.length >= 10) d.diagnostics.vin = ascii;
        if (bytes.length >= 20) {
          d.diagnostics.registeredPhones = `${bytes[19]} / 8`;
        }
      }
    }
  }

  _handleMqttPacket(topic, payload) {
    const rawTopic = topic.toLowerCase();
    const val = String(payload || '').trim();
    const d = this.state;

    let parts = rawTopic.split('/').filter(Boolean);
    if (parts.length > 1 && parts[0] === 'phev') parts.shift();
    if (parts.length > 1 && (parts[0].length >= 10 || parts[0].includes('jmb'))) {
      parts.shift();
    }
    const sub = parts.join('/');

    // Ignore outgoing control commands and echoes (e.g. set/..., .../set)
    if (sub.startsWith('set/') || sub.endsWith('/set') || rawTopic.includes('/set/')) {
      return;
    }

    d.lastSeen = new Date();
    d.connected = true;

    // Raw Register
    if (sub.startsWith('register/')) {
      const regId = sub.replace(/^register\//, '').trim();
      this._decodeRegister(regId, val);
      d.battery.plugged = Boolean(d.battery.plugged || d.battery.charging);
      this.card._onMqttStateUpdated?.();
      return;
    }

    // Connection
    if (sub === 'connected' || sub === 'available' || sub === 'status') {
      d.connected = parseBool(val);
    }

    // Climate Remaining
    if (sub.includes('climate') && (sub.includes('remaining') || sub.includes('time_remaining'))) {
      const n = parseFloat(val);
      if (Number.isFinite(n)) {
        d.climate.remainingMins = Math.max(0, Math.round(n));
      }
    } else if (sub.includes('climate') && (sub.includes('stop') || sub.includes('completion'))) {
      d.climate.stopTime = val;
    }

    // Battery & Charging
    else if ((sub.includes('battery') && (sub.includes('level') || sub.includes('soc'))) || sub === 'battery') {
      const n = parseFloat(val);
      if (Number.isFinite(n) && n >= 0 && n <= 100) {
        if (n === 0 && d.battery.soc > 15) {
          // Ignore transient 0% drop
        } else {
          d.battery.soc = Math.round(n);
        }
      }
    } else if (sub === 'charge/charging' || sub === 'battery/charging' || sub === 'charging') {
      d.battery.charging = parseBool(val);
      if (d.battery.charging) d.battery.plugged = true;
    } else if (sub === 'charge/plug_state') {
      const low = val.toLowerCase().trim();
      if (low === 'charging') {
        d.battery.charging = true;
        d.battery.plugged = true;
      } else if (low.includes('connected')) {
        d.battery.plugged = true;
      } else if (low === 'unplugged') {
        d.battery.plugged = false;
        d.battery.charging = false;
        d.battery.remainingMins = 0;
        d.battery.completionTime = null;
      }
    } else if (sub === 'charge/plug' || sub.includes('charger_connected')) {
      d.battery.plugged = parseBool(val);
      if (!d.battery.plugged) {
        d.battery.charging = false;
        d.battery.remainingMins = 0;
        d.battery.completionTime = null;
      }
    } else if (sub === 'charge/remaining' || sub.includes('charge_remaining')) {
      const n = parseFloat(val);
      if (Number.isFinite(n)) {
        d.battery.remainingMins = Math.max(0, Math.round(n));
      }
    } else if (sub === 'charge/completion_time' || sub.includes('completion')) {
      if (val && val !== 'none' && val !== 'unknown' && val !== 'unavailable') {
        d.battery.completionTime = val;
      }
    }

    // Doors & Lock
    else if (sub.includes('locked')) {
      const low = val.toLowerCase().trim();
      let isL = low === 'closed' || low === 'locked' || low === '1' || low === 'off';
      d.doors.locked = Boolean(this.config.invert_lock ? !isL : isL);
    } else if (sub.includes('door_driver') || sub.includes('driver_door')) {
      d.doors.driver = parseBool(val);
    } else if (sub.includes('passenger')) {
      d.doors.passenger = parseBool(val);
    } else if (sub.includes('rear_left')) {
      d.doors.rearLeft = parseBool(val);
    } else if (sub.includes('rear_right')) {
      d.doors.rearRight = parseBool(val);
    } else if (sub.includes('bonnet')) {
      d.doors.bonnet = parseBool(val);
    } else if (sub.includes('boot')) {
      d.doors.boot = parseBool(val);
    }

    // Climate Mode & State
    else if (!sub.startsWith('set/') && !sub.endsWith('/set') && (sub === 'climate/remaining' || sub === 'climate_remaining' || sub === 'climate/time_remaining')) {
      const n = parseFloat(val);
      if (Number.isFinite(n)) {
        d.climate.remainingMins = Math.max(0, Math.round(n));
      }
    } else if (!sub.startsWith('set/') && !sub.endsWith('/set') && (sub === 'climate/stop_time' || sub === 'climate_stop_time' || sub === 'climate/completion_time')) {
      d.climate.stopTime = val;
    } else if (!sub.startsWith('set/') && !sub.endsWith('/set') && (sub === 'climate/duration' || sub === 'climate_duration')) {
      const n = parseInt(val, 10);
      if (n === 10 || n === 20 || n === 30) {
        d.climate.duration = String(n);
      }
    } else if (!sub.startsWith('set/') && !sub.endsWith('/set') && (sub === 'climate/operating' || sub === 'climate_operating')) {
      const isOp = parseBool(val);
      d.climate.operating = isOp;
      if (!isOp) {
        d.climate.mode = 'off';
        d.climate.cool = false;
        d.climate.heat = false;
        d.climate.windscreen = false;
        d.climate.remainingMins = 0;
        d.climate.stopTime = '--:--';
        d.climate.startedAt = null;
      }
    } else if (!sub.startsWith('set/') && !sub.endsWith('/set') && (sub.includes('climate_state') || sub === 'climate' || sub === 'climate/state' || sub === 'climate/mode')) {
      const m = val.toLowerCase();
      d.climate.mode = m === '0' || m === 'off' ? 'off' : m;
      d.climate.cool = d.climate.mode === 'cool';
      d.climate.heat = d.climate.mode === 'heat';
      d.climate.windscreen = d.climate.mode === 'windscreen';
      if (d.climate.mode === 'off') {
        d.climate.remainingMins = 0;
        d.climate.stopTime = '--:--';
        d.climate.startedAt = null;
      }
    } else if (!sub.startsWith('set/') && !sub.endsWith('/set') && sub.includes('cool')) {
      d.climate.cool = parseBool(val);
      if (d.climate.cool) d.climate.mode = 'cool';
    } else if (!sub.startsWith('set/') && !sub.endsWith('/set') && sub.includes('heat')) {
      d.climate.heat = parseBool(val);
      if (d.climate.heat) d.climate.mode = 'heat';
    } else if (!sub.startsWith('set/') && !sub.endsWith('/set') && sub.includes('windscreen')) {
      d.climate.windscreen = parseBool(val);
      if (d.climate.windscreen) d.climate.mode = 'windscreen';
    }

    // Lights (Strict mappings matching phev2mqtt /lights/head and /lights/parking)
    else if (sub === 'lights/head' || sub === 'lights/headlights' || sub === 'headlights' || sub.endsWith('/lights/head')) {
      d.lights.headlights = parseBool(val);
    } else if (sub === 'lights/parking' || sub === 'lights/park' || sub === 'lights/parkinglights' || sub === 'parkinglights' || sub === 'parklights' || sub.endsWith('/lights/parking')) {
      d.lights.parklights = parseBool(val);
    } else if (sub === 'lights/hazard' || sub === 'hazard' || sub === 'hazardlights' || sub.endsWith('/lights/hazard')) {
      d.lights.hazard = parseBool(val);
    } else if (sub === 'lights/interior' || sub === 'interior' || sub === 'interiorlights' || sub.endsWith('/lights/interior')) {
      d.diagnostics.interior = parseBool(val);
    }

    // Diagnostics & Clock
    else if (sub === 'vin' || sub.includes('phev_vin')) {
      d.diagnostics.vin = val;
    } else if (sub.includes('clock') && !sub.includes('sync')) {
      d.diagnostics.carClock = val;
    } else if (sub.includes('ignition')) {
      d.diagnostics.ignition = val.toLowerCase();
    } else if (sub.includes('alarm')) {
      d.diagnostics.alarm = val.toLowerCase();
    }

    // Settings
    else if (sub.startsWith('settings/') || sub.startsWith('setting/')) {
      const cleanSlug = sub.replace(/^settings?\//, '').replace(/\/set$/, '');
      d.settings[cleanSlug] = val;
    }

    // CC-CV estimate fallback for charging
    if (d.battery.charging) {
      if ((!d.battery.remainingMins || d.battery.remainingMins <= 0) && d.battery.soc < 100) {
        d.battery.remainingMins = estimateRemainingChargingMins(d.battery.soc || 80);
      }
      if ((!d.battery.completionTime || d.battery.completionTime === '--:--' || d.battery.completionTime === 'Nem tölt') && d.battery.remainingMins > 0) {
        const finish = new Date(Date.now() + d.battery.remainingMins * 60 * 1000);
        d.battery.completionTime = `~${finish.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}`;
      }
    }

    this.card._onMqttStateUpdated?.();
  }

  _parseActiveDays(daysStr) {
    if (!daysStr) return [];
    const s = String(daysStr).trim();
    const lower = s.toLowerCase();
    if (lower === 'everyday' || lower === 'all') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
    if (lower === 'weekdays' || lower === 'weekday') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    }
    if (lower === 'weekends' || lower === 'weekend') {
      return ['Sat', 'Sun'];
    }
    const daysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysArr.filter((d) => lower.includes(d.toLowerCase()));
  }

  encodeClimateTimersRegister(slots, mode = 'heat') {
    let hex = '';
    for (let i = 0; i < 5; i++) {
      const sl = slots[i];
      if (!sl || !sl.time || sl.time === '--:--') {
        hex += '00fe07';
        continue;
      }
      const [hStr, mStr] = (sl.time || '07:30').split(':');
      const hr = parseInt(hStr, 10) || 0;
      const minTens = Math.round((parseInt(mStr, 10) || 0) / 10) & 0x7;
      const durVal = sl.duration === '30' ? 2 : (sl.duration === '20' ? 1 : 0);

      const daysArr = this._parseActiveDays(sl.days);
      const sun = daysArr.includes('Sun') ? 1 : 0;
      const mon = daysArr.includes('Mon') ? 1 : 0;
      const tue = daysArr.includes('Tue') ? 1 : 0;
      const wed = daysArr.includes('Wed') ? 1 : 0;
      const thu = daysArr.includes('Thu') ? 1 : 0;
      const fri = daysArr.includes('Fri') ? 1 : 0;
      const sat = daysArr.includes('Sat') ? 1 : 0;

      const on = sl.enabled ? 1 : 0;
      const off = sl.enabled ? 0 : 1;

      const val = durVal | (sun << 2) | (mon << 3) | (tue << 4) | (wed << 5) | (thu << 6) | (fri << 7) | (sat << 8) | (minTens << 9) | (hr << 12) | (on << 17) | (off << 18);
      const b0 = (val & 0xff).toString(16).padStart(2, '0');
      const b1 = ((val >> 8) & 0xff).toString(16).padStart(2, '0');
      const b2 = ((val >> 16) & 0xff).toString(16).padStart(2, '0');
      hex += `${b0}${b1}${b2}`;
    }
    const modeByte = mode === 'cool' ? '01' : (mode === 'windscreen' ? '03' : '02');
    hex += modeByte;
    return hex;
  }

  encodeClimateRegister05(slots) {
    let hex = '';
    const isMasterOn = slots.some((s) => s && s.enabled);
    hex += isMasterOn ? '02' : '01';

    for (let i = 0; i < 5; i++) {
      const sl = slots[i];
      if (!sl || !sl.time || sl.time === '--:--') {
        hex += '00fe07';
        continue;
      }
      const [hStr, mStr] = (sl.time || '07:30').split(':');
      const hr = parseInt(hStr, 10) || 0;
      const minTens = Math.round((parseInt(mStr, 10) || 0) / 10) & 0x7;
      const durVal = sl.duration === '30' ? 2 : (sl.duration === '20' ? 1 : 0);

      const daysArr = this._parseActiveDays(sl.days);
      const sun = daysArr.includes('Sun') ? 1 : 0;
      const mon = daysArr.includes('Mon') ? 1 : 0;
      const tue = daysArr.includes('Tue') ? 1 : 0;
      const wed = daysArr.includes('Wed') ? 1 : 0;
      const thu = daysArr.includes('Thu') ? 1 : 0;
      const fri = daysArr.includes('Fri') ? 1 : 0;
      const sat = daysArr.includes('Sat') ? 1 : 0;

      const on = sl.enabled ? 1 : 0;
      const off = sl.enabled ? 0 : 1;

      const val = durVal | (sun << 2) | (mon << 3) | (tue << 4) | (wed << 5) | (thu << 6) | (fri << 7) | (sat << 8) | (minTens << 9) | (hr << 12) | (on << 17) | (off << 18);
      const b0 = (val & 0xff).toString(16).padStart(2, '0');
      const b1 = ((val >> 8) & 0xff).toString(16).padStart(2, '0');
      const b2 = ((val >> 16) & 0xff).toString(16).padStart(2, '0');
      hex += `${b0}${b1}${b2}`;
    }
    return hex;
  }

  setClimateTimerSlot(slotNum, timerData, mode = 'heat') {
    const slotIdx = slotNum - 1;
    if (slotIdx >= 0 && slotIdx < this.state.timers.climateSlots.length) {
      this.state.timers.climateSlots[slotIdx] = {
        ...this.state.timers.climateSlots[slotIdx],
        ...timerData,
      };
    }
    this.state.timers.climateMaster = this.state.timers.climateSlots.some((s) => s.enabled);
    this.state.timers._lastSavedAt = Date.now();

    const rawHex1a = this.encodeClimateTimersRegister(this.state.timers.climateSlots, mode);
    const reg05Hex = this.encodeClimateRegister05(this.state.timers.climateSlots);
    this.state.timers._lastSavedReg05 = reg05Hex;

    this.publish('set/register/1a', rawHex1a);
    this.publish('set/register/03', this.state.timers.climateMaster ? '02' : '01');
    this.publish('register/05', reg05Hex, true);
    this.publish('set/register/06', '05');

    // Also publish friendly topics
    this.publish(`set/climate/timer/${slotNum}/enabled`, timerData.enabled ? 'on' : 'off');
    if (timerData.time) this.publish(`set/climate/timer/${slotNum}/time`, timerData.time);
    if (timerData.duration) this.publish(`set/climate/timer/${slotNum}/duration`, String(timerData.duration));
    if (timerData.days) this.publish(`set/climate/timer/${slotNum}/days`, timerData.days);

    this.card._onMqttStateUpdated?.();
  }

  setChargeTimerSlot(slotNum, timerData) {
    const slotIdx = slotNum - 1;
    if (slotIdx >= 0 && slotIdx < this.state.timers.chargeSlots.length) {
      this.state.timers.chargeSlots[slotIdx] = {
        ...this.state.timers.chargeSlots[slotIdx],
        ...timerData,
      };
    }

    this.publish(`set/charge/timer/${slotNum}/enabled`, timerData.enabled ? 'on' : 'off');
    if (timerData.start) this.publish(`set/charge/timer/${slotNum}/start`, timerData.start);
    if (timerData.end) this.publish(`set/charge/timer/${slotNum}/end`, timerData.end);
    if (timerData.days) this.publish(`set/charge/timer/${slotNum}/days`, timerData.days);
    if (timerData.fullCharge !== undefined) this.publish(`set/charge/timer/${slotNum}/full_charge`, timerData.fullCharge ? 'on' : 'off');

    const [sh, sm] = (timerData.start || '22:00').split(':').map((n) => parseInt(n, 10));
    const [eh, em] = (timerData.end || '06:00').split(':').map((n) => parseInt(n, 10));
    this.publish(
      `set/charge/timer/${slotNum}`,
      JSON.stringify({
        start_hour: Number.isFinite(sh) ? sh : 22,
        start_minute: Number.isFinite(sm) ? sm : 0,
        end_hour: Number.isFinite(eh) ? eh : 6,
        end_minute: Number.isFinite(em) ? em : 0,
        full_charge: Boolean(timerData.fullCharge),
        days: timerData.days,
        enabled: Boolean(timerData.enabled),
      })
    );

    this.card._onMqttStateUpdated?.();
  }

  setClimateTimerMaster(enabled) {
    this.state.timers.climateMaster = Boolean(enabled);
    this.publish('set/register/03', enabled ? '02' : '01');
    this.publish('set/climate/timer/master', enabled ? 'on' : 'off');
    this.card._onMqttStateUpdated?.();
  }

  setChargeTimerMaster(enabled) {
    this.state.timers.chargeMaster = Boolean(enabled);
    this.publish('set/charge/timer/master', enabled ? 'on' : 'off');
    this.card._onMqttStateUpdated?.();
  }
}
