/**
 * Mitsubishi Outlander PHEV Lovelace Card (phev2mqtt)
 * Version: 1.3.0
 * Interactive top-down animated Home Assistant custom card for Mitsubishi Outlander PHEV
 * Zero external runtime dependencies — HACS & Lovelace ready.
 */
(function () {
  'use strict';

  // --- src/i18n.js ---
const TRANSLATIONS = {
  hu: {
    card_title_default: 'Outlander PHEV',
    connected: 'Kapcsolódva',
    disconnected: 'Nincs kapcsolat',
    offline_badge: 'Offline',
    offline_hud_title: 'Nincs kapcsolat az autóval',
    offline_hud_desc: 'Wi-Fi hatókörön kívül vagy alvó módban',
    offline_last_seen_today: 'Utoljára elérhető: ma {time}',
    offline_last_seen_date: 'Utoljára elérhető: {date}',
    offline_reconnect_btn: 'Wi-Fi újracsatlakozás',
    offline_stale_hint: 'Utolsó ismert állapot • Offline',
    locked: 'Zárolt',
    unlocked: 'Feloldva',
    doors_all_closed: 'Minden zárva',
    doors_open_count: '{count} nyitva',
    door_open: 'Nyitva',
    door_closed: 'Zárva',

    // Doors
    bonnet: 'Motorháztető',
    boot: 'Csomagtartó',
    driver_door: 'Vezetőoldali ajtó',
    front_passenger_door: 'Utasoldali első ajtó',
    rear_left_door: 'Bal hátsó ajtó',
    rear_right_door: 'Jobb hátsó ajtó',
    bonnet_short: 'Géptető',
    boot_short: 'Csomagtér',
    fl_short: 'Bal első',
    fr_short: 'Jobb első',
    rl_short: 'Bal hátsó',
    rr_short: 'Jobb hátsó',

    // Battery & Charging
    battery_title: 'Meghajtó akkumulátor',
    ev_range_est: '~{km} km EV hatótáv',
    charging_active: 'Töltés folyamatban',
    charger_standby: 'Csatlakoztatva • Várakozik',
    charger_full: 'Csatlakoztatva • Feltöltve',
    charger_unplugged: 'Töltő kihúzva',
    remaining_time: 'Hátralévő idő',
    estimated_finish: 'Várható befejezés',
    charger_power: 'Töltési teljesítmény',
    charger_energy: 'Elfogyasztott energia',
    daily_charge_energy: 'Napi töltés',
    daily_charge_time: 'Napi töltési idő',
    daily_charge_short: 'Napi töltés',
    disable_timer: 'Időzítő tiltása',
    disable_timer_sub: 'Azonnali töltés',
    timer_sent: 'Parancs elküldve!',

    // Climate
    climate_title: 'Előfűtés / Klíma',
    climate_off: 'Kikapcsolva',
    climate_cool: 'Hűtés',
    climate_heat: 'Fűtés',
    climate_windscreen: 'Szélvédő',
    climate_unknown: 'Készenlét',
    cool_btn: 'Hűtés',
    heat_btn: 'Fűtés',
    windscreen_btn: 'Szélvédő',
    climate_stop: 'Leállítás',

    // Lights & System
    lights_system_title: 'Világítás és rendszer',
    head_lights: 'Tompított',
    park_lights: 'Helyzetjelző',
    hazard_lights: 'Elakadásjelző',
    interior_lights: 'Belső fény',
    restart_wifi: 'Wi-Fi újraindítás',
    restart_wifi_confirm: 'Biztosan? Kattints újra',
    restart_wifi_sent: 'Újraindítás elküldve!',
    light_on: 'Világít',
    light_off: 'Kikapcsolva',

    // Sensors drawer
    sensors_drawer_title: 'Összes érzékelő állapota',
    show_details: 'Részletes érzékelők',
    hide_details: 'Részletek elrejtése',

    // Units & Time
    min_short: 'perc',
    min_tiny: 'p',
    hr_short: 'ó',
    and_word: 'és',
    not_charging: 'Nem tölt',
    active: 'Aktív',
    inactive: 'Inaktív',

    // Interactive car tooltips
    tip_headlights: 'Tompított fényszóró ki/bekapcsolása',
    tip_parklights: 'Helyzetjelző ki/bekapcsolása',
    tip_windscreen: 'Szélvédő páramentesítés ki/bekapcsolása',
    tip_cabin: 'Utastér / Klíma részletek',
    tip_chargeport: 'Töltőcsatlakozó állapota',

    // Editor
    ed_auto_title: 'Automatikus phev2mqtt beállítás',
    ed_auto_desc: 'Egy kattintással megkeresi a Mitsubishi Outlander PHEV eszközt és kitölti az összes érzékelőt és vezérlőt.',
    ed_auto_btn: '✨ phev2mqtt entitások automatikus kitöltése',
    ed_auto_result: '{count} entitás sikeresen felismerve és beállítva!',
    ed_sec_general: 'Általános és megjelenés',
    ed_sec_battery: 'Akkumulátor és töltés (külső és napi mérőkkel)',
    ed_sec_doors: 'Ajtók és központi zár',
    ed_sec_climate: 'Klímavezérlés',
    ed_sec_lights: 'Világítás és kapcsolat',
    ed_title: 'Kártya címe',
    ed_language: 'Nyelv',
    ed_steering: 'Kormány elhelyezkedése',
    ed_steering_lhd: 'Balkormányos (Európai)',
    ed_steering_rhd: 'Jobbkormányos (UK / JP / AU)',
    ed_car_color: 'Autó fényezésének színe',
    ed_battery_fill_mode: 'Töltöttség színezése az autón',
    ed_fill_always: 'Mindig látható az autón (% arányosan)',
    ed_fill_charging: 'Csak csatlakoztatott / töltő állapotban',
    ed_fill_xray: 'Autó színezés + PHEV akkupakk röntgennézet',
    ed_fill_off: 'Kikapcsolva',
    ed_battery_fill_opacity: 'Töltöttség-színezés intenzitása',
    ed_layout_mode: 'Elrendezés módja',
    ed_layout_auto: 'Automatikus (Reszponzív)',
    ed_layout_wide: 'Széles (2 oszlopos műszerfal)',
    ed_layout_compact: 'Kompakt (Egymás alatt)',
    ed_daily_pos: 'Napi töltés adatok megjelenítési helye',
    ed_daily_pos_header: 'Kártya felső fejlécében (jelvényként)',
    ed_daily_pos_panel: 'Töltés panelen kiemelt kártyaként',
    ed_daily_pos_both: 'Mindkét helyen (Fejléc + Töltés panel)',
    ed_max_ev_range: 'Becsült max. EV hatótáv 100%-nál (km, 0 = elrejtve)',
    ed_show_card_frame: 'Külső keret és háttér megjelenítése (kikapcsolva csak a blokkok háttere marad)',
    ed_offline_dimming: 'Offline állapot látványos kiemelése (autó és vezérlők elszürkítése)',
    ed_show_sunroof: 'Napfénytető megjelenítése az autón',
    ed_interactive_car: 'Interaktív érintési zónák engedélyezése az autón',
    ed_confirm_wifi: 'Megerősítés kérése Wi-Fi újraindítás előtt',
    ed_invert_lock: 'Zár állapotának megfordítása (ha ellentétesen jelez)',
  },
  en: {
    card_title_default: 'Outlander PHEV',
    connected: 'Connected',
    disconnected: 'Disconnected',
    offline_badge: 'Offline',
    offline_hud_title: 'Vehicle Disconnected',
    offline_hud_desc: 'Out of Wi-Fi range or in sleep mode',
    offline_last_seen_today: 'Last online: today {time}',
    offline_last_seen_date: 'Last online: {date}',
    offline_reconnect_btn: 'Reconnect Wi-Fi',
    offline_stale_hint: 'Last known state • Offline',
    locked: 'Locked',
    unlocked: 'Unlocked',
    doors_all_closed: 'All closed',
    doors_open_count: '{count} open',
    door_open: 'Open',
    door_closed: 'Closed',

    bonnet: 'Bonnet',
    boot: 'Boot',
    driver_door: 'Driver Door',
    front_passenger_door: 'Front Passenger Door',
    rear_left_door: 'Rear Left Door',
    rear_right_door: 'Rear Right Door',
    bonnet_short: 'Bonnet',
    boot_short: 'Boot',
    fl_short: 'Front Left',
    fr_short: 'Front Right',
    rl_short: 'Rear Left',
    rr_short: 'Rear Right',

    battery_title: 'Drive Battery',
    ev_range_est: '~{km} km EV range',
    charging_active: 'Charging in progress',
    charger_standby: 'Plugged in • Standby',
    charger_full: 'Plugged in • Charged',
    charger_unplugged: 'Unplugged',
    remaining_time: 'Remaining',
    estimated_finish: 'Est. completion',
    charger_power: 'Charging power',
    charger_energy: 'Energy consumed',
    daily_charge_energy: 'Daily charge',
    daily_charge_time: 'Daily charge time',
    daily_charge_short: 'Daily charge',
    disable_timer: 'Disable Timer',
    disable_timer_sub: 'Charge now',
    timer_sent: 'Command sent!',

    climate_title: 'Pre-Conditioning',
    climate_off: 'Off',
    climate_cool: 'Cooling',
    climate_heat: 'Heating',
    climate_windscreen: 'Windscreen',
    climate_unknown: 'Standby',
    cool_btn: 'Cool',
    heat_btn: 'Heat',
    windscreen_btn: 'Defrost',
    climate_stop: 'Turn Off',

    lights_system_title: 'Lights & System',
    head_lights: 'Head Lights',
    park_lights: 'Park Lights',
    hazard_lights: 'Hazard Lights',
    interior_lights: 'Interior Lights',
    restart_wifi: 'Restart Wi-Fi',
    restart_wifi_confirm: 'Sure? Tap again',
    restart_wifi_sent: 'Restart sent!',
    light_on: 'On',
    light_off: 'Off',

    sensors_drawer_title: 'All Sensor States',
    show_details: 'Detailed sensors',
    hide_details: 'Hide details',

    min_short: 'min',
    min_tiny: 'm',
    hr_short: 'h',
    and_word: '',
    not_charging: 'Not charging',
    active: 'Active',
    inactive: 'Off',

    tip_headlights: 'Toggle Head Lights',
    tip_parklights: 'Toggle Park Lights',
    tip_windscreen: 'Toggle Windscreen Defrost',
    tip_cabin: 'Cabin / Climate details',
    tip_chargeport: 'Charge port status',

    ed_auto_title: 'Automatic phev2mqtt Setup',
    ed_auto_desc: 'Automatically detects your Mitsubishi Outlander PHEV device and maps all sensors and controls.',
    ed_auto_btn: '✨ Auto-detect phev2mqtt entities',
    ed_auto_result: '{count} entities detected and mapped!',
    ed_sec_general: 'General & Appearance',
    ed_sec_battery: 'Battery & Charging (incl. External & Daily Meters)',
    ed_sec_doors: 'Doors & Central Lock',
    ed_sec_climate: 'Climate Controls',
    ed_sec_lights: 'Lights & Connectivity',
    ed_title: 'Card Title',
    ed_language: 'Language',
    ed_steering: 'Steering Side',
    ed_steering_lhd: 'Left-Hand Drive (LHD)',
    ed_steering_rhd: 'Right-Hand Drive (RHD)',
    ed_car_color: 'Car Paint Color',
    ed_battery_fill_mode: 'Battery Percentage Fill on Car',
    ed_fill_always: 'Always visible on car (proportional %)',
    ed_fill_charging: 'Only when plugged in / charging',
    ed_fill_xray: 'Car fill + PHEV battery pack X-ray',
    ed_fill_off: 'Disabled',
    ed_battery_fill_opacity: 'Battery fill intensity',
    ed_layout_mode: 'Layout Mode',
    ed_layout_auto: 'Auto (Responsive)',
    ed_layout_wide: 'Wide (2-column dashboard)',
    ed_layout_compact: 'Compact (Stacked)',
    ed_daily_pos: 'Daily Charging Stats Location',
    ed_daily_pos_header: 'Top Card Header (Badge style)',
    ed_daily_pos_panel: 'Battery & Charging Panel (Highlighted tiles)',
    ed_daily_pos_both: 'Both (Header + Charging Panel)',
    ed_max_ev_range: 'Est. max EV range at 100% (km, 0 = hidden)',
    ed_show_card_frame: 'Show outer card frame & background (when off, only inner blocks keep their backgrounds)',
    ed_offline_dimming: 'Highlight offline state (dim car & unreachable controls)',
    ed_show_sunroof: 'Show sunroof on car',
    ed_interactive_car: 'Enable interactive touch zones on car',
    ed_confirm_wifi: 'Require confirmation before Restart Wi-Fi',
    ed_invert_lock: 'Invert lock sensor polarity',
  },
};
function localize(lang, key, vars = {}) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.hu;
  let str = dict[key] ?? TRANSLATIONS.hu[key] ?? key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, String(v));
  }
  return str;
}

  // --- src/helpers.js ---
const CAR_PAINT_PRESETS = [
  { id: 'titanium_grey', nameHu: 'Titánszürke / Grafit', nameEn: 'Titanium Grey', hex: '#2b2f36' },
  { id: 'phantom_black', nameHu: 'Fantomfekete', nameEn: 'Phantom Black', hex: '#17191e' },
  { id: 'granite_grey', nameHu: 'Gránitszürke', nameEn: 'Granite Grey', hex: '#4a525d' },
  { id: 'sterling_silver', nameHu: 'Ezüstmetál', nameEn: 'Sterling Silver', hex: '#9ca4b0' },
  { id: 'pearl_white', nameHu: 'Gyöngyházfehér', nameEn: 'Pearl White', hex: '#e7ecf2' },
  { id: 'orient_red', nameHu: 'Rubinvörös', nameEn: 'Orient Red', hex: '#8e1c24' },
  { id: 'cosmic_blue', nameHu: 'Kozmoszkék', nameEn: 'Cosmic Blue', hex: '#1c3e70' },
  { id: 'quartz_bronze', nameHu: 'Kvarcbronz', nameEn: 'Quartz Bronze', hex: '#524136' },
];
const ENTITY_KEYS = [
  'battery_entity',
  'charging_entity',
  'charger_connected_entity',
  'charge_remaining_entity',
  'charge_remaining_hrs_entity',
  'estimated_completion_entity',
  'disable_charge_timer_entity',
  'charger_power_entity',
  'charger_energy_entity',
  'daily_charge_energy_entity',
  'daily_charge_time_entity',
  'locked_entity',
  'driver_door_entity',
  'front_passenger_door_entity',
  'rear_left_door_entity',
  'rear_right_door_entity',
  'bonnet_entity',
  'boot_entity',
  'climate_state_entity',
  'cool_entity',
  'heat_entity',
  'windscreen_entity',
  'head_lights_entity',
  'park_lights_entity',
  'hazard_lights_entity',
  'interior_lights_entity',
  'connected_entity',
  'restart_wifi_entity',
];

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function hexToRgb(hex) {
  const clean = String(hex || '#2b2f36').replace('#', '').trim();
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean.padEnd(6, '0').slice(0, 6);
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return { r: 43, g: 47, b: 54 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixRgb(a, b, t) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}
function computeCarPaintPalette(hex = '#2b2f36') {
  const baseRgb = hexToRgb(hex);
  const white = { r: 255, g: 255, b: 255 };
  const coolSpec = { r: 226, g: 238, b: 255 };
  const black = { r: 8, g: 10, b: 14 };

  const luminance = (0.299 * baseRgb.r + 0.587 * baseRgb.g + 0.114 * baseRgb.b) / 255;
  const isLight = luminance > 0.62;

  return {
    base: rgbToHex(baseRgb),
    light: rgbToHex(mixRgb(baseRgb, white, isLight ? 0.22 : 0.18)),
    highlight: rgbToHex(mixRgb(baseRgb, coolSpec, isLight ? 0.42 : 0.32)),
    specular: rgbToHex(mixRgb(baseRgb, white, isLight ? 0.68 : 0.48)),
    mid: rgbToHex(mixRgb(baseRgb, black, isLight ? 0.08 : 0.12)),
    dark: rgbToHex(mixRgb(baseRgb, black, isLight ? 0.22 : 0.38)),
    deep: rgbToHex(mixRgb(baseRgb, black, isLight ? 0.38 : 0.62)),
    seam: isLight ? 'rgba(15, 23, 42, 0.36)' : 'rgba(4, 7, 12, 0.72)',
    creaseLight: isLight ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.17)',
    isLight,
  };
}
function getBatteryColors(pct, isCharging = false) {
  const p = clamp(Number.isFinite(pct) ? pct : 0, 0, 100);
  if (p < 20) {
    return {
      primary: '#ef4444',
      secondary: '#f97316',
      glow: 'rgba(239, 68, 68, 0.55)',
      soft: 'rgba(239, 68, 68, 0.18)',
    };
  }
  if (p < 45) {
    return {
      primary: '#f59e0b',
      secondary: '#06b6d4',
      glow: 'rgba(245, 158, 11, 0.5)',
      soft: 'rgba(245, 158, 11, 0.18)',
    };
  }
  return {
    primary: isCharging ? '#10b981' : '#0ea5e9',
    secondary: isCharging ? '#06b6d4' : '#10b981',
    glow: isCharging ? 'rgba(16, 185, 129, 0.58)' : 'rgba(14, 165, 233, 0.48)',
    soft: isCharging ? 'rgba(16, 185, 129, 0.18)' : 'rgba(14, 165, 233, 0.16)',
  };
}
function isBinaryOn(stateObj) {
  if (!stateObj) return false;
  const s = String(stateObj.state || '').toLowerCase().trim();
  return s === 'on' || s === 'open' || s === 'connected' || s === 'charging' || s === 'true' || s === '1';
}
function isDoorOpen(stateObj) {
  if (!stateObj) return false;
  const s = String(stateObj.state || '').toLowerCase().trim();
  return s === 'on' || s === 'open' || s === 'nyitva' || s === 'true';
}
function isCarLocked(stateObj, invertLock = false) {
  if (!stateObj) return true;
  const s = String(stateObj.state || '').toLowerCase().trim();
  if (s === 'unavailable' || s === 'unknown' || s === '') return true;

  const domain = stateObj.entity_id?.split('.')[0] || '';
  const devClass = stateObj.attributes?.device_class || '';

  let locked;
  if (domain === 'lock') {
    locked = s === 'locked';
  } else if (devClass === 'lock') {
    // In Home Assistant, binary_sensor with device_class: lock has 'off' = Locked, 'on' = Unlocked!
    locked = s === 'off' || s === 'closed' || s === 'locked';
  } else if (s === 'closed' || s === 'locked' || s === 'zárolt') {
    locked = true;
  } else if (s === 'open' || s === 'unlocked' || s === 'nyitva' || s === 'feloldva') {
    locked = false;
  } else {
    // Fallback for phev2mqtt binary_sensor.*_locked
    locked = s === 'off';
  }

  return invertLock ? !locked : locked;
}
function parseBatteryLevel(stateObj, fallback = null) {
  if (!stateObj) return fallback;
  const n = parseFloat(String(stateObj.state).replace(',', '.'));
  if (!Number.isFinite(n)) return fallback;
  return clamp(Math.round(n), 0, 100);
}
function formatNumber(value, decimals = 0, lang = 'hu') {
  const n = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
  if (!Number.isFinite(n)) return null;
  return n.toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}
function formatRemainingTime(remainingObj, remainingHrsObj, lang = 'hu') {
  if (remainingObj) {
    const mins = parseFloat(String(remainingObj.state).replace(',', '.'));
    if (Number.isFinite(mins) && mins > 0 && mins < 1440) {
      const total = Math.round(mins);
      const h = Math.floor(total / 60);
      const m = total % 60;
      if (h > 0) {
        return `${h} ${localize(lang, 'hr_short')} ${m} ${localize(lang, 'min_short')}`;
      }
      return `${m} ${localize(lang, 'min_short')}`;
    }
  }
  if (remainingHrsObj) {
    const raw = String(remainingHrsObj.state || '').trim();
    if (raw && raw !== 'unknown' && raw !== 'unavailable' && raw !== '0' && !/^0\s*(min|perc|h|ó)/i.test(raw)) {
      const unit = remainingHrsObj.attributes?.unit_of_measurement || '';
      return unit && !raw.includes(unit) ? `${raw} ${unit}` : raw;
    }
  }
  return `0 ${localize(lang, 'min_short')}`;
}
function formatEstimatedCompletion(estObj, remainingObj, isCharging, lang = 'hu') {
  if (estObj) {
    const raw = String(estObj.state || '').trim();
    if (raw && raw !== 'unknown' && raw !== 'unavailable') {
      // Check if ISO timestamp
      if (/^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}/.test(raw)) {
        const dt = new Date(raw);
        if (!Number.isNaN(dt.getTime())) {
          return dt.toLocaleTimeString(lang === 'hu' ? 'hu-HU' : 'en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      }
      return raw;
    }
  }
  if (isCharging && remainingObj) {
    const mins = parseFloat(String(remainingObj.state).replace(',', '.'));
    if (Number.isFinite(mins) && mins > 0 && mins < 1440) {
      const finish = new Date(Date.now() + mins * 60 * 1000);
      return `~${finish.toLocaleTimeString(lang === 'hu' ? 'hu-HU' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
  }
  return localize(lang, 'not_charging');
}
function formatDailyEnergy(stateObj, hass, lang = 'hu') {
  if (!stateObj) return '--';
  const raw = String(stateObj.state ?? '').trim();
  if (!raw || raw === 'unknown' || raw === 'unavailable') return '--';

  if (typeof hass?.formatEntityState === 'function') {
    const formatted = hass.formatEntityState(stateObj);
    if (formatted && formatted !== 'unknown' && formatted !== 'unavailable') {
      return formatted;
    }
  }

  const numStr = formatNumber(raw, 2, lang);
  const unit = stateObj.attributes?.unit_of_measurement || 'kWh';
  return numStr !== null ? `${numStr} ${unit}`.trim() : (unit && !raw.includes(unit) ? `${raw} ${unit}` : raw);
}
function formatDailyDuration(stateObj, hass, lang = 'hu') {
  if (!stateObj) return '--';
  const raw = String(stateObj.state ?? '').trim();
  if (!raw || raw === 'unknown' || raw === 'unavailable') return '--';

  // Use Home Assistant's native duration formatter when device_class is duration
  if (typeof hass?.formatEntityState === 'function' && stateObj.attributes?.device_class === 'duration') {
    const formatted = hass.formatEntityState(stateObj);
    if (formatted && formatted !== 'unknown' && formatted !== 'unavailable') {
      return formatted;
    }
  }

  const num = parseFloat(raw.replace(',', '.'));
  if (!Number.isFinite(num) || /[:óhp]/i.test(raw)) {
    const unit = stateObj.attributes?.unit_of_measurement || '';
    return unit && !raw.includes(unit) ? `${raw} ${unit}` : raw;
  }

  const unit = String(stateObj.attributes?.unit_of_measurement || 'h').toLowerCase().trim();
  let totalMinutes;
  if (unit === 's' || unit === 'sec' || unit === 'seconds' || unit === 'mp') {
    totalMinutes = Math.round(num / 60);
  } else if (unit === 'min' || unit === 'm' || unit === 'perc' || unit === 'minutes') {
    totalMinutes = Math.round(num);
  } else {
    // Default hours (e.g. Home Assistant history_stats sensor: 0.47 h -> 28 min)
    totalMinutes = Math.round(num * 60);
  }

  const h = Math.floor(Math.max(0, totalMinutes) / 60);
  const m = Math.max(0, totalMinutes) % 60;
  if (lang === 'hu') {
    return `${h} ${localize(lang, 'hr_short')} ${localize(lang, 'and_word')} ${m} ${localize(lang, 'min_tiny')}`;
  }
  return `${h}${localize(lang, 'hr_short')} ${m}${localize(lang, 'min_tiny')}`;
}
function formatLastSeen(stateObj, lang = 'hu') {
  const rawTs = stateObj?.last_changed || stateObj?.last_updated;
  if (rawTs) {
    const dt = new Date(rawTs);
    if (!Number.isNaN(dt.getTime())) {
      const now = new Date();
      const sameDay =
        dt.getFullYear() === now.getFullYear() &&
        dt.getMonth() === now.getMonth() &&
        dt.getDate() === now.getDate();
      const locale = lang === 'hu' ? 'hu-HU' : 'en-GB';
      if (sameDay) {
        const time = dt.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        return localize(lang, 'offline_last_seen_today', { time });
      }
      const date = dt.toLocaleString(locale, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return localize(lang, 'offline_last_seen_date', { date });
    }
  }
  return localize(lang, 'offline_hud_desc');
}

/**
 * Automatically discovers phev2mqtt entities from Home Assistant's device/entity registries and state machine.
 */
function autoDiscoverPhevEntities(hass) {
  if (!hass || !hass.states) return {};

  const allStates = Object.values(hass.states).filter((st) => st && typeof st.entity_id === 'string');
  const phevDeviceIds = new Set();

  if (hass.devices) {
    for (const [devId, dev] of Object.entries(hass.devices)) {
      const hay = `${dev.manufacturer || ''} ${dev.model || ''} ${dev.name || ''} ${dev.name_by_user || ''}`.toLowerCase();
      if (hay.includes('mitsubishi') || hay.includes('outlander') || hay.includes('phev')) {
        phevDeviceIds.add(devId);
      }
    }
  }

  let candidateIds = new Set();
  if (phevDeviceIds.size > 0 && hass.entities) {
    for (const [entId, ent] of Object.entries(hass.entities)) {
      if (ent.device_id && phevDeviceIds.has(ent.device_id) && hass.states[entId]) {
        candidateIds.add(entId);
      }
    }
  }

  // Also include entities matching phev / outlander or signature phev2mqtt names
  for (const st of allStates) {
    const id = st.entity_id.toLowerCase();
    const fn = String(st.attributes?.friendly_name || '').toLowerCase();
    if (
      id.includes('phev') ||
      id.includes('outlander') ||
      fn.includes('phev') ||
      fn.includes('outlander') ||
      id.includes('restart_wifi_connetion') ||
      id.includes('reconnect_wifi') ||
      id.includes('cancel_charge_timer') ||
      id.includes('front_passenger')
    ) {
      candidateIds.add(st.entity_id);
    }
  }

  // If still small, search all states for exact phev2mqtt friendly names (e.g., when device prefix was stripped in HA)
  const pool = candidateIds.size >= 4
    ? Array.from(candidateIds).map((id) => hass.states[id]).filter(Boolean)
    : allStates;

  const pick = (domains, matchFn) => {
    // Prefer candidates from the PHEV pool first, then fallback to allStates for helper templates
    const foundInPool = pool.find((st) => {
      const dom = st.entity_id.split('.')[0];
      if (domains && !domains.includes(dom)) return false;
      const id = st.entity_id.toLowerCase();
      const fn = String(st.attributes?.friendly_name || '').toLowerCase();
      return matchFn(id, fn, st);
    });
    if (foundInPool) return foundInPool.entity_id;

    const foundGlobal = allStates.find((st) => {
      const dom = st.entity_id.split('.')[0];
      if (domains && !domains.includes(dom)) return false;
      const id = st.entity_id.toLowerCase();
      const fn = String(st.attributes?.friendly_name || '').toLowerCase();
      return (id.includes('phev') || id.includes('outlander') || id.includes('charge')) && matchFn(id, fn, st);
    });
    return foundGlobal ? foundGlobal.entity_id : undefined;
  };

  const result = {
    battery_entity: pick(['sensor'], (id, fn, st) =>
      (id.includes('battery_level') || /\bbattery\b/.test(fn) || id.endsWith('_battery')) &&
      !id.includes('charge') &&
      !id.includes('charging') &&
      (st.attributes?.unit_of_measurement === '%' || st.attributes?.device_class === 'battery')
    ),
    charging_entity: pick(['binary_sensor'], (id, fn) =>
      (id.includes('battery_charging') || id.endsWith('_charging') || fn === 'charging' || fn.endsWith(' charging')) &&
      !id.includes('connected')
    ),
    charger_connected_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('charger_connected') || id.includes('charge_plug') || fn.includes('charger connected')
    ),
    charge_remaining_entity: pick(['sensor'], (id, fn) =>
      (id.includes('charge_remaining') || fn.includes('charge remaining')) &&
      !id.includes('hrs') &&
      !fn.includes('(hrs)')
    ),
    charge_remaining_hrs_entity: pick(['sensor'], (id, fn) =>
      (id.includes('charge_remaining') && id.includes('hrs')) || fn.includes('charge remaining (hrs)')
    ),
    estimated_completion_entity: pick(['sensor'], (id, fn) =>
      id.includes('estimated_charge_completion') || fn.includes('estimated charge completion')
    ),
    disable_charge_timer_entity: pick(['switch', 'button'], (id, fn) =>
      id.includes('cancel_charge_timer') || id.includes('disable_charge_timer') || fn.includes('disable charge timer')
    ),
    locked_entity: pick(['binary_sensor', 'lock'], (id, fn) =>
      id.includes('door_locked') || id.endsWith('_locked') || fn === 'locked' || fn.endsWith(' locked')
    ),
    driver_door_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('door_driver') || id.includes('driver_door') || fn.includes('driver door')
    ),
    front_passenger_door_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('front_passenger') || fn.includes('front passenger door')
    ),
    rear_left_door_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('rear_left') || fn.includes('rear left door')
    ),
    rear_right_door_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('rear_right') || fn.includes('rear right door')
    ),
    bonnet_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('bonnet') || fn.includes('bonnet')
    ),
    boot_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('boot') || fn.includes('boot')
    ),
    climate_state_entity: pick(['select', 'sensor'], (id, fn) =>
      id.includes('climate_on') || id.includes('climate_state') || fn.includes('climate state')
    ),
    cool_entity: pick(['switch'], (id, fn) =>
      id.includes('climate_cool') || id.endsWith('_cool') || fn === 'cool' || fn.endsWith(' cool')
    ),
    heat_entity: pick(['switch'], (id, fn) =>
      id.includes('climate_heat') || id.endsWith('_heat') || fn === 'heat' || fn.endsWith(' heat')
    ),
    windscreen_entity: pick(['switch'], (id, fn) =>
      id.includes('windscreen') || fn.includes('windscreen')
    ),
    head_lights_entity: pick(['light', 'switch'], (id, fn) =>
      id.includes('headlights') || id.includes('head_lights') || fn.includes('head lights')
    ),
    park_lights_entity: pick(['light', 'switch'], (id, fn) =>
      id.includes('parkinglights') || id.includes('park_lights') || fn.includes('park lights')
    ),
    hazard_lights_entity: pick(['binary_sensor', 'light', 'switch'], (id, fn) =>
      id.includes('hazardlights') || id.includes('hazard_lights') || fn.includes('hazard lights')
    ),
    interior_lights_entity: pick(['binary_sensor', 'light'], (id, fn) =>
      id.includes('interiorlights') || id.includes('interior_lights') || fn.includes('interior lights')
    ),
    connected_entity: pick(['binary_sensor'], (id, fn, st) =>
      (id.endsWith('_connected') || fn === 'connected' || fn.endsWith(' connected') || st.attributes?.device_class === 'connectivity') &&
      !id.includes('charger')
    ),
    restart_wifi_entity: pick(['button', 'switch'], (id, fn) =>
      id.includes('reconnect_wifi') || id.includes('restart_wifi') || fn.includes('restart wifi')
    ),
    daily_charge_energy_entity: allStates.find((st) => {
      const dom = st.entity_id.split('.')[0];
      if (!['sensor', 'input_number', 'number'].includes(dom)) return false;
      const id = st.entity_id.toLowerCase();
      const fn = String(st.attributes?.friendly_name || '').toLowerCase();
      const unit = String(st.attributes?.unit_of_measurement || '').toLowerCase();
      const dc = String(st.attributes?.device_class || '').toLowerCase();
      const isDaily =
        id.includes('napi_toltes') ||
        fn.includes('napi töltés') ||
        fn.includes('napi toltes') ||
        id.includes('daily_charg') ||
        fn.includes('daily charg');
      const isEnergyOrPower =
        ['kwh', 'wh', 'kw', 'w'].includes(unit) || dc === 'energy' || dc === 'power';
      return isDaily && isEnergyOrPower;
    })?.entity_id,
    daily_charge_time_entity: allStates.find((st) => {
      const dom = st.entity_id.split('.')[0];
      if (!['sensor', 'input_number', 'input_text', 'number'].includes(dom)) return false;
      const id = st.entity_id.toLowerCase();
      const fn = String(st.attributes?.friendly_name || '').toLowerCase();
      const unit = String(st.attributes?.unit_of_measurement || '').toLowerCase();
      const dc = String(st.attributes?.device_class || '').toLowerCase();
      const isDaily =
        id.includes('napi_toltes') ||
        fn.includes('napi töltés') ||
        fn.includes('napi toltes') ||
        id.includes('daily_charg') ||
        fn.includes('daily charg');
      const isDuration =
        ['h', 'hr', 'hrs', 'min', 'm', 's', 'ó', 'perc'].includes(unit) ||
        dc === 'duration' ||
        id.includes('ido') ||
        id.includes('ora') ||
        id.includes('time') ||
        id.includes('duration');
      return isDaily && isDuration;
    })?.entity_id,
  };

  return Object.fromEntries(Object.entries(result).filter(([, v]) => Boolean(v)));
}

/**
 * Generates smooth SVG line & area path strings from numeric samples.
 */
function buildSparklinePaths(values, width = 160, height = 38) {
  if (!Array.isArray(values) || values.length < 2) {
    return {
      line: `M 0,${height - 4} L ${width},${height - 4}`,
      area: `M 0,${height} L 0,${height - 4} L ${width},${height - 4} L ${width},${height} Z`,
    };
  }

  let min = Math.min(...values);
  let max = Math.max(...values);
  if (max - min < 0.0001) {
    min -= 1;
    max += 1;
  }

  const padTop = 5;
  const padBottom = 3;
  const usableH = height - padTop - padBottom;

  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * width,
    y: padTop + usableH * (1 - (v - min) / (max - min)),
  }));

  let line = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = clamp(p1.y + (p2.y - p0.y) / 6, 2, height - 1);
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = clamp(p2.y - (p3.y - p1.y) / 6, 2, height - 1);

    line += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }

  const area = `${line} L ${width},${height} L 0,${height} Z`;
  return { line, area };
}

  // --- src/car-svg.js ---
/**
 * High-precision top-down SVG illustration of the Mitsubishi Outlander PHEV (MY16–MY21 Dynamic Shield).
 * ViewBox: 0 0 420 760 | Car nose: y=105 | Rear bumper: y=675 (body length = 570 units)
 */

const BODY_PATH = `
  M 210,105
  C 246,105 282,111 301,124
  C 311,131 314,146 315,166
  C 321,178 322,236 316,254
  L 315,496
  C 322,512 322,568 315,586
  C 314,618 311,646 301,659
  C 284,670 248,675 210,675
  C 172,675 136,670 119,659
  C 109,646 106,618 105,586
  C 98,568 98,512 105,496
  L 104,254
  C 98,236 99,178 105,166
  C 106,146 109,131 119,124
  C 138,111 174,105 210,105
  Z
`;
const CAR_NOSE_Y = 105;
const CAR_REAR_Y = 675;
const CAR_BODY_LEN = CAR_REAR_Y - CAR_NOSE_Y; // 570
function renderOutlanderSvg(uid) {
  return `
<svg class="outlander-svg" viewBox="0 0 420 760" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mitsubishi Outlander PHEV">
  <defs>
    <!-- Car Body Clip -->
    <clipPath id="${uid}-body-clip">
      <path d="${BODY_PATH}" />
    </clipPath>

    <!-- Dynamic Battery Percentage Clip (updated via JS) -->
    <clipPath id="${uid}-batt-pct-clip">
      <rect class="svg-batt-clip-rect" x="70" y="675" width="280" height="0" />
    </clipPath>

    <!-- Windshield Clip -->
    <clipPath id="${uid}-windshield-clip">
      <path d="M 119,268 Q 210,248 301,268 L 288,334 Q 210,322 132,334 Z" />
    </clipPath>

    <!-- Cabin Interior Clip -->
    <clipPath id="${uid}-cabin-clip">
      <rect x="122" y="270" width="176" height="316" rx="18" />
    </clipPath>

    <!-- Automotive Metallic Paint Gradients (driven by CSS variables) -->
    <linearGradient id="${uid}-paint-body" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color: var(--paint-deep)" />
      <stop offset="8%" style="stop-color: var(--paint-light)" />
      <stop offset="18%" style="stop-color: var(--paint-base)" />
      <stop offset="50%" style="stop-color: var(--paint-highlight)" />
      <stop offset="82%" style="stop-color: var(--paint-base)" />
      <stop offset="92%" style="stop-color: var(--paint-light)" />
      <stop offset="100%" style="stop-color: var(--paint-deep)" />
    </linearGradient>

    <linearGradient id="${uid}-paint-hood" x1="0%" y1="0%" x2="100%" y2="18%">
      <stop offset="0%" style="stop-color: var(--paint-dark)" />
      <stop offset="16%" style="stop-color: var(--paint-light)" />
      <stop offset="50%" style="stop-color: var(--paint-specular)" />
      <stop offset="84%" style="stop-color: var(--paint-light)" />
      <stop offset="100%" style="stop-color: var(--paint-dark)" />
    </linearGradient>

    <linearGradient id="${uid}-paint-roof" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color: var(--paint-dark)" />
      <stop offset="15%" style="stop-color: var(--paint-light)" />
      <stop offset="50%" style="stop-color: var(--paint-highlight)" />
      <stop offset="85%" style="stop-color: var(--paint-light)" />
      <stop offset="100%" style="stop-color: var(--paint-dark)" />
    </linearGradient>

    <!-- Glass Gradients -->
    <linearGradient id="${uid}-glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.92" />
      <stop offset="38%" stop-color="#334155" stop-opacity="0.78" />
      <stop offset="52%" stop-color="#64748b" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#090d16" stop-opacity="0.94" />
    </linearGradient>

    <linearGradient id="${uid}-chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="45%" stop-color="#94a3b8" />
      <stop offset="75%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#475569" />
    </linearGradient>

    <!-- Battery Percentage Car Fill Gradient -->
    <linearGradient id="${uid}-batt-fill-grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color: var(--batt-secondary); stop-opacity: 0.85" />
      <stop offset="65%" style="stop-color: var(--batt-primary); stop-opacity: 0.72" />
      <stop offset="100%" style="stop-color: var(--batt-primary); stop-opacity: 0.95" />
    </linearGradient>

    <!-- Headlight Volumetric Cones -->
    <linearGradient id="${uid}-beam-cone" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#f0f9ff" stop-opacity="0.78" />
      <stop offset="28%" stop-color="#bae6fd" stop-opacity="0.42" />
      <stop offset="68%" stop-color="#38bdf8" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
    </linearGradient>

    <!-- Tail Light Ruby Glow -->
    <radialGradient id="${uid}-tail-glow" cx="50%" cy="15%" r="80%">
      <stop offset="0%" stop-color="#ff1e42" stop-opacity="0.72" />
      <stop offset="45%" stop-color="#e11d48" stop-opacity="0.28" />
      <stop offset="100%" stop-color="#e11d48" stop-opacity="0" />
    </radialGradient>

    <!-- Hazard Amber Radial Glow -->
    <radialGradient id="${uid}-hazard-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fde047" stop-opacity="0.95" />
      <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
    </radialGradient>

    <!-- Interior Dome Warm Light -->
    <radialGradient id="${uid}-interior-glow" cx="50%" cy="46%" r="55%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.68" />
      <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.34" />
      <stop offset="100%" stop-color="#d97706" stop-opacity="0" />
    </radialGradient>

    <!-- Floor Shadow -->
    <radialGradient id="${uid}-floor-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.82" />
      <stop offset="68%" stop-color="#000000" stop-opacity="0.52" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Soft Glow Filters -->
    <filter id="${uid}-blur-md" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" />
    </filter>
    <filter id="${uid}-blur-lg" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="12" />
    </filter>
    <filter id="${uid}-drop-shadow" x="-25%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000000" flood-opacity="0.65" />
    </filter>
  </defs>

  <!-- =========================================================
       1. SHOWROOM FLOOR SHADOW & DYNAMIC AMBIENT STATE AURA
       ========================================================= -->
  <g class="layer-floor">
    <ellipse cx="210" cy="396" rx="126" ry="302" fill="url(#${uid}-floor-shadow)" />
    <ellipse class="svg-state-aura" cx="210" cy="396" rx="134" ry="306" fill="none" stroke="var(--aura-color, transparent)" stroke-width="14" opacity="0.35" filter="url(#${uid}-blur-lg)" />
  </g>

  <!-- =========================================================
       2. VOLUMETRIC EXTERIOR LIGHT BEAMS & OPEN-DOOR ARCS
       ========================================================= -->
  <g class="layer-beams">
    <!-- Park Lights Front & Rear Ground Wash -->
    <g class="svg-fx-parklights">
      <ellipse cx="136" cy="112" rx="34" ry="22" fill="#bae6fd" opacity="0.34" filter="url(#${uid}-blur-md)" />
      <ellipse cx="284" cy="112" rx="34" ry="22" fill="#bae6fd" opacity="0.34" filter="url(#${uid}-blur-md)" />
      <ellipse cx="142" cy="692" rx="52" ry="44" fill="url(#${uid}-tail-glow)" />
      <ellipse cx="278" cy="692" rx="52" ry="44" fill="url(#${uid}-tail-glow)" />
      <ellipse cx="210" cy="686" rx="86" ry="28" fill="url(#${uid}-tail-glow)" opacity="0.65" />
    </g>

    <!-- Headlights Volumetric Twin Xenon Beams -->
    <g class="svg-fx-headlights">
      <polygon class="beam-cone-l" points="115,126 52,4 192,4 150,122" fill="url(#${uid}-beam-cone)" filter="url(#${uid}-blur-md)" />
      <polygon class="beam-cone-r" points="270,122 228,4 368,4 305,126" fill="url(#${uid}-beam-cone)" filter="url(#${uid}-blur-md)" />
      <!-- Core hot beams -->
      <polygon points="122,124 88,18 164,18 144,122" fill="url(#${uid}-beam-cone)" opacity="0.85" />
      <polygon points="276,122 256,18 332,18 298,124" fill="url(#${uid}-beam-cone)" opacity="0.85" />
      <ellipse cx="132" cy="120" rx="22" ry="12" fill="#ffffff" opacity="0.75" filter="url(#${uid}-blur-md)" />
      <ellipse cx="288" cy="120" rx="22" ry="12" fill="#ffffff" opacity="0.75" filter="url(#${uid}-blur-md)" />
    </g>

    <!-- Open Door Warning Radar Arcs -->
    <path class="door-warn-arc arc-fl" d="M 105,274 L 18,366 A 126,126 0 0,0 105,416 Z" />
    <path class="door-warn-arc arc-fr" d="M 315,274 L 402,366 A 126,126 0 0,1 315,416 Z" />
    <path class="door-warn-arc arc-rl" d="M 105,422 L 24,506 A 116,116 0 0,0 105,542 Z" />
    <path class="door-warn-arc arc-rr" d="M 315,422 L 396,506 A 116,116 0 0,1 315,542 Z" />
    <ellipse class="door-warn-arc arc-bonnet" cx="210" cy="148" rx="92" ry="44" />
    <ellipse class="door-warn-arc arc-boot" cx="210" cy="656" rx="88" ry="38" />
  </g>

  <!-- =========================================================
       3. TIRES & ALLOY RIMS
       ========================================================= -->
  <g class="layer-wheels">
    <!-- Front Left -->
    <rect x="94" y="172" width="18" height="76" rx="7" fill="#111318" stroke="#272b33" stroke-width="1.2" />
    <rect x="96" y="186" width="4" height="48" rx="2" fill="#94a3b8" opacity="0.55" />
    <!-- Front Right -->
    <rect x="308" y="172" width="18" height="76" rx="7" fill="#111318" stroke="#272b33" stroke-width="1.2" />
    <rect x="320" y="186" width="4" height="48" rx="2" fill="#94a3b8" opacity="0.55" />
    <!-- Rear Left -->
    <rect x="94" y="502" width="18" height="76" rx="7" fill="#111318" stroke="#272b33" stroke-width="1.2" />
    <rect x="96" y="516" width="4" height="48" rx="2" fill="#94a3b8" opacity="0.55" />
    <!-- Rear Right -->
    <rect x="308" y="502" width="18" height="76" rx="7" fill="#111318" stroke="#272b33" stroke-width="1.2" />
    <rect x="320" y="516" width="4" height="48" rx="2" fill="#94a3b8" opacity="0.55" />
  </g>

  <!-- =========================================================
       4. SCULPTED METALLIC BODY SHELL & DYNAMIC SHIELD FASCIA
       ========================================================= -->
  <g class="layer-body">
    <path d="${BODY_PATH}" fill="url(#${uid}-paint-body)" stroke="var(--paint-seam)" stroke-width="1.6" />

    <!-- Subtle Metallic Shoulder Highlights -->
    <path d="M 112,150 C 108,260 108,520 113,646" fill="none" stroke="var(--paint-crease)" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 308,150 C 312,260 312,520 307,646" fill="none" stroke="var(--paint-crease)" stroke-width="2.2" stroke-linecap="round" />

    <!-- Lower Silver Rocker Sill Trim -->
    <line x1="105" y1="268" x2="105" y2="492" stroke="#94a3b8" stroke-width="1.5" opacity="0.55" />
    <line x1="315" y1="268" x2="315" y2="492" stroke="#94a3b8" stroke-width="1.5" opacity="0.55" />

    <!-- Front Dynamic Shield Grille & Chrome Boomerangs -->
    <path d="M 148,115 Q 210,107 272,115 L 262,128 Q 210,122 158,128 Z" fill="#0f1319" stroke="#334155" stroke-width="1" />
    <!-- Chrome Boomerangs -->
    <path d="M 122,126 Q 144,118 156,129 Q 146,138 134,142" fill="none" stroke="url(#${uid}-chrome-grad)" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 298,126 Q 276,118 264,129 Q 274,138 286,142" fill="none" stroke="url(#${uid}-chrome-grad)" stroke-width="2.6" stroke-linecap="round" />
    <!-- Front Silver Skid Plate Lip -->
    <path d="M 168,108 Q 210,104 252,108 L 246,113 Q 210,110 174,113 Z" fill="url(#${uid}-chrome-grad)" opacity="0.8" />
    <!-- Mitsubishi Three-Diamond Nose Emblem -->
    <g transform="translate(210, 118) scale(0.72)" fill="#e2e8f0">
      <polygon points="0,-7 4,-1 0,5 -4,-1" />
      <polygon points="-1,1 -8,1 -11,6 -4,6" />
      <polygon points="1,1 8,1 11,6 4,6" />
    </g>

    <!-- Rear Silver Skid Diffuser -->
    <path d="M 156,670 Q 210,675 264,670 L 256,664 Q 210,668 164,664 Z" fill="url(#${uid}-chrome-grad)" opacity="0.65" />
  </g>

  <!-- =========================================================
       5. ENGINE BAY (UNDER BONNET) & TRUNK CARGO BAY (UNDER BOOT)
       ========================================================= -->
  <g class="layer-bays">
    <!-- Hybrid Engine Bay (Revealed when Bonnet swings open) -->
    <g class="svg-engine-bay">
      <path d="M 124,138 Q 210,128 296,138 L 296,256 Q 210,244 124,256 Z" fill="#0b0f17" stroke="#1e293b" stroke-width="1.5" />
      <!-- MIVEC 2.4 Engine Block (Left-Center) -->
      <rect x="140" y="158" width="68" height="62" rx="8" fill="#1e2430" stroke="#475569" stroke-width="1.2" />
      <rect x="148" y="168" width="52" height="22" rx="4" fill="#334155" />
      <line x1="154" y1="198" x2="194" y2="198" stroke="#64748b" stroke-width="2" />
      <line x1="154" y1="206" x2="194" y2="206" stroke="#64748b" stroke-width="2" />
      <!-- Mitsubishi PHEV Inverter / PDU (Right) -->
      <rect x="218" y="162" width="58" height="54" rx="7" fill="#475569" stroke="#94a3b8" stroke-width="1.2" />
      <rect x="225" y="170" width="44" height="38" rx="4" fill="#64748b" />
      <line x1="230" y1="180" x2="264" y2="180" stroke="#cbd5e1" stroke-width="1.5" />
      <line x1="230" y1="189" x2="264" y2="189" stroke="#38bdf8" stroke-width="1.5" />
      <line x1="230" y1="198" x2="264" y2="198" stroke="#cbd5e1" stroke-width="1.5" />
      <!-- High-Voltage Orange PHEV Cables -->
      <path d="M 236,216 C 236,236 198,232 198,250" fill="none" stroke="#f97316" stroke-width="3.2" stroke-linecap="round" />
      <path d="M 252,216 C 252,240 222,238 222,252" fill="none" stroke="#fb923c" stroke-width="2.6" stroke-linecap="round" />
      <!-- Strut Bar -->
      <path d="M 128,194 Q 210,182 292,194" fill="none" stroke="#64748b" stroke-width="2.5" opacity="0.7" />
    </g>

    <!-- Trunk Cargo Bay (Revealed when Boot opens) -->
    <g class="svg-cargo-bay">
      <path d="M 130,584 L 290,584 L 284,654 Q 210,662 136,654 Z" fill="#0d1118" stroke="#1e293b" stroke-width="1.5" />
      <!-- Ribbed Cargo Mat -->
      <line x1="154" y1="592" x2="154" y2="648" stroke="#1e293b" stroke-width="2.5" />
      <line x1="182" y1="592" x2="182" y2="650" stroke="#1e293b" stroke-width="2.5" />
      <line x1="210" y1="592" x2="210" y2="652" stroke="#1e293b" stroke-width="2.5" />
      <line x1="238" y1="592" x2="238" y2="650" stroke="#1e293b" stroke-width="2.5" />
      <line x1="266" y1="592" x2="266" y2="648" stroke="#1e293b" stroke-width="2.5" />
      <!-- Trunk Courtesy Light Glow -->
      <ellipse class="cargo-open-light" cx="210" cy="624" rx="64" ry="26" fill="#fde68a" opacity="0" filter="url(#${uid}-blur-md)" />
    </g>
  </g>

  <!-- =========================================================
       6. CABIN INTERIOR, SEATS, STEERING, BATTERY X-RAY & CLIMATE FX
       ========================================================= -->
  <g class="layer-cabin" clip-path="url(#${uid}-cabin-clip)">
    <!-- Cabin Dark Charcoal Carpet -->
    <rect x="120" y="268" width="180" height="320" fill="#10141d" />

    <!-- Dashboard & Infotainment -->
    <path d="M 122,270 Q 210,256 298,270 L 294,324 Q 210,314 126,324 Z" fill="#1b2230" stroke="#2d3748" stroke-width="1" />
    <!-- Center Touchscreen -->
    <rect x="195" y="294" width="30" height="14" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1" />
    <rect x="198" y="297" width="24" height="8" rx="1.5" fill="#0ea5e9" opacity="0.45" />

    <!-- Steering Wheel Group (Translated by CSS for LHD vs RHD) -->
    <g class="svg-steering-wheel">
      <ellipse cx="0" cy="-8" rx="14" ry="5" fill="#0f172a" stroke="#475569" stroke-width="1" />
      <circle cx="0" cy="4" r="15" fill="none" stroke="#334155" stroke-width="4.2" />
      <circle cx="0" cy="4" r="4.5" fill="#475569" />
      <line x1="-13" y1="4" x2="13" y2="4" stroke="#334155" stroke-width="2.6" />
      <line x1="0" y1="4" x2="0" y2="17" stroke="#334155" stroke-width="2.6" />
    </g>

    <!-- Front Left Bucket Seat -->
    <g transform="translate(134, 340)">
      <rect x="0" y="0" width="52" height="68" rx="12" fill="#1e2533" stroke="#334155" stroke-width="1.2" />
      <rect x="7" y="8" width="38" height="42" rx="7" fill="#252e3f" />
      <rect x="11" y="54" width="30" height="16" rx="6" fill="#2d3748" stroke="#475569" stroke-width="1" />
    </g>

    <!-- Front Right Bucket Seat -->
    <g transform="translate(234, 340)">
      <rect x="0" y="0" width="52" height="68" rx="12" fill="#1e2533" stroke="#334155" stroke-width="1.2" />
      <rect x="7" y="8" width="38" height="42" rx="7" fill="#252e3f" />
      <rect x="11" y="54" width="30" height="16" rx="6" fill="#2d3748" stroke="#475569" stroke-width="1" />
    </g>

    <!-- Center Console with Outlander PHEV Blue Shift Joystick -->
    <rect x="194" y="320" width="32" height="98" rx="8" fill="#161c27" stroke="#2d3748" stroke-width="1" />
    <circle cx="210" cy="346" r="6.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6" />
    <circle cx="210" cy="346" r="2.5" fill="#38bdf8" />
    <rect x="201" y="364" width="18" height="18" rx="4" fill="#0f172a" opacity="0.8" />
    <rect x="199" y="388" width="22" height="24" rx="5" fill="#232c3d" />

    <!-- Rear 60/40 Split Bench Seat -->
    <g transform="translate(130, 448)">
      <rect x="0" y="0" width="160" height="74" rx="14" fill="#1e2533" stroke="#334155" stroke-width="1.2" />
      <rect x="8" y="8" width="66" height="44" rx="8" fill="#252e3f" />
      <rect x="86" y="8" width="66" height="44" rx="8" fill="#252e3f" />
      <rect x="68" y="10" width="24" height="40" rx="5" fill="#1b2230" />
      <!-- 3 Rear Headrests -->
      <rect x="14" y="56" width="32" height="15" rx="6" fill="#2d3748" stroke="#475569" stroke-width="1" />
      <rect x="66" y="58" width="28" height="13" rx="5" fill="#2d3748" stroke="#475569" stroke-width="1" />
      <rect x="114" y="56" width="32" height="15" rx="6" fill="#2d3748" stroke="#475569" stroke-width="1" />
    </g>

    <!-- Underfloor PHEV Traction Battery X-Ray Blueprint -->
    <g class="svg-fx-xray">
      <rect x="144" y="348" width="132" height="152" rx="12" fill="rgba(6, 182, 212, 0.09)" stroke="var(--batt-primary)" stroke-width="1.5" stroke-dasharray="5 3" />
      <g stroke="var(--batt-primary)" stroke-width="1.2" opacity="0.55">
        <rect x="154" y="358" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <rect x="214" y="358" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <rect x="154" y="388" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <rect x="214" y="388" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <rect x="154" y="418" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <rect x="214" y="418" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <rect x="154" y="448" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <rect x="214" y="448" width="52" height="24" rx="3" fill="rgba(16, 185, 129, 0.16)" />
        <!-- Central HV Busbar -->
        <line x1="210" y1="354" x2="210" y2="494" stroke="#f97316" stroke-width="2.2" />
      </g>
    </g>

    <!-- Warm Interior Dome & Footwell Lights -->
    <g class="svg-fx-interior">
      <ellipse cx="210" cy="408" rx="92" ry="128" fill="url(#${uid}-interior-glow)" />
      <circle cx="210" cy="340" r="18" fill="#fef08a" opacity="0.5" filter="url(#${uid}-blur-md)" />
      <circle cx="210" cy="442" r="20" fill="#fef08a" opacity="0.45" filter="url(#${uid}-blur-md)" />
    </g>

    <!-- Cabin Climate Airflow Animation (Cool = Ice Blue, Heat = Coral Orange) -->
    <g class="svg-fx-climate">
      <rect class="climate-tint" x="122" y="270" width="176" height="316" opacity="0.24" />
      <path class="climate-stream s1" d="M 162,318 C 148,368 176,418 158,488" fill="none" stroke-width="3" stroke-linecap="round" />
      <path class="climate-stream s2" d="M 210,314 C 194,372 226,424 210,496" fill="none" stroke-width="3.4" stroke-linecap="round" />
      <path class="climate-stream s3" d="M 258,318 C 272,368 244,418 262,488" fill="none" stroke-width="3" stroke-linecap="round" />
    </g>
  </g>

  <!-- =========================================================
       7. WINDSHIELD, SCULPTED ROOF, ROOF RAILS & SUNROOF
       ========================================================= -->
  <g class="layer-roof">
    <!-- Front Swept Windshield -->
    <path d="M 119,268 Q 210,248 301,268 L 288,334 Q 210,322 132,334 Z" fill="url(#${uid}-glass-grad)" stroke="#0f172a" stroke-width="1.6" />
    <!-- Specular Glass Reflection -->
    <polygon points="138,266 174,259 156,329 134,331" fill="#ffffff" opacity="0.09" />
    <!-- Wiper Blades -->
    <path d="M 136,268 Q 178,260 214,267" fill="none" stroke="#090d16" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 206,267 Q 248,259 286,268" fill="none" stroke="#090d16" stroke-width="2.2" stroke-linecap="round" />

    <!-- Windscreen Defrost Effect -->
    <g class="svg-fx-windscreen" clip-path="url(#${uid}-windshield-clip)">
      <rect x="118" y="248" width="184" height="90" fill="#f59e0b" opacity="0.18" />
      <path class="defrost-wave w1" d="M 148,328 Q 140,308 150,292 T 150,258" fill="none" stroke="#fbbf24" stroke-width="2.4" stroke-linecap="round" />
      <path class="defrost-wave w2" d="M 188,326 Q 180,306 190,290 T 190,256" fill="none" stroke="#fde047" stroke-width="2.6" stroke-linecap="round" />
      <path class="defrost-wave w3" d="M 232,326 Q 224,306 234,290 T 234,256" fill="none" stroke="#fde047" stroke-width="2.6" stroke-linecap="round" />
      <path class="defrost-wave w4" d="M 272,328 Q 264,308 274,292 T 274,258" fill="none" stroke="#fbbf24" stroke-width="2.4" stroke-linecap="round" />
    </g>

    <!-- Main Painted Roof Panel (with semi-translucent glass feel so cabin glow shines subtly) -->
    <path class="svg-roof-panel" d="M 132,332 Q 210,322 288,332 L 285,588 Q 210,595 135,588 Z" fill="url(#${uid}-paint-roof)" fill-opacity="0.88" stroke="var(--paint-seam)" stroke-width="1.3" />

    <!-- Panoramic / Front Sunroof Glass (toggleable) -->
    <g class="svg-sunroof">
      <rect x="155" y="348" width="110" height="72" rx="10" fill="#0b111e" fill-opacity="0.76" stroke="#1e293b" stroke-width="2" />
      <polygon points="162,352 198,352 178,416 160,416" fill="#94a3b8" opacity="0.14" />
    </g>

    <!-- Brushed Silver Roof Rails -->
    <g class="svg-roof-rails">
      <path d="M 135,338 L 138,578" fill="none" stroke="url(#${uid}-chrome-grad)" stroke-width="4.2" stroke-linecap="round" />
      <path d="M 285,338 L 282,578" fill="none" stroke="url(#${uid}-chrome-grad)" stroke-width="4.2" stroke-linecap="round" />
      <!-- Rail Feet -->
      <rect x="132" y="336" width="6" height="12" rx="2" fill="#0f172a" />
      <rect x="135" y="568" width="6" height="12" rx="2" fill="#0f172a" />
      <rect x="282" y="336" width="6" height="12" rx="2" fill="#0f172a" />
      <rect x="279" y="568" width="6" height="12" rx="2" fill="#0f172a" />
    </g>

    <!-- Shark-Fin Antenna -->
    <path d="M 210,548 L 215,570 Q 210,573 205,570 Z" fill="var(--paint-dark)" stroke="var(--paint-crease)" stroke-width="0.9" />
  </g>

  <!-- =========================================================
       8. ANIMATED BONNET, BOOT & 4 SWINGING DOORS
       ========================================================= -->
  <g class="layer-closures">
    <!-- BONNET (Hood) - Pivots from cowl y=264 -->
    <g class="svg-closure svg-bonnet">
      <path d="M 118,136 Q 210,122 302,136 L 301,265 Q 210,246 119,265 Z" fill="url(#${uid}-paint-hood)" stroke="var(--paint-seam)" stroke-width="1.4" />
      <!-- Sculpted Outlander Hood Character Creases -->
      <path d="M 142,134 L 134,256" fill="none" stroke="var(--paint-crease)" stroke-width="1.5" />
      <path d="M 278,134 L 286,256" fill="none" stroke="var(--paint-crease)" stroke-width="1.5" />
      <path d="M 176,130 L 166,248" fill="none" stroke="var(--paint-seam)" stroke-width="0.9" opacity="0.45" />
      <path d="M 244,130 L 254,248" fill="none" stroke="var(--paint-seam)" stroke-width="0.9" opacity="0.45" />
      <!-- Washer Nozzles -->
      <circle cx="176" cy="242" r="1.8" fill="#0f172a" opacity="0.7" />
      <circle cx="244" cy="242" r="1.8" fill="#0f172a" opacity="0.7" />
    </g>

    <!-- BOOT (Tailgate) - Pivots from rear roof header y=588 -->
    <g class="svg-closure svg-boot">
      <!-- Rear Tailgate Body & Spoiler -->
      <path d="M 135,588 Q 210,595 285,588 L 298,652 Q 210,668 122,652 Z" fill="url(#${uid}-paint-roof)" stroke="var(--paint-seam)" stroke-width="1.4" />
      <!-- Raked Rear Window Glass -->
      <path d="M 137,596 Q 210,602 283,596 L 274,638 Q 210,647 146,638 Z" fill="url(#${uid}-glass-grad)" stroke="#0f172a" stroke-width="1.3" />
      <!-- Rear Wiper -->
      <path d="M 210,640 L 168,633" fill="none" stroke="#090d16" stroke-width="2.2" stroke-linecap="round" />
      <!-- High-Mount LED Brake Strip on Spoiler -->
      <path class="svg-high-brake" d="M 178,592 Q 210,595 242,592" fill="none" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round" opacity="0.7" />
    </g>

    <!-- FRONT LEFT DOOR (Hinged at 105, 274) -->
    <g class="svg-door svg-door-fl">
      <!-- Outer Door Skin -->
      <path d="M 105,274 L 122,274 L 132,332 L 132,418 L 105,418 Z" fill="var(--paint-base)" stroke="var(--paint-seam)" stroke-width="1.3" />
      <!-- Tinted Side Window -->
      <polygon points="111,284 121,280 130,332 130,413 111,413" fill="url(#${uid}-glass-grad)" stroke="#0f172a" stroke-width="1" />
      <!-- Chrome Window Beltline -->
      <line x1="109" y1="284" x2="109" y2="416" stroke="url(#${uid}-chrome-grad)" stroke-width="1.6" />
      <!-- Chrome Door Handle -->
      <rect x="103.5" y="384" width="3.5" height="18" rx="1.7" fill="url(#${uid}-chrome-grad)" />
      <!-- Left Wing Mirror (Attached to Front Door!) -->
      <g class="wing-mirror-l">
        <polygon points="106,282 96,285 96,293 106,292" fill="#0f172a" />
        <path d="M 100,278 C 84,277 77,283 79,294 C 81,299 95,297 101,293 Z" fill="var(--paint-light)" stroke="var(--paint-seam)" stroke-width="1.2" />
        <!-- Mirror Hazard LED Repeater -->
        <path class="svg-hazard-blinker mirror-blink" d="M 81,285 Q 88,281 97,282" fill="none" stroke="#fbbf24" stroke-width="2.6" stroke-linecap="round" />
      </g>
    </g>

    <!-- FRONT RIGHT DOOR (Hinged at 315, 274) -->
    <g class="svg-door svg-door-fr">
      <path d="M 315,274 L 298,274 L 288,332 L 288,418 L 315,418 Z" fill="var(--paint-base)" stroke="var(--paint-seam)" stroke-width="1.3" />
      <polygon points="309,284 299,280 290,332 290,413 309,413" fill="url(#${uid}-glass-grad)" stroke="#0f172a" stroke-width="1" />
      <line x1="311" y1="284" x2="311" y2="416" stroke="url(#${uid}-chrome-grad)" stroke-width="1.6" />
      <rect x="313" y="384" width="3.5" height="18" rx="1.7" fill="url(#${uid}-chrome-grad)" />
      <!-- Right Wing Mirror -->
      <g class="wing-mirror-r">
        <polygon points="314,282 324,285 324,293 314,292" fill="#0f172a" />
        <path d="M 320,278 C 336,277 343,283 341,294 C 339,299 325,297 319,293 Z" fill="var(--paint-light)" stroke="var(--paint-seam)" stroke-width="1.2" />
        <path class="svg-hazard-blinker mirror-blink" d="M 339,285 Q 332,281 323,282" fill="none" stroke="#fbbf24" stroke-width="2.6" stroke-linecap="round" />
      </g>
    </g>

    <!-- REAR LEFT DOOR (Hinged at 105, 420) -->
    <g class="svg-door svg-door-rl">
      <path d="M 105,420 L 132,420 L 134,538 L 105,532 Z" fill="var(--paint-base)" stroke="var(--paint-seam)" stroke-width="1.3" />
      <polygon points="111,425 130,425 131,528 111,522" fill="url(#${uid}-glass-grad)" stroke="#0f172a" stroke-width="1" />
      <line x1="109" y1="422" x2="109" y2="528" stroke="url(#${uid}-chrome-grad)" stroke-width="1.6" />
      <rect x="103.5" y="496" width="3.5" height="17" rx="1.7" fill="url(#${uid}-chrome-grad)" />
    </g>

    <!-- REAR RIGHT DOOR (Hinged at 315, 420) -->
    <g class="svg-door svg-door-rr">
      <path d="M 315,420 L 288,420 L 286,538 L 315,532 Z" fill="var(--paint-base)" stroke="var(--paint-seam)" stroke-width="1.3" />
      <polygon points="309,425 290,425 289,528 309,522" fill="url(#${uid}-glass-grad)" stroke="#0f172a" stroke-width="1" />
      <line x1="311" y1="422" x2="311" y2="528" stroke="url(#${uid}-chrome-grad)" stroke-width="1.6" />
      <rect x="313" y="496" width="3.5" height="17" rx="1.7" fill="url(#${uid}-chrome-grad)" />
    </g>
  </g>

  <!-- =========================================================
       9. PROPORTIONAL BATTERY PERCENTAGE CAR FILL OVERLAY
       ========================================================= -->
  <g class="layer-battery-overlay" pointer-events="none">
    <!-- Clipped to exact Car Silhouette AND Battery % Height -->
    <g clip-path="url(#${uid}-body-clip)">
      <g clip-path="url(#${uid}-batt-pct-clip)">
        <rect class="svg-batt-body-tint" x="85" y="100" width="250" height="585" fill="url(#${uid}-batt-fill-grad)" style="opacity: var(--batt-fill-opacity, 0.34)" />
        <!-- Animated Charging Scanlines inside the filled car portion -->
        <g class="svg-batt-charge-ripples">
          <line class="charge-scan s1" x1="95" y1="660" x2="325" y2="660" stroke="#ffffff" stroke-width="2" opacity="0.35" />
          <line class="charge-scan s2" x1="95" y1="660" x2="325" y2="660" stroke="#a7f3d0" stroke-width="1.5" opacity="0.28" />
        </g>
      </g>

      <!-- Glowing Laser / Wave Horizon Line right at the exact % mark -->
      <g class="svg-batt-horizon-group" style="transform: translateY(675px)">
        <line x1="92" y1="0" x2="328" y2="0" stroke="var(--batt-primary)" stroke-width="5" opacity="0.45" filter="url(#${uid}-blur-md)" />
        <path class="svg-batt-wave-line" d="M 92,0 Q 151,-4 210,0 T 328,0" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.9" />
        <path class="svg-batt-wave-accent" d="M 92,0 Q 151,4 210,0 T 328,0" fill="none" stroke="var(--batt-primary)" stroke-width="2.4" />
      </g>
    </g>

    <!-- Floating % Pointer Callout on Left Side of Car -->
    <g class="svg-batt-marker" style="transform: translateY(661px)">
      <line x1="84" y1="0" x2="104" y2="0" stroke="var(--batt-primary)" stroke-width="1.6" stroke-dasharray="3 2" />
      <circle cx="104" cy="0" r="3" fill="#ffffff" stroke="var(--batt-primary)" stroke-width="1.5" />
      <rect x="24" y="-13" width="60" height="26" rx="13" fill="rgba(15, 23, 42, 0.9)" stroke="var(--batt-primary)" stroke-width="1.4" />
      <text class="svg-batt-marker-text" x="54" y="4.5" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="700" font-family="system-ui, -apple-system, sans-serif">88%</text>
    </g>
  </g>

  <!-- =========================================================
       10. HEADLIGHT LENSES, TAIL LAMPS & 4-CORNER HAZARD FLASHERS
       ========================================================= -->
  <g class="layer-lamps">
    <!-- Front Headlight Housings -->
    <path class="lamp-housing-fl" d="M 112,138 C 114,124 128,116 148,116 L 144,129 C 130,130 120,136 115,144 Z" fill="#1e293b" stroke="#64748b" stroke-width="1" />
    <path class="lamp-housing-fr" d="M 308,138 C 306,124 292,116 272,116 L 276,129 C 290,130 300,136 305,144 Z" fill="#1e293b" stroke="#64748b" stroke-width="1" />

    <!-- Active Park Light DRL & Ruby Rear LED Bars -->
    <g class="svg-lamp-park">
      <!-- Front LED DRL Strips -->
      <path d="M 115,138 Q 126,124 146,122" fill="none" stroke="#e0f2fe" stroke-width="2.8" stroke-linecap="round" />
      <path d="M 305,138 Q 294,124 274,122" fill="none" stroke="#e0f2fe" stroke-width="2.8" stroke-linecap="round" />
      <!-- Rear LED Tail Lamps -->
      <path d="M 112,642 C 116,656 132,664 156,666 L 154,656 C 136,654 123,648 118,636 Z" fill="#ff1e42" stroke="#fda4af" stroke-width="1" />
      <path d="M 308,642 C 304,656 288,664 264,666 L 266,656 C 284,654 297,648 302,636 Z" fill="#ff1e42" stroke="#fda4af" stroke-width="1" />
    </g>

    <!-- Inactive Tail Lamp Lenses (subtle dark ruby when off) -->
    <g class="svg-lamp-tail-off">
      <path d="M 112,642 C 116,656 132,664 156,666 L 154,656 C 136,654 123,648 118,636 Z" fill="#4c0519" opacity="0.72" />
      <path d="M 308,642 C 304,656 288,664 264,666 L 266,656 C 284,654 297,648 302,636 Z" fill="#4c0519" opacity="0.72" />
    </g>

    <!-- Active Projector Headlight Lenses -->
    <g class="svg-lamp-head">
      <ellipse cx="128" cy="126" rx="11" ry="5" transform="rotate(-18 128 126)" fill="#ffffff" />
      <ellipse cx="292" cy="126" rx="11" ry="5" transform="rotate(18 292 126)" fill="#ffffff" />
    </g>

    <!-- 4-Corner Hazard Amber Turn Signals -->
    <g class="svg-hazard-blinker corner-hazards">
      <!-- Front Left -->
      <circle cx="116" cy="134" r="22" fill="url(#${uid}-hazard-glow)" />
      <circle cx="116" cy="134" r="4.5" fill="#fef08a" />
      <!-- Front Right -->
      <circle cx="304" cy="134" r="22" fill="url(#${uid}-hazard-glow)" />
      <circle cx="304" cy="134" r="4.5" fill="#fef08a" />
      <!-- Rear Left -->
      <circle cx="117" cy="648" r="24" fill="url(#${uid}-hazard-glow)" />
      <circle cx="117" cy="648" r="4.5" fill="#fef08a" />
      <!-- Rear Right -->
      <circle cx="303" cy="648" r="24" fill="url(#${uid}-hazard-glow)" />
      <circle cx="303" cy="648" r="4.5" fill="#fef08a" />
    </g>
  </g>

  <!-- =========================================================
       11. RIGHT-REAR PHEV CHARGE PORT & ANIMATED CABLE
       ========================================================= -->
  <g class="layer-charger">
    <!-- Closed Flap Seam on Right-Rear Quarter Panel (y=588..612) -->
    <rect class="charge-flap-closed" x="311" y="590" width="4" height="22" rx="1.5" fill="none" stroke="var(--paint-seam)" stroke-width="1.1" />

    <!-- Plugged-In Assembly -->
    <g class="svg-charger-assembly">
      <!-- Open Charge Port Door -->
      <path d="M 314,588 L 329,579 L 330,584 L 315,592 Z" fill="var(--paint-light)" stroke="var(--paint-seam)" stroke-width="1" />
      <!-- Glowing Port Socket Ring -->
      <circle class="charge-socket-glow" cx="315" cy="602" r="13" fill="var(--batt-primary)" opacity="0.45" filter="url(#${uid}-blur-md)" />
      <circle class="charge-socket-ring" cx="315" cy="602" r="6" fill="#0f172a" stroke="var(--batt-primary)" stroke-width="2.4" />

      <!-- Curved EV Charging Cable -->
      <path d="M 322,602 C 362,602 374,642 418,648" fill="none" stroke="#0f172a" stroke-width="9" stroke-linecap="round" />
      <path d="M 322,602 C 362,602 374,642 418,648" fill="none" stroke="#334155" stroke-width="5.5" stroke-linecap="round" />
      <!-- Animated Flowing Energy Pulse along Cable -->
      <path class="charge-cable-energy" d="M 418,648 C 374,642 362,602 316,602" fill="none" stroke="#34d399" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="8 14" />

      <!-- Ergonomic Type-1 / ChaDeMo Handle -->
      <rect x="314" y="596" width="18" height="12" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="1.2" />
      <circle class="charge-handle-led" cx="325" cy="602" r="2.2" fill="#10b981" />
    </g>
  </g>

  <!-- =========================================================
       12. FLOATING CENTRAL LOCK SHIELD & INTERACTIVE TOUCH ZONES
       ========================================================= -->
  <g class="layer-hud-badges">
    <g class="svg-lock-badge" transform="translate(210, 466)">
      <circle class="lock-badge-bg" cx="0" cy="0" r="17" fill="rgba(15, 23, 42, 0.84)" stroke="rgba(56, 189, 248, 0.55)" stroke-width="1.5" />
      <!-- Closed Padlock Icon -->
      <g class="lock-icon-closed" transform="translate(-8, -9) scale(0.68)" fill="none" stroke="#38bdf8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="rgba(56, 189, 248, 0.2)" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </g>
      <!-- Open Padlock Icon -->
      <g class="lock-icon-open" transform="translate(-8, -9) scale(0.68)" fill="none" stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="rgba(245, 158, 11, 0.22)" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </g>
    </g>
  </g>

  <!-- Interactive Touch Zones on the Car -->
  <g class="layer-hit-zones">
    <rect class="car-hit-zone" data-zone="headlights" x="104" y="96" width="212" height="50" rx="18" />
    <rect class="car-hit-zone" data-zone="bonnet" x="120" y="148" width="180" height="106" rx="14" />
    <rect class="car-hit-zone" data-zone="windscreen" x="122" y="256" width="176" height="78" rx="12" />
    <rect class="car-hit-zone" data-zone="cabin" x="142" y="340" width="136" height="196" rx="16" />
    <rect class="car-hit-zone" data-zone="door_fl" x="64" y="272" width="72" height="146" rx="12" />
    <rect class="car-hit-zone" data-zone="door_fr" x="284" y="272" width="72" height="146" rx="12" />
    <rect class="car-hit-zone" data-zone="door_rl" x="64" y="420" width="72" height="122" rx="12" />
    <rect class="car-hit-zone" data-zone="door_rr" x="284" y="420" width="72" height="122" rx="12" />
    <rect class="car-hit-zone" data-zone="charge_port" x="298" y="566" width="114" height="76" rx="14" />
    <rect class="car-hit-zone" data-zone="boot" x="128" y="582" width="164" height="66" rx="12" />
    <rect class="car-hit-zone" data-zone="parklights" x="104" y="648" width="212" height="44" rx="16" />
  </g>
</svg>
`;
}

  // --- src/styles.js ---
const CARD_STYLES = `
  :host {
    display: block;
    --ophev-bg: linear-gradient(155deg, rgba(15, 20, 30, 0.97) 0%, rgba(10, 14, 22, 0.99) 100%);
    --ophev-panel: rgba(24, 31, 46, 0.68);
    --ophev-panel-hover: rgba(33, 43, 63, 0.84);
    --ophev-border: rgba(148, 163, 184, 0.13);
    --ophev-border-strong: rgba(148, 163, 184, 0.24);
    --ophev-text: #f1f5f9;
    --ophev-muted: #94a3b8;
    --ophev-cyan: #0ea5e9;
    --ophev-emerald: #10b981;
    --ophev-amber: #f59e0b;
    --ophev-red: #ef4444;
    --ophev-orange: #f97316;
    font-family: var(--paper-font-body1_-_font-family, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  ha-card.ophev-card {
    position: relative;
    overflow: hidden;
    background: var(--ophev-bg);
    color: var(--ophev-text);
    border-radius: var(--ha-card-border-radius, 22px);
    border: 1px solid var(--ophev-border);
    box-shadow: 0 18px 42px -14px rgba(0, 0, 0, 0.65);
    padding: 18px;
    container-type: inline-size;
    container-name: ophev;
  }

  /* Subtle top ambient sheen */
  ha-card.ophev-card::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 160px;
    background: radial-gradient(75% 100% at 50% 0%, var(--card-top-glow, rgba(14, 165, 233, 0.11)), transparent 80%);
    pointer-events: none;
    z-index: 0;
    transition: background 0.6s ease;
  }

  /* Frameless mode: hide outer card border/background/shadow, keep only inner block backgrounds */
  ha-card.ophev-card.frameless {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    overflow: visible;
    --ha-card-background: transparent;
    --card-background-color: transparent;
    --ha-card-border-width: 0px;
    --ha-card-border-color: transparent;
    --ha-card-box-shadow: none;
  }

  ha-card.ophev-card.frameless::before {
    display: none;
  }

  ha-card.ophev-card.frameless .card-title {
    color: var(--primary-text-color, #f8fafc);
  }

  ha-card.ophev-card.frameless .mitsu-badge {
    background: rgba(20, 29, 45, 0.92);
  }

  ha-card.ophev-card.frameless .status-pill:not(.ok):not(.warn):not(.danger) {
    background: rgba(20, 29, 45, 0.9);
  }

  ha-card.ophev-card.frameless .car-stage-card {
    background: radial-gradient(ellipse at 50% 48%, rgba(28, 39, 58, 0.94) 0%, rgba(10, 14, 22, 0.98) 80%);
    box-shadow: 0 12px 30px -12px rgba(0, 0, 0, 0.55);
  }

  ha-card.ophev-card.frameless .hud-panel {
    background: linear-gradient(155deg, rgba(19, 26, 39, 0.95) 0%, rgba(13, 18, 28, 0.97) 100%);
    box-shadow: 0 12px 28px -12px rgba(0, 0, 0, 0.5);
  }

  ha-card.ophev-card.frameless .sensors-drawer.open {
    background: linear-gradient(155deg, rgba(19, 26, 39, 0.95) 0%, rgba(13, 18, 28, 0.97) 100%);
    border: 1px solid var(--ophev-border);
    border-radius: 16px;
    padding: 14px;
    box-shadow: 0 12px 28px -12px rgba(0, 0, 0, 0.5);
  }

  .ophev-shell {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* =========================================================
     HEADER BAR
     ========================================================= */
  .ophev-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .brand-block {
    display: flex;
    align-items: center;
    gap: 11px;
    min-width: 0;
  }

  .mitsu-badge {
    width: 36px;
    height: 36px;
    border-radius: 11px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02));
    border: 1px solid var(--ophev-border-strong);
    display: grid;
    place-items: center;
    flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .mitsu-badge svg {
    width: 21px;
    height: 21px;
    fill: #e11d48;
    filter: drop-shadow(0 0 6px rgba(225, 29, 72, 0.45));
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    min-width: 0;
  }

  .card-title {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #f8fafc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Modern Telemetry Connection Pill (Online vs Offline) */
  .conn-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 4px 11px 4px 9px;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
    background: rgba(30, 41, 59, 0.78);
    border: 1px solid var(--ophev-border-strong);
    color: var(--ophev-muted);
  }

  .conn-pill:hover {
    transform: translateY(-1px);
  }

  .conn-pill.online {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(6, 78, 59, 0.32));
    border-color: rgba(16, 185, 129, 0.48);
    color: #34d399;
    box-shadow: 0 0 18px -4px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .conn-pill.offline {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.24), rgba(127, 29, 29, 0.38));
    border-color: rgba(248, 113, 113, 0.6);
    color: #fca5a5;
    animation: connOfflineGlow 2.2s ease-in-out infinite;
  }

  @keyframes connOfflineGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    50% { box-shadow: 0 0 16px 1px rgba(239, 68, 68, 0.36); }
  }

  .conn-pill-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .conn-pill-icon svg {
    width: 14px;
    height: 14px;
  }

  .conn-dot {
    position: relative;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #64748b;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .conn-dot.online {
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
  }

  .conn-dot.online::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid #10b981;
    animation: connSonar 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes connSonar {
    0% { transform: scale(0.75); opacity: 0.9; }
    100% { transform: scale(2.1); opacity: 0; }
  }

  .conn-dot.offline {
    background: #ef4444;
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
  }

  .header-pills {
    display: flex;
    align-items: center;
    gap: 7px;
    flex-wrap: wrap;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 11px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(30, 41, 59, 0.72);
    border: 1px solid var(--ophev-border);
    color: #cbd5e1;
    cursor: pointer;
    user-select: none;
    transition: all 0.25s ease;
  }

  .status-pill:hover {
    border-color: var(--ophev-border-strong);
    background: rgba(39, 52, 73, 0.9);
  }

  .status-pill svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .status-pill.ok {
    color: #38bdf8;
    border-color: rgba(56, 189, 248, 0.28);
    background: rgba(14, 165, 233, 0.11);
  }

  .status-pill.warn {
    color: #fbbf24;
    border-color: rgba(245, 158, 11, 0.42);
    background: rgba(245, 158, 11, 0.14);
    animation: pillPulse 2s ease-in-out infinite;
  }

  .status-pill.danger {
    color: #f87171;
    border-color: rgba(239, 68, 68, 0.45);
    background: rgba(239, 68, 68, 0.16);
    animation: pillPulse 1.8s ease-in-out infinite;
  }

  @keyframes pillPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
    50% { box-shadow: 0 0 12px 1px rgba(245, 158, 11, 0.28); }
  }

  /* Two-line HA-style Daily Charge Badges in Card Header */
  .daily-hdr-badges {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .daily-hdr-badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 5px 13px 5px 10px;
    border-radius: 999px;
    background: rgba(20, 29, 45, 0.88);
    border: 1px solid rgba(56, 189, 248, 0.28);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    user-select: none;
    transition: all 0.22s ease;
  }

  .daily-hdr-badge:hover {
    border-color: rgba(56, 189, 248, 0.58);
    background: rgba(28, 41, 63, 0.95);
    transform: translateY(-1px);
  }

  .daily-hdr-icon {
    width: 22px;
    height: 22px;
    color: #0ea5e9;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.35));
  }

  .daily-hdr-icon svg {
    width: 20px;
    height: 20px;
  }

  .daily-hdr-copy {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }

  .daily-hdr-lbl {
    font-size: 0.66rem;
    font-weight: 600;
    color: var(--ophev-muted);
  }

  .daily-hdr-val {
    font-size: 0.84rem;
    font-weight: 700;
    color: #f8fafc;
    white-space: nowrap;
  }

  /* Prominent Daily Charge Highlight Cards inside Battery & Charging Panel */
  .daily-panel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
    gap: 9px;
    margin-top: 10px;
  }

  .daily-panel-tile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 13px;
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.13), rgba(15, 23, 42, 0.75));
    border: 1px solid rgba(56, 189, 248, 0.3);
    cursor: pointer;
    transition: all 0.22s ease;
  }

  .daily-panel-tile:hover {
    border-color: rgba(56, 189, 248, 0.62);
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(22, 33, 54, 0.88));
    transform: translateY(-1px);
  }

  .daily-tile-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(14, 165, 233, 0.18);
    border: 1px solid rgba(56, 189, 248, 0.32);
    color: #38bdf8;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .daily-tile-icon svg {
    width: 19px;
    height: 19px;
  }

  .daily-tile-copy {
    min-width: 0;
  }

  .daily-tile-lbl {
    font-size: 0.69rem;
    font-weight: 600;
    color: var(--ophev-muted);
    margin-bottom: 2px;
  }

  .daily-tile-val {
    font-size: 0.98rem;
    font-weight: 800;
    color: #f8fafc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* =========================================================
     MAIN GRID (RESPONSIVE CONTAINER QUERIES)
     ========================================================= */
  .ophev-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: stretch;
  }

  @container ophev (min-width: 620px) {
    .ophev-body.layout-auto,
    .ophev-body.layout-wide {
      grid-template-columns: minmax(255px, 43%) 1fr;
      gap: 18px;
    }
  }

  .ophev-body.layout-wide {
    grid-template-columns: minmax(240px, 43%) 1fr;
  }

  .ophev-body.layout-compact {
    grid-template-columns: 1fr !important;
  }

  /* =========================================================
     CAR SHOWCASE STAGE
     ========================================================= */
  .car-stage-card {
    position: relative;
    background: radial-gradient(ellipse at 50% 48%, rgba(30, 41, 59, 0.52) 0%, rgba(9, 13, 21, 0.88) 78%);
    border: 1px solid var(--ophev-border);
    border-radius: 18px;
    padding: 8px 8px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 410px;
    overflow: hidden;
  }

  .car-svg-wrap {
    width: 100%;
    max-width: 305px;
    margin: 0 auto;
    position: relative;
  }

  .outlander-svg {
    width: 100%;
    height: auto;
    display: block;
    overflow: visible;
  }

  /* Steering wheel LHD vs RHD */
  .outlander-svg .svg-steering-wheel {
    transform: translate(160px, 314px);
    transition: transform 0.35s ease;
  }
  .car-stage-card.rhd .outlander-svg .svg-steering-wheel {
    transform: translate(260px, 314px);
  }

  /* Sunroof visibility */
  .car-stage-card.hide-sunroof .svg-sunroof {
    display: none;
  }

  /* =========================================================
     SVG ANIMATIONS: DOORS, BONNET, BOOT
     ========================================================= */
  .outlander-svg .svg-door,
  .outlander-svg .svg-closure {
    transform-box: view-box;
    transition: transform 0.68s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
  }

  .outlander-svg .svg-door-fl { transform-origin: 105px 274px; }
  .outlander-svg .svg-door-fr { transform-origin: 315px 274px; }
  .outlander-svg .svg-door-rl { transform-origin: 105px 420px; }
  .outlander-svg .svg-door-rr { transform-origin: 315px 420px; }
  .outlander-svg .svg-bonnet  { transform-origin: 210px 265px; }
  .outlander-svg .svg-boot    { transform-origin: 210px 588px; }

  /* Open door states (clockwise +deg swings left doors out, -deg swings right doors out) */
  .car-stage-card.open-fl .svg-door-fl {
    transform: rotate(43deg);
    filter: drop-shadow(-6px 6px 6px rgba(0, 0, 0, 0.65));
  }
  .car-stage-card.open-fr .svg-door-fr {
    transform: rotate(-43deg);
    filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.65));
  }
  .car-stage-card.open-rl .svg-door-rl {
    transform: rotate(42deg);
    filter: drop-shadow(-6px 6px 6px rgba(0, 0, 0, 0.65));
  }
  .car-stage-card.open-rr .svg-door-rr {
    transform: rotate(-42deg);
    filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.65));
  }
  .car-stage-card.open-bonnet .svg-bonnet {
    transform: scaleY(0.58);
    filter: drop-shadow(0 -8px 8px rgba(0, 0, 0, 0.8));
  }
  .car-stage-card.open-boot .svg-boot {
    transform: scaleY(0.54);
    filter: drop-shadow(0 8px 8px rgba(0, 0, 0, 0.8));
  }
  .car-stage-card.open-boot .cargo-open-light {
    opacity: 0.55;
    transition: opacity 0.4s ease;
  }

  /* Open-door warning arcs */
  .outlander-svg .door-warn-arc {
    fill: rgba(239, 68, 68, 0.15);
    stroke: rgba(248, 113, 113, 0.62);
    stroke-width: 1.4;
    stroke-dasharray: 5 4;
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
  .car-stage-card.open-fl .arc-fl,
  .car-stage-card.open-fr .arc-fr,
  .car-stage-card.open-rl .arc-rl,
  .car-stage-card.open-rr .arc-rr,
  .car-stage-card.open-bonnet .arc-bonnet,
  .car-stage-card.open-boot .arc-boot {
    opacity: 1;
    animation: warnArcPulse 1.8s ease-in-out infinite;
  }

  @keyframes warnArcPulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.95; }
  }

  /* =========================================================
     SVG ANIMATIONS: EXTERIOR & INTERIOR LIGHTS
     ========================================================= */
  .outlander-svg .svg-fx-headlights,
  .outlander-svg .svg-lamp-head,
  .outlander-svg .svg-fx-parklights,
  .outlander-svg .svg-lamp-park,
  .outlander-svg .svg-fx-interior {
    opacity: 0;
    transition: opacity 0.42s ease;
    pointer-events: none;
  }

  .car-stage-card.lights-head .svg-fx-headlights,
  .car-stage-card.lights-head .svg-lamp-head {
    opacity: 1;
    animation: beamShimmer 3.2s ease-in-out infinite;
  }

  .car-stage-card.lights-park .svg-fx-parklights,
  .car-stage-card.lights-park .svg-lamp-park,
  .car-stage-card.lights-head .svg-fx-parklights,
  .car-stage-card.lights-head .svg-lamp-park {
    opacity: 1;
  }

  .car-stage-card.lights-interior .svg-fx-interior {
    opacity: 1;
  }

  @keyframes beamShimmer {
    0%, 100% { opacity: 0.92; }
    50% { opacity: 1; filter: brightness(1.09); }
  }

  /* Hazard Lights (4 corners + side mirrors) */
  .outlander-svg .svg-hazard-blinker {
    opacity: 0;
    pointer-events: none;
  }

  .car-stage-card.lights-hazard .svg-hazard-blinker {
    animation: hazardBlink 1.05s steps(1, end) infinite;
  }

  @keyframes hazardBlink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0.06; }
  }

  /* =========================================================
     SVG ANIMATIONS: CLIMATE (COOL / HEAT / WINDSCREEN)
     ========================================================= */
  .outlander-svg .svg-fx-climate,
  .outlander-svg .svg-fx-windscreen {
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .car-stage-card.climate-cool .svg-fx-climate {
    opacity: 1;
  }
  .car-stage-card.climate-cool .climate-tint {
    fill: #0ea5e9;
  }
  .car-stage-card.climate-cool .climate-stream {
    stroke: #7dd3fc;
    stroke-dasharray: 18 14;
    animation: airflowFlow 1.6s linear infinite;
  }

  .car-stage-card.climate-heat .svg-fx-climate {
    opacity: 1;
  }
  .car-stage-card.climate-heat .climate-tint {
    fill: #f97316;
  }
  .car-stage-card.climate-heat .climate-stream {
    stroke: #fdba74;
    stroke-dasharray: 18 14;
    animation: airflowFlow 1.8s linear infinite reverse;
  }

  .car-stage-card.climate-windscreen .svg-fx-windscreen {
    opacity: 1;
  }
  .car-stage-card.climate-windscreen .defrost-wave {
    stroke-dasharray: 12 10;
    animation: defrostRise 1.4s linear infinite;
  }

  @keyframes airflowFlow {
    from { stroke-dashoffset: 64; }
    to { stroke-dashoffset: 0; }
  }

  @keyframes defrostRise {
    from { stroke-dashoffset: 44; }
    to { stroke-dashoffset: 0; }
  }

  /* =========================================================
     SVG ANIMATIONS: BATTERY FILL, X-RAY & CHARGING CABLE
     ========================================================= */
  .outlander-svg .svg-batt-clip-rect {
    transition: y 0.85s cubic-bezier(0.22, 1, 0.36, 1), height 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .outlander-svg .svg-batt-horizon-group,
  .outlander-svg .svg-batt-marker {
    transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
  }

  .car-stage-card.fill-hidden .layer-battery-overlay {
    opacity: 0;
    pointer-events: none;
  }

  .outlander-svg .svg-fx-xray {
    opacity: 0;
    transition: opacity 0.45s ease;
  }
  .car-stage-card.show-xray .svg-fx-xray,
  .car-stage-card.is-charging .svg-fx-xray {
    opacity: 1;
  }

  .outlander-svg .svg-batt-charge-ripples {
    opacity: 0;
  }
  .car-stage-card.is-charging .svg-batt-charge-ripples {
    opacity: 1;
  }
  .car-stage-card.is-charging .charge-scan.s1 {
    animation: chargeScanUp 2.4s ease-out infinite;
  }
  .car-stage-card.is-charging .charge-scan.s2 {
    animation: chargeScanUp 2.4s ease-out 1.2s infinite;
  }
  .car-stage-card.is-charging .svg-batt-wave-line {
    animation: waveBob 1.6s ease-in-out infinite;
  }

  @keyframes chargeScanUp {
    0% { transform: translateY(0); opacity: 0.55; }
    100% { transform: translateY(-480px); opacity: 0; }
  }

  @keyframes waveBob {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(-1); }
  }

  /* Charger cable & port */
  .outlander-svg .svg-charger-assembly {
    opacity: 0;
    transform: translateX(8px);
    transition: opacity 0.4s ease, transform 0.4s ease;
    pointer-events: none;
  }
  .car-stage-card.is-plugged .svg-charger-assembly {
    opacity: 1;
    transform: translateX(0);
  }
  .car-stage-card.is-plugged .charge-flap-closed {
    opacity: 0;
  }

  .outlander-svg .charge-cable-energy {
    opacity: 0;
  }
  .car-stage-card.is-charging .charge-cable-energy {
    opacity: 1;
    animation: cablePulse 0.85s linear infinite;
  }
  .car-stage-card.is-charging .charge-socket-glow {
    animation: socketGlowPulse 1.5s ease-in-out infinite;
  }
  .car-stage-card.is-plugged:not(.is-charging) .charge-handle-led {
    fill: #f59e0b;
  }

  @keyframes cablePulse {
    from { stroke-dashoffset: 44; }
    to { stroke-dashoffset: 0; }
  }

  @keyframes socketGlowPulse {
    0%, 100% { opacity: 0.35; r: 11px; }
    50% { opacity: 0.85; r: 17px; }
  }

  /* Central Lock Badge on Car Roof */
  .car-stage-card.is-locked .lock-icon-open { display: none; }
  .car-stage-card.is-locked .lock-icon-closed { display: block; }
  .car-stage-card:not(.is-locked) .lock-icon-closed { display: none; }
  .car-stage-card:not(.is-locked) .lock-icon-open { display: block; }
  .car-stage-card:not(.is-locked) .lock-badge-bg {
    stroke: rgba(245, 158, 11, 0.75);
  }

  /* Interactive Car Hit Zones */
  .outlander-svg .car-hit-zone {
    fill: transparent;
    stroke: transparent;
    stroke-width: 1.5;
    cursor: pointer;
    transition: fill 0.2s ease, stroke 0.2s ease;
  }
  .car-stage-card.interactive .car-hit-zone:hover {
    fill: rgba(56, 189, 248, 0.08);
    stroke: rgba(56, 189, 248, 0.35);
  }
  .car-stage-card:not(.interactive) .car-hit-zone {
    pointer-events: none;
  }

  /* Quick Door Status Chips Bar at Bottom of Car Stage */
  .door-chips-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    width: 100%;
    padding: 2px 6px 0;
  }

  .door-chip {
    font-size: 0.68rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid rgba(148, 163, 184, 0.14);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.22s ease;
  }

  .door-chip:hover {
    border-color: rgba(148, 163, 184, 0.35);
    color: #e2e8f0;
  }

  .door-chip.open {
    background: rgba(239, 68, 68, 0.18);
    border-color: rgba(248, 113, 113, 0.55);
    color: #fca5a5;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.22);
  }

  /* =========================================================
     RIGHT COLUMN: TELEMETRY & CONTROLS
     ========================================================= */
  .ophev-controls-col {
    display: flex;
    flex-direction: column;
    gap: 13px;
    min-width: 0;
  }

  .hud-panel {
    background: var(--ophev-panel);
    border: 1px solid var(--ophev-border);
    border-radius: 16px;
    padding: 14px;
    backdrop-filter: blur(10px);
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .panel-label {
    font-size: 0.73rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ophev-muted);
  }

  /* Battery Hero Readout */
  .battery-hero {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }

  .soc-big {
    font-size: 2.15rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #f8fafc;
    cursor: pointer;
  }

  .soc-big .unit {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--ophev-muted);
    margin-left: 2px;
  }

  .ev-range-pill {
    font-size: 0.76rem;
    font-weight: 600;
    color: #38bdf8;
    background: rgba(14, 165, 233, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.24);
    padding: 4px 9px;
    border-radius: 999px;
  }

  /* Segmented Progress Bar */
  .soc-bar-track {
    position: relative;
    height: 11px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.14);
    overflow: hidden;
    margin-bottom: 12px;
    cursor: pointer;
  }

  .soc-bar-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--batt-secondary, #06b6d4), var(--batt-primary, #10b981));
    box-shadow: 0 0 14px var(--batt-glow, rgba(16, 185, 129, 0.45));
    transition: width 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
  }

  .soc-bar-fill.charging::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
    animation: barShimmer 1.7s linear infinite;
  }

  @keyframes barShimmer {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }

  /* Charge Status Banner + Details */
  .charge-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 11px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.62);
    border: 1px solid rgba(148, 163, 184, 0.12);
  }

  .charge-banner.active {
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.35);
  }

  .charge-banner.standby {
    background: rgba(245, 158, 11, 0.11);
    border-color: rgba(245, 158, 11, 0.32);
  }

  .charge-state-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .charge-icon-box {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    display: grid;
    place-items: center;
    background: rgba(30, 41, 59, 0.85);
    color: #94a3b8;
    flex-shrink: 0;
  }

  .charge-banner.active .charge-icon-box {
    background: rgba(16, 185, 129, 0.22);
    color: #34d399;
  }

  .charge-banner.standby .charge-icon-box {
    background: rgba(245, 158, 11, 0.22);
    color: #fbbf24;
  }

  .charge-state-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: #f1f5f9;
  }

  .charge-state-sub {
    font-size: 0.72rem;
    color: var(--ophev-muted);
    margin-top: 1px;
  }

  /* External Power (W) & Energy (kWh) Sparkline Mini-Cards */
  .ext-meters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 9px;
    margin-top: 10px;
  }

  .meter-tile {
    position: relative;
    background: rgba(15, 23, 42, 0.68);
    border: 1px solid rgba(148, 163, 184, 0.13);
    border-radius: 12px;
    padding: 9px 10px 0;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .meter-tile:hover {
    border-color: rgba(249, 115, 22, 0.45);
  }

  .meter-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--ophev-muted);
    margin-bottom: 3px;
  }

  .meter-val {
    font-size: 1.06rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 4px;
  }

  .meter-val span {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--ophev-muted);
    margin-left: 3px;
  }

  .meter-spark {
    width: calc(100% + 20px);
    height: 32px;
    margin: 0 -10px;
    display: block;
  }

  /* =========================================================
     CLIMATE & LIGHTING / SYSTEM ACTION BUTTONS
     ========================================================= */
  .climate-badge {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(30, 41, 59, 0.85);
    color: #cbd5e1;
    border: 1px solid var(--ophev-border);
  }

  .climate-badge.cool {
    color: #7dd3fc;
    background: rgba(14, 165, 233, 0.18);
    border-color: rgba(56, 189, 248, 0.4);
  }
  .climate-badge.heat {
    color: #fdba74;
    background: rgba(249, 115, 22, 0.2);
    border-color: rgba(249, 115, 22, 0.42);
  }
  .climate-badge.windscreen {
    color: #fde047;
    background: rgba(234, 179, 8, 0.18);
    border-color: rgba(250, 204, 21, 0.42);
  }

  .btn-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .btn-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .ctrl-btn {
    appearance: none;
    border: 1px solid var(--ophev-border);
    background: rgba(15, 23, 42, 0.68);
    color: #e2e8f0;
    border-radius: 13px;
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.22s ease;
    position: relative;
    overflow: hidden;
  }

  .ctrl-btn.row-btn {
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 12px;
    gap: 10px;
    text-align: left;
  }

  .ctrl-btn:hover:not(:disabled) {
    background: var(--ophev-panel-hover);
    border-color: var(--ophev-border-strong);
    transform: translateY(-1px);
  }

  .ctrl-btn:active:not(:disabled) {
    transform: scale(0.97);
  }

  .ctrl-btn:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }

  .ctrl-btn svg {
    width: 21px;
    height: 21px;
    flex-shrink: 0;
    transition: transform 0.3s ease, color 0.25s ease;
  }

  .ctrl-btn-text {
    font-size: 0.77rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .ctrl-btn-sub {
    font-size: 0.66rem;
    color: var(--ophev-muted);
    margin-top: 1px;
  }

  /* Active Glow Variants */
  .ctrl-btn.active-cool {
    background: rgba(14, 165, 233, 0.2);
    border-color: rgba(56, 189, 248, 0.6);
    color: #bae6fd;
    box-shadow: 0 0 18px rgba(14, 165, 233, 0.24);
  }
  .ctrl-btn.active-cool svg {
    color: #38bdf8;
    animation: spinSlow 4s linear infinite;
  }

  .ctrl-btn.active-heat {
    background: rgba(249, 115, 22, 0.2);
    border-color: rgba(251, 146, 60, 0.62);
    color: #fed7aa;
    box-shadow: 0 0 18px rgba(249, 115, 22, 0.24);
  }
  .ctrl-btn.active-heat svg {
    color: #fb923c;
  }

  .ctrl-btn.active-windscreen {
    background: rgba(245, 158, 11, 0.2);
    border-color: rgba(251, 191, 36, 0.62);
    color: #fef08a;
    box-shadow: 0 0 18px rgba(245, 158, 11, 0.22);
  }
  .ctrl-btn.active-windscreen svg {
    color: #fbbf24;
  }

  .ctrl-btn.active-light {
    background: rgba(56, 189, 248, 0.19);
    border-color: rgba(125, 211, 252, 0.62);
    color: #e0f2fe;
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.24);
  }
  .ctrl-btn.active-light svg {
    color: #7dd3fc;
  }

  .ctrl-btn.active-park {
    background: rgba(244, 63, 94, 0.18);
    border-color: rgba(251, 113, 133, 0.58);
    color: #ffe4e6;
    box-shadow: 0 0 16px rgba(244, 63, 94, 0.22);
  }
  .ctrl-btn.active-park svg {
    color: #fb7185;
  }

  .ctrl-btn.confirming {
    background: rgba(245, 158, 11, 0.22);
    border-color: rgba(251, 191, 36, 0.72);
    color: #fef08a;
  }

  .ctrl-btn.sent-ok {
    background: rgba(16, 185, 129, 0.22);
    border-color: rgba(52, 211, 153, 0.65);
    color: #a7f3d0;
  }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Climate Select Row (optional) */
  .climate-select-row {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .climate-select {
    width: 100%;
    background: rgba(15, 23, 42, 0.78);
    color: #e2e8f0;
    border: 1px solid var(--ophev-border);
    border-radius: 10px;
    padding: 7px 10px;
    font-size: 0.77rem;
    font-family: inherit;
    outline: none;
    cursor: pointer;
  }

  /* Secondary Sensor Badges & Expandable Drawer */
  .aux-sensors-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 9px;
    padding-top: 9px;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    flex-wrap: wrap;
  }

  .mini-ind {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.73rem;
    color: var(--ophev-muted);
    cursor: pointer;
    padding: 3px 7px;
    border-radius: 8px;
    transition: background 0.2s ease;
  }

  .mini-ind:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .mini-ind.on-amber {
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.15);
  }

  .mini-ind svg {
    width: 15px;
    height: 15px;
  }

  .drawer-toggle {
    background: none;
    border: none;
    color: var(--ophev-muted);
    font-size: 0.73rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 8px;
    margin-left: auto;
  }

  .drawer-toggle:hover {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.05);
  }

  .sensors-drawer {
    display: none;
    grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
    gap: 7px;
    padding-top: 10px;
    border-top: 1px solid var(--ophev-border);
  }

  .sensors-drawer.open {
    display: grid;
  }

  .drawer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 7px 10px;
    border-radius: 10px;
    background: rgba(15, 23, 42, 0.56);
    border: 1px solid rgba(148, 163, 184, 0.1);
    font-size: 0.74rem;
    cursor: pointer;
  }

  .drawer-item:hover {
    border-color: var(--ophev-border-strong);
  }

  .drawer-item-name {
    color: var(--ophev-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .drawer-item-val {
    font-weight: 600;
    color: #e2e8f0;
    white-space: nowrap;
  }

  /* =========================================================
     VEHICLE OFFLINE / SLEEP MODE HUD & SELECTIVE DIMMING
     ========================================================= */
  .car-svg-wrap {
    transition: filter 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s ease, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .mitsu-badge svg {
    transition: filter 0.5s ease, opacity 0.5s ease;
  }

  ha-card.ophev-card.is-offline .mitsu-badge svg {
    filter: grayscale(0.55);
    opacity: 0.65;
  }

  .car-stage-card.is-offline {
    border-color: rgba(148, 163, 184, 0.16);
  }

  .car-stage-card.is-offline .car-svg-wrap {
    filter: grayscale(0.9) brightness(0.46) contrast(0.92);
    opacity: 0.62;
    transform: scale(0.982);
    pointer-events: none;
  }

  .car-stage-card.is-offline .door-chips-row {
    opacity: 0.38;
    filter: grayscale(0.8);
    transition: opacity 0.4s ease;
  }

  /* Floating Glassmorphic Offline HUD Card on Car Stage */
  .offline-hud-card {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -44%) scale(0.94);
    opacity: 0;
    pointer-events: none;
    z-index: 15;
    width: calc(100% - 34px);
    max-width: 256px;
    padding: 16px 16px 15px;
    border-radius: 18px;
    background: linear-gradient(160deg, rgba(15, 23, 42, 0.88), rgba(9, 13, 22, 0.94));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(248, 113, 113, 0.36);
    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.72), 0 0 28px -8px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    transition: opacity 0.45s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .car-stage-card.is-offline .offline-hud-card {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: auto;
  }

  .offline-radar-wrap {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.24) 0%, rgba(239, 68, 68, 0.06) 72%);
    border: 1px solid rgba(248, 113, 113, 0.45);
    color: #f87171;
    display: grid;
    place-items: center;
    margin-bottom: 2px;
  }

  .offline-radar-wrap svg {
    width: 20px;
    height: 20px;
    position: relative;
    z-index: 2;
  }

  .offline-radar-ring {
    position: absolute;
    inset: -1px;
    border-radius: 50%;
    border: 1.5px solid rgba(248, 113, 113, 0.5);
    opacity: 0;
    pointer-events: none;
  }

  .car-stage-card.is-offline .offline-radar-ring.r1 {
    animation: offlineRadarExpand 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }

  .car-stage-card.is-offline .offline-radar-ring.r2 {
    animation: offlineRadarExpand 2.8s cubic-bezier(0.16, 1, 0.3, 1) 1.4s infinite;
  }

  @keyframes offlineRadarExpand {
    0% { transform: scale(0.85); opacity: 0.75; }
    100% { transform: scale(1.75); opacity: 0; }
  }

  .offline-hud-title {
    font-size: 0.86rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #f8fafc;
    line-height: 1.25;
  }

  .offline-hud-sub {
    font-size: 0.72rem;
    font-weight: 500;
    color: #94a3b8;
    line-height: 1.35;
  }

  .offline-reconnect-btn {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 8px 12px;
    border-radius: 11px;
    border: 1px solid rgba(56, 189, 248, 0.42);
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(30, 41, 59, 0.85));
    color: #e0f2fe;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .offline-reconnect-btn:hover {
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.35), rgba(30, 41, 59, 0.95));
    border-color: rgba(56, 189, 248, 0.7);
    transform: translateY(-1px);
  }

  .offline-reconnect-btn.confirming {
    border-color: rgba(245, 158, 11, 0.65);
    background: rgba(245, 158, 11, 0.22);
    color: #fef3c7;
  }

  .offline-reconnect-btn.sent-ok {
    border-color: rgba(16, 185, 129, 0.65);
    background: rgba(16, 185, 129, 0.22);
    color: #d1fae5;
  }

  .offline-reconnect-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  /* Selective dimming of phev2mqtt-dependent readouts & controls when offline
     (External wallbox W/kWh sparklines, Daily Charge helpers & Wi-Fi Restart stay 100% live!) */
  .phev-dep {
    transition: opacity 0.45s ease, filter 0.45s ease;
  }

  ha-card.ophev-card.is-offline .phev-dep {
    opacity: 0.46;
    filter: grayscale(0.72);
  }

  ha-card.ophev-card.is-offline #pill-lock,
  ha-card.ophev-card.is-offline #pill-doors {
    opacity: 0.46;
    filter: grayscale(0.75);
    animation: none !important;
  }

  .climate-badge.offline {
    color: #fca5a5;
    border-color: rgba(248, 113, 113, 0.4);
    background: rgba(239, 68, 68, 0.14);
  }

  ha-card.ophev-card.is-offline #btn-restart-wifi:not(:disabled) {
    border-color: rgba(56, 189, 248, 0.48);
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.16), rgba(30, 41, 59, 0.82));
    box-shadow: 0 0 16px -4px rgba(14, 165, 233, 0.3);
  }
`;

  // --- src/editor.js ---
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
class OutlanderPhevCardEditor extends HTMLElement {
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

  // --- src/card.js ---
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
class OutlanderPhevCard extends HTMLElement {
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

})();
