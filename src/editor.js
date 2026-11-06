import { localize } from './i18n.js';
import { CAR_PAINT_PRESETS, autoDiscoverPhevEntities } from './helpers.js';

const ENTITY_GROUPS = [
  {
    id: 'battery',
    titleKey: 'ed_sec_battery',
    open: true,
    fields: [
      { key: 'battery_entity', labelHu: 'Akkumulátor töltöttség (Battery %)', labelEn: 'Battery Level (%)', domains: ['sensor'] },
      { key: 'daily_charge_energy_entity', labelHu: '⭐ Napi töltés energiában (segéd entitás – kWh / kW)', labelEn: '⭐ Daily Charge Energy (helper – kWh / kW)', domains: ['sensor', 'input_number', 'number'] },
      { key: 'daily_charge_time_entity', labelHu: '⭐ Napi töltés órában / időtartamban (segéd entitás – óra / perc)', labelEn: '⭐ Daily Charge Duration (helper – h / min)', domains: ['sensor', 'input_number', 'input_text', 'number'] },
      { key: 'charging_entity', labelHu: 'Töltés folyamatban (Charging)', labelEn: 'Charging Active', domains: ['binary_sensor', 'sensor'] },
      { key: 'charger_connected_entity', labelHu: 'Töltő csatlakoztatva (Charger Connected)', labelEn: 'Charger Connected', domains: ['binary_sensor', 'sensor'] },
      { key: 'charge_remaining_entity', labelHu: 'Hátralévő töltési idő (Charge Remaining)', labelEn: 'Charge Remaining (min)', domains: ['sensor'] },
      { key: 'charge_remaining_hrs_entity', labelHu: 'Hátralévő idő formázva (opc. Charge remaining hrs)', labelEn: 'Charge Remaining Formatted (opt.)', domains: ['sensor'] },
      { key: 'estimated_completion_entity', labelHu: 'Becsült befejezés (opc. Estimated completion)', labelEn: 'Estimated Completion (opt.)', domains: ['sensor'] },
      { key: 'disable_charge_timer_entity', labelHu: 'Töltésidőzítő tiltása (Disable Charge Timer)', labelEn: 'Disable Charge Timer', domains: ['switch', 'button'] },
      { key: 'charger_power_entity', labelHu: 'Külső töltő teljesítmény (opc. W / kW)', labelEn: 'External Charger Power (opt. W / kW)', domains: ['sensor'] },
      { key: 'charger_energy_entity', labelHu: 'Külső elfogyasztott energia (opc. kWh)', labelEn: 'External Charger Energy (opt. kWh)', domains: ['sensor'] },
    ],
  },
  {
    id: 'doors',
    titleKey: 'ed_sec_doors',
    open: false,
    fields: [
      { key: 'locked_entity', labelHu: 'Központi zár (Locked)', labelEn: 'Central Lock (Locked)', domains: ['binary_sensor', 'lock'] },
      { key: 'driver_door_entity', labelHu: 'Vezetőoldali első ajtó (Driver Door)', labelEn: 'Driver Door', domains: ['binary_sensor'] },
      { key: 'front_passenger_door_entity', labelHu: 'Utasoldali első ajtó (Front Passenger Door)', labelEn: 'Front Passenger Door', domains: ['binary_sensor'] },
      { key: 'rear_left_door_entity', labelHu: 'Bal hátsó ajtó (Rear Left Door)', labelEn: 'Rear Left Door', domains: ['binary_sensor'] },
      { key: 'rear_right_door_entity', labelHu: 'Jobb hátsó ajtó (Rear Right Door)', labelEn: 'Rear Right Door', domains: ['binary_sensor'] },
      { key: 'bonnet_entity', labelHu: 'Motorháztető (Bonnet)', labelEn: 'Bonnet / Hood', domains: ['binary_sensor'] },
      { key: 'boot_entity', labelHu: 'Csomagtartó (Boot)', labelEn: 'Boot / Tailgate', domains: ['binary_sensor'] },
    ],
  },
  {
    id: 'climate',
    titleKey: 'ed_sec_climate',
    open: false,
    fields: [
      { key: 'cool_entity', labelHu: 'Hűtés kapcsoló (Cool)', labelEn: 'Cool Switch', domains: ['switch', 'input_boolean'] },
      { key: 'heat_entity', labelHu: 'Fűtés kapcsoló (Heat)', labelEn: 'Heat Switch', domains: ['switch', 'input_boolean'] },
      { key: 'windscreen_entity', labelHu: 'Szélvédő páramentesítés (Windscreen)', labelEn: 'Windscreen Defrost Switch', domains: ['switch', 'input_boolean'] },
      { key: 'climate_state_entity', labelHu: 'Klíma mód választó (Climate state)', labelEn: 'Climate State Select', domains: ['select', 'input_select', 'sensor'] },
    ],
  },
  {
    id: 'lights',
    titleKey: 'ed_sec_lights',
    open: false,
    fields: [
      { key: 'head_lights_entity', labelHu: 'Tompított fényszóró (Head Lights)', labelEn: 'Head Lights', domains: ['light', 'switch', 'input_boolean'] },
      { key: 'park_lights_entity', labelHu: 'Helyzetjelző (Park Lights)', labelEn: 'Park Lights', domains: ['light', 'switch', 'input_boolean'] },
      { key: 'hazard_lights_entity', labelHu: 'Elakadásjelző (Hazard Lights)', labelEn: 'Hazard Lights', domains: ['binary_sensor', 'light', 'switch'] },
      { key: 'interior_lights_entity', labelHu: 'Belső világítás (Interior Lights)', labelEn: 'Interior Lights', domains: ['binary_sensor', 'light'] },
      { key: 'connected_entity', labelHu: 'Autó Wi-Fi kapcsolat (Connected)', labelEn: 'Car Wi-Fi Connected', domains: ['binary_sensor'] },
      { key: 'restart_wifi_entity', labelHu: 'Wi-Fi újracsatlakozás gomb (Restart Wifi)', labelEn: 'Restart Wi-Fi Button', domains: ['button', 'switch', 'script'] },
    ],
  },
];

const EDITOR_STYLES = `
  :host {
    display: block;
    font-family: var(--paper-font-body1_-_font-family, system-ui, -apple-system, sans-serif);
    color: var(--primary-text-color, #e2e8f0);
  }
  * { box-sizing: border-box; }
  .ed-wrap {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 4px 0 12px;
  }
  .auto-box {
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.14), rgba(16, 185, 129, 0.12));
    border: 1px solid rgba(56, 189, 248, 0.35);
    border-radius: 14px;
    padding: 14px;
  }
  .auto-title {
    font-weight: 700;
    font-size: 0.92rem;
    margin-bottom: 4px;
  }
  .auto-desc {
    font-size: 0.8rem;
    opacity: 0.82;
    margin-bottom: 10px;
    line-height: 1.4;
  }
  .auto-btn {
    width: 100%;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid rgba(56, 189, 248, 0.55);
    background: rgba(14, 165, 233, 0.22);
    color: inherit;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .auto-btn:hover {
    background: rgba(14, 165, 233, 0.34);
  }
  .auto-msg {
    margin-top: 8px;
    font-size: 0.78rem;
    color: #10b981;
    font-weight: 600;
  }
  details.ed-section {
    border: 1px solid var(--divider-color, rgba(148, 163, 184, 0.22));
    border-radius: 12px;
    background: var(--card-background-color, rgba(15, 23, 42, 0.4));
    overflow: hidden;
  }
  details.ed-section > summary {
    padding: 12px 14px;
    font-weight: 700;
    font-size: 0.88rem;
    cursor: pointer;
    user-select: none;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  details.ed-section > summary::-webkit-details-marker { display: none; }
  details.ed-section > summary::after {
    content: '▾';
    opacity: 0.65;
    transition: transform 0.2s ease;
  }
  details.ed-section[open] > summary::after {
    transform: rotate(180deg);
  }
  .sec-body {
    padding: 4px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid var(--divider-color, rgba(148, 163, 184, 0.14));
  }
  .field-row {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .field-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .field-label {
    font-size: 0.78rem;
    font-weight: 600;
    opacity: 0.85;
  }
  .ed-input, .ed-select {
    width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(148, 163, 184, 0.3));
    background: var(--secondary-background-color, rgba(15, 23, 42, 0.65));
    color: var(--primary-text-color, #f1f5f9);
    font-size: 0.85rem;
    font-family: inherit;
  }
  .swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-top: 4px;
  }
  .swatch {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.25);
    cursor: pointer;
    padding: 0;
    transition: transform 0.15s ease, border-color 0.15s ease;
  }
  .swatch:hover { transform: scale(1.1); }
  .swatch.selected {
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.45);
  }
  .color-custom-wrap {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-left: 4px;
  }
  .color-picker-native {
    width: 34px;
    height: 30px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 4px 0;
  }
  .toggle-row input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #0ea5e9;
    cursor: pointer;
  }
`;

export class OutlanderPhevCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
    this._autoMsg = '';
    this._rendered = false;
    this._selectors = new Map();
  }

  setConfig(config) {
    this._config = { ...config };
    if (!this._rendered) {
      this._render();
    } else {
      this._syncValues();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._rendered) {
      this._render();
    } else {
      for (const sel of this._selectors.values()) {
        if (sel.el && 'hass' in sel.el) {
          sel.el.hass = hass;
        }
      }
    }
  }

  _emitConfig(patch) {
    const next = { ...this._config, ...patch };
    for (const [k, v] of Object.entries(next)) {
      if (v === '' || v === undefined) {
        delete next[k];
      }
    }
    this._config = next;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: next },
        bubbles: true,
        composed: true,
      })
    );
  }

  _lang() {
    return this._config.language || 'hu';
  }

  _render() {
    if (!this.shadowRoot) return;
    this._rendered = true;
    this._selectors.clear();
    const lang = this._lang();
    const cfg = this._config;
    const carColor = cfg.car_color || '#2b2f36';
    const fillOpacity = cfg.battery_fill_opacity ?? 36;

    this.shadowRoot.innerHTML = `
      <style>${EDITOR_STYLES}</style>
      <div class="ed-wrap">
        <div class="auto-box">
          <div class="auto-title">${localize(lang, 'ed_auto_title')}</div>
          <div class="auto-desc">${localize(lang, 'ed_auto_desc')}</div>
          <button type="button" class="auto-btn" id="btn-autodiscover">${localize(lang, 'ed_auto_btn')}</button>
          <div class="auto-msg" id="auto-msg">${this._autoMsg}</div>
        </div>

        <!-- General & Appearance -->
        <details class="ed-section" open>
          <summary>${localize(lang, 'ed_sec_general')}</summary>
          <div class="sec-body">
            <div class="field-grid-2">
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_title')}</label>
                <input class="ed-input" id="inp-title" type="text" value="${cfg.title ?? 'Outlander PHEV'}" />
              </div>
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_language')}</label>
                <select class="ed-select" id="sel-lang">
                  <option value="hu" ${lang === 'hu' ? 'selected' : ''}>Magyar (HU)</option>
                  <option value="en" ${lang === 'en' ? 'selected' : ''}>English (EN)</option>
                </select>
              </div>
            </div>

            <div class="field-grid-2">
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_steering')}</label>
                <select class="ed-select" id="sel-steering">
                  <option value="left" ${(cfg.steering_side || 'left') === 'left' ? 'selected' : ''}>${localize(lang, 'ed_steering_lhd')}</option>
                  <option value="right" ${cfg.steering_side === 'right' ? 'selected' : ''}>${localize(lang, 'ed_steering_rhd')}</option>
                </select>
              </div>
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_layout_mode')}</label>
                <select class="ed-select" id="sel-layout">
                  <option value="auto" ${(cfg.layout_mode || 'auto') === 'auto' ? 'selected' : ''}>${localize(lang, 'ed_layout_auto')}</option>
                  <option value="wide" ${cfg.layout_mode === 'wide' ? 'selected' : ''}>${localize(lang, 'ed_layout_wide')}</option>
                  <option value="compact" ${cfg.layout_mode === 'compact' ? 'selected' : ''}>${localize(lang, 'ed_layout_compact')}</option>
                </select>
              </div>
            </div>

            <div class="field-row">
              <label class="field-label">${localize(lang, 'ed_car_color')}</label>
              <div class="swatches" id="swatch-list">
                ${CAR_PAINT_PRESETS.map(
                  (p) => `
                  <button
                    type="button"
                    class="swatch ${carColor.toLowerCase() === p.hex.toLowerCase() ? 'selected' : ''}"
                    data-hex="${p.hex}"
                    title="${lang === 'hu' ? p.nameHu : p.nameEn}"
                    style="background: ${p.hex}"
                  ></button>
                `
                ).join('')}
                <div class="color-custom-wrap">
                  <input type="color" class="color-picker-native" id="inp-car-color" value="${carColor}" />
                  <span id="lbl-car-hex" style="font-size:0.76rem;opacity:0.75;">${carColor}</span>
                </div>
              </div>
            </div>

            <div class="field-grid-2">
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_battery_fill_mode')}</label>
                <select class="ed-select" id="sel-fill-mode">
                  <option value="always" ${(cfg.battery_fill_mode || 'always') === 'always' ? 'selected' : ''}>${localize(lang, 'ed_fill_always')}</option>
                  <option value="xray" ${cfg.battery_fill_mode === 'xray' ? 'selected' : ''}>${localize(lang, 'ed_fill_xray')}</option>
                  <option value="charging" ${cfg.battery_fill_mode === 'charging' ? 'selected' : ''}>${localize(lang, 'ed_fill_charging')}</option>
                  <option value="off" ${cfg.battery_fill_mode === 'off' ? 'selected' : ''}>${localize(lang, 'ed_fill_off')}</option>
                </select>
              </div>
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_battery_fill_opacity')} (<span id="lbl-opacity">${fillOpacity}%</span>)</label>
                <input type="range" id="inp-fill-opacity" min="15" max="75" step="1" value="${fillOpacity}" style="margin-top:6px;accent-color:#0ea5e9;" />
              </div>
            </div>

            <div class="field-grid-2">
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_daily_pos')}</label>
                <select class="ed-select" id="sel-daily-pos">
                  <option value="header" ${(cfg.daily_charge_position || 'header') === 'header' ? 'selected' : ''}>${localize(lang, 'ed_daily_pos_header')}</option>
                  <option value="panel" ${cfg.daily_charge_position === 'panel' ? 'selected' : ''}>${localize(lang, 'ed_daily_pos_panel')}</option>
                  <option value="both" ${cfg.daily_charge_position === 'both' ? 'selected' : ''}>${localize(lang, 'ed_daily_pos_both')}</option>
                </select>
              </div>
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_max_ev_range')}</label>
                <input class="ed-input" id="inp-ev-range" type="number" min="0" max="120" step="1" value="${cfg.max_ev_range ?? 45}" />
              </div>
            </div>

            <label class="toggle-row">
              <span class="field-label">${localize(lang, 'ed_show_card_frame')}</span>
              <input type="checkbox" id="chk-card-frame" ${cfg.show_card_frame !== false && cfg.frameless !== true ? 'checked' : ''} />
            </label>
            <label class="toggle-row">
              <span class="field-label">${localize(lang, 'ed_offline_dimming')}</span>
              <input type="checkbox" id="chk-offline-dim" ${cfg.offline_dimming !== false ? 'checked' : ''} />
            </label>
            <label class="toggle-row">
              <span class="field-label">${localize(lang, 'ed_show_sunroof')}</span>
              <input type="checkbox" id="chk-sunroof" ${cfg.show_sunroof !== false ? 'checked' : ''} />
            </label>
            <label class="toggle-row">
              <span class="field-label">${localize(lang, 'ed_interactive_car')}</span>
              <input type="checkbox" id="chk-interactive" ${cfg.interactive_car !== false ? 'checked' : ''} />
            </label>
            <label class="toggle-row">
              <span class="field-label">${localize(lang, 'ed_confirm_wifi')}</span>
              <input type="checkbox" id="chk-confirm-wifi" ${cfg.confirm_wifi_restart !== false ? 'checked' : ''} />
            </label>
            <label class="toggle-row">
              <span class="field-label">${localize(lang, 'ed_invert_lock')}</span>
              <input type="checkbox" id="chk-invert-lock" ${cfg.invert_lock === true ? 'checked' : ''} />
            </label>
          </div>
        </details>

        <!-- Entity Groups Container -->
        <div id="entity-groups-host" style="display:flex;flex-direction:column;gap:12px;"></div>
      </div>
    `;

    this._buildEntityPickers();
    this._bindEvents();
  }

  _buildEntityPickers() {
    const host = this.shadowRoot.getElementById('entity-groups-host');
    if (!host) return;
    host.innerHTML = '';
    const lang = this._lang();
    const hasHaSelector = Boolean(customElements.get('ha-selector'));

    for (const group of ENTITY_GROUPS) {
      const details = document.createElement('details');
      details.className = 'ed-section';
      if (group.open) details.open = true;

      const summary = document.createElement('summary');
      summary.textContent = localize(lang, group.titleKey);
      details.appendChild(summary);

      const body = document.createElement('div');
      body.className = 'sec-body';

      for (const field of group.fields) {
        const labelText = lang === 'hu' ? field.labelHu : field.labelEn;
        const currentVal = this._config[field.key] || '';

        if (hasHaSelector) {
          const selEl = document.createElement('ha-selector');
          selEl.hass = this._hass;
          selEl.selector = { entity: { domain: field.domains } };
          selEl.label = labelText;
          selEl.value = currentVal;
          selEl.addEventListener('value-changed', (ev) => {
            ev.stopPropagation();
            this._emitConfig({ [field.key]: ev.detail?.value || '' });
          });
          body.appendChild(selEl);
          this._selectors.set(field.key, { type: 'ha', el: selEl });
        } else {
          const row = document.createElement('div');
          row.className = 'field-row';
          const lbl = document.createElement('label');
          lbl.className = 'field-label';
          lbl.textContent = labelText;

          const inp = document.createElement('input');
          inp.className = 'ed-input';
          inp.type = 'text';
          inp.placeholder = `${field.domains[0]}.phev_...`;
          inp.value = currentVal;
          const listId = `dl-${field.key}`;
          inp.setAttribute('list', listId);

          const dl = document.createElement('datalist');
          dl.id = listId;
          if (this._hass?.states) {
            Object.values(this._hass.states)
              .filter((st) => field.domains.includes(st.entity_id.split('.')[0]))
              .forEach((st) => {
                const opt = document.createElement('option');
                opt.value = st.entity_id;
                opt.label = st.attributes?.friendly_name || st.entity_id;
                dl.appendChild(opt);
              });
          }

          inp.addEventListener('change', () => {
            this._emitConfig({ [field.key]: inp.value.trim() });
          });

          row.appendChild(lbl);
          row.appendChild(inp);
          row.appendChild(dl);
          body.appendChild(row);
          this._selectors.set(field.key, { type: 'input', el: inp });
        }
      }

      details.appendChild(body);
      host.appendChild(details);
    }
  }

  _bindEvents() {
    const sr = this.shadowRoot;
    sr.getElementById('btn-autodiscover')?.addEventListener('click', () => {
      const discovered = autoDiscoverPhevEntities(this._hass);
      const count = Object.keys(discovered).length;
      this._autoMsg = localize(this._lang(), 'ed_auto_result', { count });
      const msgEl = sr.getElementById('auto-msg');
      if (msgEl) msgEl.textContent = this._autoMsg;
      this._emitConfig(discovered);
      this._syncValues();
    });

    sr.getElementById('inp-title')?.addEventListener('input', (e) => {
      this._emitConfig({ title: e.target.value });
    });

    sr.getElementById('sel-lang')?.addEventListener('change', (e) => {
      this._emitConfig({ language: e.target.value });
      this._render();
    });

    sr.getElementById('sel-steering')?.addEventListener('change', (e) => {
      this._emitConfig({ steering_side: e.target.value });
    });

    sr.getElementById('sel-layout')?.addEventListener('change', (e) => {
      this._emitConfig({ layout_mode: e.target.value });
    });

    sr.getElementById('swatch-list')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.swatch');
      if (!btn) return;
      const hex = btn.dataset.hex;
      this._emitConfig({ car_color: hex });
      this._syncValues();
    });

    sr.getElementById('inp-car-color')?.addEventListener('input', (e) => {
      const hex = e.target.value;
      this._emitConfig({ car_color: hex });
      this._syncValues();
    });

    sr.getElementById('sel-fill-mode')?.addEventListener('change', (e) => {
      this._emitConfig({ battery_fill_mode: e.target.value });
    });

    sr.getElementById('inp-fill-opacity')?.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      const lbl = sr.getElementById('lbl-opacity');
      if (lbl) lbl.textContent = `${val}%`;
      this._emitConfig({ battery_fill_opacity: val });
    });

    sr.getElementById('sel-daily-pos')?.addEventListener('change', (e) => {
      this._emitConfig({ daily_charge_position: e.target.value });
    });

    sr.getElementById('inp-ev-range')?.addEventListener('change', (e) => {
      this._emitConfig({ max_ev_range: Number(e.target.value) || 0 });
    });

    sr.getElementById('chk-card-frame')?.addEventListener('change', (e) => {
      this._emitConfig({ show_card_frame: e.target.checked, frameless: undefined });
    });

    sr.getElementById('chk-offline-dim')?.addEventListener('change', (e) => {
      this._emitConfig({ offline_dimming: e.target.checked });
    });

    sr.getElementById('chk-sunroof')?.addEventListener('change', (e) => {
      this._emitConfig({ show_sunroof: e.target.checked });
    });

    sr.getElementById('chk-interactive')?.addEventListener('change', (e) => {
      this._emitConfig({ interactive_car: e.target.checked });
    });

    sr.getElementById('chk-confirm-wifi')?.addEventListener('change', (e) => {
      this._emitConfig({ confirm_wifi_restart: e.target.checked });
    });

    sr.getElementById('chk-invert-lock')?.addEventListener('change', (e) => {
      this._emitConfig({ invert_lock: e.target.checked });
    });
  }

  _syncValues() {
    const sr = this.shadowRoot;
    if (!sr) return;
    const carColor = this._config.car_color || '#2b2f36';
    const colorInp = sr.getElementById('inp-car-color');
    const hexLbl = sr.getElementById('lbl-car-hex');
    if (colorInp && colorInp.value.toLowerCase() !== carColor.toLowerCase()) {
      colorInp.value = carColor;
    }
    if (hexLbl) hexLbl.textContent = carColor;

    sr.querySelectorAll('.swatch').forEach((btn) => {
      btn.classList.toggle('selected', (btn.dataset?.hex || '').toLowerCase() === carColor.toLowerCase());
    });

    const dailyPosSel = sr.getElementById('sel-daily-pos');
    const dailyPosVal = this._config.daily_charge_position || 'header';
    if (dailyPosSel && dailyPosSel.value !== dailyPosVal) {
      dailyPosSel.value = dailyPosVal;
    }

    const frameChk = sr.getElementById('chk-card-frame');
    if (frameChk) {
      frameChk.checked = this._config.show_card_frame !== false && this._config.frameless !== true;
    }

    const offDimChk = sr.getElementById('chk-offline-dim');
    if (offDimChk) {
      offDimChk.checked = this._config.offline_dimming !== false;
    }

    for (const [key, entry] of this._selectors.entries()) {
      const nextVal = this._config[key] || '';
      if (entry.el && entry.el.value !== nextVal) {
        entry.el.value = nextVal;
      }
    }
  }
}
