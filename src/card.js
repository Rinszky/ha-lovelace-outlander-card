import { localize } from './i18n.js';
import {
  computeCarPaintPalette,
  getBatteryColors,
  isBinaryOn,
  isDoorOpen,
  isCarLocked,
  parseBatteryLevel,
  formatNumber,
  formatRemainingTime,
  formatEstimatedCompletion,
  formatClimateRemaining,
  formatClimateStopTime,
  formatDailyEnergy,
  formatDailyDuration,
  formatLastSeen,
  autoDiscoverPhevEntities,
  buildSparklinePaths,
  ENTITY_KEYS,
  getPhevCustomizationSettings,
  getPhevClimateTimers,
  getPhevChargeTimers,
  SETTING_DEFINITIONS,
} from './helpers.js';
import { renderOutlanderSvg, CAR_NOSE_Y, CAR_REAR_Y, CAR_BODY_LEN } from './car-svg.js';
import { CARD_STYLES } from './styles.js';
import { OutlanderPhevCardEditor } from './editor.js';
import { PhevMqttManager, estimateRemainingChargingMins } from './mqtt.js';

const ICONS = {
  mitsubishi: `<svg viewBox="0 0 24 24"><polygon points="12,2 16.2,9.3 12,16.6 7.8,9.3"/><polygon points="12,16.6 3.6,16.6 0,22.8 8.4,22.8"/><polygon points="12,16.6 20.4,16.6 24,22.8 15.6,22.8"/></svg>`,
  lockClosed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
  lockOpen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.8-1.2"/></svg>`,
  door: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20h14"/><path d="M6 20V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"/><circle cx="15" cy="12" r="1"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>`,
  plugOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2l20 20"/><path d="M9 5v3"/><path d="M15 5v3"/><path d="M12 17v4"/><path d="M7 8h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V8z"/></svg>`,
  plugOn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v5"/><path d="M15 3v5"/><path d="M12 17v4"/><path d="M7 8h10v4a5 5 0 0 1-10 0V8z"/></svg>`,
  cool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>`,
  heat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  windscreen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7c5-3 13-3 18 0l-2 9c-4-2-10-2-14 0L3 7z"/><path d="M9 19c0-1.5 1.5-2 1.5-3.5S9 13.5 9 12"/><path d="M12 19c0-1.5 1.5-2 1.5-3.5S12 13.5 12 12"/><path d="M15 19c0-1.5 1.5-2 1.5-3.5S15 13.5 15 12"/></svg>`,
  headlight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 6c5.5 0 9 2.7 9 6s-3.5 6-9 6V6z"/><path d="M3 8h5"/><path d="M3 12h5"/><path d="M3 16h5"/></svg>`,
  parklight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8c-3 0-5 1.8-5 4s2 4 5 4V8z"/><path d="M15 8c3 0 5 1.8 5 4s-2 4-5 4V8z"/><path d="M1 9l1.5 1"/><path d="M1 15l1.5-1"/><path d="M23 9l-1.5 1"/><path d="M23 15l-1.5-1"/></svg>`,
  timer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`,
  hourglass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`,
  clockDelay: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/><path d="M16 2.5l5 2.5-2.5 5"/></svg>`,
  timerOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4"/><path d="M12 14l3-3"/><circle cx="12" cy="13" r="8"/><path d="M3 3l18 18"/></svg>`,
  wifiSync: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
  wifiOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 12.86a10 10 0 0 1 5.17-2.89"/><circle cx="12" cy="20" r="1"/></svg>`,
  hazard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9l-4.5 8h9L12 9z"/></svg>`,
  bulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.6 1 1.4 1 2.3h6c0-.9.4-1.7 1-2.3A7 7 0 0 0 12 2z"/></svg>`,
  counter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><line x1="12" y1="5" x2="12" y2="19"/><path d="M6.3 10.2 7.8 9v6"/><path d="M15.2 10.2a1.8 1.8 0 0 1 3.4.8c0 1.4-3.4 2.8-3.4 4h3.6"/></svg>`,
  batteryClock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h4"/><path d="M10.5 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.2"/><circle cx="16.5" cy="16.5" r="4.5"/><path d="M16.5 14.3v2.3l1.5 1"/></svg>`,
  cog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.8 12.2 20 3l3 3-2 2-2-2-2 2 2 2-1.5 1.5"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
};

let instanceCounter = 0;

export class OutlanderPhevCard extends HTMLElement {
  static getConfigElement() {
    if (!customElements.get('outlander-phev-card-editor')) {
      customElements.define('outlander-phev-card-editor', OutlanderPhevCardEditor);
    }
    return document.createElement('outlander-phev-card-editor');
  }

  static getStubConfig(hass) {
    const discovered = hass ? autoDiscoverPhevEntities(hass) : {};
    return {
      title: 'Outlander PHEV',
      language: 'hu',
      steering_side: 'left',
      car_color: '#2b2f36',
      battery_fill_mode: 'always',
      battery_fill_opacity: 36,
      layout_mode: 'auto',
      daily_charge_position: 'header',
      max_ev_range: 45,
      show_card_frame: true,
      offline_dimming: true,
      show_sunroof: true,
      interactive_car: true,
      confirm_wifi_restart: true,
      ...discovered,
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._uid = `ophev${++instanceCounter}`;
    this._config = null;
    this._hass = null;
    this._autoDiscoveredCache = null;
    this._lastValidSoc = 88;
    this._drawerOpen = false;
    this._timersModalOpen = false;
    this._diagModalOpen = false;
    this._settingsModalOpen = false;
    this._settingsCategoryFilter = 'all';
    this._settingsSearchTerm = '';
    this._activeTimerSubtab = 'climate';
    this._activeClimateSlot = 1;
    this._activeChargeSlot = 1;
    this._wifiConfirmTimer = null;
    this._wifiSentTimer = null;
    this._timerSentTimer = null;
    this._optimistic = new Map();
    this._sparkCache = new Map();
    this.$ = {};
    this._mqtt = new PhevMqttManager(this);
    this._mqttStatus = 'disconnected';
  }

  connectedCallback() {
    if (this._config && this._mqtt) {
      this._mqtt.updateConfig(this._config, this._hass);
    }
  }

  disconnectedCallback() {
    clearTimeout(this._wifiConfirmTimer);
    clearTimeout(this._wifiSentTimer);
    clearTimeout(this._timerSentTimer);
    if (this._mqtt) {
      this._mqtt.disconnect();
    }
  }

  _onMqttStateUpdated() {
    this._updateState();
  }

  _updateMqttStatus(status) {
    this._mqttStatus = status;
    this._updateState();
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    const prevLang = this._config?.language;
    this._config = {
      title: 'Outlander PHEV',
      language: 'hu',
      steering_side: 'left',
      car_color: '#2b2f36',
      battery_fill_mode: 'always',
      battery_fill_opacity: 36,
      layout_mode: 'auto',
      daily_charge_position: 'header',
      max_ev_range: 45,
      show_card_frame: true,
      offline_dimming: true,
      show_sunroof: true,
      interactive_car: true,
      confirm_wifi_restart: true,
      invert_lock: false,
      connection_mode: 'auto',
      mqtt_topic_prefix: 'phev',
      mqtt_vin: '',
      mqtt_broker_url: '',
      mqtt_username: '',
      mqtt_password: '',
      ...config,
    };
    this._autoDiscoveredCache = null;

    if (this._mqtt) {
      this._mqtt.updateConfig(this._config, this._hass);
    }

    if (!this.$.card || prevLang !== this._config.language) {
      this._buildDom();
    }
    this._updateState();
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    if (this._mqtt) {
      this._mqtt.setHass(hass);
    }
    if (!this._config) return;
    if (!this.$.card) {
      this._buildDom();
      this._updateState();
      return;
    }
    if (this._haveMonitoredEntitiesChanged(oldHass, hass)) {
      this._updateState();
    }
  }

  _haveMonitoredEntitiesChanged(oldHass, newHass) {
    if (!oldHass || !newHass || !oldHass.states || !newHass.states) return true;
    if (oldHass.language !== newHass.language) return true;

    // 1. Monitored known entity keys
    const ents = this._resolveEntities();
    for (const key of ENTITY_KEYS) {
      const eid = ents[key];
      if (eid && oldHass.states[eid] !== newHass.states[eid]) {
        return true;
      }
    }

    // 2. Timers slots 1..5
    for (let s = 1; s <= 5; s++) {
      const prefixes = [`climate_timer_${s}`, `charge_timer_${s}`];
      for (const prefix of prefixes) {
        for (const eid of Object.keys(newHass.states)) {
          if (eid.includes(prefix)) {
            if (oldHass.states[eid] !== newHass.states[eid]) return true;
          }
        }
      }
    }

    // 3. Settings selects
    for (const eid of Object.keys(newHass.states)) {
      if (eid.startsWith('select.') && (eid.includes('_setting_') || eid.includes('phev_settings_') || eid.includes('phev_etacs'))) {
        if (oldHass.states[eid] !== newHass.states[eid]) return true;
      }
    }

    return false;
  }

  getCardSize() {
    let size = 16;
    if (this._drawerOpen) size += 6;
    return size;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: 'auto',
    };
  }

  _lang() {
    return this._config?.language || 'hu';
  }

  _resolveEntities() {
    if (this._hass) {
      if (!this._autoDiscoveredCache) {
        this._autoDiscoveredCache = autoDiscoverPhevEntities(this._hass);
      }
      return { ...this._autoDiscoveredCache, ...(this._config || {}) };
    }
    return this._config || {};
  }

  _getState(entityId) {
    if (!entityId || !this._hass?.states) return null;
    return this._hass.states[entityId] || null;
  }

  _isControlOn(entityId) {
    if (!entityId) return false;
    if (this._optimistic.has(entityId)) {
      const opt = this._optimistic.get(entityId);
      if (Date.now() < opt.expires) {
        return opt.val;
      }
      this._optimistic.delete(entityId);
    }
    return isBinaryOn(this._getState(entityId));
  }

  _setOptimistic(entityId, val, ms = 2200) {
    if (!entityId) return;
    this._optimistic.set(entityId, { val, expires: Date.now() + ms });
    this._updateState();
    setTimeout(() => {
      if (this._optimistic.get(entityId)?.expires <= Date.now()) {
        this._optimistic.delete(entityId);
        this._updateState();
      }
    }, ms + 40);
  }

  _openMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  _isMqttActive() {
    return Boolean(this._mqtt && this._mqtt.connected && this._config.connection_mode !== 'entities');
  }

  _toggleClimateMqtt(targetMode, turnOn) {
    if (!this._mqtt) return;
    const clim = this._mqtt.state.climate;
    if (!turnOn) {
      clim.mode = 'off';
      clim.cool = false;
      clim.heat = false;
      clim.windscreen = false;
      clim.remainingMins = 0;
      clim.stopTime = '--:--';
      clim.startedAt = null;

      this._mqtt.publish('set/climate/state', 'off');
      this._mqtt.publish('set/climate/mode', 'off');
      this._mqtt.publish('set/climate/off', '0');
      this._mqtt.publish(`set/climate/${targetMode}`, '0');
      this._mqtt.publish('set/register/13', '01');
    } else {
      clim.mode = targetMode;
      clim.cool = targetMode === 'cool';
      clim.heat = targetMode === 'heat';
      clim.windscreen = targetMode === 'windscreen';
      clim.startedAt = Date.now();
      const dur = parseInt(clim.duration || '10', 10);
      clim.remainingMins = dur;
      const finish = new Date(Date.now() + dur * 60 * 1000);
      clim.stopTime = `~${finish.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}`;

      this._mqtt.publish('set/climate/mode', targetMode);
      this._mqtt.publish(`set/climate/${targetMode}`, String(dur));
      this._mqtt.publish('set/climate/state', 'on');

      const stateHex = targetMode === 'cool' ? '01' : (targetMode === 'windscreen' ? '03' : '02');
      const durHex = dur === 30 ? '02' : (dur === 20 ? '01' : '00');
      const delHex = clim.delay === '10' ? '02' : (clim.delay === '5' ? '01' : '00');
      this._mqtt.publish('set/register/1b', `02${stateHex}${durHex}${delHex}`);
    }
    this._updateState();
  }

  _toggleEntity(entityId) {
    const ents = this._resolveEntities();
    const isMqtt = this._isMqttActive();

    // Check if this is a known feature and dispatch MQTT command
    let currentlyOn = false;
    if (entityId) {
      currentlyOn = this._isControlOn(entityId);
    } else if (isMqtt) {
      // Direct MQTT mode without configured HA entity
      if (entityId === ents.cool_entity) currentlyOn = this._mqtt.state.climate.cool;
      else if (entityId === ents.heat_entity) currentlyOn = this._mqtt.state.climate.heat;
      else if (entityId === ents.windscreen_entity) currentlyOn = this._mqtt.state.climate.windscreen;
      else if (entityId === ents.head_lights_entity) currentlyOn = this._mqtt.state.lights.headlights;
      else if (entityId === ents.park_lights_entity) currentlyOn = this._mqtt.state.lights.parklights;
    }

    const nextState = !currentlyOn;
    if (entityId) {
      this._setOptimistic(entityId, nextState);
    }

    if (isMqtt) {
      if (entityId === ents.cool_entity) {
        this._toggleClimateMqtt('cool', nextState);
      } else if (entityId === ents.heat_entity) {
        this._toggleClimateMqtt('heat', nextState);
      } else if (entityId === ents.windscreen_entity) {
        this._toggleClimateMqtt('windscreen', nextState);
      } else if (entityId === ents.head_lights_entity) {
        this._mqtt.state.lights.headlights = nextState;
        this._mqtt.publish('set/headlights', nextState ? 'on' : 'off');
        this._mqtt.publish('headlights/set', nextState ? 'ON' : 'OFF');
      } else if (entityId === ents.park_lights_entity) {
        this._mqtt.state.lights.parklights = nextState;
        this._mqtt.publish('set/parkinglights', nextState ? 'on' : 'off');
        this._mqtt.publish('parkinglights/set', nextState ? 'ON' : 'OFF');
      } else if (entityId === ents.hazard_lights_entity) {
        this._mqtt.state.lights.hazard = nextState;
        this._mqtt.publish('hazard/set', nextState ? 'ON' : 'OFF');
      }
    }

    // Also call Home Assistant service if entity is configured in HA
    if (entityId && this._hass?.states?.[entityId]) {
      const domain = entityId.split('.')[0];
      if (domain === 'light' || domain === 'switch' || domain === 'input_boolean') {
        this._hass.callService(domain, nextState ? 'turn_on' : 'turn_off', { entity_id: entityId });
      } else {
        this._hass.callService('homeassistant', 'toggle', { entity_id: entityId });
      }
    }
  }

  _handleDisableTimer() {
    const ents = this._resolveEntities();
    const entityId = ents.disable_charge_timer_entity;

    if (this._isMqttActive()) {
      this._mqtt.publish('set/cancelchargetimer', '1');
      this._mqtt.publish('set/register/17', '01');
      this._mqtt.publish('disable_charge_timer/set', 'PRESS');
    }

    if (entityId && this._hass) {
      const domain = entityId.split('.')[0];
      if (domain === 'button') {
        this._hass.callService('button', 'press', { entity_id: entityId });
      } else {
        this._hass.callService('switch', 'turn_on', { entity_id: entityId });
      }
    }

    this._timerSent = true;
    clearTimeout(this._timerSentTimer);
    this._updateState();
    this._timerSentTimer = setTimeout(() => {
      this._timerSent = false;
      this._updateState();
    }, 2400);
  }

  _handleRestartWifi() {
    const ents = this._resolveEntities();
    const entityId = ents.restart_wifi_entity;

    if (this._config.confirm_wifi_restart !== false && !this._wifiConfirming) {
      this._wifiConfirming = true;
      clearTimeout(this._wifiConfirmTimer);
      this._updateState();
      this._wifiConfirmTimer = setTimeout(() => {
        this._wifiConfirming = false;
        this._updateState();
      }, 3500);
      return;
    }

    this._wifiConfirming = false;
    clearTimeout(this._wifiConfirmTimer);

    if (this._isMqttActive()) {
      this._mqtt.publish('connection', 'restart');
      this._mqtt.publish('restart_wifi/set', 'PRESS');
      this._mqtt.publish('reconnect_wifi/set', 'PRESS');
    }

    if (entityId && this._hass) {
      const domain = entityId.split('.')[0];
      if (domain === 'button') {
        this._hass.callService('button', 'press', { entity_id: entityId });
      } else if (domain === 'script') {
        this._hass.callService('script', 'turn_on', { entity_id: entityId });
      } else {
        this._hass.callService('homeassistant', 'turn_on', { entity_id: entityId });
      }
    }

    this._wifiSent = true;
    clearTimeout(this._wifiSentTimer);
    this._updateState();
    this._wifiSentTimer = setTimeout(() => {
      this._wifiSent = false;
      this._updateState();
    }, 2600);
  }

  _handleCarZoneClick(zone) {
    if (this._config.interactive_car === false) return;
    const ents = this._resolveEntities();
    const isRhd = this._config.steering_side === 'right';
    const flEnt = isRhd ? ents.front_passenger_door_entity : ents.driver_door_entity;
    const frEnt = isRhd ? ents.driver_door_entity : ents.front_passenger_door_entity;

    switch (zone) {
      case 'headlights':
        if (ents.head_lights_entity) this._toggleEntity(ents.head_lights_entity);
        break;
      case 'parklights':
        if (ents.park_lights_entity) this._toggleEntity(ents.park_lights_entity);
        break;
      case 'windscreen':
        if (ents.windscreen_entity) this._toggleEntity(ents.windscreen_entity);
        break;
      case 'cabin':
        this._openMoreInfo(ents.climate_state_entity || ents.interior_lights_entity || ents.locked_entity);
        break;
      case 'bonnet':
        this._openMoreInfo(ents.bonnet_entity);
        break;
      case 'boot':
        this._openMoreInfo(ents.boot_entity);
        break;
      case 'door_fl':
        this._openMoreInfo(flEnt);
        break;
      case 'door_fr':
        this._openMoreInfo(frEnt);
        break;
      case 'door_rl':
        this._openMoreInfo(ents.rear_left_door_entity);
        break;
      case 'door_rr':
        this._openMoreInfo(ents.rear_right_door_entity);
        break;
      case 'charge_port':
        this._openMoreInfo(ents.charging_entity || ents.charger_connected_entity || ents.battery_entity);
        break;
      default:
        break;
    }
  }

  async _ensureSparkline(entityId, pathLineEl, pathAreaEl) {
    if (!entityId || !this._hass || !pathLineEl || !pathAreaEl) return;

    const st = this._getState(entityId);
    // Support inline history array (e.g. demo simulator)
    if (Array.isArray(st?.attributes?.demo_history)) {
      const { line, area } = buildSparklinePaths(st.attributes.demo_history, 160, 34);
      pathLineEl.setAttribute('d', line);
      pathAreaEl.setAttribute('d', area);
      return;
    }

    const cached = this._sparkCache.get(entityId);
    if (cached && Date.now() - cached.ts < 180000) {
      pathLineEl.setAttribute('d', cached.line);
      pathAreaEl.setAttribute('d', cached.area);
      return;
    }

    if (typeof this._hass.callWS !== 'function') return;

    // Prevent concurrent duplicate requests
    this._sparkCache.set(entityId, cached || { ts: Date.now(), line: '', area: '' });
    try {
      const end = new Date();
      const start = new Date(end.getTime() - 24 * 3600 * 1000);
      const res = await this._hass.callWS({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [entityId],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });

      const rawList = res?.[entityId] || [];
      const nums = rawList
        .map((item) => parseFloat(item.s ?? item.state))
        .filter((n) => Number.isFinite(n));

      if (nums.length >= 2) {
        const step = Math.max(1, Math.floor(nums.length / 32));
        const sampled = nums.filter((_, idx) => idx % step === 0 || idx === nums.length - 1);
        const { line, area } = buildSparklinePaths(sampled, 160, 34);
        this._sparkCache.set(entityId, { ts: Date.now(), line, area });
        pathLineEl.setAttribute('d', line);
        pathAreaEl.setAttribute('d', area);
      }
    } catch (_) {
      // Ignore history fetch errors gracefully
    }
  }

  _buildDom() {
    const lang = this._lang();
    const uid = this._uid;

    this.shadowRoot.innerHTML = `
      <style>${CARD_STYLES}</style>
      <ha-card class="ophev-card" id="card-root">
        <div class="ophev-shell">
          <!-- HEADER -->
          <div class="ophev-header">
            <div class="brand-block">
              <div class="mitsu-badge">${ICONS.mitsubishi}</div>
              <div class="title-row">
                <h2 class="card-title" id="hdr-title">Outlander PHEV</h2>
                <div class="conn-pill online" id="hdr-conn-wrap">
                  <span class="conn-dot online" id="hdr-conn-dot"></span>
                  <span class="conn-pill-icon" id="hdr-conn-icon">${ICONS.wifiSync}</span>
                  <span id="hdr-conn-text">${localize(lang, 'connected')}</span>
                </div>
              </div>
            </div>

            <div class="header-pills">
              <!-- Quick Action Extension Buttons: Timers, Diagnostics, Settings -->
              <div class="hdr-actions-wrap">
                <button type="button" class="hdr-action-btn" id="btn-toggle-timers" title="${localize(lang, 'timers_btn')}">
                  ${ICONS.clock}
                  <span>${localize(lang, 'timers_btn')}</span>
                </button>
                <button type="button" class="hdr-action-btn" id="btn-toggle-diag" title="${localize(lang, 'diag_btn')}">
                  ${ICONS.gauge}
                  <span>${localize(lang, 'diag_btn')}</span>
                </button>
                <button type="button" class="hdr-action-btn" id="btn-open-settings" title="${localize(lang, 'settings_btn')}">
                  ${ICONS.cog}
                  <span>${localize(lang, 'settings_btn')}</span>
                </button>
              </div>

              <div class="daily-hdr-badges" id="hdr-daily-wrap" style="display:none">
                <div class="daily-hdr-badge" id="hdr-daily-energy" style="display:none">
                  <div class="daily-hdr-icon">${ICONS.counter}</div>
                  <div class="daily-hdr-copy">
                    <span class="daily-hdr-lbl" id="lbl-hdr-daily-energy">${localize(lang, 'daily_charge_short')}</span>
                    <span class="daily-hdr-val" id="val-hdr-daily-energy">--</span>
                  </div>
                </div>
                <div class="daily-hdr-badge" id="hdr-daily-time" style="display:none">
                  <div class="daily-hdr-icon">${ICONS.batteryClock}</div>
                  <div class="daily-hdr-copy">
                    <span class="daily-hdr-lbl" id="lbl-hdr-daily-time">${localize(lang, 'daily_charge_short')}</span>
                    <span class="daily-hdr-val" id="val-hdr-daily-time">--</span>
                  </div>
                </div>
              </div>
              <div class="status-pill ok" id="pill-lock" title="Locked">
                <span id="pill-lock-icon">${ICONS.lockClosed}</span>
                <span id="pill-lock-text">${localize(lang, 'locked')}</span>
              </div>
              <div class="status-pill" id="pill-doors">
                ${ICONS.door}
                <span id="pill-doors-text">${localize(lang, 'doors_all_closed')}</span>
              </div>
            </div>
          </div>

          <!-- BODY -->
          <div class="ophev-body layout-auto" id="body-grid">
            <!-- LEFT: TOP-DOWN INTERACTIVE OUTLANDER STAGE -->
            <div class="car-stage-card is-locked interactive" id="car-stage">
              <div class="car-svg-wrap" id="car-svg-container">
                ${renderOutlanderSvg(uid)}
              </div>

              <!-- Floating Glassmorphic Sleep / Offline HUD Card -->
              <div class="offline-hud-card" id="offline-hud-card">
                <div class="offline-radar-wrap">
                  <span class="offline-radar-ring r1"></span>
                  <span class="offline-radar-ring r2"></span>
                  ${ICONS.wifiOff}
                </div>
                <div class="offline-hud-title">${localize(lang, 'offline_hud_title')}</div>
                <div class="offline-hud-sub" id="offline-hud-sub">${localize(lang, 'offline_hud_desc')}</div>
                <button type="button" class="offline-reconnect-btn" id="btn-offline-reconnect">
                  ${ICONS.wifiSync}
                  <span id="txt-offline-reconnect">${localize(lang, 'offline_reconnect_btn')}</span>
                </button>
              </div>

              <div class="door-chips-row" id="door-chips">
                <span class="door-chip" data-door="bonnet" id="chip-bonnet">${localize(lang, 'bonnet_short')}</span>
                <span class="door-chip" data-door="fl" id="chip-fl">${localize(lang, 'fl_short')}</span>
                <span class="door-chip" data-door="fr" id="chip-fr">${localize(lang, 'fr_short')}</span>
                <span class="door-chip" data-door="rl" id="chip-rl">${localize(lang, 'rl_short')}</span>
                <span class="door-chip" data-door="rr" id="chip-rr">${localize(lang, 'rr_short')}</span>
                <span class="door-chip" data-door="boot" id="chip-boot">${localize(lang, 'boot_short')}</span>
              </div>
            </div>

            <!-- RIGHT: TELEMETRY & CONTROLS -->
            <div class="ophev-controls-col">
              <!-- 1. BATTERY & CHARGING PANEL -->
              <div class="hud-panel">
                <div class="panel-head">
                  <span class="panel-label">${localize(lang, 'battery_title')}</span>
                  <span class="ev-range-pill phev-dep" id="ev-range-badge">~40 km EV</span>
                </div>

                <div class="battery-hero phev-dep">
                  <div class="soc-big" id="soc-hero"><span id="soc-num">88</span><span class="unit">%</span></div>
                  <div style="text-align:right" id="charge-eta-box">
                    <div style="font-size:0.72rem;color:var(--ophev-muted)" id="eta-label">${localize(lang, 'remaining_time')}</div>
                    <div style="font-size:0.86rem;font-weight:700;color:#e2e8f0" id="eta-value">0 ${localize(lang, 'min_short')}</div>
                  </div>
                </div>

                <div class="soc-bar-track phev-dep" id="soc-bar-track">
                  <div class="soc-bar-fill" id="soc-bar-fill" style="width:88%"></div>
                </div>

                <div class="charge-banner phev-dep" id="charge-banner" style="cursor:pointer">
                  <div class="charge-state-left">
                    <div class="charge-icon-box" id="charge-icon-box">${ICONS.plugOff}</div>
                    <div>
                      <div class="charge-state-title" id="charge-title">${localize(lang, 'charger_unplugged')}</div>
                      <div class="charge-state-sub" id="charge-sub">${localize(lang, 'estimated_finish')}: --</div>
                    </div>
                  </div>
                </div>

                <!-- Optional Daily Charge Energy (kWh/kW) & Duration (h/min) Highlight Cards -->
                <div class="daily-panel-grid" id="panel-daily-wrap" style="display:none">
                  <div class="daily-panel-tile" id="tile-daily-energy" style="display:none">
                    <div class="daily-tile-icon">${ICONS.counter}</div>
                    <div class="daily-tile-copy">
                      <div class="daily-tile-lbl" id="lbl-panel-daily-energy">${localize(lang, 'daily_charge_energy')}</div>
                      <div class="daily-tile-val" id="val-panel-daily-energy">--</div>
                    </div>
                  </div>
                  <div class="daily-panel-tile" id="tile-daily-time" style="display:none">
                    <div class="daily-tile-icon">${ICONS.batteryClock}</div>
                    <div class="daily-tile-copy">
                      <div class="daily-tile-lbl" id="lbl-panel-daily-time">${localize(lang, 'daily_charge_time')}</div>
                      <div class="daily-tile-val" id="val-panel-daily-time">--</div>
                    </div>
                  </div>
                </div>

                <!-- Optional External Power & Energy Sparkline Tiles -->
                <div class="ext-meters-grid" id="ext-meters" style="display:none">
                  <div class="meter-tile" id="tile-power" style="display:none">
                    <div class="meter-top">
                      <span>${localize(lang, 'charger_power')}</span>
                      <span style="color:#fb923c">⚡</span>
                    </div>
                    <div class="meter-val"><strong id="val-power">0</strong><span id="unit-power">W</span></div>
                    <svg class="meter-spark" viewBox="0 0 160 34" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="${uid}-spark-p" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#f97316" stop-opacity="0.42"/>
                          <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                      <path id="spark-power-area" fill="url(#${uid}-spark-p)" d="M0,34 L0,30 L160,30 L160,34 Z"/>
                      <path id="spark-power-line" fill="none" stroke="#f97316" stroke-width="2" d="M0,30 L160,30"/>
                    </svg>
                  </div>

                  <div class="meter-tile" id="tile-energy" style="display:none">
                    <div class="meter-top">
                      <span>${localize(lang, 'charger_energy')}</span>
                      <span style="color:#38bdf8">⚡</span>
                    </div>
                    <div class="meter-val"><strong id="val-energy">0</strong><span id="unit-energy">kWh</span></div>
                    <svg class="meter-spark" viewBox="0 0 160 34" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="${uid}-spark-e" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.42"/>
                          <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
                        </linearGradient>
                      </defs>
                      <path id="spark-energy-area" fill="url(#${uid}-spark-e)" d="M0,34 L0,30 L160,30 L160,34 Z"/>
                      <path id="spark-energy-line" fill="none" stroke="#0ea5e9" stroke-width="2" d="M0,30 L160,30"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- 2. CLIMATE PRE-CONDITIONING PANEL -->
              <div class="hud-panel">
                <div class="panel-head">
                  <span class="panel-label">${localize(lang, 'climate_title')}</span>
                  <span class="climate-badge" id="climate-badge">${localize(lang, 'climate_off')}</span>
                </div>

                <div class="btn-grid-3 phev-dep">
                  <button type="button" class="ctrl-btn" id="btn-cool">
                    ${ICONS.cool}
                    <span class="ctrl-btn-text">${localize(lang, 'cool_btn')}</span>
                  </button>
                  <button type="button" class="ctrl-btn" id="btn-heat">
                    ${ICONS.heat}
                    <span class="ctrl-btn-text">${localize(lang, 'heat_btn')}</span>
                  </button>
                  <button type="button" class="ctrl-btn" id="btn-windscreen">
                    ${ICONS.windscreen}
                    <span class="ctrl-btn-text">${localize(lang, 'windscreen_btn')}</span>
                  </button>
                </div>

                <!-- Climate Telemetry Readouts (Remaining Time & Est. Stop Time) -->
                <div class="climate-telemetry-row phev-dep" id="climate-telemetry-row">
                  <div class="climate-telemetry-tile" id="tile-climate-remaining">
                    <div class="climate-telemetry-icon">${ICONS.timer}</div>
                    <div class="climate-telemetry-content">
                      <span class="climate-telemetry-lbl">${localize(lang, 'climate_remaining')}</span>
                      <span class="climate-telemetry-val" id="val-climate-remaining">--</span>
                    </div>
                  </div>
                  <div class="climate-telemetry-tile" id="tile-climate-stop">
                    <div class="climate-telemetry-icon">${ICONS.clock}</div>
                    <div class="climate-telemetry-content">
                      <span class="climate-telemetry-lbl">${localize(lang, 'climate_stop_time')}</span>
                      <span class="climate-telemetry-val" id="val-climate-stop">--:--</span>
                    </div>
                  </div>
                </div>

                <!-- Climate Parameters: Duration & Start Delay -->
                <div class="climate-params-grid phev-dep" id="climate-params-wrap" style="display:none">
                  <div class="climate-param-tile" id="param-tile-duration">
                    <div class="climate-param-header">
                      <span class="climate-param-icon">${ICONS.hourglass}</span>
                      <span class="climate-param-lbl">${localize(lang, 'climate_duration')}</span>
                    </div>
                    <div class="climate-param-control">
                      <select class="climate-param-select" id="sel-climate-duration" title="${localize(lang, 'climate_duration')}"></select>
                      <span class="climate-select-chevron">▾</span>
                    </div>
                  </div>

                  <div class="climate-param-tile" id="param-tile-delay">
                    <div class="climate-param-header">
                      <span class="climate-param-icon">${ICONS.clockDelay}</span>
                      <span class="climate-param-lbl">${localize(lang, 'climate_delay')}</span>
                    </div>
                    <div class="climate-param-control">
                      <select class="climate-param-select" id="sel-climate-delay" title="${localize(lang, 'climate_delay')}"></select>
                      <span class="climate-select-chevron">▾</span>
                    </div>
                  </div>
                </div>

                <div class="climate-select-row phev-dep" id="climate-select-wrap" style="display:none">
                  <select class="climate-select" id="sel-climate-mode"></select>
                </div>
              </div>

              <!-- 3. LIGHTS & SYSTEM CONTROLS PANEL -->
              <div class="hud-panel">
                <div class="panel-head">
                  <span class="panel-label">${localize(lang, 'lights_system_title')}</span>
                </div>

                <div class="btn-grid-2">
                  <button type="button" class="ctrl-btn row-btn phev-dep" id="btn-headlights">
                    ${ICONS.headlight}
                    <div>
                      <div class="ctrl-btn-text">${localize(lang, 'head_lights')}</div>
                      <div class="ctrl-btn-sub" id="sub-headlights">${localize(lang, 'light_off')}</div>
                    </div>
                  </button>

                  <button type="button" class="ctrl-btn row-btn phev-dep" id="btn-parklights">
                    ${ICONS.parklight}
                    <div>
                      <div class="ctrl-btn-text">${localize(lang, 'park_lights')}</div>
                      <div class="ctrl-btn-sub" id="sub-parklights">${localize(lang, 'light_off')}</div>
                    </div>
                  </button>

                  <button type="button" class="ctrl-btn row-btn phev-dep" id="btn-disable-timer">
                    ${ICONS.timerOff}
                    <div>
                      <div class="ctrl-btn-text" id="txt-disable-timer">${localize(lang, 'disable_timer')}</div>
                      <div class="ctrl-btn-sub">${localize(lang, 'disable_timer_sub')}</div>
                    </div>
                  </button>

                  <button type="button" class="ctrl-btn row-btn" id="btn-restart-wifi">
                    ${ICONS.wifiSync}
                    <div>
                      <div class="ctrl-btn-text" id="txt-restart-wifi">${localize(lang, 'restart_wifi')}</div>
                      <div class="ctrl-btn-sub" id="sub-restart-wifi">phev2mqtt</div>
                    </div>
                  </button>
                </div>

                <div class="aux-sensors-row">
                  <div class="mini-ind phev-dep" id="ind-hazard">
                    ${ICONS.hazard}
                    <span>${localize(lang, 'hazard_lights')}: <strong id="val-hazard">${localize(lang, 'inactive')}</strong></span>
                  </div>
                  <div class="mini-ind phev-dep" id="ind-interior">
                    ${ICONS.bulb}
                    <span>${localize(lang, 'interior_lights')}: <strong id="val-interior">${localize(lang, 'inactive')}</strong></span>
                  </div>
                  <button type="button" class="drawer-toggle" id="btn-drawer-toggle">
                    <span id="txt-drawer-toggle">${localize(lang, 'show_details')}</span> ▾
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TIMERS PANEL -->
          <!-- COLLAPSIBLE ALL-SENSORS DRAWER -->
          <div class="sensors-drawer" id="sensors-drawer"></div>
        </div>

        <!-- TIMERS POPUP MODAL -->
        <div class="ophev-modal-backdrop" id="modal-timers">
          <div class="ophev-modal-card">
            <div class="modal-head">
              <div class="modal-title-group">
                <h3 class="modal-title">${ICONS.clock} ${localize(lang, 'timers_title')}</h3>
                <p class="modal-sub">${localize(lang, 'timers_sub')}</p>
              </div>
              <div class="modal-head-btns">
                <div class="subtabs-bar">
                  <button type="button" class="subtab-btn active" id="btn-subtab-climate">
                    ${ICONS.cool}
                    <span>${localize(lang, 'climate_tab')}</span>
                  </button>
                  <button type="button" class="subtab-btn" id="btn-subtab-charge">
                    ${ICONS.bolt}
                    <span>${localize(lang, 'charge_tab')}</span>
                  </button>
                </div>
                <button type="button" class="modal-btn-close" id="btn-timers-close" title="${localize(lang, 'close')}">
                  ${ICONS.close}
                </button>
              </div>
            </div>

            <div class="modal-body">
              <!-- Master Schedule Banner -->
              <div class="timer-master-banner" id="timer-master-banner">
                <div class="timer-master-left">
                  <span id="timer-master-icon">${ICONS.clock}</span>
                  <span class="timer-master-text" id="timer-master-text">${localize(lang, 'climate_timer_master')}</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;">
                  <select class="setting-select" id="sel-timer-master-mode" style="display:none;width:auto;padding:4px 8px;font-size:0.75rem;"></select>
                  <button type="button" class="hdr-action-btn" id="btn-toggle-master-timer" style="padding:4px 10px;">
                    <span id="txt-toggle-master-timer">${localize(lang, 'timer_enabled')}</span>
                  </button>
                </div>
              </div>

              <!-- Slots pills (1..5) -->
              <div class="slots-bar" id="timer-slots-bar"></div>

              <!-- Active Slot Editor Card -->
              <div class="timer-editor-card" id="timer-editor-card"></div>
            </div>
          </div>
        </div>

        <!-- DIAGNOSTICS POPUP MODAL -->
        <div class="ophev-modal-backdrop" id="modal-diag">
          <div class="ophev-modal-card">
            <div class="modal-head">
              <div class="modal-title-group">
                <h3 class="modal-title">${ICONS.gauge} ${localize(lang, 'diag_title')}</h3>
                <p class="modal-sub">${localize(lang, 'diag_sub')}</p>
              </div>
              <div class="modal-head-btns">
                <button type="button" class="diag-action-btn" id="btn-diag-locate" title="${localize(lang, 'locate_car_btn')}">
                  ${ICONS.bulb}
                  <span>${localize(lang, 'locate_car')}</span>
                </button>
                <button type="button" class="diag-action-btn" id="btn-diag-sync-clock" title="${localize(lang, 'car_clock_sync_btn')}">
                  ${ICONS.refresh}
                  <span>${localize(lang, 'sync_clock')}</span>
                </button>
                <button type="button" class="modal-btn-close" id="btn-diag-close" title="${localize(lang, 'close')}">
                  ${ICONS.close}
                </button>
              </div>
            </div>

            <div class="modal-body">
              <div class="diag-grid">
                <!-- 1. Ignition & Security -->
                <div class="diag-card">
                  <div class="diag-card-top">
                    <span class="diag-card-title">${ICONS.key} ${localize(lang, 'ignition_title')}</span>
                    <span class="ignition-badge off" id="diag-ignition-badge">OFF</span>
                  </div>
                  <div class="alarm-banner disarmed" id="diag-alarm-banner">
                    <span id="diag-alarm-text">${localize(lang, 'alarm_disarmed')}</span>
                    <button type="button" class="modal-btn-reset" id="btn-clear-alarm" style="display:none;padding:3px 8px;font-size:0.7rem;">
                      ${localize(lang, 'clear_alarm')}
                    </button>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'theft_alarm')}</span>
                    <span class="diag-row-val" id="diag-alarm-val">--</span>
                  </div>
                  <div class="diag-row" id="diag-last-alarm-row" style="display:none;">
                    <span class="diag-row-lbl">${localize(lang, 'alarm_last_event')}</span>
                    <span class="diag-row-val" id="diag-last-alarm-val">--</span>
                  </div>
                </div>

                <!-- 2. Car Clock & Wi-Fi Telemetry -->
                <div class="diag-card">
                  <div class="diag-card-top">
                    <span class="diag-card-title">${ICONS.clock} ${localize(lang, 'clock_title')}</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'car_clock')}</span>
                    <span class="diag-row-val" id="diag-clock-val">--:--:--</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'wifi_channel')}</span>
                    <span class="diag-row-val" id="diag-wifi-channel-val">--</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'wifi_always_on')}</span>
                    <span class="diag-row-val" id="diag-wifi-always-val">--</span>
                  </div>
                </div>

                <!-- 3. Battery Health & Warming -->
                <div class="diag-card">
                  <div class="diag-card-top">
                    <span class="diag-card-title">${ICONS.bolt} ${localize(lang, 'thermal_title')}</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'batt_thermal_state')}</span>
                    <span class="diag-row-val" id="diag-thermal-val">--</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'batt_warming')}</span>
                    <span class="diag-row-val" id="diag-warming-val">--</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'batt_warning_active')}</span>
                    <span class="diag-row-val" id="diag-warning-val">--</span>
                  </div>
                </div>

                <!-- 4. Vehicle Specs & VIN -->
                <div class="diag-card">
                  <div class="diag-card-top">
                    <span class="diag-card-title">${ICONS.mitsubishi} ${localize(lang, 'vehicle_specs')}</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'vin')}</span>
                    <span class="diag-row-val" id="diag-vin-val" style="font-family:monospace;font-size:0.7rem;">--</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'firmware_version')}</span>
                    <span class="diag-row-val" id="diag-firmware-val">--</span>
                  </div>
                  <div class="diag-row">
                    <span class="diag-row-lbl">${localize(lang, 'registered_phones')}</span>
                    <span class="diag-row-val" id="diag-phones-val">--</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SETTINGS POPUP MODAL (ETACS & AC CUSTOMIZATION) -->
        <div class="settings-modal-backdrop" id="modal-settings">
          <div class="settings-modal-card">
            <div class="modal-head">
              <div class="modal-title-group">
                <h3 class="modal-title">${localize(lang, 'settings_title')}</h3>
                <p class="modal-sub" id="settings-modal-sub">${localize(lang, 'settings_sub')}</p>
              </div>
              <div class="modal-head-btns">
                <button type="button" class="modal-btn-reset" id="btn-settings-factory-reset">
                  ${localize(lang, 'settings_reset_all')}
                </button>
                <button type="button" class="modal-btn-close" id="btn-settings-close" title="${localize(lang, 'close')}">
                  ${ICONS.close}
                </button>
              </div>
            </div>

            <div class="modal-controls-bar">
              <input type="text" class="modal-search-input" id="input-settings-search" placeholder="${localize(lang, 'settings_search')}..." />
              <div class="cat-chips-bar" id="settings-cat-chips"></div>
            </div>

            <div class="modal-body" id="settings-modal-list"></div>
          </div>
        </div>
      </ha-card>
    `;

    const q = (id) => this.shadowRoot.getElementById(id);
    this.$ = {
      card: q('card-root'),
      hdrTitle: q('hdr-title'),
      hdrConnWrap: q('hdr-conn-wrap'),
      hdrConnDot: q('hdr-conn-dot'),
      hdrConnIcon: q('hdr-conn-icon'),
      hdrConnText: q('hdr-conn-text'),
      btnToggleTimers: q('btn-toggle-timers'),
      btnToggleDiag: q('btn-toggle-diag'),
      btnOpenSettings: q('btn-open-settings'),
      hdrDailyWrap: q('hdr-daily-wrap'),
      hdrDailyEnergy: q('hdr-daily-energy'),
      lblHdrDailyEnergy: q('lbl-hdr-daily-energy'),
      valHdrDailyEnergy: q('val-hdr-daily-energy'),
      hdrDailyTime: q('hdr-daily-time'),
      lblHdrDailyTime: q('lbl-hdr-daily-time'),
      valHdrDailyTime: q('val-hdr-daily-time'),
      pillLock: q('pill-lock'),
      pillLockIcon: q('pill-lock-icon'),
      pillLockText: q('pill-lock-text'),
      pillDoors: q('pill-doors'),
      pillDoorsText: q('pill-doors-text'),
      bodyGrid: q('body-grid'),
      carStage: q('car-stage'),
      offlineHudCard: q('offline-hud-card'),
      offlineHudSub: q('offline-hud-sub'),
      btnOfflineReconnect: q('btn-offline-reconnect'),
      txtOfflineReconnect: q('txt-offline-reconnect'),
      svgBattClipRect: this.shadowRoot.querySelector('.svg-batt-clip-rect'),
      svgBattHorizon: this.shadowRoot.querySelector('.svg-batt-horizon-group'),
      svgBattMarker: this.shadowRoot.querySelector('.svg-batt-marker'),
      svgBattMarkerText: this.shadowRoot.querySelector('.svg-batt-marker-text'),
      chipBonnet: q('chip-bonnet'),
      chipFl: q('chip-fl'),
      chipFr: q('chip-fr'),
      chipRl: q('chip-rl'),
      chipRr: q('chip-rr'),
      chipBoot: q('chip-boot'),
      evRangeBadge: q('ev-range-badge'),
      socHero: q('soc-hero'),
      socNum: q('soc-num'),
      etaValue: q('eta-value'),
      socBarTrack: q('soc-bar-track'),
      socBarFill: q('soc-bar-fill'),
      chargeBanner: q('charge-banner'),
      chargeIconBox: q('charge-icon-box'),
      chargeTitle: q('charge-title'),
      chargeSub: q('charge-sub'),
      panelDailyWrap: q('panel-daily-wrap'),
      tileDailyEnergy: q('tile-daily-energy'),
      lblPanelDailyEnergy: q('lbl-panel-daily-energy'),
      valPanelDailyEnergy: q('val-panel-daily-energy'),
      tileDailyTime: q('tile-daily-time'),
      lblPanelDailyTime: q('lbl-panel-daily-time'),
      valPanelDailyTime: q('val-panel-daily-time'),
      extMeters: q('ext-meters'),
      tilePower: q('tile-power'),
      valPower: q('val-power'),
      unitPower: q('unit-power'),
      sparkPowerArea: q('spark-power-area'),
      sparkPowerLine: q('spark-power-line'),
      tileEnergy: q('tile-energy'),
      valEnergy: q('val-energy'),
      unitEnergy: q('unit-energy'),
      sparkEnergyArea: q('spark-energy-area'),
      sparkEnergyLine: q('spark-energy-line'),
      climateBadge: q('climate-badge'),
      btnCool: q('btn-cool'),
      btnHeat: q('btn-heat'),
      btnWindscreen: q('btn-windscreen'),
      climateTelemetryRow: q('climate-telemetry-row'),
      tileClimateRemaining: q('tile-climate-remaining'),
      valClimateRemaining: q('val-climate-remaining'),
      tileClimateStop: q('tile-climate-stop'),
      valClimateStop: q('val-climate-stop'),
      climateParamsWrap: q('climate-params-wrap'),
      paramTileDuration: q('param-tile-duration'),
      selClimateDuration: q('sel-climate-duration'),
      paramTileDelay: q('param-tile-delay'),
      selClimateDelay: q('sel-climate-delay'),
      climateSelectWrap: q('climate-select-wrap'),
      selClimateMode: q('sel-climate-mode'),
      btnHeadlights: q('btn-headlights'),
      subHeadlights: q('sub-headlights'),
      btnParklights: q('btn-parklights'),
      subParklights: q('sub-parklights'),
      btnDisableTimer: q('btn-disable-timer'),
      txtDisableTimer: q('txt-disable-timer'),
      btnRestartWifi: q('btn-restart-wifi'),
      txtRestartWifi: q('txt-restart-wifi'),
      subRestartWifi: q('sub-restart-wifi'),
      indHazard: q('ind-hazard'),
      valHazard: q('val-hazard'),
      indInterior: q('ind-interior'),
      valInterior: q('val-interior'),
      btnDrawerToggle: q('btn-drawer-toggle'),
      txtDrawerToggle: q('txt-drawer-toggle'),
      sensorsDrawer: q('sensors-drawer'),
      modalTimers: q('modal-timers'),
      btnTimersClose: q('btn-timers-close'),
      btnSubtabClimate: q('btn-subtab-climate'),
      btnSubtabCharge: q('btn-subtab-charge'),
      timerMasterBanner: q('timer-master-banner'),
      timerMasterText: q('timer-master-text'),
      selTimerMasterMode: q('sel-timer-master-mode'),
      btnToggleMasterTimer: q('btn-toggle-master-timer'),
      txtToggleMasterTimer: q('txt-toggle-master-timer'),
      timerSlotsBar: q('timer-slots-bar'),
      timerEditorCard: q('timer-editor-card'),
      modalDiag: q('modal-diag'),
      btnDiagClose: q('btn-diag-close'),
      btnDiagLocate: q('btn-diag-locate'),
      btnDiagSyncClock: q('btn-diag-sync-clock'),
      diagIgnitionBadge: q('diag-ignition-badge'),
      diagAlarmBanner: q('diag-alarm-banner'),
      diagAlarmText: q('diag-alarm-text'),
      btnClearAlarm: q('btn-clear-alarm'),
      diagAlarmVal: q('diag-alarm-val'),
      diagLastAlarmRow: q('diag-last-alarm-row'),
      diagLastAlarmVal: q('diag-last-alarm-val'),
      diagClockVal: q('diag-clock-val'),
      diagWifiChannelVal: q('diag-wifi-channel-val'),
      diagWifiAlwaysVal: q('diag-wifi-always-val'),
      diagThermalVal: q('diag-thermal-val'),
      diagWarmingVal: q('diag-warming-val'),
      diagWarningVal: q('diag-warning-val'),
      diagVinVal: q('diag-vin-val'),
      diagFirmwareVal: q('diag-firmware-val'),
      diagPhonesVal: q('diag-phones-val'),
      modalSettings: q('modal-settings'),
      btnSettingsClose: q('btn-settings-close'),
      btnSettingsFactoryReset: q('btn-settings-factory-reset'),
      inputSettingsSearch: q('input-settings-search'),
      settingsCatChips: q('settings-cat-chips'),
      settingsModalList: q('settings-modal-list'),
    };

    this._attachListeners();
  }

  _attachListeners() {
    const $ = this.$;
    const ents = () => this._resolveEntities();

    $.hdrConnWrap.addEventListener('click', () => this._openMoreInfo(ents().connected_entity));
    $.hdrDailyEnergy.addEventListener('click', () => this._openMoreInfo(ents().daily_charge_energy_entity));
    $.hdrDailyTime.addEventListener('click', () => this._openMoreInfo(ents().daily_charge_time_entity));
    $.pillLock.addEventListener('click', () => {
      const lockEnt = ents().locked_entity;
      if (!lockEnt) return;
      if (lockEnt.startsWith('lock.') && this._hass) {
        const locked = isCarLocked(this._getState(lockEnt), this._config.invert_lock);
        this._hass.callService('lock', locked ? 'unlock' : 'lock', { entity_id: lockEnt });
      } else {
        this._openMoreInfo(lockEnt);
      }
    });

    $.pillDoors.addEventListener('click', () => {
      this._drawerOpen = !this._drawerOpen;
      this._updateState();
    });

    $.socHero.addEventListener('click', () => this._openMoreInfo(ents().battery_entity));
    $.socBarTrack.addEventListener('click', () => this._openMoreInfo(ents().battery_entity));
    $.chargeBanner.addEventListener('click', () =>
      this._openMoreInfo(ents().charging_entity || ents().charger_connected_entity || ents().charge_remaining_entity)
    );
    $.tileDailyEnergy.addEventListener('click', () => this._openMoreInfo(ents().daily_charge_energy_entity));
    $.tileDailyTime.addEventListener('click', () => this._openMoreInfo(ents().daily_charge_time_entity));
    $.tilePower.addEventListener('click', () => this._openMoreInfo(ents().charger_power_entity));
    $.tileEnergy.addEventListener('click', () => this._openMoreInfo(ents().charger_energy_entity));

    $.btnCool.addEventListener('click', () => this._toggleEntity(ents().cool_entity));
    $.btnHeat.addEventListener('click', () => this._toggleEntity(ents().heat_entity));
    $.btnWindscreen.addEventListener('click', () => this._toggleEntity(ents().windscreen_entity));

    $.tileClimateRemaining.addEventListener('click', () => {
      const e = ents().climate_remaining_entity;
      if (e) this._openMoreInfo(e);
    });
    $.tileClimateStop.addEventListener('click', () => {
      const e = ents().climate_stop_time_entity;
      if (e) this._openMoreInfo(e);
    });

    $.selClimateMode.addEventListener('change', (e) => {
      const selEnt = ents().climate_state_entity;
      const option = e.target.value;
      if (!selEnt || !option || !this._hass) return;
      const dom = selEnt.split('.')[0];
      if (dom === 'select' || dom === 'input_select') {
        this._hass.callService(dom, 'select_option', { entity_id: selEnt, option });
      }
    });

    $.selClimateDuration.addEventListener('change', (e) => {
      const durEnt = ents().climate_duration_min_entity;
      const option = e.target.value;
      if (this._isMqttActive()) {
        this._mqtt.state.climate.duration = String(option);
        this._mqtt.publish('set/climate/duration', String(option));
        this._mqtt.publish('climate_duration_min/set', String(option));
      }
      if (durEnt && option && this._hass) {
        const dom = durEnt.split('.')[0];
        if (dom === 'select' || dom === 'input_select') {
          this._hass.callService(dom, 'select_option', { entity_id: durEnt, option });
        }
      }
    });

    $.selClimateDelay.addEventListener('change', (e) => {
      const delayEnt = ents().climate_start_delay_min_entity;
      const option = e.target.value;
      if (this._isMqttActive()) {
        this._mqtt.state.climate.delay = String(option);
        this._mqtt.publish('set/climate/delay', String(option));
        this._mqtt.publish('climate_start_delay_min/set', String(option));
      }
      if (delayEnt && option && this._hass) {
        const dom = delayEnt.split('.')[0];
        if (dom === 'select' || dom === 'input_select') {
          this._hass.callService(dom, 'select_option', { entity_id: delayEnt, option });
        }
      }
    });

    $.btnHeadlights.addEventListener('click', () => this._toggleEntity(ents().head_lights_entity));
    $.btnParklights.addEventListener('click', () => this._toggleEntity(ents().park_lights_entity));
    $.btnDisableTimer.addEventListener('click', () => this._handleDisableTimer());
    $.btnRestartWifi.addEventListener('click', () => this._handleRestartWifi());
    $.btnOfflineReconnect.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this._handleRestartWifi();
    });

    $.indHazard.addEventListener('click', () => {
      const hEnt = ents().hazard_lights_entity;
      if (!hEnt) return;
      const dom = hEnt.split('.')[0];
      if (dom === 'switch' || dom === 'light') {
        this._toggleEntity(hEnt);
      } else {
        this._openMoreInfo(hEnt);
      }
    });

    $.indInterior.addEventListener('click', () => this._openMoreInfo(ents().interior_lights_entity));

    $.btnDrawerToggle.addEventListener('click', () => {
      this._drawerOpen = !this._drawerOpen;
      this._updateState();
    });

    // Interactive SVG Car Zones
    this.shadowRoot.querySelectorAll('.car-hit-zone').forEach((zoneEl) => {
      zoneEl.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this._handleCarZoneClick(zoneEl.dataset.zone);
      });
    });

    // Door chips at bottom of Car Stage
    this.shadowRoot.getElementById('door-chips')?.addEventListener('click', (ev) => {
      const chip = ev.target.closest('.door-chip');
      if (!chip) return;
      const eMap = ents();
      const isRhd = this._config.steering_side === 'right';
      const map = {
        bonnet: eMap.bonnet_entity,
        boot: eMap.boot_entity,
        fl: isRhd ? eMap.front_passenger_door_entity : eMap.driver_door_entity,
        fr: isRhd ? eMap.driver_door_entity : eMap.front_passenger_door_entity,
        rl: eMap.rear_left_door_entity,
        rr: eMap.rear_right_door_entity,
      };
      this._openMoreInfo(map[chip.dataset.door]);
    });

    // Header Extension Action Buttons
    $.btnToggleTimers.addEventListener('click', () => {
      this._timersModalOpen = !this._timersModalOpen;
      this._diagModalOpen = false;
      this._settingsModalOpen = false;
      this._updateState();
    });

    $.btnToggleDiag.addEventListener('click', () => {
      this._diagModalOpen = !this._diagModalOpen;
      this._timersModalOpen = false;
      this._settingsModalOpen = false;
      this._updateState();
    });

    $.btnOpenSettings.addEventListener('click', () => {
      this._settingsModalOpen = !this._settingsModalOpen;
      this._timersModalOpen = false;
      this._diagModalOpen = false;
      this._updateState();
    });

    // Timers Modal Listeners
    $.btnTimersClose?.addEventListener('click', () => {
      this._timersModalOpen = false;
      this._updateState();
    });

    $.modalTimers?.addEventListener('click', (ev) => {
      if (ev.target === $.modalTimers) {
        this._timersModalOpen = false;
        this._updateState();
      }
    });

    // Diagnostics Modal Listeners
    $.btnDiagClose?.addEventListener('click', () => {
      this._diagModalOpen = false;
      this._updateState();
    });

    $.modalDiag?.addEventListener('click', (ev) => {
      if (ev.target === $.modalDiag) {
        this._diagModalOpen = false;
        this._updateState();
      }
    });

    // Settings Modal Listeners
    $.btnSettingsClose.addEventListener('click', () => {
      this._settingsModalOpen = false;
      this._updateState();
    });

    $.modalSettings.addEventListener('click', (ev) => {
      if (ev.target === $.modalSettings) {
        this._settingsModalOpen = false;
        this._updateState();
      }
    });

    // Global Escape Key to close open modal
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && (this._timersModalOpen || this._diagModalOpen || this._settingsModalOpen)) {
        this._timersModalOpen = false;
        this._diagModalOpen = false;
        this._settingsModalOpen = false;
        this._updateState();
      }
    });

    $.inputSettingsSearch.addEventListener('input', (ev) => {
      this._settingsSearchTerm = ev.target.value.toLowerCase().trim();
      this._renderSettingsList();
    });

    $.btnSettingsFactoryReset.addEventListener('click', () => {
      const lang = this._lang();
      if (!window.confirm(localize(lang, 'settings_reset_confirm'))) return;
      if (!this._hass) return;
      const resetEnt = Object.keys(this._hass.states).find(
        (id) => id.includes('restore_factory') || id.includes('factory_reset')
      );
      if (resetEnt) {
        const dom = resetEnt.split('.')[0];
        if (dom === 'button') this._hass.callService('button', 'press', { entity_id: resetEnt });
        else this._hass.callService('switch', 'turn_on', { entity_id: resetEnt });
      } else {
        const settings = getPhevCustomizationSettings(this._hass, lang);
        for (const s of settings) {
          if (s.options && s.options.length > 0) {
            this._hass.callService('select', 'select_option', { entity_id: s.entity_id, option: s.options[0] });
          }
        }
      }
    });

    $.settingsCatChips.addEventListener('click', (ev) => {
      const chip = ev.target.closest('.cat-chip');
      if (!chip) return;
      this._settingsCategoryFilter = chip.dataset.cat;
      this._renderSettingsChips();
      this._renderSettingsList();
    });

    // Timers Panel Listeners
    $.btnSubtabClimate.addEventListener('click', () => {
      this._activeTimerSubtab = 'climate';
      this._updateTimersPanel();
    });

    $.btnSubtabCharge.addEventListener('click', () => {
      this._activeTimerSubtab = 'charge';
      this._updateTimersPanel();
    });

    $.btnToggleMasterTimer.addEventListener('click', () => {
      const e = this._resolveEntities();
      if (this._activeTimerSubtab === 'climate') {
        if (e.climate_timer_master_entity) {
          this._toggleEntity(e.climate_timer_master_entity);
        }
        if (this._isMqttActive()) {
          const cur = Boolean(this._mqttManager?.state?.timers?.climateMaster);
          this._mqttManager?.setClimateTimerMaster(!cur);
        }
      }
    });

    $.selTimerMasterMode.addEventListener('change', (ev) => {
      const e = this._resolveEntities();
      const opt = ev.target.value;
      if (e.climate_timer_mode_entity && this._hass) {
        this._hass.callService('select', 'select_option', {
          entity_id: e.climate_timer_mode_entity,
          option: opt,
        });
      }
      if (this._isMqttActive()) {
        this._mqtt.publish('set/climate/timer/mode', opt);
        this._mqtt.publish('climate_timer_mode/set', opt);
        if (this._mqttManager?.state?.timers) {
          this._mqttManager.state.timers.climateMode = opt;
        }
      }
    });

    $.timerSlotsBar.addEventListener('click', (ev) => {
      const pill = ev.target.closest('.slot-pill');
      if (!pill) return;
      const slot = Number(pill.dataset.slot) || 1;
      if (this._activeTimerSubtab === 'climate') {
        this._activeClimateSlot = slot;
      } else {
        this._activeChargeSlot = slot;
      }
      this._updateTimersPanel();
    });

    // Diagnostics Panel Listeners
    $.btnDiagLocate.addEventListener('click', () => {
      const e = this._resolveEntities();
      const ent = e.locate_car_entity;
      if (this._isMqttActive()) {
        this._mqtt.publish('set/lights/locate', 'press');
        this._mqtt.publish('locate_car/set', 'PRESS');
      }
      if (ent && this._hass) {
        const dom = ent.split('.')[0];
        if (dom === 'button') this._hass.callService('button', 'press', { entity_id: ent });
        else this._toggleEntity(ent);
      }
    });

    $.btnDiagSyncClock.addEventListener('click', () => {
      const e = this._resolveEntities();
      const ent = e.sync_car_clock_entity;
      if (this._isMqttActive()) {
        this._mqtt.publish('set/synctime', 'now');
        this._mqtt.publish('sync_car_clock/set', 'PRESS');
      }
      if (ent && this._hass) {
        const dom = ent.split('.')[0];
        if (dom === 'button') this._hass.callService('button', 'press', { entity_id: ent });
        else this._toggleEntity(ent);
      }
    });

    $.btnClearAlarm.addEventListener('click', () => {
      const e = this._resolveEntities();
      const ent = e.clear_alarm_entity;
      if (this._isMqttActive()) {
        this._mqtt.state.diagnostics.alarm = 'disarmed';
        this._mqtt.state.diagnostics.lastAlarmEvent = null;
        this._mqtt.publish('set/alarm/clear', '1');
        this._mqtt.publish('clear_alarm/set', 'PRESS');
        this._updateState();
      }
      if (ent && this._hass) {
        const dom = ent.split('.')[0];
        if (dom === 'button') this._hass.callService('button', 'press', { entity_id: ent });
        else this._toggleEntity(ent);
      }
    });
  }

  _updateState() {
    if (!this._config || !this.$.card) return;
    const $ = this.$;
    const cfg = this._config;
    const lang = this._lang();
    const ents = this._resolveEntities();

    // 1. Paint & Layout Config
    $.hdrTitle.textContent = cfg.title || localize(lang, 'card_title_default');
    const isFrameless = cfg.show_card_frame === false || cfg.frameless === true;
    $.card.classList.toggle('frameless', isFrameless);
    $.bodyGrid.className = `ophev-body layout-${cfg.layout_mode || 'auto'}`;

    const palette = computeCarPaintPalette(cfg.car_color || '#2b2f36');
    const stg = $.carStage;
    stg.style.setProperty('--paint-base', palette.base);
    stg.style.setProperty('--paint-light', palette.light);
    stg.style.setProperty('--paint-highlight', palette.highlight);
    stg.style.setProperty('--paint-specular', palette.specular);
    stg.style.setProperty('--paint-mid', palette.mid);
    stg.style.setProperty('--paint-dark', palette.dark);
    stg.style.setProperty('--paint-deep', palette.deep);
    stg.style.setProperty('--paint-seam', palette.seam);
    stg.style.setProperty('--paint-crease', palette.creaseLight);

    // 2. Parse Entity States
    const battObj = this._getState(ents.battery_entity);
    let socParsed = parseBatteryLevel(battObj, null);

    const m = this._mqtt?.state;
    const isMqttActive = this._isMqttActive();

    if (isMqttActive && m && m.battery.soc !== null) {
      socParsed = m.battery.soc;
    }

    if (socParsed !== null) this._lastValidSoc = socParsed;
    const soc = socParsed ?? this._lastValidSoc ?? 0;

    let isCharging = isBinaryOn(this._getState(ents.charging_entity));
    let isPlugged = isCharging || isBinaryOn(this._getState(ents.charger_connected_entity));

    if (isMqttActive && m) {
      if (m.battery.charging) isCharging = true;
      if (m.battery.plugged || isCharging) isPlugged = true;
    }

    const battColors = getBatteryColors(soc, isCharging);
    $.card.style.setProperty('--batt-primary', battColors.primary);
    $.card.style.setProperty('--batt-secondary', battColors.secondary);
    $.card.style.setProperty('--batt-glow', battColors.glow);
    stg.style.setProperty('--batt-fill-opacity', String((cfg.battery_fill_opacity ?? 36) / 100));

    // Connection state & Offline Dimming
    const connObj = this._getState(ents.connected_entity);
    const battRawState = String(battObj?.state || '').toLowerCase();
    let isOnline = connObj
      ? isBinaryOn(connObj)
      : battObj
        ? battRawState !== 'unavailable' && battRawState !== 'unknown'
        : true;

    let connText = isOnline ? localize(lang, 'connected') : localize(lang, 'disconnected');

    if (isMqttActive && m) {
      isOnline = Boolean(m.connected || this._mqtt.connected);
      connText = isOnline ? localize(lang, 'connected') : localize(lang, 'disconnected');
    } else if (cfg.connection_mode === 'direct_mqtt' || cfg.connection_mode === 'ha_mqtt') {
      if (this._mqttStatus === 'connecting') {
        isOnline = false;
        connText = localize(lang, 'mqtt_connecting');
      } else if (!this._mqtt.connected) {
        isOnline = false;
        connText = localize(lang, 'mqtt_disconnected');
      }
    }

    const showOfflineDim = !isOnline && cfg.offline_dimming !== false;
    const lastSeenStr = formatLastSeen(connObj || battObj, lang);

    $.hdrConnWrap.className = `conn-pill ${isOnline ? 'online' : 'offline'}`;
    $.hdrConnDot.className = `conn-dot ${isOnline ? 'online' : 'offline'}`;
    $.hdrConnIcon.innerHTML = isOnline ? ICONS.wifiSync : ICONS.wifiOff;
    $.hdrConnText.textContent = connText;
    $.hdrConnWrap.title = isOnline ? connText : lastSeenStr;

    $.card.classList.toggle('is-offline', showOfflineDim);
    stg.classList.toggle('is-offline', showOfflineDim);
    $.offlineHudSub.textContent = lastSeenStr;
    $.btnOfflineReconnect.style.display = ents.restart_wifi_entity || isMqttActive ? 'inline-flex' : 'none';
    $.btnOfflineReconnect.classList.toggle('confirming', Boolean(this._wifiConfirming));
    $.btnOfflineReconnect.classList.toggle('sent-ok', Boolean(this._wifiSent));
    if (this._wifiConfirming) {
      $.txtOfflineReconnect.textContent = localize(lang, 'restart_wifi_confirm');
    } else if (this._wifiSent) {
      $.txtOfflineReconnect.textContent = localize(lang, 'restart_wifi_sent');
    } else {
      $.txtOfflineReconnect.textContent = localize(lang, 'offline_reconnect_btn');
    }

    // Lock & Doors
    let isLocked = isCarLocked(this._getState(ents.locked_entity), cfg.invert_lock);
    if (isMqttActive && m && m.doors.locked !== null) {
      isLocked = m.doors.locked;
    }
    $.pillLock.className = `status-pill ${isLocked ? 'ok' : 'warn'}`;
    $.pillLockIcon.innerHTML = isLocked ? ICONS.lockClosed : ICONS.lockOpen;
    $.pillLockText.textContent = localize(lang, isLocked ? 'locked' : 'unlocked');

    const isRhd = cfg.steering_side === 'right';
    const flObj = this._getState(isRhd ? ents.front_passenger_door_entity : ents.driver_door_entity);
    const frObj = this._getState(isRhd ? ents.driver_door_entity : ents.front_passenger_door_entity);
    const rlObj = this._getState(ents.rear_left_door_entity);
    const rrObj = this._getState(ents.rear_right_door_entity);
    const bonnetObj = this._getState(ents.bonnet_entity);
    const bootObj = this._getState(ents.boot_entity);

    let openFl = isDoorOpen(flObj);
    let openFr = isDoorOpen(frObj);
    let openRl = isDoorOpen(rlObj);
    let openRr = isDoorOpen(rrObj);
    let openBonnet = isDoorOpen(bonnetObj);
    let openBoot = isDoorOpen(bootObj);

    if (isMqttActive && m) {
      if (m.doors.driver) {
        if (isRhd) openFr = true; else openFl = true;
      }
      if (m.doors.passenger) {
        if (isRhd) openFl = true; else openFr = true;
      }
      if (m.doors.rearLeft) openRl = true;
      if (m.doors.rearRight) openRr = true;
      if (m.doors.bonnet) openBonnet = true;
      if (m.doors.boot) openBoot = true;
    }

    const openCount = [openFl, openFr, openRl, openRr, openBonnet, openBoot].filter(Boolean).length;
    $.pillDoors.className = `status-pill ${openCount > 0 ? 'danger' : ''}`;
    $.pillDoorsText.textContent =
      openCount > 0 ? localize(lang, 'doors_open_count', { count: openCount }) : localize(lang, 'doors_all_closed');

    $.chipBonnet.classList.toggle('open', openBonnet);
    $.chipFl.classList.toggle('open', openFl);
    $.chipFr.classList.toggle('open', openFr);
    $.chipRl.classList.toggle('open', openRl);
    $.chipRr.classList.toggle('open', openRr);
    $.chipBoot.classList.toggle('open', openBoot);

    // Climate states
    const climateSelObj = this._getState(ents.climate_state_entity);
    const selVal = String(climateSelObj?.state || '').toLowerCase().trim();
    let coolOn = this._isControlOn(ents.cool_entity) || selVal === 'cool';
    let heatOn = this._isControlOn(ents.heat_entity) || selVal === 'heat';
    let windscreenOn = this._isControlOn(ents.windscreen_entity) || selVal === 'windscreen';

    if (isMqttActive && m) {
      if (m.climate.cool) coolOn = true;
      if (m.climate.heat) heatOn = true;
      if (m.climate.windscreen) windscreenOn = true;
      if (m.climate.mode === 'off' && !this._isControlOn(ents.cool_entity) && !this._isControlOn(ents.heat_entity) && !this._isControlOn(ents.windscreen_entity)) {
        coolOn = false;
        heatOn = false;
        windscreenOn = false;
      }
    }

    // Lights states
    let headOn = this._isControlOn(ents.head_lights_entity);
    let parkOn = this._isControlOn(ents.park_lights_entity);
    let hazardOn = this._isControlOn(ents.hazard_lights_entity);
    let interiorOn = isBinaryOn(this._getState(ents.interior_lights_entity));

    if (isMqttActive && m) {
      if (m.lights.headlights) headOn = true;
      if (m.lights.parklights) parkOn = true;
      if (m.lights.hazard) hazardOn = true;
    }

    // Car Stage Classes
    stg.classList.toggle('rhd', isRhd);
    stg.classList.toggle('hide-sunroof', cfg.show_sunroof === false);
    stg.classList.toggle('interactive', cfg.interactive_car !== false && !showOfflineDim);
    stg.classList.toggle('is-locked', isLocked);
    stg.classList.toggle('is-plugged', isPlugged);
    stg.classList.toggle('is-charging', isCharging && !showOfflineDim);
    stg.classList.toggle('open-fl', openFl);
    stg.classList.toggle('open-fr', openFr);
    stg.classList.toggle('open-rl', openRl);
    stg.classList.toggle('open-rr', openRr);
    stg.classList.toggle('open-bonnet', openBonnet);
    stg.classList.toggle('open-boot', openBoot);
    stg.classList.toggle('lights-head', headOn && !showOfflineDim);
    stg.classList.toggle('lights-park', parkOn && !showOfflineDim);
    stg.classList.toggle('lights-hazard', hazardOn && !showOfflineDim);
    stg.classList.toggle('lights-interior', interiorOn && !showOfflineDim);
    stg.classList.toggle('climate-cool', coolOn && !showOfflineDim);
    stg.classList.toggle('climate-heat', heatOn && !showOfflineDim);
    stg.classList.toggle('climate-windscreen', windscreenOn && !showOfflineDim);

    const fillMode = cfg.battery_fill_mode || 'always';
    const hideFill = fillMode === 'off' || (fillMode === 'charging' && !isPlugged);
    stg.classList.toggle('fill-hidden', hideFill);
    stg.classList.toggle('show-xray', fillMode === 'xray');

    // Dynamic Ambient Aura Color
    let aura = 'transparent';
    let topGlow = 'rgba(14, 165, 233, 0.1)';
    if (showOfflineDim) {
      aura = 'transparent';
      topGlow = 'rgba(100, 116, 139, 0.06)';
    } else if (openCount > 0) {
      aura = '#ef4444';
      topGlow = 'rgba(239, 68, 68, 0.14)';
    } else if (isCharging) {
      aura = '#10b981';
      topGlow = 'rgba(16, 185, 129, 0.15)';
    } else if (coolOn) {
      aura = '#38bdf8';
      topGlow = 'rgba(56, 189, 248, 0.15)';
    } else if (heatOn || windscreenOn) {
      aura = '#f97316';
      topGlow = 'rgba(249, 115, 22, 0.15)';
    }
    stg.style.setProperty('--aura-color', aura);
    $.card.style.setProperty('--card-top-glow', topGlow);

    // 3. Proportional Battery Fill Geometry on Top-Down Car
    const fillPx = (CAR_BODY_LEN * soc) / 100;
    const horizonY = CAR_REAR_Y - fillPx;
    const clampedMarkerY = Math.min(CAR_REAR_Y - 14, Math.max(CAR_NOSE_Y + 14, horizonY));

    if ($.svgBattClipRect) {
      $.svgBattClipRect.setAttribute('y', horizonY.toFixed(1));
      $.svgBattClipRect.setAttribute('height', (fillPx + 14).toFixed(1));
    }
    if ($.svgBattHorizon) {
      $.svgBattHorizon.style.transform = `translateY(${horizonY.toFixed(1)}px)`;
    }
    if ($.svgBattMarker) {
      $.svgBattMarker.style.transform = `translateY(${clampedMarkerY.toFixed(1)}px)`;
    }
    if ($.svgBattMarkerText) {
      $.svgBattMarkerText.textContent = `${soc}%`;
    }

    // Interactive SVG Tooltips
    this.shadowRoot.querySelector('[data-zone="headlights"]')?.setAttribute('title', localize(lang, 'tip_headlights'));

    // 4. Battery & Charging Panel Readouts
    $.socNum.textContent = socParsed !== null || battObj === null ? String(soc) : '--';
    $.socBarFill.style.width = `${soc}%`;
    $.socBarFill.classList.toggle('charging', isCharging && !showOfflineDim);

    const maxRange = Number(cfg.max_ev_range) || 0;
    if (maxRange > 0) {
      const estKm = Math.round((soc / 100) * maxRange);
      $.evRangeBadge.style.display = '';
      $.evRangeBadge.textContent = localize(lang, 'ev_range_est', { km: estKm });
    } else {
      $.evRangeBadge.style.display = 'none';
    }

    const remObj = this._getState(ents.charge_remaining_entity);
    const remHrsObj = this._getState(ents.charge_remaining_hrs_entity);
    const estCompObj = this._getState(ents.estimated_completion_entity);

    let etaStr = formatRemainingTime(remObj, remHrsObj, lang);
    let finishStr = formatEstimatedCompletion(estCompObj, remObj, isCharging, lang);

    if (isMqttActive && m) {
      if (m.battery.remainingMins > 0) {
        const total = m.battery.remainingMins;
        const h = Math.floor(total / 60);
        const min = total % 60;
        etaStr = h > 0
          ? `${h} ${localize(lang, 'hr_short')} ${min} ${localize(lang, 'min_short')}`
          : `${min} ${localize(lang, 'min_short')}`;
      }
      if (m.battery.completionTime) {
        finishStr = m.battery.completionTime;
      } else if (isCharging && m.battery.remainingMins > 0) {
        const dt = new Date(Date.now() + m.battery.remainingMins * 60 * 1000);
        finishStr = `~${dt.toLocaleTimeString(lang === 'hu' ? 'hu-HU' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}`;
      }
    }

    // CC-CV safeguard: if charging and still "0 perc" or "Nem tölt"
    if (isCharging) {
      if (etaStr === `0 ${localize(lang, 'min_short')}` || etaStr === '0 min') {
        const estM = estimateRemainingChargingMins(soc);
        const h = Math.floor(estM / 60);
        const min = estM % 60;
        etaStr = h > 0
          ? `${h} ${localize(lang, 'hr_short')} ${min} ${localize(lang, 'min_short')}`
          : `${min} ${localize(lang, 'min_short')}`;
      }
      if (finishStr === localize(lang, 'not_charging') || finishStr === '--:--' || !finishStr) {
        const estM = estimateRemainingChargingMins(soc);
        const dt = new Date(Date.now() + estM * 60 * 1000);
        finishStr = `~${dt.toLocaleTimeString(lang === 'hu' ? 'hu-HU' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}`;
      }
    }

    $.etaValue.textContent = etaStr;

    if (isCharging && !showOfflineDim) {
      $.chargeBanner.className = 'charge-banner phev-dep active';
      $.chargeIconBox.innerHTML = ICONS.bolt;
      $.chargeTitle.textContent = localize(lang, 'charging_active');
      $.chargeSub.textContent = `${localize(lang, 'estimated_finish')}: ${finishStr}`;
    } else if (isPlugged && !showOfflineDim) {
      $.chargeBanner.className = 'charge-banner phev-dep standby';
      $.chargeIconBox.innerHTML = ICONS.plugOn;
      $.chargeTitle.textContent = soc >= 99 ? localize(lang, 'charger_full') : localize(lang, 'charger_standby');
      $.chargeSub.textContent = `${localize(lang, 'estimated_finish')}: ${finishStr}`;
    } else {
      $.chargeBanner.className = 'charge-banner phev-dep';
      $.chargeIconBox.innerHTML = showOfflineDim ? ICONS.wifiOff : ICONS.plugOff;
      $.chargeTitle.textContent = isCharging
        ? localize(lang, 'charging_active')
        : isPlugged
          ? soc >= 99
            ? localize(lang, 'charger_full')
            : localize(lang, 'charger_standby')
          : localize(lang, 'charger_unplugged');
      $.chargeSub.textContent = showOfflineDim
        ? localize(lang, 'offline_stale_hint')
        : `${localize(lang, 'remaining_time')}: 0 ${localize(lang, 'min_short')}`;
    }

    // Daily Charge Energy (kWh / kW) & Duration (h / min) Helpers
    const hasDailyEnergy = Boolean(ents.daily_charge_energy_entity);
    const hasDailyTime = Boolean(ents.daily_charge_time_entity);
    const dailyEnergyObj = this._getState(ents.daily_charge_energy_entity);
    const dailyTimeObj = this._getState(ents.daily_charge_time_entity);
    const dailyEnergyFormatted = formatDailyEnergy(dailyEnergyObj, this._hass, lang);
    const dailyTimeFormatted = formatDailyDuration(dailyTimeObj, this._hass, lang);

    const dailyPos = cfg.daily_charge_position || 'header';
    const showDailyInHeader = (dailyPos === 'header' || dailyPos === 'both') && (hasDailyEnergy || hasDailyTime);
    const showDailyInPanel = (dailyPos === 'panel' || dailyPos === 'both') && (hasDailyEnergy || hasDailyTime);

    $.hdrDailyWrap.style.display = showDailyInHeader ? 'flex' : 'none';
    if (showDailyInHeader) {
      $.hdrDailyEnergy.style.display = hasDailyEnergy ? 'inline-flex' : 'none';
      if (hasDailyEnergy) {
        const fnE = dailyEnergyObj?.attributes?.friendly_name || localize(lang, 'daily_charge_short');
        $.lblHdrDailyEnergy.textContent = fnE;
        $.valHdrDailyEnergy.textContent = dailyEnergyFormatted;
        $.hdrDailyEnergy.title = `${fnE}: ${dailyEnergyFormatted}`;
      }
      $.hdrDailyTime.style.display = hasDailyTime ? 'inline-flex' : 'none';
      if (hasDailyTime) {
        const fnT = dailyTimeObj?.attributes?.friendly_name || localize(lang, 'daily_charge_short');
        $.lblHdrDailyTime.textContent = fnT;
        $.valHdrDailyTime.textContent = dailyTimeFormatted;
        $.hdrDailyTime.title = `${fnT}: ${dailyTimeFormatted}`;
      }
    }

    $.panelDailyWrap.style.display = showDailyInPanel ? 'grid' : 'none';
    if (showDailyInPanel) {
      $.tileDailyEnergy.style.display = hasDailyEnergy ? 'flex' : 'none';
      if (hasDailyEnergy) {
        $.lblPanelDailyEnergy.textContent = localize(lang, 'daily_charge_energy');
        $.valPanelDailyEnergy.textContent = dailyEnergyFormatted;
        $.tileDailyEnergy.title = dailyEnergyObj?.attributes?.friendly_name || localize(lang, 'daily_charge_energy');
      }
      $.tileDailyTime.style.display = hasDailyTime ? 'flex' : 'none';
      if (hasDailyTime) {
        $.lblPanelDailyTime.textContent = localize(lang, 'daily_charge_time');
        $.valPanelDailyTime.textContent = dailyTimeFormatted;
        $.tileDailyTime.title = dailyTimeObj?.attributes?.friendly_name || localize(lang, 'daily_charge_time');
      }
    }

    // External Charger Power (W) & Energy (kWh)
    const pwrObj = this._getState(ents.charger_power_entity);
    const engObj = this._getState(ents.charger_energy_entity);
    const showExt = Boolean(pwrObj || engObj);
    $.extMeters.style.display = showExt ? 'grid' : 'none';

    if (pwrObj) {
      $.tilePower.style.display = '';
      const formattedP = formatNumber(pwrObj.state, 2, lang);
      $.valPower.textContent = formattedP ?? pwrObj.state;
      $.unitPower.textContent = pwrObj.attributes?.unit_of_measurement || 'W';
      this._ensureSparkline(ents.charger_power_entity, $.sparkPowerLine, $.sparkPowerArea);
    } else {
      $.tilePower.style.display = 'none';
    }

    if (engObj) {
      $.tileEnergy.style.display = '';
      const formattedE = formatNumber(engObj.state, 2, lang);
      $.valEnergy.textContent = formattedE ?? engObj.state;
      $.unitEnergy.textContent = engObj.attributes?.unit_of_measurement || 'kWh';
      this._ensureSparkline(ents.charger_energy_entity, $.sparkEnergyLine, $.sparkEnergyArea);
    } else {
      $.tileEnergy.style.display = 'none';
    }

    // 5. Climate Panel
    let climBadgeClass = 'climate-badge';
    let climBadgeText = localize(lang, 'climate_off');
    if (showOfflineDim) {
      climBadgeClass = 'climate-badge offline';
      climBadgeText = localize(lang, 'offline_badge');
    } else if (coolOn) {
      climBadgeClass = 'climate-badge cool';
      climBadgeText = localize(lang, 'climate_cool');
    } else if (heatOn) {
      climBadgeClass = 'climate-badge heat';
      climBadgeText = localize(lang, 'climate_heat');
    } else if (windscreenOn) {
      climBadgeClass = 'climate-badge windscreen';
      climBadgeText = localize(lang, 'climate_windscreen');
    } else if (selVal === 'unknown' || selVal === 'unavailable') {
      climBadgeText = localize(lang, 'climate_unknown');
    }
    $.climateBadge.className = climBadgeClass;
    $.climateBadge.textContent = climBadgeText;

    $.btnCool.disabled = !ents.cool_entity || showOfflineDim;
    $.btnCool.classList.toggle('active-cool', coolOn && !showOfflineDim);

    $.btnHeat.disabled = !ents.heat_entity || showOfflineDim;
    $.btnHeat.classList.toggle('active-heat', heatOn && !showOfflineDim);

    $.btnWindscreen.disabled = !ents.windscreen_entity || showOfflineDim;
    $.btnWindscreen.classList.toggle('active-windscreen', windscreenOn && !showOfflineDim);

    const options = climateSelObj?.attributes?.options;
    if (climateSelObj && Array.isArray(options) && options.length > 0) {
      $.climateSelectWrap.style.display = 'flex';
      $.selClimateMode.disabled = showOfflineDim;
      const sig = options.join('|');
      if ($.selClimateMode.dataset.sig !== sig) {
        $.selClimateMode.dataset.sig = sig;
        const optLabels = {
          off: localize(lang, 'climate_off'),
          cool: localize(lang, 'climate_cool'),
          heat: localize(lang, 'climate_heat'),
          windscreen: localize(lang, 'climate_windscreen'),
        };
        $.selClimateMode.innerHTML = options
          .map((opt) => `<option value="${opt}">${optLabels[opt.toLowerCase()] || opt}</option>`)
          .join('');
      }
      if (options.includes(climateSelObj.state)) {
        $.selClimateMode.value = climateSelObj.state;
      }
    } else {
      $.climateSelectWrap.style.display = 'none';
    }

    // Climate Telemetry Readouts (Remaining time & Stop time)
    const isClimateActive = !showOfflineDim && (coolOn || heatOn || windscreenOn);
    const climRemObj = this._getState(ents.climate_remaining_entity);
    const climStopObj = this._getState(ents.climate_stop_time_entity);

    let climRemFormatted = isClimateActive
      ? formatClimateRemaining(climRemObj, lang)
      : (climRemObj && Number(climRemObj.state) > 0 ? formatClimateRemaining(climRemObj, lang) : '--');
    let climStopFormatted = isClimateActive
      ? formatClimateStopTime(climStopObj, climRemObj, isClimateActive, lang)
      : (climStopObj && climStopObj.state && climStopObj.state !== '--:--' && climStopObj.state !== 'unknown' ? formatClimateStopTime(climStopObj, null, false, lang) : '--:--');

    if (isMqttActive && m && m.climate) {
      if (m.climate.remainingMins > 0) {
        climRemFormatted = `${m.climate.remainingMins} ${localize(lang, 'min_short')}`;
      }
      if (m.climate.stopTime && m.climate.stopTime !== '--:--') {
        climStopFormatted = m.climate.stopTime;
      }
    }

    $.valClimateRemaining.textContent = climRemFormatted;
    $.valClimateStop.textContent = climStopFormatted;

    const tileActiveClass = !showOfflineDim && coolOn
      ? 'active-cool'
      : (!showOfflineDim && heatOn
        ? 'active-heat'
        : (!showOfflineDim && windscreenOn ? 'active-windscreen' : ''));

    $.tileClimateRemaining.classList.toggle('active-cool', tileActiveClass === 'active-cool');
    $.tileClimateRemaining.classList.toggle('active-heat', tileActiveClass === 'active-heat');
    $.tileClimateRemaining.classList.toggle('active-windscreen', tileActiveClass === 'active-windscreen');

    $.tileClimateStop.classList.toggle('active-cool', tileActiveClass === 'active-cool');
    $.tileClimateStop.classList.toggle('active-heat', tileActiveClass === 'active-heat');
    $.tileClimateStop.classList.toggle('active-windscreen', tileActiveClass === 'active-windscreen');

    const remTitle = climRemObj?.attributes?.friendly_name || localize(lang, 'climate_remaining');
    const stopTitle = climStopObj?.attributes?.friendly_name || localize(lang, 'climate_stop_time');
    $.tileClimateRemaining.title = `${remTitle}: ${climRemFormatted}`;
    $.tileClimateStop.title = `${stopTitle}: ${climStopFormatted}`;

    // Climate Parameters (Duration & Start Delay)
    const durEntId = ents.climate_duration_min_entity;
    const delayEntId = ents.climate_start_delay_min_entity;
    const durObj = this._getState(durEntId);
    const delayObj = this._getState(delayEntId);

    const hasDur = Boolean(durObj) || isMqttActive;
    const hasDelay = Boolean(delayObj) || isMqttActive;

    if (hasDur || hasDelay) {
      $.climateParamsWrap.style.display = 'grid';
      $.paramTileDuration.style.display = hasDur ? 'flex' : 'none';
      $.paramTileDelay.style.display = hasDelay ? 'flex' : 'none';

      if (hasDur) {
        $.selClimateDuration.disabled = showOfflineDim;
        const durOpts = Array.isArray(durObj?.attributes?.options)
          ? durObj.attributes.options
          : (durObj?.state ? [durObj.state] : ['10', '20', '30']);
        const durSig = durOpts.join('|');
        if ($.selClimateDuration.dataset.sig !== durSig) {
          $.selClimateDuration.dataset.sig = durSig;
          $.selClimateDuration.innerHTML = durOpts
            .map((opt) => {
              const label = /^\d+$/.test(opt) ? `${opt} ${localize(lang, 'min_short')}` : opt;
              return `<option value="${opt}">${label}</option>`;
            })
            .join('');
        }
        const activeDur = (isMqttActive && m?.climate?.duration) || durObj?.state || '10';
        if (durOpts.includes(activeDur)) {
          $.selClimateDuration.value = activeDur;
        }
      }

      if (hasDelay) {
        $.selClimateDelay.disabled = showOfflineDim;
        const delayOpts = Array.isArray(delayObj?.attributes?.options)
          ? delayObj.attributes.options
          : (delayObj?.state ? [delayObj.state] : ['0', '5', '10', '20']);
        const delaySig = delayOpts.join('|');
        if ($.selClimateDelay.dataset.sig !== delaySig) {
          $.selClimateDelay.dataset.sig = delaySig;
          $.selClimateDelay.innerHTML = delayOpts
            .map((opt) => {
              const label = /^\d+$/.test(opt) ? `${opt} ${localize(lang, 'min_short')}` : opt;
              return `<option value="${opt}">${label}</option>`;
            })
            .join('');
        }
        const activeDelay = (isMqttActive && m?.climate?.delay) || delayObj?.state || '0';
        if (delayOpts.includes(activeDelay)) {
          $.selClimateDelay.value = activeDelay;
        }
      }
    }

    // 6. Lights & System Controls
    $.btnHeadlights.disabled = !ents.head_lights_entity || showOfflineDim;
    $.btnHeadlights.classList.toggle('active-light', headOn && !showOfflineDim);
    $.subHeadlights.textContent = localize(lang, headOn ? 'light_on' : 'light_off');

    $.btnParklights.disabled = !ents.park_lights_entity || showOfflineDim;
    $.btnParklights.classList.toggle('active-park', parkOn && !showOfflineDim);
    $.subParklights.textContent = localize(lang, parkOn ? 'light_on' : 'light_off');

    $.btnDisableTimer.disabled = !ents.disable_charge_timer_entity || showOfflineDim;
    $.btnDisableTimer.classList.toggle('sent-ok', Boolean(this._timerSent));
    $.txtDisableTimer.textContent = this._timerSent
      ? localize(lang, 'timer_sent')
      : localize(lang, 'disable_timer');

    $.btnRestartWifi.disabled = !ents.restart_wifi_entity;
    $.btnRestartWifi.classList.toggle('confirming', Boolean(this._wifiConfirming));
    $.btnRestartWifi.classList.toggle('sent-ok', Boolean(this._wifiSent));
    if (this._wifiConfirming) {
      $.txtRestartWifi.textContent = localize(lang, 'restart_wifi_confirm');
    } else if (this._wifiSent) {
      $.txtRestartWifi.textContent = localize(lang, 'restart_wifi_sent');
    } else {
      $.txtRestartWifi.textContent = localize(lang, 'restart_wifi');
    }
    $.subRestartWifi.textContent = isOnline ? localize(lang, 'connected') : localize(lang, 'disconnected');

    $.indHazard.classList.toggle('on-amber', hazardOn && !showOfflineDim);
    $.valHazard.textContent = localize(lang, hazardOn ? 'active' : 'inactive');

    $.indInterior.classList.toggle('on-amber', interiorOn && !showOfflineDim);
    $.valInterior.textContent = localize(lang, interiorOn ? 'light_on' : 'inactive');

    // 7. Collapsible Sensors Drawer
    $.txtDrawerToggle.textContent = localize(lang, this._drawerOpen ? 'hide_details' : 'show_details');
    $.sensorsDrawer.classList.toggle('open', this._drawerOpen);
    if (this._drawerOpen) {
      const items = [
        { label: localize(lang, 'battery_title'), val: `${soc}%`, ent: ents.battery_entity },
        { label: localize(lang, 'daily_charge_energy'), val: dailyEnergyFormatted, ent: ents.daily_charge_energy_entity },
        { label: localize(lang, 'daily_charge_time'), val: dailyTimeFormatted, ent: ents.daily_charge_time_entity },
        { label: localize(lang, 'locked'), val: localize(lang, isLocked ? 'locked' : 'unlocked'), ent: ents.locked_entity },
        { label: localize(lang, 'bonnet'), val: localize(lang, openBonnet ? 'door_open' : 'door_closed'), ent: ents.bonnet_entity },
        { label: localize(lang, 'boot'), val: localize(lang, openBoot ? 'door_open' : 'door_closed'), ent: ents.boot_entity },
        { label: localize(lang, 'driver_door'), val: localize(lang, isDoorOpen(this._getState(ents.driver_door_entity)) ? 'door_open' : 'door_closed'), ent: ents.driver_door_entity },
        { label: localize(lang, 'front_passenger_door'), val: localize(lang, isDoorOpen(this._getState(ents.front_passenger_door_entity)) ? 'door_open' : 'door_closed'), ent: ents.front_passenger_door_entity },
        { label: localize(lang, 'rear_left_door'), val: localize(lang, openRl ? 'door_open' : 'door_closed'), ent: ents.rear_left_door_entity },
        { label: localize(lang, 'rear_right_door'), val: localize(lang, openRr ? 'door_open' : 'door_closed'), ent: ents.rear_right_door_entity },
        { label: localize(lang, 'hazard_lights'), val: localize(lang, hazardOn ? 'light_on' : 'light_off'), ent: ents.hazard_lights_entity },
        { label: localize(lang, 'interior_lights'), val: localize(lang, interiorOn ? 'light_on' : 'light_off'), ent: ents.interior_lights_entity },
        { label: localize(lang, 'remaining_time'), val: $.etaValue.textContent, ent: ents.charge_remaining_entity },
        { label: localize(lang, 'estimated_finish'), val: finishStr, ent: ents.estimated_completion_entity || ents.charge_remaining_entity },
      ].filter((it) => Boolean(it.ent));

      $.sensorsDrawer.innerHTML = items
        .map(
          (it) => `
          <div class="drawer-item" data-ent="${it.ent}">
            <span class="drawer-item-name">${it.label}</span>
            <span class="drawer-item-val">${it.val}</span>
          </div>
        `
        )
        .join('');

      $.sensorsDrawer.querySelectorAll('.drawer-item').forEach((el) => {
        el.addEventListener('click', () => this._openMoreInfo(el.dataset.ent));
      });
    }

    // 8. Extension Modals
    $.btnToggleTimers.classList.toggle('active', this._timersModalOpen);
    $.btnToggleDiag.classList.toggle('active', this._diagModalOpen);
    $.btnOpenSettings.classList.toggle('active', this._settingsModalOpen);
    $.modalTimers?.classList.toggle('open', this._timersModalOpen);
    $.modalDiag?.classList.toggle('open', this._diagModalOpen);
    $.modalSettings?.classList.toggle('open', this._settingsModalOpen);

    if (this._timersModalOpen) {
      this._updateTimersPanel();
    }
    if (this._diagModalOpen) {
      this._updateDiagPanel();
    }
    if (this._settingsModalOpen) {
      this._updateSettingsModal();
    }
  }

  _updateTimersPanel() {
    if (!this._hass || !this.$.modalTimers) return;
    const $ = this.$;
    const lang = this._lang();
    const ents = this._resolveEntities();
    const isClimate = this._activeTimerSubtab === 'climate';

    $.btnSubtabClimate.classList.toggle('active', isClimate);
    $.btnSubtabCharge.classList.toggle('active', !isClimate);

    if (isClimate) {
      $.timerMasterBanner.style.display = 'flex';
      $.timerMasterText.textContent = localize(lang, 'climate_timer_master');
      const masterEnt = ents.climate_timer_master_entity;
      const isMasterOn = masterEnt ? isBinaryOn(this._getState(masterEnt)) : false;
      $.btnToggleMasterTimer.classList.toggle('active', isMasterOn);
      $.txtToggleMasterTimer.textContent = isMasterOn
        ? localize(lang, 'timer_enabled')
        : localize(lang, 'timer_disabled');

      const modeEnt = ents.climate_timer_mode_entity;
      const modeObj = this._getState(modeEnt);
      if (modeObj && Array.isArray(modeObj.attributes?.options)) {
        $.selTimerMasterMode.style.display = 'inline-block';
        const opts = modeObj.attributes.options;
        const sig = opts.join('|');
        if ($.selTimerMasterMode.dataset.sig !== sig) {
          $.selTimerMasterMode.dataset.sig = sig;
          $.selTimerMasterMode.innerHTML = opts
            .map((o) => `<option value="${o}" ${o === modeObj.state ? 'selected' : ''}>${o}</option>`)
            .join('');
        }
        $.selTimerMasterMode.value = modeObj.state;
      } else {
        $.selTimerMasterMode.style.display = 'none';
      }

      let slots = getPhevClimateTimers(this._hass);
      if (this._isMqttActive() && this._mqttManager?.state?.timers?.climateSlots?.length) {
        const mqttSlots = this._mqttManager.state.timers.climateSlots;
        slots = slots.map((sl, idx) => {
          const m = mqttSlots[idx];
          if (!m) return sl;
          return {
            ...sl,
            enabled: sl.enabledEntity ? sl.enabled : Boolean(m.enabled),
            time: sl.timeEntity && sl.time !== '--:--' ? sl.time : (m.time || '07:30'),
            duration: sl.durationEntity ? sl.duration : String(m.duration || '20'),
            days: sl.daysEntity ? sl.days : (m.days || 'Everyday'),
          };
        });
      }
      $.timerSlotsBar.innerHTML = slots
        .map(
          (sl) => `
        <button type="button" class="slot-pill ${sl.slot === this._activeClimateSlot ? 'active' : ''} ${sl.enabled ? 'enabled' : ''}" data-slot="${sl.slot}">
          <span class="slot-dot"></span>
          <span>${localize(lang, 'slot_num', { num: sl.slot })}</span>
          ${sl.time && sl.time !== '--:--' ? `<span style="font-size:0.68rem;opacity:0.75">(${sl.time})</span>` : ''}
        </button>
      `
        )
        .join('');

      const activeSlot = slots[this._activeClimateSlot - 1] || slots[0];
      const slotNum = activeSlot ? activeSlot.slot : 1;
      const daysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const daysHu = ['Hét', 'Kedd', 'Sze', 'Csüt', 'Pén', 'Szo', 'Vas'];
      const currentDays = String(activeSlot?.days || '');
      const isDayActive = (d) => currentDays.includes(d) || currentDays.toLowerCase() === 'everyday';

      $.timerEditorCard.innerHTML = `
        <div class="timer-row">
          <span class="timer-row-label"><strong>${localize(lang, 'slot_num', { num: slotNum })}</strong> - ${localize(lang, 'climate_tab')}</span>
          <button type="button" class="hdr-action-btn ${activeSlot?.enabled ? 'active' : ''}" id="btn-slot-enable">
            ${activeSlot?.enabled ? localize(lang, 'timer_enabled') : localize(lang, 'timer_disabled')}
          </button>
        </div>
        <div class="timer-row">
          <span class="timer-row-label">${localize(lang, 'ready_time')}</span>
          <input type="time" class="timer-input" id="input-slot-time" value="${activeSlot?.time && activeSlot.time !== '--:--' ? activeSlot.time.substring(0, 5) : '07:30'}" />
        </div>
        <div class="timer-row">
          <span class="timer-row-label">${localize(lang, 'duration')}</span>
          <select class="setting-select" id="sel-slot-duration">
            <option value="10" ${String(activeSlot?.duration).includes('10') ? 'selected' : ''}>10 ${localize(lang, 'min_short')}</option>
            <option value="20" ${String(activeSlot?.duration).includes('20') ? 'selected' : ''}>20 ${localize(lang, 'min_short')}</option>
            <option value="30" ${String(activeSlot?.duration).includes('30') ? 'selected' : ''}>30 ${localize(lang, 'min_short')}</option>
          </select>
        </div>
        <div class="days-wrap">
          <span class="timer-row-label">${localize(lang, 'days_active')}</span>
          <div class="days-row">
            ${daysArr
              .map(
                (d, idx) => `
              <button type="button" class="day-chip ${isDayActive(d) ? 'active' : ''}" data-day="${d}" title="${d}">
                ${lang === 'hu' ? daysHu[idx] : d.substring(0, 2)}
              </button>
            `
              )
              .join('')}
          </div>
          <div class="presets-row">
            <button type="button" class="preset-chip" data-preset="Everyday">${localize(lang, 'preset_everyday')}</button>
            <button type="button" class="preset-chip" data-preset="Weekdays">${localize(lang, 'preset_weekdays')}</button>
            <button type="button" class="preset-chip" data-preset="Weekends">${localize(lang, 'preset_weekends')}</button>
          </div>
        </div>
      `;

      const btnSlotEnable = $.timerEditorCard.querySelector('#btn-slot-enable');
      btnSlotEnable?.addEventListener('click', () => {
        if (activeSlot?.enabledEntity) this._toggleEntity(activeSlot.enabledEntity);
        if (this._isMqttActive()) {
          const nextEn = !activeSlot?.enabled;
          activeSlot.enabled = nextEn;
          const curMode = $.selTimerMasterMode?.value || 'heat';
          this._mqttManager.setClimateTimerSlot(slotNum, { enabled: nextEn }, curMode);
          this._updateTimersPanel();
        }
      });

      const inputSlotTime = $.timerEditorCard.querySelector('#input-slot-time');
      inputSlotTime?.addEventListener('change', (e) => {
        const val = e.target.value;
        if (activeSlot?.timeEntity && this._hass) {
          const dom = activeSlot.timeEntity.split('.')[0];
          if (dom === 'time') this._hass.callService('time', 'set_value', { entity_id: activeSlot.timeEntity, time: val });
          else if (dom === 'text' || dom === 'input_text') this._hass.callService(dom, 'set_value', { entity_id: activeSlot.timeEntity, value: val });
          else if (dom === 'input_datetime') this._hass.callService('input_datetime', 'set_datetime', { entity_id: activeSlot.timeEntity, time: val + ':00' });
        }
        if (this._isMqttActive()) {
          activeSlot.time = val;
          const curMode = $.selTimerMasterMode?.value || 'heat';
          this._mqttManager.setClimateTimerSlot(slotNum, { time: val }, curMode);
        }
      });

      const selSlotDuration = $.timerEditorCard.querySelector('#sel-slot-duration');
      selSlotDuration?.addEventListener('change', (e) => {
        const val = e.target.value;
        if (activeSlot?.durationEntity && this._hass) {
          const dom = activeSlot.durationEntity.split('.')[0];
          if (dom === 'select') this._hass.callService('select', 'select_option', { entity_id: activeSlot.durationEntity, option: val });
          else if (dom === 'number' || dom === 'input_number') this._hass.callService(dom, 'set_value', { entity_id: activeSlot.durationEntity, value: Number(val) });
        }
        if (this._isMqttActive()) {
          activeSlot.duration = val;
          const curMode = $.selTimerMasterMode?.value || 'heat';
          this._mqttManager.setClimateTimerSlot(slotNum, { duration: val }, curMode);
        }
      });

      $.timerEditorCard.querySelectorAll('.preset-chip').forEach((pChip) => {
        pChip.addEventListener('click', () => {
          const preset = pChip.dataset.preset;
          if (activeSlot?.daysEntity && this._hass) {
            const dom = activeSlot.daysEntity.split('.')[0];
            if (dom === 'select') this._hass.callService('select', 'select_option', { entity_id: activeSlot.daysEntity, option: preset });
            else this._hass.callService(dom, 'set_value', { entity_id: activeSlot.daysEntity, value: preset });
          }
          if (this._isMqttActive()) {
            activeSlot.days = preset;
            const curMode = $.selTimerMasterMode?.value || 'heat';
            this._mqttManager.setClimateTimerSlot(slotNum, { days: preset }, curMode);
            this._updateTimersPanel();
          }
        });
      });

      $.timerEditorCard.querySelectorAll('.day-chip').forEach((dChip) => {
        dChip.addEventListener('click', () => {
          const clickedDay = dChip.dataset.day;
          let currentList = currentDays.toLowerCase() === 'everyday' ? [...daysArr] : currentDays.split(/[, ]+/).filter(Boolean);
          if (currentList.includes(clickedDay)) {
            currentList = currentList.filter((d) => d !== clickedDay);
          } else {
            currentList.push(clickedDay);
          }
          const nextVal = currentList.length === 7 ? 'Everyday' : currentList.join(', ');
          if (activeSlot?.daysEntity && this._hass) {
            const dom = activeSlot.daysEntity.split('.')[0];
            if (dom === 'select') this._hass.callService('select', 'select_option', { entity_id: activeSlot.daysEntity, option: nextVal });
            else this._hass.callService(dom, 'set_value', { entity_id: activeSlot.daysEntity, value: nextVal });
          }
          if (this._isMqttActive()) {
            activeSlot.days = nextVal;
            const curMode = $.selTimerMasterMode?.value || 'heat';
            this._mqttManager.setClimateTimerSlot(slotNum, { days: nextVal }, curMode);
            this._updateTimersPanel();
          }
        });
      });
    } else {
      $.timerMasterBanner.style.display = 'none';

      let slots = getPhevChargeTimers(this._hass);
      if (this._isMqttActive() && this._mqttManager?.state?.timers?.chargeSlots?.length) {
        const mqttSlots = this._mqttManager.state.timers.chargeSlots;
        slots = slots.map((sl, idx) => {
          const m = mqttSlots[idx];
          if (!m) return sl;
          return {
            ...sl,
            enabled: sl.enabledEntity ? sl.enabled : Boolean(m.enabled),
            start: sl.startEntity && sl.start !== '--:--' ? sl.start : (m.start || '22:00'),
            end: sl.endEntity && sl.end !== '--:--' ? sl.end : (m.end || '06:00'),
            days: sl.daysEntity ? sl.days : (m.days || 'Everyday'),
            fullCharge: sl.fullChargeEntity ? sl.fullCharge : (m.fullCharge !== false),
          };
        });
      }
      $.timerSlotsBar.innerHTML = slots
        .map(
          (sl) => `
        <button type="button" class="slot-pill ${sl.slot === this._activeChargeSlot ? 'active' : ''} ${sl.enabled ? 'enabled' : ''}" data-slot="${sl.slot}">
          <span class="slot-dot"></span>
          <span>${localize(lang, 'slot_num', { num: sl.slot })}</span>
          ${sl.start && sl.start !== '--:--' ? `<span style="font-size:0.68rem;opacity:0.75">(${sl.start})</span>` : ''}
        </button>
      `
        )
        .join('');

      const activeSlot = slots[this._activeChargeSlot - 1] || slots[0];
      const slotNum = activeSlot ? activeSlot.slot : 1;
      const daysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const daysHu = ['Hét', 'Kedd', 'Sze', 'Csüt', 'Pén', 'Szo', 'Vas'];
      const currentDays = String(activeSlot?.days || '');
      const isDayActive = (d) => currentDays.includes(d) || currentDays.toLowerCase() === 'everyday';

      $.timerEditorCard.innerHTML = `
        <div class="timer-row">
          <span class="timer-row-label"><strong>${localize(lang, 'slot_num', { num: slotNum })}</strong> - ${localize(lang, 'charge_tab')}</span>
          <button type="button" class="hdr-action-btn ${activeSlot?.enabled ? 'active' : ''}" id="btn-slot-enable">
            ${activeSlot?.enabled ? localize(lang, 'timer_enabled') : localize(lang, 'timer_disabled')}
          </button>
        </div>
        <div class="timer-row">
          <span class="timer-row-label">${localize(lang, 'start_time')}</span>
          <input type="time" class="timer-input" id="input-slot-start" value="${activeSlot?.start && activeSlot.start !== '--:--' ? activeSlot.start.substring(0, 5) : '22:00'}" />
        </div>
        <div class="timer-row">
          <span class="timer-row-label">${localize(lang, 'stop_time')}</span>
          <input type="time" class="timer-input" id="input-slot-end" value="${activeSlot?.end && activeSlot.end !== '--:--' ? activeSlot.end.substring(0, 5) : '06:00'}" />
        </div>
        <div class="days-wrap">
          <span class="timer-row-label">${localize(lang, 'days_active')}</span>
          <div class="days-row">
            ${daysArr
              .map(
                (d, idx) => `
              <button type="button" class="day-chip ${isDayActive(d) ? 'active' : ''}" data-day="${d}" title="${d}">
                ${lang === 'hu' ? daysHu[idx] : d.substring(0, 2)}
              </button>
            `
              )
              .join('')}
          </div>
          <div class="presets-row">
            <button type="button" class="preset-chip" data-preset="Everyday">${localize(lang, 'preset_everyday')}</button>
            <button type="button" class="preset-chip" data-preset="Weekdays">${localize(lang, 'preset_weekdays')}</button>
            <button type="button" class="preset-chip" data-preset="Weekends">${localize(lang, 'preset_weekends')}</button>
          </div>
        </div>
      `;

      const btnSlotEnable = $.timerEditorCard.querySelector('#btn-slot-enable');
      btnSlotEnable?.addEventListener('click', () => {
        if (activeSlot?.enabledEntity) this._toggleEntity(activeSlot.enabledEntity);
        if (this._isMqttActive()) {
          const nextEn = !activeSlot?.enabled;
          activeSlot.enabled = nextEn;
          this._mqttManager.setChargeTimerSlot(slotNum, { enabled: nextEn, start: activeSlot.start, end: activeSlot.end, days: activeSlot.days, fullCharge: activeSlot.fullCharge });
          this._updateTimersPanel();
        }
      });

      const inputSlotStart = $.timerEditorCard.querySelector('#input-slot-start');
      inputSlotStart?.addEventListener('change', (e) => {
        const val = e.target.value;
        if (activeSlot?.startEntity && this._hass) {
          const dom = activeSlot.startEntity.split('.')[0];
          if (dom === 'time') this._hass.callService('time', 'set_value', { entity_id: activeSlot.startEntity, time: val });
          else if (dom === 'text' || dom === 'input_text') this._hass.callService(dom, 'set_value', { entity_id: activeSlot.startEntity, value: val });
          else if (dom === 'input_datetime') this._hass.callService('input_datetime', 'set_datetime', { entity_id: activeSlot.startEntity, time: val + ':00' });
        }
        if (this._isMqttActive()) {
          activeSlot.start = val;
          this._mqttManager.setChargeTimerSlot(slotNum, { start: val });
        }
      });

      const inputSlotEnd = $.timerEditorCard.querySelector('#input-slot-end');
      inputSlotEnd?.addEventListener('change', (e) => {
        const val = e.target.value;
        if (activeSlot?.endEntity && this._hass) {
          const dom = activeSlot.endEntity.split('.')[0];
          if (dom === 'time') this._hass.callService('time', 'set_value', { entity_id: activeSlot.endEntity, time: val });
          else if (dom === 'text' || dom === 'input_text') this._hass.callService(dom, 'set_value', { entity_id: activeSlot.endEntity, value: val });
          else if (dom === 'input_datetime') this._hass.callService('input_datetime', 'set_datetime', { entity_id: activeSlot.endEntity, time: val + ':00' });
        }
        if (this._isMqttActive()) {
          activeSlot.end = val;
          this._mqttManager.setChargeTimerSlot(slotNum, { end: val });
        }
      });

      $.timerEditorCard.querySelectorAll('.preset-chip').forEach((pChip) => {
        pChip.addEventListener('click', () => {
          const preset = pChip.dataset.preset;
          if (activeSlot?.daysEntity && this._hass) {
            const dom = activeSlot.daysEntity.split('.')[0];
            if (dom === 'select') this._hass.callService('select', 'select_option', { entity_id: activeSlot.daysEntity, option: preset });
            else this._hass.callService(dom, 'set_value', { entity_id: activeSlot.daysEntity, value: preset });
          }
          if (this._isMqttActive()) {
            activeSlot.days = preset;
            this._mqttManager.setChargeTimerSlot(slotNum, { days: preset });
            this._updateTimersPanel();
          }
        });
      });

      $.timerEditorCard.querySelectorAll('.day-chip').forEach((dChip) => {
        dChip.addEventListener('click', () => {
          const clickedDay = dChip.dataset.day;
          let currentList = currentDays.toLowerCase() === 'everyday' ? [...daysArr] : currentDays.split(/[, ]+/).filter(Boolean);
          if (currentList.includes(clickedDay)) {
            currentList = currentList.filter((d) => d !== clickedDay);
          } else {
            currentList.push(clickedDay);
          }
          const nextVal = currentList.length === 7 ? 'Everyday' : currentList.join(', ');
          if (activeSlot?.daysEntity && this._hass) {
            const dom = activeSlot.daysEntity.split('.')[0];
            if (dom === 'select') this._hass.callService('select', 'select_option', { entity_id: activeSlot.daysEntity, option: nextVal });
            else this._hass.callService(dom, 'set_value', { entity_id: activeSlot.daysEntity, value: nextVal });
          }
          if (this._isMqttActive()) {
            activeSlot.days = nextVal;
            this._mqttManager.setChargeTimerSlot(slotNum, { days: nextVal });
            this._updateTimersPanel();
          }
        });
      });
    }
  }

  _updateDiagPanel() {
    if (!this.$.modalDiag) return;
    const $ = this.$;
    const lang = this._lang();
    const ents = this._resolveEntities();
    const m = this._mqtt?.state;
    const isMqtt = this._isMqttActive();

    const ignObj = this._getState(ents.ignition_state_entity);
    let ignRaw = (isMqtt && m?.diagnostics?.ignition) || String(ignObj?.state || 'off').toLowerCase().trim();
    const ignVal = ['ready', 'on', 'acc', 'off'].includes(ignRaw) ? ignRaw : 'off';
    $.diagIgnitionBadge.className = `ignition-badge ${ignVal}`;
    $.diagIgnitionBadge.textContent = ignVal.toUpperCase();

    const alarmObj = this._getState(ents.theft_alarm_entity);
    const alarmRaw = (isMqtt && m?.diagnostics?.alarm) || String(alarmObj?.state || 'disarmed').toLowerCase().trim();
    const isAlarmTriggered = ['triggered', 'alarm', 'on', 'true'].includes(alarmRaw);
    const isAlarmArmed = ['armed', 'active'].includes(alarmRaw);
    let bannerCls = 'alarm-banner disarmed';
    let bannerTxt = localize(lang, 'alarm_disarmed');
    if (isAlarmTriggered) {
      bannerCls = 'alarm-banner triggered';
      bannerTxt = localize(lang, 'alarm_triggered');
    } else if (isAlarmArmed) {
      bannerCls = 'alarm-banner armed';
      bannerTxt = localize(lang, 'alarm_armed');
    }
    $.diagAlarmBanner.className = bannerCls;
    $.diagAlarmText.textContent = bannerTxt;
    $.btnClearAlarm.style.display = (isAlarmTriggered && ents.clear_alarm_entity) || (isMqtt && isAlarmTriggered) ? 'inline-block' : 'none';
    $.diagAlarmVal.textContent = alarmObj ? alarmObj.state : (isMqtt ? alarmRaw : '--');

    const lastAlarmObj = this._getState(ents.theft_alarm_last_event_entity);
    const lastAlarmVal = (isMqtt && m?.diagnostics?.lastAlarmEvent) || lastAlarmObj?.state;
    if (lastAlarmVal && lastAlarmVal !== 'unknown' && lastAlarmVal !== 'unavailable' && lastAlarmVal !== 'none') {
      $.diagLastAlarmRow.style.display = 'flex';
      $.diagLastAlarmVal.textContent = lastAlarmVal;
    } else {
      $.diagLastAlarmRow.style.display = 'none';
    }

    const clockObj = this._getState(ents.car_clock_entity);
    $.diagClockVal.textContent = (isMqtt && m?.diagnostics?.carClock) || clockObj?.state || '--:--:--';

    const chObj = this._getState(ents.wifi_channel_entity);
    const chVal = (isMqtt && m?.diagnostics?.wifiChannel) || chObj?.state;
    $.diagWifiChannelVal.textContent = chVal ? `CH ${chVal}` : '--';

    const awObj = this._getState(ents.wifi_always_on_entity);
    const awActive = isMqtt && m?.diagnostics?.wifiAlwaysOn !== undefined ? m.diagnostics.wifiAlwaysOn : (awObj ? isBinaryOn(awObj) : null);
    $.diagWifiAlwaysVal.textContent = awActive !== null
      ? (awActive ? localize(lang, 'active') : localize(lang, 'inactive'))
      : '--';

    const thObj = this._getState(ents.battery_thermal_entity);
    $.diagThermalVal.textContent = (isMqtt && m?.diagnostics?.batteryThermal) || thObj?.state || '--';

    const warmObj = this._getState(ents.battery_warming_entity);
    const warmActive = isMqtt && m?.diagnostics?.batteryWarming !== undefined ? m.diagnostics.batteryWarming : (warmObj ? isBinaryOn(warmObj) : null);
    $.diagWarmingVal.textContent = warmActive !== null
      ? (warmActive ? localize(lang, 'active') : localize(lang, 'inactive'))
      : '--';

    const warnObj = this._getState(ents.battery_warning_entity);
    const warnActive = isMqtt && m?.diagnostics?.batteryWarning !== undefined ? m.diagnostics.batteryWarning : (warnObj ? isBinaryOn(warnObj) : null);
    $.diagWarningVal.textContent = warnActive !== null
      ? (warnActive ? localize(lang, 'active') : localize(lang, 'inactive'))
      : '--';

    const vinObj = this._getState(ents.vin_entity);
    $.diagVinVal.textContent = (isMqtt && m?.diagnostics?.vin) || vinObj?.state || '--';

    const fwObj = this._getState(ents.ecu_version_entity);
    $.diagFirmwareVal.textContent = (isMqtt && m?.diagnostics?.ecuVersion) || fwObj?.state || '--';

    const phObj = this._getState(ents.registered_phones_entity);
    $.diagPhonesVal.textContent = (isMqtt && m?.diagnostics?.registeredPhones) || (phObj ? `${phObj.state} / 2` : '--');
  }

  _updateSettingsModal() {
    if (!this._hass || !this.$.modalSettings) return;
    const lang = this._lang();
    const all = getPhevCustomizationSettings(this._hass, lang);
    const subEl = this.shadowRoot.getElementById('settings-modal-sub');
    if (subEl) {
      subEl.textContent = `${localize(lang, 'settings_sub')} · ${all.length} ${localize(lang, 'settings_active_count')}`;
    }
    this._renderSettingsChips();
    this._renderSettingsList();
  }

  _renderSettingsChips() {
    const $ = this.$;
    const lang = this._lang();
    const cats = [
      { id: 'all', label: localize(lang, 'cat_all') },
      { id: 'wipers', label: localize(lang, 'cat_wipers') },
      { id: 'turn_signal', label: localize(lang, 'cat_turn_signal') },
      { id: 'keyless', label: localize(lang, 'cat_keyless') },
      { id: 'lights', label: localize(lang, 'cat_lights') },
      { id: 'mirrors', label: localize(lang, 'cat_mirrors') },
      { id: 'locks', label: localize(lang, 'cat_locks') },
      { id: 'windows', label: localize(lang, 'cat_windows') },
      { id: 'ac', label: localize(lang, 'cat_ac') },
      { id: 'other', label: localize(lang, 'cat_other') },
    ];

    $.settingsCatChips.innerHTML = cats
      .map(
        (c) => `
      <button type="button" class="cat-chip ${this._settingsCategoryFilter === c.id ? 'active' : ''}" data-cat="${c.id}">
        ${c.label}
      </button>
    `
      )
      .join('');
  }

  _renderSettingsList() {
    const $ = this.$;
    const lang = this._lang();
    if (!this._hass) return;
    const all = getPhevCustomizationSettings(this._hass, lang);
    const filter = this._settingsCategoryFilter || 'all';
    const term = this._settingsSearchTerm || '';

    const filtered = all.filter((s) => {
      if (filter !== 'all' && s.cat !== filter) return false;
      if (term) {
        const text = `${s.label} ${s.entity_id} ${s.cat}`.toLowerCase();
        if (!text.includes(term)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      $.settingsModalList.innerHTML = `
        <div style="text-align:center;padding:32px;color:var(--ophev-muted);font-size:0.86rem;">
          ${localize(lang, 'offline_stale_hint')}
        </div>
      `;
      return;
    }

    $.settingsModalList.innerHTML = filtered
      .map(
        (s) => `
      <div class="setting-item">
        <div class="setting-left">
          <span class="setting-cat-badge">${localize(lang, `cat_${s.cat}`) || s.cat}</span>
          <span class="setting-label">${s.label}</span>
        </div>
        <select class="setting-select" data-ent="${s.entity_id}" data-slug="${s.slug}">
          ${s.options
            .map(
              (opt) => `<option value="${opt}" ${opt === s.state ? 'selected' : ''}>${opt}</option>`
            )
            .join('')}
        </select>
      </div>
    `
      )
      .join('');

    $.settingsModalList.querySelectorAll('.setting-select').forEach((sel) => {
      sel.addEventListener('change', (e) => {
        const ent = e.target.dataset.ent;
        const opt = e.target.value;
        const slug = e.target.dataset.slug;
        if (this._isMqttActive() && slug) {
          this._mqtt.state.settings[slug] = opt;
          this._mqtt.publish(`set/settings/${slug}`, opt);
          this._mqtt.publish(`settings/${slug}`, opt, true);
        }
        if (ent && opt && this._hass) {
          this._hass.callService('select', 'select_option', { entity_id: ent, option: opt });
        }
      });
    });
  }
}

if (!customElements.get('outlander-phev-card-editor')) {
  customElements.define('outlander-phev-card-editor', OutlanderPhevCardEditor);
}

if (!customElements.get('outlander-phev-card')) {
  customElements.define('outlander-phev-card', OutlanderPhevCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === 'outlander-phev-card')) {
  window.customCards.push({
    type: 'outlander-phev-card',
    name: 'Mitsubishi Outlander PHEV Card',
    preview: true,
    description: 'Interaktív felülnézeti Mitsubishi Outlander PHEV (phev2mqtt) kártya animált ajtókkal, lámpákkal, klímával és töltöttség-színezéssel.',
  });
}

console.info(
  '%c OUTLANDER-PHEV-CARD %c v1.3.0 ',
  'background:#0ea5e9;color:#fff;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px;',
  'background:#1e293b;color:#38bdf8;font-weight:700;padding:2px 6px;border-radius:0 4px 4px 0;'
);
