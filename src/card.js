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
  formatDailyEnergy,
  formatDailyDuration,
  formatLastSeen,
  autoDiscoverPhevEntities,
  buildSparklinePaths,
  ENTITY_KEYS,
} from './helpers.js';
import { renderOutlanderSvg, CAR_NOSE_Y, CAR_REAR_Y, CAR_BODY_LEN } from './car-svg.js';
import { CARD_STYLES } from './styles.js';
import { OutlanderPhevCardEditor } from './editor.js';

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
  timerOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4"/><path d="M12 14l3-3"/><circle cx="12" cy="13" r="8"/><path d="M3 3l18 18"/></svg>`,
  wifiSync: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
  wifiOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 12.86a10 10 0 0 1 5.17-2.89"/><circle cx="12" cy="20" r="1"/></svg>`,
  hazard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9l-4.5 8h9L12 9z"/></svg>`,
  bulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.6 1 1.4 1 2.3h6c0-.9.4-1.7 1-2.3A7 7 0 0 0 12 2z"/></svg>`,
  counter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><line x1="12" y1="5" x2="12" y2="19"/><path d="M6.3 10.2 7.8 9v6"/><path d="M15.2 10.2a1.8 1.8 0 0 1 3.4.8c0 1.4-3.4 2.8-3.4 4h3.6"/></svg>`,
  batteryClock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h4"/><path d="M10.5 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.2"/><circle cx="16.5" cy="16.5" r="4.5"/><path d="M16.5 14.3v2.3l1.5 1"/></svg>`,
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
    this._wifiConfirmTimer = null;
    this._wifiSentTimer = null;
    this._timerSentTimer = null;
    this._optimistic = new Map();
    this._sparkCache = new Map();
    this.$ = {};
  }

  disconnectedCallback() {
    clearTimeout(this._wifiConfirmTimer);
    clearTimeout(this._wifiSentTimer);
    clearTimeout(this._timerSentTimer);
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
      ...config,
    };
    this._autoDiscoveredCache = null;

    if (!this.$.card || prevLang !== this._config.language) {
      this._buildDom();
    }
    this._updateState();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (!this.$.card) {
      this._buildDom();
    }
    this._updateState();
  }

  getCardSize() {
    return 7;
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
    const hasAnyConfigured = ENTITY_KEYS.some((k) => Boolean(this._config?.[k]));
    if (!hasAnyConfigured && this._hass) {
      if (!this._autoDiscoveredCache) {
        this._autoDiscoveredCache = autoDiscoverPhevEntities(this._hass);
      }
      return { ...this._autoDiscoveredCache, ...this._config };
    }
    return this._config;
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

  _toggleEntity(entityId) {
    if (!entityId || !this._hass) return;
    const currentlyOn = this._isControlOn(entityId);
    const nextState = !currentlyOn;
    this._setOptimistic(entityId, nextState);

    const domain = entityId.split('.')[0];
    if (domain === 'light' || domain === 'switch' || domain === 'input_boolean') {
      this._hass.callService(domain, nextState ? 'turn_on' : 'turn_off', { entity_id: entityId });
    } else {
      this._hass.callService('homeassistant', 'toggle', { entity_id: entityId });
    }
  }

  _handleDisableTimer() {
    const ents = this._resolveEntities();
    const entityId = ents.disable_charge_timer_entity;
    if (!entityId || !this._hass) return;
    const domain = entityId.split('.')[0];
    if (domain === 'button') {
      this._hass.callService('button', 'press', { entity_id: entityId });
    } else {
      // phev2mqtt listens on ~/set/cancelchargetimer when switch.turn_on is called
      this._hass.callService('switch', 'turn_on', { entity_id: entityId });
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
    if (!entityId || !this._hass) return;

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

    const domain = entityId.split('.')[0];
    if (domain === 'button') {
      this._hass.callService('button', 'press', { entity_id: entityId });
    } else if (domain === 'script') {
      this._hass.callService('script', 'turn_on', { entity_id: entityId });
    } else {
      this._hass.callService('homeassistant', 'turn_on', { entity_id: entityId });
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

          <!-- COLLAPSIBLE ALL-SENSORS DRAWER -->
          <div class="sensors-drawer" id="sensors-drawer"></div>
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

    $.selClimateMode.addEventListener('change', (e) => {
      const selEnt = ents().climate_state_entity;
      const option = e.target.value;
      if (!selEnt || !option || !this._hass) return;
      const dom = selEnt.split('.')[0];
      if (dom === 'select' || dom === 'input_select') {
        this._hass.callService(dom, 'select_option', { entity_id: selEnt, option });
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
    const socParsed = parseBatteryLevel(battObj, null);
    if (socParsed !== null) this._lastValidSoc = socParsed;
    const soc = socParsed ?? this._lastValidSoc ?? 0;

    const isCharging = isBinaryOn(this._getState(ents.charging_entity));
    const isPlugged = isCharging || isBinaryOn(this._getState(ents.charger_connected_entity));

    const battColors = getBatteryColors(soc, isCharging);
    $.card.style.setProperty('--batt-primary', battColors.primary);
    $.card.style.setProperty('--batt-secondary', battColors.secondary);
    $.card.style.setProperty('--batt-glow', battColors.glow);
    stg.style.setProperty('--batt-fill-opacity', String((cfg.battery_fill_opacity ?? 36) / 100));

    // Connection state & Offline Dimming
    const connObj = this._getState(ents.connected_entity);
    const battRawState = String(battObj?.state || '').toLowerCase();
    const isOnline = connObj
      ? isBinaryOn(connObj)
      : battObj
        ? battRawState !== 'unavailable' && battRawState !== 'unknown'
        : true;
    const showOfflineDim = !isOnline && cfg.offline_dimming !== false;
    const lastSeenStr = formatLastSeen(connObj || battObj, lang);

    $.hdrConnWrap.className = `conn-pill ${isOnline ? 'online' : 'offline'}`;
    $.hdrConnDot.className = `conn-dot ${isOnline ? 'online' : 'offline'}`;
    $.hdrConnIcon.innerHTML = isOnline ? ICONS.wifiSync : ICONS.wifiOff;
    $.hdrConnText.textContent = isOnline ? localize(lang, 'connected') : localize(lang, 'disconnected');
    $.hdrConnWrap.title = isOnline ? localize(lang, 'connected') : lastSeenStr;

    $.card.classList.toggle('is-offline', showOfflineDim);
    stg.classList.toggle('is-offline', showOfflineDim);
    $.offlineHudSub.textContent = lastSeenStr;
    $.btnOfflineReconnect.style.display = ents.restart_wifi_entity ? 'inline-flex' : 'none';
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
    const isLocked = isCarLocked(this._getState(ents.locked_entity), cfg.invert_lock);
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

    const openFl = isDoorOpen(flObj);
    const openFr = isDoorOpen(frObj);
    const openRl = isDoorOpen(rlObj);
    const openRr = isDoorOpen(rrObj);
    const openBonnet = isDoorOpen(bonnetObj);
    const openBoot = isDoorOpen(bootObj);

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
    const coolOn = this._isControlOn(ents.cool_entity) || selVal === 'cool';
    const heatOn = this._isControlOn(ents.heat_entity) || selVal === 'heat';
    const windscreenOn = this._isControlOn(ents.windscreen_entity) || selVal === 'windscreen';

    // Lights states
    const headOn = this._isControlOn(ents.head_lights_entity);
    const parkOn = this._isControlOn(ents.park_lights_entity);
    const hazardOn = this._isControlOn(ents.hazard_lights_entity);
    const interiorOn = isBinaryOn(this._getState(ents.interior_lights_entity));

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

    $.etaValue.textContent = formatRemainingTime(remObj, remHrsObj, lang);
    const finishStr = formatEstimatedCompletion(estCompObj, remObj, isCharging, lang);

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
