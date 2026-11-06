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
