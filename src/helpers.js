import { localize } from './i18n.js';

export const CAR_PAINT_PRESETS = [
  { id: 'titanium_grey', nameHu: 'Titánszürke / Grafit', nameEn: 'Titanium Grey', hex: '#2b2f36' },
  { id: 'phantom_black', nameHu: 'Fantomfekete', nameEn: 'Phantom Black', hex: '#17191e' },
  { id: 'granite_grey', nameHu: 'Gránitszürke', nameEn: 'Granite Grey', hex: '#4a525d' },
  { id: 'sterling_silver', nameHu: 'Ezüstmetál', nameEn: 'Sterling Silver', hex: '#9ca4b0' },
  { id: 'pearl_white', nameHu: 'Gyöngyházfehér', nameEn: 'Pearl White', hex: '#e7ecf2' },
  { id: 'orient_red', nameHu: 'Rubinvörös', nameEn: 'Orient Red', hex: '#8e1c24' },
  { id: 'cosmic_blue', nameHu: 'Kozmoszkék', nameEn: 'Cosmic Blue', hex: '#1c3e70' },
  { id: 'quartz_bronze', nameHu: 'Kvarcbronz', nameEn: 'Quartz Bronze', hex: '#524136' },
];

export const ENTITY_KEYS = [
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
  'climate_remaining_entity',
  'climate_stop_time_entity',
  'head_lights_entity',
  'park_lights_entity',
  'hazard_lights_entity',
  'interior_lights_entity',
  'connected_entity',
  'restart_wifi_entity',
  // New Diagnostics & Telemetry
  'ignition_state_entity',
  'theft_alarm_entity',
  'theft_alarm_last_event_entity',
  'clear_alarm_entity',
  'locate_car_entity',
  'car_clock_entity',
  'sync_car_clock_entity',
  'battery_warning_entity',
  'battery_thermal_entity',
  'battery_warming_entity',
  'wifi_ssid_entity',
  'wifi_channel_entity',
  'wifi_always_on_entity',
  'refresh_status_entity',
  'vin_entity',
  'ecu_version_entity',
  'steering_side_entity',
  'registered_phones_entity',
  'last_seen_entity',
  // New Climate & Charge Timers
  'climate_timer_master_entity',
  'climate_timer_mode_entity',
  'charge_timer_master_entity',
  'charge_now_entity',
  'waiting_charge_timer_entity',
  'climate_duration_min_entity',
  'climate_start_delay_min_entity',
  'reset_climate_error_entity',
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

export function computeCarPaintPalette(hex = '#2b2f36') {
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

export function getBatteryColors(pct, isCharging = false) {
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

export function isBinaryOn(stateObj) {
  if (!stateObj) return false;
  const s = String(stateObj.state || '').toLowerCase().trim();
  return s === 'on' || s === 'open' || s === 'connected' || s === 'charging' || s === 'true' || s === '1';
}

export function isDoorOpen(stateObj) {
  if (!stateObj) return false;
  const s = String(stateObj.state || '').toLowerCase().trim();
  return s === 'on' || s === 'open' || s === 'nyitva' || s === 'true';
}

export function isCarLocked(stateObj, invertLock = false) {
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

export function parseBatteryLevel(stateObj, fallback = null) {
  if (!stateObj) return fallback;
  const n = parseFloat(String(stateObj.state).replace(',', '.'));
  if (!Number.isFinite(n)) return fallback;
  return clamp(Math.round(n), 0, 100);
}

export function formatNumber(value, decimals = 0, lang = 'hu') {
  const n = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
  if (!Number.isFinite(n)) return null;
  return n.toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatRemainingTime(remainingObj, remainingHrsObj, lang = 'hu') {
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

export function formatEstimatedCompletion(estObj, remainingObj, isCharging, lang = 'hu') {
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

export function formatClimateRemaining(stateObj, lang = 'hu') {
  if (!stateObj) return '--';
  const raw = String(stateObj.state ?? '').trim();
  if (!raw || raw === 'unknown' || raw === 'unavailable') return '--';

  const mins = parseFloat(raw.replace(',', '.'));
  if (Number.isFinite(mins)) {
    if (mins <= 0) return '--';
    const total = Math.round(mins);
    const h = Math.floor(total / 60);
    const m = total % 60;
    if (h > 0) {
      return `${h} ${localize(lang, 'hr_short')} ${m} ${localize(lang, 'min_short')}`;
    }
    return `${m} ${localize(lang, 'min_short')}`;
  }
  const unit = stateObj.attributes?.unit_of_measurement || '';
  return unit && !raw.includes(unit) ? `${raw} ${unit}` : raw;
}

export function formatClimateStopTime(stopObj, remObj, isClimateActive = false, lang = 'hu') {
  if (stopObj) {
    const raw = String(stopObj.state ?? '').trim();
    if (raw && raw !== 'unknown' && raw !== 'unavailable' && raw !== '--:--' && raw !== '0') {
      // Check if ISO timestamp (e.g. 2026-11-09T07:35:00Z)
      if (/^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}/.test(raw)) {
        const dt = new Date(raw);
        if (!Number.isNaN(dt.getTime())) {
          return dt.toLocaleTimeString(lang === 'hu' ? 'hu-HU' : 'en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      }
      // If already HH:MM or HH:MM:SS
      if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(raw)) {
        return raw.length > 5 ? raw.slice(0, 5) : raw;
      }
      return raw;
    }
  }

  // Fallback: if climate is active and we have remaining minutes, compute estimated finish time
  if (isClimateActive && remObj) {
    const mins = parseFloat(String(remObj.state).replace(',', '.'));
    if (Number.isFinite(mins) && mins > 0 && mins < 1440) {
      const finish = new Date(Date.now() + mins * 60 * 1000);
      return `~${finish.toLocaleTimeString(lang === 'hu' ? 'hu-HU' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
  }

  return '--:--';
}

export function formatDailyEnergy(stateObj, hass, lang = 'hu') {
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

export function formatDailyDuration(stateObj, hass, lang = 'hu') {
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

export function formatLastSeen(stateObj, lang = 'hu') {
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
export function autoDiscoverPhevEntities(hass) {
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

  // Also include entities matching phev / outlander / mitsubishi or signature phev2mqtt names
  for (const st of allStates) {
    const id = st.entity_id.toLowerCase();
    const fn = String(st.attributes?.friendly_name || '').toLowerCase();
    if (
      id.includes('phev') ||
      id.includes('outlander') ||
      id.includes('mitsubishi') ||
      fn.includes('phev') ||
      fn.includes('outlander') ||
      fn.includes('mitsubishi') ||
      id.includes('restart_wifi_connetion') ||
      id.includes('reconnect_wifi') ||
      id.includes('cancel_charge_timer') ||
      id.includes('front_passenger')
    ) {
      candidateIds.add(st.entity_id);
    }
  }

  // If candidate pool has elements, search it first; fallback to all states
  const pool = candidateIds.size >= 1
    ? Array.from(candidateIds).map((id) => hass.states[id]).filter(Boolean)
    : allStates;

  const pick = (domains, matchFn) => {
    // Prefer candidates from the PHEV pool first, then fallback to allStates
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
      return matchFn(id, fn, st);
    });
    return foundGlobal ? foundGlobal.entity_id : undefined;
  };

  const result = {
    battery_entity: pick(['sensor'], (id, fn, st) =>
      (id.includes('battery_level') || /\bbattery\b/.test(fn) || id.endsWith('_battery')) &&
      !id.includes('raw') &&
      !fn.includes('raw') &&
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
    climate_remaining_entity: pick(['sensor'], (id, fn) =>
      (id.includes('climate') && (id.includes('remaining') || id.includes('rem_time'))) ||
      (fn.includes('climate') && fn.includes('remaining'))
    ),
    climate_stop_time_entity: pick(['sensor'], (id, fn) =>
      (id.includes('climate') && (id.includes('stop_time') || id.includes('stoptime') || id.includes('completion_time') || id.includes('completion'))) ||
      (fn.includes('climate') && (fn.includes('stop time') || fn.includes('completion time')))
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

    // Diagnostics & System Telemetry
    ignition_state_entity: pick(['sensor'], (id, fn) =>
      id.includes('ignition_state') || id.includes('ignition') || fn.includes('ignition')
    ),
    theft_alarm_entity: pick(['sensor', 'binary_sensor'], (id, fn) =>
      id.includes('theft_alarm') || id.includes('alarm_state') || fn.includes('theft alarm')
    ),
    theft_alarm_last_event_entity: pick(['sensor'], (id, fn) =>
      id.includes('last_theft_alarm') || id.includes('alarm_last_event') || fn.includes('last alarm')
    ),
    clear_alarm_entity: pick(['button', 'switch'], (id, fn) =>
      (id.includes('clear') && id.includes('alarm')) ||
      id.includes('alarm_clear') ||
      (fn.includes('clear') && fn.includes('alarm'))
    ),
    locate_car_entity: pick(['button', 'switch', 'light'], (id, fn) =>
      id.includes('locate_car') || id.includes('flash_lights') || id.includes('locate') || fn.includes('locate')
    ),
    car_clock_entity: pick(['sensor'], (id, fn) =>
      id.includes('car_clock') || id.includes('phev_clock') || (id.includes('clock') && !id.includes('sync')) || fn.includes('car clock') || fn.includes('clock')
    ),
    sync_car_clock_entity: pick(['button', 'switch'], (id, fn) =>
      id.includes('sync_car_clock') || (id.includes('sync') && id.includes('clock')) || id.includes('synctime') || (fn.includes('sync') && fn.includes('clock'))
    ),
    battery_warning_entity: pick(['binary_sensor', 'sensor'], (id, fn) =>
      (id.includes('battery_warning') || fn.includes('battery warning')) && !id.includes('thermal') && !id.includes('warming')
    ),
    battery_thermal_entity: pick(['sensor', 'binary_sensor'], (id, fn) =>
      id.includes('battery_thermal') || id.includes('thermal_status') || (id.includes('thermal') && !id.includes('warming')) || fn.includes('thermal')
    ),
    battery_warming_entity: pick(['binary_sensor', 'sensor', 'switch'], (id, fn) =>
      id.includes('battery_warming') || id.includes('battery_heater') || fn.includes('battery warming') || fn.includes('warming') || fn.includes('heater')
    ),
    wifi_ssid_entity: pick(['sensor'], (id, fn) =>
      id.includes('wifi_ssid') || id.includes('ssid') || fn.includes('wifi ssid') || fn.includes('ssid')
    ),
    wifi_channel_entity: pick(['select', 'sensor'], (id, fn) =>
      id.includes('wifi_channel') || id.includes('channel') || fn.includes('wifi channel') || fn.includes('channel')
    ),
    wifi_always_on_entity: pick(['switch', 'binary_sensor'], (id, fn) =>
      id.includes('keep_wifi_always_active') || id.includes('wifi_always_on') || id.includes('always_active') || fn.includes('always active') || fn.includes('always on')
    ),
    refresh_status_entity: pick(['button', 'switch'], (id, fn) =>
      id.includes('refresh_vehicle_status') || id.includes('refresh') || fn.includes('refresh')
    ),
    vin_entity: pick(['sensor'], (id, fn) =>
      id.includes('phev_vin') || id.endsWith('_vin') || id.includes('vin') || id.includes('alvazszam') || fn.includes('vin')
    ),
    ecu_version_entity: pick(['sensor'], (id, fn) =>
      id.includes('ecu_version') || id.includes('ecuversion') || id.includes('firmware') || fn.includes('ecu version') || fn.includes('firmware')
    ),
    steering_side_entity: pick(['sensor'], (id, fn) =>
      id.includes('steering_side') || id.includes('steering') || fn.includes('steering')
    ),
    registered_phones_entity: pick(['sensor'], (id, fn) =>
      id.includes('registered_smartphones') || id.includes('smartphones') || id.includes('registrations') || fn.includes('smartphones') || fn.includes('registered')
    ),
    last_seen_entity: pick(['sensor'], (id, fn) =>
      id.includes('phev_last_seen') || fn.includes('last seen')
    ),

    // Timers & Pre-AC Extensions
    climate_timer_master_entity: pick(['switch'], (id, fn) =>
      id.includes('climate_timer_master') || fn.includes('climate timer master')
    ),
    climate_timer_mode_entity: pick(['select'], (id, fn) =>
      id.includes('climate_timer_mode') || fn.includes('climate timer mode')
    ),
    charge_timer_master_entity: pick(['switch'], (id, fn) =>
      id.includes('charge_timer_master') || fn.includes('charge timer master')
    ),
    charge_now_entity: pick(['button', 'switch'], (id, fn) =>
      id.includes('charge_now') || id.includes('override_timer') || fn.includes('charge immediately')
    ),
    waiting_charge_timer_entity: pick(['binary_sensor'], (id, fn) =>
      id.includes('waiting_for_charge_timer') || id.includes('timer_inhibited') || fn.includes('waiting for timer')
    ),
    climate_duration_min_entity: pick(['select', 'input_select'], (id, fn) =>
      id.includes('climate_duration') ||
      id.includes('duration_min') ||
      (id.includes('climate') && id.includes('duration')) ||
      fn.includes('időtartam') ||
      (fn.includes('duration') && (fn.includes('climate') || fn.includes('pre-conditioning') || fn.includes('előfűtés')))
    ),
    climate_start_delay_min_entity: pick(['select', 'input_select'], (id, fn) =>
      id.includes('climate_start_delay') ||
      id.includes('start_delay') ||
      (id.includes('climate') && id.includes('delay')) ||
      fn.includes('késleltetés') ||
      (fn.includes('start delay') && (fn.includes('climate') || fn.includes('pre-conditioning') || fn.includes('előfűtés')))
    ),
    reset_climate_error_entity: pick(['button'], (id, fn) =>
      id.includes('reset_climate_error') || fn.includes('clear termination')
    ),
  };

  return Object.fromEntries(Object.entries(result).filter(([, v]) => Boolean(v)));
}

/**
 * Metadata catalog for ETACS & AC Customization Settings (0x01..0x3c)
 */
export const SETTING_DEFINITIONS = {
  wipers_key_position: { cat: 'wipers', hu: 'Ablaktörlő működése gyújtáskapcsoló állásban', en: 'Wipers Operation in Key Position' },
  front_wiper_intermittent: { cat: 'wipers', hu: 'Első ablaktörlő szakaszos működése', en: 'Windshield Wipers Intermittent Operation' },
  wipers_linked_to_washer: { cat: 'wipers', hu: 'Ablakmosóhoz kapcsolt törlés', en: 'Wipers Linked to Washer' },
  rear_wiper_interval: { cat: 'wipers', hu: 'Hátsó ablaktörlő intervallum', en: 'Rear Wiper Intermittent Interval' },
  comfort_washer: { cat: 'wipers', hu: 'Komfort ablakmosó funkció', en: 'Comfort Washer' },
  rear_wiper_in_reverse: { cat: 'wipers', hu: 'Hátsó ablaktörlő hátramenetben', en: 'Rear Wiper Activated in Reverse' },

  lane_change_3flash: { cat: 'turn_signal', hu: 'Sávváltó 3-villanásos komfort irányjelző', en: 'Lane-change 3-Flash Turn Signal' },
  lane_change_activation_time: { cat: 'turn_signal', hu: 'Sávváltó irányjelző aktiválási ideje', en: 'Activation Time for Lane-change Signals' },

  turn_signal_answerback: { cat: 'keyless', hu: 'Irányjelző villogás nyitáskor/záráskor', en: 'Turn Signal Lights Answerback' },
  horn_answerback_lock: { cat: 'keyless', hu: 'Kürt visszajelzés záráskor', en: 'Horn Answerback at Keyless Lock' },
  kos_answerback_beep: { cat: 'keyless', hu: 'Kulcsnélküli hangjelzés (Beep)', en: 'Keyless Answerback Beep' },
  auto_relock_time: { cat: 'keyless', hu: 'Automatikus visszazárási idő feloldás után', en: 'Automatic Relocking After Remote Unlock' },
  multi_mode_keyless: { cat: 'keyless', hu: 'Multi Mode kulcsnélküli ablak/tükör vezérlés', en: 'Multi Mode Keyless Entry System' },
  horn_answerback_duration: { cat: 'keyless', hu: 'Kürt visszajelzés hanghossza', en: 'Duration of Horn Answerback' },
  remote_unlock_inactivation: { cat: 'keyless', hu: 'Nyitás letiltási késleltetés zárás után', en: 'Remote Unlock Inactivation After Locking' },
  horn_remote_start: { cat: 'keyless', hu: 'Kürt visszajelzés távindításkor', en: 'Horn Answerback at Remote Start' },

  charging_lid_light_cutout: { cat: 'lights', hu: 'Töltőfedél világítás automatikus lekapcsolása', en: 'Charging Lid Light Auto Cut-out' },
  auto_light_sensitivity: { cat: 'lights', hu: 'Automata fényszóró fényérzékenysége', en: 'Sensitivity for Auto Light' },
  auto_light_linked_wiper: { cat: 'lights', hu: 'Automata fényszóró ablaktörlőhöz kapcsolása', en: 'Auto Light Linked to Wiper' },
  dome_light_delay: { cat: 'lights', hu: 'Belső mennyezetvilágítás késleltetése ajtózárás után', en: 'Dome Light Duration After Door Closed' },
  headlight_auto_cutout: { cat: 'lights', hu: 'Fényszóró automatikus lekapcsolása kiszálláskor', en: 'Headlight Auto-cutout Function' },
  interior_light_auto_cutout: { cat: 'lights', hu: 'Belső világítás energiatakarékos lekapcsolása', en: 'Interior Light Auto-cutout Time' },
  headlights_on_exit: { cat: 'lights', hu: 'Hazakísérő fény (Coming Home) időtartama', en: 'Headlights ON When Exiting Vehicle' },
  exterior_lights_remote_unlock: { cat: 'lights', hu: 'Külső fények felkapcsolása távoli nyitáskor (Welcome Light)', en: 'Exterior Lights ON with Remote Unlock' },

  auto_fold_mirrors: { cat: 'mirrors', hu: 'Visszapillantó tükrök automatikus behajtása', en: 'Auto Fold Mirrors' },

  automatic_door_unlock: { cat: 'locks', hu: 'Automatikus ajtónyitás (P fokozat / leállítás)', en: 'Automatic Door Unlock' },
  selective_door_unlock: { cat: 'locks', hu: 'Szelektív ajtónyitás (csak vezető / összes ajtó)', en: 'Unlock Operation' },
  deadlock_button_pushes: { cat: 'locks', hu: 'Reteszelő zár (Deadlock) gombnyomások', en: 'Lock Button Pushes for Dead Lock' },

  power_window_keyoff_timer: { cat: 'windows', hu: 'Ablakemelő működtetési idő gyújtás levétele után', en: 'Power Window Timer After IG Off' },
  window_open_after_ig_off: { cat: 'windows', hu: 'Ablaknyitás engedélyezése leállítás után', en: 'Window Open Operation After IG Off' },
  window_lock_switch_scope: { cat: 'windows', hu: 'Ablakzár kapcsoló hatóköre', en: 'Power Window Lock-switch Scope' },

  ac_recirculation_control: { cat: 'ac', hu: 'Belső levegőkeringetés automatikus vezérlése', en: 'Recirculation Control' },
  ac_switch_control: { cat: 'ac', hu: 'A/C kompresszor kapcsoló vezérlése', en: 'A/C Switch Control' },
  ac_eco_mode: { cat: 'ac', hu: 'A/C Eco / Comfort üzemmód', en: 'A/C Eco Mode' },
  foot_defroster_airflow_ratio: { cat: 'ac', hu: 'Lábtér / Szélvédő légáramlás aránya', en: 'Foot / Defroster Airflow Ratio' },
  face_foot_airflow_ratio: { cat: 'ac', hu: 'Mellkas / Lábtér légáramlás aránya', en: 'Face / Foot Airflow Ratio' },
  auto_rear_defrost_at_start: { cat: 'ac', hu: 'Automatikus hátsó szélvédőfűtés induláskor', en: 'Automatic Rear Defrost at Start' },
  start_ac_at_door_unlock: { cat: 'ac', hu: 'Klíma / Fűtés indítása ajtónyitáskor', en: 'Start A/C or Heater at Door Unlock' },
  foot_mode_defroster_bleed: { cat: 'ac', hu: 'Szélvédő mikrolevegőzés lábtér üzemmódban', en: 'Slight Defroster Airflow in Foot Mode' },
  fast_idle_heater_boost: { cat: 'ac', hu: 'Megnövelt alapjárat magasabb fűtési teljesítményhez', en: 'Fast Idle for Higher Heater Performance' },

  acc_power_auto_cutout: { cat: 'other', hu: 'ACC fogyasztók automatikus lekapcsolása', en: 'Auto Cut of ACC Power' },

  // Aliases & extra vehicle options
  front_wiper_operation: { cat: 'wipers', hu: 'Első ablaktörlő működés', en: 'Front Wiper Operation' },
  turn_signal_flasher_mode: { cat: 'turn_signal', hu: 'Irányjelző komfort villantás mód', en: 'Turn Signal Flasher Mode' },
  rear_wiper_reverse_gear_operation: { cat: 'wipers', hu: 'Hátsó törlő tolatáskor', en: 'Rear Wiper in Reverse Gear' },
  headlight_auto_off_delay: { cat: 'lights', hu: 'Fényszóró lekapcsolási késleltetés', en: 'Headlight Auto-off Delay' },
  mirror_auto_fold: { cat: 'mirrors', hu: 'Tükör automatikus behajtás', en: 'Mirror Auto Fold' },
  keyless_entry_hazard_answerback: { cat: 'keyless', hu: 'Kulcsnélküli vészvillogó visszajelzés', en: 'Keyless Hazard Answerback' },
  auto_door_lock_by_speed: { cat: 'locks', hu: 'Automatikus ajtózár sebességre', en: 'Auto Door Lock by Speed' },
  power_window_timer: { cat: 'windows', hu: 'Elektromos ablak időzítő', en: 'Power Window Timer' },
  air_conditioning_inlet_mode: { cat: 'ac', hu: 'Klíma levegőbemenet mód', en: 'A/C Air Inlet Mode' },
  wifi_channel: { cat: 'other', hu: 'Wi-Fi kommunikációs csatorna', en: 'Wi-Fi Channel' },
  climate_duration_min: { cat: 'ac', hu: 'Előfűtés/hűtés időtartama (perc)', en: 'Pre-conditioning Duration' },
  climate_start_delay_min: { cat: 'ac', hu: 'Előfűtés/hűtés indítási késleltetés (perc)', en: 'Pre-conditioning Start Delay' },

  // ETACS Custom Register IDs discovered on vehicles (0x1e, 0x26, 0x27)
  setting_1e: { cat: 'keyless', hu: 'ETACS Kényelmi funkció (0x1E)', en: 'ETACS Convenience Setting (0x1E)' },
  setting_26: { cat: 'lights', hu: 'ETACS Világítás vezérlés (0x26)', en: 'ETACS Lighting Setting (0x26)' },
  setting_27: { cat: 'lights', hu: 'ETACS Vészfékezés / Világítás (0x27)', en: 'ETACS Safety / Lighting Setting (0x27)' },
};

/**
 * Discovers and groups all ETACS/AC customization settings from Home Assistant.
 */
export function getPhevCustomizationSettings(hass, lang = 'hu') {
  if (!hass || !hass.states) return [];
  const entries = [];

  function cleanStr(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  for (const [entityId, st] of Object.entries(hass.states)) {
    if (!entityId.startsWith('select.')) continue;
    const lowerId = entityId.toLowerCase();
    const friendly = String(st.attributes?.friendly_name || '').toLowerCase();

    // Skip card-level operational controls that are managed in specific card components
    if (lowerId.endsWith('_climate_state') || lowerId === 'select.phev_climate_state') continue;
    if (lowerId.includes('_timer_mode')) continue;
    if (lowerId.includes('_timer_') && (lowerId.includes('_duration') || lowerId.includes('_days') || lowerId.includes('_time'))) continue;

    const isPhevEntity =
      lowerId.includes('phev') ||
      lowerId.includes('outlander') ||
      friendly.includes('phev') ||
      friendly.includes('outlander');

    const isExplicitSetting =
      lowerId.includes('setting') ||
      lowerId.includes('settings') ||
      lowerId.includes('etacs') ||
      lowerId.includes('customization') ||
      friendly.includes('setting') ||
      friendly.includes('etacs');

    const cId = cleanStr(lowerId);
    const cName = cleanStr(friendly);

    // Try matching SETTING_DEFINITIONS (check raw slug, English name, and Hungarian name)
    let matchedSlug = null;
    let def = null;

    for (const [slug, d] of Object.entries(SETTING_DEFINITIONS)) {
      const cSlug = cleanStr(slug);
      const cEn = cleanStr(d.en);
      const cHu = cleanStr(d.hu);

      if (
        cId.includes(cSlug) ||
        cSlug.includes(cId.replace(/^(select)?phev/, '')) ||
        cName.includes(cEn) ||
        cEn.includes(cName.replace(/^(select)?phev/, '')) ||
        cId.includes(cEn) ||
        cEn.includes(cId.replace(/^(select)?phev/, '')) ||
        (cHu && (cName.includes(cHu) || cId.includes(cHu)))
      ) {
        matchedSlug = slug;
        def = d;
        break;
      }
    }

    if (!isPhevEntity && !isExplicitSetting && !def) continue;

    let cat = def?.cat;
    if (!cat) {
      const hexMatch = lowerId.match(/setting_([0-9a-f]{2})/);
      if (hexMatch) {
        const idNum = parseInt(hexMatch[1], 16);
        if (idNum >= 0x01 && idNum <= 0x06) cat = 'wipers';
        else if (idNum >= 0x07 && idNum <= 0x0d) cat = 'lights';
        else if (idNum >= 0x0e && idNum <= 0x0f) cat = 'turn_signal';
        else if (idNum >= 0x10 && idNum <= 0x13) cat = 'locks';
        else if (idNum >= 0x14 && idNum <= 0x21) cat = 'keyless';
        else if (idNum >= 0x22 && idNum <= 0x23) cat = 'windows';
        else if (idNum >= 0x24 && idNum <= 0x2b) cat = 'lights';
        else if (idNum >= 0x2c && idNum <= 0x3c) cat = 'ac';
      }
    }
    if (!cat) {
      if (cId.includes('wiper') || cName.includes('wiper')) cat = 'wipers';
      else if (cId.includes('turnsignal') || cId.includes('flasher') || cId.includes('indicator') || cName.includes('turn signal')) cat = 'turn_signal';
      else if (cId.includes('mirror') || cName.includes('mirror')) cat = 'mirrors';
      else if (cId.includes('window') || cName.includes('window')) cat = 'windows';
      else if (cId.includes('lock') || cId.includes('deadlock') || cId.includes('door') || cName.includes('lock') || cName.includes('door')) cat = 'locks';
      else if (cId.includes('light') || cId.includes('lamp') || cId.includes('headlight') || cId.includes('lid') || cName.includes('light') || cName.includes('lamp')) cat = 'lights';
      else if (cId.includes('keyless') || cId.includes('remote') || cId.includes('kos') || cId.includes('horn') || cId.includes('beep') || cName.includes('keyless') || cName.includes('remote') || cName.includes('horn')) cat = 'keyless';
      else if (cId.includes('ac') || cId.includes('air') || cId.includes('climate') || cId.includes('heat') || cId.includes('cool') || cId.includes('defrost') || cId.includes('idle') || cName.includes('ac') || cName.includes('air') || cName.includes('climate') || cName.includes('defrost')) cat = 'ac';
      else cat = 'other';
    }

    let label = def ? (lang === 'hu' ? def.hu : def.en) : null;
    if (!label) {
      const hexMatch = lowerId.match(/setting_([0-9a-f]{2})/);
      if (hexMatch) {
        const hexUpper = hexMatch[1].toUpperCase();
        label = lang === 'hu' ? `ETACS beállítás (0x${hexUpper})` : `ETACS Setting (0x${hexUpper})`;
      } else {
        const cleanFriendly = (st.attributes?.friendly_name || '').replace(/^(phev|mitsubishi)\s+/i, '');
        label = cleanFriendly || entityId.replace(/^select\./, '').replace(/_/g, ' ');
      }
    }

    entries.push({
      entity_id: entityId,
      slug: matchedSlug || entityId.replace('select.', ''),
      cat,
      label,
      state: st.state,
      options: Array.isArray(st.attributes?.options) ? st.attributes.options : [],
    });
  }

  // Sort by category order then label
  const catOrder = ['wipers', 'turn_signal', 'keyless', 'lights', 'mirrors', 'locks', 'windows', 'ac', 'other'];
  return entries.sort((a, b) => {
    const ca = catOrder.indexOf(a.cat);
    const cb = catOrder.indexOf(b.cat);
    if (ca !== cb) return ca - cb;
    return a.label.localeCompare(b.label, lang === 'hu' ? 'hu' : 'en');
  });
}

/**
 * Discovers climate timer slot entities (1..5).
 */
export function getPhevClimateTimers(hass) {
  if (!hass || !hass.states) return [];
  const slots = [];
  for (let s = 1; s <= 5; s++) {
    const prefix = `climate_timer_${s}`;
    const enabledEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('enabled'));
    const timeEnt = Object.keys(hass.states).find(
      (id) =>
        id.includes(prefix) &&
        !id.includes('enabled') &&
        (id.endsWith('_time') || id.endsWith('time') || (id.includes('_time_') && !id.includes('_timer_')) || id.startsWith('time.'))
    );
    const durEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('duration'));
    const daysEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('days'));
    const summaryEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('summary'));

    slots.push({
      slot: s,
      enabledEntity: enabledEnt,
      timeEntity: timeEnt,
      durationEntity: durEnt,
      daysEntity: daysEnt,
      summaryEntity: summaryEnt,
      enabled: enabledEnt ? hass.states[enabledEnt]?.state === 'on' : false,
      time: timeEnt ? hass.states[timeEnt]?.state || '--:--' : '--:--',
      duration: durEnt ? hass.states[durEnt]?.state || '20' : '20',
      days: daysEnt ? hass.states[daysEnt]?.state || 'Everyday' : 'Everyday',
      summary: summaryEnt ? hass.states[summaryEnt]?.state : null,
    });
  }
  return slots;
}

/**
 * Discovers charge timer slot entities (1..5).
 */
export function getPhevChargeTimers(hass) {
  if (!hass || !hass.states) return [];
  const slots = [];
  for (let s = 1; s <= 5; s++) {
    const prefix = `charge_timer_${s}`;
    const enabledEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('enabled'));
    const startEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('start'));
    const endEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('end'));
    const fullEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('full_charge'));
    const daysEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('days'));
    const summaryEnt = Object.keys(hass.states).find((id) => id.includes(prefix) && id.includes('summary'));

    slots.push({
      slot: s,
      enabledEntity: enabledEnt,
      startEntity: startEnt,
      endEntity: endEnt,
      fullChargeEntity: fullEnt,
      daysEntity: daysEnt,
      summaryEntity: summaryEnt,
      enabled: enabledEnt ? hass.states[enabledEnt]?.state === 'on' : false,
      start: startEnt ? hass.states[startEnt]?.state || '--:--' : '--:--',
      end: endEnt ? hass.states[endEnt]?.state || '--:--' : '--:--',
      fullCharge: fullEnt ? hass.states[fullEnt]?.state === 'on' : true,
      days: daysEnt ? hass.states[daysEnt]?.state || 'Everyday' : 'Everyday',
      summary: summaryEnt ? hass.states[summaryEnt]?.state : null,
    });
  }
  return slots;
}

/**
 * Generates smooth SVG line & area path strings from numeric samples.
 */
export function buildSparklinePaths(values, width = 160, height = 38) {
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
