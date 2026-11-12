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
    climate_remaining: 'Hátralévő idő',
    climate_stop_time: 'Várható leállás',
    climate_duration: 'Időtartam',
    climate_delay: 'Késleltetés',

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

    // Connection & MQTT
    ed_sec_connection: 'Kapcsolódási Mód és MQTT Bróker',
    ed_conn_mode: 'Működési és kapcsolódási mód',
    ed_conn_mode_auto: '⚡ Automatikus (HA MQTT / Közvetlen bróker / Entitások)',
    ed_conn_mode_ha_mqtt: '🏠 Home Assistant beépített MQTT integráció (WebSocket)',
    ed_conn_mode_direct_mqtt: '🌐 Közvetlen WebSocket MQTT Bróker (wss:// vagy ws://)',
    ed_conn_mode_entities: '📋 Csak Home Assistant entitások (Hagyományos mód)',
    ed_mqtt_prefix: 'MQTT téma előtag (Topic prefix)',
    ed_mqtt_vin: 'Jármű VIN alvázszám (opc. szűrés)',
    ed_mqtt_url: 'Közvetlen WebSocket MQTT URL (pl. wss://mqtt.lorinszkym.synology.me/mqtt)',
    ed_mqtt_user: 'MQTT Felhasználónév (opcionális)',
    ed_mqtt_pass: 'MQTT Jelszó (opcionális)',
    mqtt_connected: 'MQTT Kapcsolódva',
    mqtt_connecting: 'MQTT Kapcsolódás...',
    mqtt_disconnected: 'MQTT Nincs kapcsolat',

    // Timers & Schedules
    timers_btn: 'Időzítők',
    timers_title: 'Időzített Töltés és Előfűtés (Timers 1–5)',
    climate_tab: 'Klíma & Fűtés',
    charge_tab: 'Töltés',
    tab_climate_timers: 'Klíma & Fűtés időzítők',
    tab_charge_timers: 'Töltési időzítők',
    climate_timer_master: 'Klíma időzítő főkapcsoló',
    timer_master_enabled: 'Főkapcsoló: Aktív',
    timer_master_disabled: 'Főkapcsoló: Kikapcsolva',
    timer_scheduled_mode: 'Időzített üzemmód',
    timer_slot: 'Időzítő {slot}',
    slot_num: 'Időzítő #{num}',
    timer_enabled: 'Aktív',
    timer_disabled: 'Kikapcsolva',
    ready_time: 'Indulási idő (Készre)',
    start_time: 'Töltés kezdete',
    stop_time: 'Töltés vége',
    duration: 'Időtartam',
    days_active: 'Aktív napok',
    timer_start_time: 'Kezdés (HH:MM)',
    timer_end_time: 'Befejezés (HH:MM)',
    timer_duration: 'Időtartam (perc)',
    timer_full_charge: 'Teljes feltöltésig',
    timer_days: 'Aktív napok',
    preset_everyday: 'Minden nap',
    preset_weekdays: 'Hétköznapok',
    preset_weekend: 'Hétvége',
    preset_weekends: 'Hétvégék',
    charge_now_override: 'Azonnali töltés (Időzítő felülbírálása)',
    charge_waiting_timer: 'Várakozás időzített töltési ablakra',
    pre_ac_duration: 'Időtartam',
    pre_ac_delay: 'Késleltetés',
    pre_ac_stop_time: 'Várható leállás',
    pre_ac_reset_alert: 'Hibaüzenet törlése',

    // Diagnostics & System
    diag_btn: 'Diagnosztika',
    diag_title: 'Jármű Diagnosztika, Óra és Wi-Fi',
    diag_sub: 'Gyújtás, Riasztó, Óra, Wi-Fi és ECU diagnosztika',
    timers_sub: 'Klíma, Előfűtés és Töltési menetrend (1-5 slot)',
    ignition_title: 'Gyújtás / Menetkészültség',
    ignition_off: 'Kikapcsolva (OFF)',
    ignition_acc: 'Tartozékok (ACC)',
    ignition_on: 'Gyújtás BE (ON)',
    ignition_ready: 'READY (Menetkész)',
    theft_alarm_title: 'Lopásgátló Riasztó',
    theft_alarm: 'Riasztó állapota',
    alarm_disarmed: 'Hatástalanítva',
    alarm_armed: 'Élesítve',
    alarm_triggered: 'RIASZTÁS AKTÍV!',
    alarm_last_event: 'Utolsó riasztási esemény',
    clear_alarm: 'Riasztás törlése',
    alarm_clear_btn: 'Riasztás jelzés törlése',
    locate_car: 'Autó keresése',
    locate_car_btn: 'Jármű keresése (Fénykürt)',
    locate_car_sent: 'Fénykürt aktiválva!',
    thermal_title: 'Akkumulátor Védelem',
    battery_thermal_title: 'Akkumulátor Védelem',
    battery_warming: 'Akkumulátorfűtés aktív',
    batt_thermal_state: 'Akkumulátor hőmérséklet',
    batt_warming: 'Akkumulátorfűtés',
    batt_warning_active: 'Figyelmeztetés aktív',
    clock_title: 'Óra és Wi-Fi',
    car_clock_title: 'Jármű belső órája',
    car_clock: 'Belső óra',
    sync_clock: 'Óra szinkron',
    car_clock_sync_btn: 'Óra szinkronizálása',
    car_clock_sync_done: 'Óra szinkronizálva!',
    wifi_settings_title: 'Wi-Fi & Kommunikáció',
    wifi_ssid: 'SSID',
    wifi_channel: 'Csatorna',
    wifi_always_on: 'Folyamatos Wi-Fi (ne aludjon el)',
    refresh_status_btn: 'Státusz frissítése most',
    vehicle_info_title: 'Jármű Azonosítók',
    vehicle_specs: 'Jármű adatok',
    vin: 'Alvázszám (VIN)',
    ecu_version: 'ECU szoftververzió',
    firmware_version: 'ECU Firmware verzió',
    steering_side: 'Kormányoldal',
    registered_phones: 'Regisztrált telefonok',
    last_packet: 'Utolsó adatcsomag',

    // Settings Modal (ETACS / AC)
    settings_btn: 'Beállítások',
    settings_title: 'Mitsubishi ETACS & Klíma Beállítások',
    settings_sub: 'Gyári jármű-testreszabás és kényelmi funkciók (phev2mqtt)',
    settings_subtitle: 'Gyári jármű-testreszabás és kényelmi funkciók (phev2mqtt)',
    settings_active_count: 'elérhető beállítás',
    settings_search: 'Keresés a beállítások között',
    settings_search_placeholder: 'Beállítás keresése név vagy kategória alapján...',
    settings_reset_all: 'Gyári visszaállítás',
    settings_reset_confirm: 'Biztosan visszaállítod az összes gyári járműbeállítást?',
    settings_factory_reset: 'Gyári beállítások visszaállítása',
    settings_factory_reset_confirm: 'Biztosan visszaállítod az összes gyári járműbeállítást?',
    settings_no_found: 'Nem található a keresésnek megfelelő beállítás.',
    settings_saved: 'Beállítás sikeresen frissítve!',
    cat_all: 'Összes',
    cat_wipers: 'Ablaktörlők',
    cat_turn_signal: 'Irányjelző',
    cat_keyless: 'Kulcsnélküli',
    cat_lights: 'Világítás',
    cat_mirrors: 'Tükrök',
    cat_locks: 'Ajtózárak',
    cat_windows: 'Ablakok',
    cat_ac: 'Klíma & Fűtés',
    cat_other: 'Egyéb',
    settings_cat_all: 'Összes',
    settings_cat_wipers: 'Ablaktörlők',
    settings_cat_turn_signal: 'Irányjelző',
    settings_cat_keyless: 'Kulcsnélküli & Riasztó',
    settings_cat_lights: 'Világítás',
    settings_cat_mirrors: 'Tükrök',
    settings_cat_locks: 'Ajtózárak',
    settings_cat_windows: 'Elektromos ablakok',
    settings_cat_ac: 'Klíma & Fűtés',
    settings_cat_other: 'Egyéb',
    close: 'Bezárás',
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
    climate_remaining: 'Remaining Time',
    climate_stop_time: 'Est. Stop Time',
    climate_duration: 'Duration',
    climate_delay: 'Start Delay',

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

    // Connection & MQTT
    ed_sec_connection: 'Connection Mode & MQTT Broker',
    ed_conn_mode: 'Operation & Connection Mode',
    ed_conn_mode_auto: '⚡ Auto (HA MQTT / Direct Broker / Entities)',
    ed_conn_mode_ha_mqtt: '🏠 Home Assistant Native MQTT Integration (WebSocket)',
    ed_conn_mode_direct_mqtt: '🌐 Direct WebSocket MQTT Broker (wss:// or ws://)',
    ed_conn_mode_entities: '📋 Home Assistant Entities Only (Legacy)',
    ed_mqtt_prefix: 'MQTT Topic Prefix',
    ed_mqtt_vin: 'Vehicle VIN (optional filter)',
    ed_mqtt_url: 'Direct WebSocket MQTT URL (e.g. wss://mqtt.lorinszkym.synology.me/mqtt)',
    ed_mqtt_user: 'MQTT Username (optional)',
    ed_mqtt_pass: 'MQTT Password (optional)',
    mqtt_connected: 'MQTT Connected',
    mqtt_connecting: 'MQTT Connecting...',
    mqtt_disconnected: 'MQTT Disconnected',

    // Timers & Schedules
    timers_btn: 'Timers',
    timers_title: 'Charging & Pre-Conditioning Schedules (Timers 1–5)',
    climate_tab: 'Climate & Heat',
    charge_tab: 'Charging',
    tab_climate_timers: 'Climate & Pre-AC Timers',
    tab_charge_timers: 'Charging Timers',
    climate_timer_master: 'Climate timer master switch',
    timer_master_enabled: 'Master Schedule: Enabled',
    timer_master_disabled: 'Master Schedule: Disabled',
    timer_scheduled_mode: 'Scheduled Mode',
    timer_slot: 'Timer {slot}',
    slot_num: 'Timer #{num}',
    timer_enabled: 'Active',
    timer_disabled: 'Inactive',
    ready_time: 'Ready Time',
    start_time: 'Start Time',
    stop_time: 'Stop Time',
    duration: 'Duration',
    days_active: 'Active Days',
    timer_start_time: 'Start Time (HH:MM)',
    timer_end_time: 'End Time (HH:MM)',
    timer_duration: 'Duration (min)',
    timer_full_charge: 'Full Charge',
    timer_days: 'Active Days',
    preset_everyday: 'Everyday',
    preset_weekdays: 'Weekdays',
    preset_weekend: 'Weekend',
    preset_weekends: 'Weekends',
    charge_now_override: 'Charge Now (Override Timer)',
    charge_waiting_timer: 'Waiting for scheduled charging timer window',
    pre_ac_duration: 'Duration',
    pre_ac_delay: 'Start Delay',
    pre_ac_stop_time: 'Target Stop Time',
    pre_ac_reset_alert: 'Clear Termination Alert',

    // Diagnostics & System
    diag_btn: 'Diagnostics',
    diag_title: 'Vehicle Diagnostics, Clock & Wi-Fi',
    diag_sub: 'Ignition, Alarm, Clock, Wi-Fi & ECU Diagnostics',
    timers_sub: 'Climate, Pre-heating & Charging Schedules (Slots 1-5)',
    ignition_title: 'Ignition / Readiness',
    ignition_off: 'OFF',
    ignition_acc: 'ACC (Accessories)',
    ignition_on: 'Ignition ON',
    ignition_ready: 'READY',
    theft_alarm_title: 'Theft Alarm',
    theft_alarm: 'Alarm Status',
    alarm_disarmed: 'Disarmed',
    alarm_armed: 'Armed',
    alarm_triggered: 'ALARM TRIGGERED!',
    alarm_last_event: 'Last Alarm Event',
    clear_alarm: 'Clear Alarm',
    alarm_clear_btn: 'Clear Alarm Notification',
    locate_car: 'Locate Car',
    locate_car_btn: 'Locate Vehicle (Flash Lights)',
    locate_car_sent: 'Lights Flashed!',
    thermal_title: 'Drive Battery Health',
    battery_thermal_title: 'Drive Battery Health',
    batt_thermal_state: 'Battery Temperature',
    battery_warming: 'Battery Heater Active',
    batt_warming: 'Battery Warming',
    batt_warning_active: 'Warning Active',
    clock_title: 'Clock & Wi-Fi',
    car_clock_title: 'Vehicle Internal Clock',
    car_clock: 'Vehicle Clock',
    sync_clock: 'Sync Clock',
    car_clock_sync_btn: 'Sync Clock to HA',
    car_clock_sync_done: 'Clock Synchronized!',
    wifi_settings_title: 'Wi-Fi & Communication',
    wifi_ssid: 'SSID',
    wifi_channel: 'Channel',
    wifi_always_on: 'Keep Wi-Fi Always Active',
    refresh_status_btn: 'Refresh Vehicle Status Now',
    vehicle_info_title: 'Vehicle Identifiers',
    vehicle_specs: 'Vehicle Specs',
    vin: 'VIN',
    ecu_version: 'ECU Version',
    firmware_version: 'ECU Firmware',
    steering_side: 'Steering Side',
    registered_phones: 'Registered Phones',
    last_packet: 'Last Packet',

    // Settings Modal (ETACS / AC)
    settings_btn: 'Settings',
    settings_title: 'Mitsubishi ETACS & Climate Customization',
    settings_sub: 'OEM vehicle customization and convenience features (phev2mqtt)',
    settings_subtitle: 'OEM vehicle customization and convenience features (phev2mqtt)',
    settings_active_count: 'available settings',
    settings_search: 'Search settings',
    settings_search_placeholder: 'Search settings by name or category...',
    settings_reset_all: 'Factory Reset',
    settings_reset_confirm: 'Are you sure you want to restore all factory vehicle settings?',
    settings_factory_reset: 'Restore Factory Defaults',
    settings_factory_reset_confirm: 'Are you sure you want to restore all customization settings to OEM factory defaults?',
    settings_no_found: 'No settings match your search.',
    settings_saved: 'Setting updated successfully!',
    cat_all: 'All',
    cat_wipers: 'Wipers',
    cat_turn_signal: 'Turn Signal',
    cat_keyless: 'Keyless',
    cat_lights: 'Lights',
    cat_mirrors: 'Mirrors',
    cat_locks: 'Locks',
    cat_windows: 'Windows',
    cat_ac: 'Climate & AC',
    cat_other: 'Other',
    settings_cat_all: 'All',
    settings_cat_wipers: 'Wipers',
    settings_cat_turn_signal: 'Turn Signal',
    settings_cat_keyless: 'Keyless & Alarm',
    settings_cat_lights: 'Lights',
    settings_cat_mirrors: 'Mirrors',
    settings_cat_locks: 'Door Locks',
    settings_cat_windows: 'Power Windows',
    settings_cat_ac: 'Climate & A/C',
    settings_cat_other: 'Other',
    settings_no_found: 'No matching customization settings found.',
    settings_saved: 'Setting updated successfully!',
    close: 'Close',
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
function formatClimateRemaining(stateObj, lang = 'hu') {
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
function formatClimateStopTime(stopObj, remObj, isClimateActive = false, lang = 'hu') {
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
const SETTING_DEFINITIONS = {
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
function getPhevCustomizationSettings(hass, lang = 'hu') {
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
function getPhevClimateTimers(hass) {
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
function getPhevChargeTimers(hass) {
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

  // --- src/mqtt.js ---
/**
 * Outlander PHEV Lovelace Card — MQTT Subsystem
 * Supports:
 * 1. Home Assistant Internal MQTT WebSocket API (hass.connection.subscribeMessage / mqtt.publish service)
 * 2. Direct WebSocket MQTT Client (pure native WebSocket MQTT v3.1.1 with zero external dependencies)
 * 3. Deep Vehicle Register Decoding (0x01, 0x04, 0x05, 0x10, 0x15, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x24)
 * 4. Taper-aware charging duration & ETA estimation
 */

/**
 * Estimates remaining charging minutes using Mitsubishi Outlander PHEV CC-CV taper curve.
 */
function estimateRemainingChargingMins(soc) {
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
class NativeMqttWsClient {
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
class PhevMqttManager {
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
    overflow-anchor: none;
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

  /* Climate Telemetry Row (Remaining Time & Est. Stop Time) */
  .climate-telemetry-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 10px;
  }

  .climate-telemetry-tile {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 10px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.62);
    border: 1px solid rgba(148, 163, 184, 0.12);
    cursor: pointer;
    transition: all 0.22s ease;
    user-select: none;
    min-width: 0;
  }

  .climate-telemetry-tile:hover {
    background: rgba(22, 33, 54, 0.78);
    border-color: rgba(56, 189, 248, 0.35);
    transform: translateY(-1px);
  }

  .climate-telemetry-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(30, 41, 59, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.14);
    color: var(--ophev-muted);
    display: grid;
    place-items: center;
    flex-shrink: 0;
    transition: all 0.22s ease;
  }

  .climate-telemetry-icon svg {
    width: 16px;
    height: 16px;
  }

  .climate-telemetry-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.15;
  }

  .climate-telemetry-lbl {
    font-size: 0.66rem;
    font-weight: 600;
    color: var(--ophev-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .climate-telemetry-val {
    font-size: 0.88rem;
    font-weight: 700;
    color: #f8fafc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 1px;
    transition: color 0.22s ease;
  }

  /* Active glow variations on telemetry tiles */
  .climate-telemetry-tile.active-cool {
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(15, 23, 42, 0.72));
    border-color: rgba(56, 189, 248, 0.45);
    box-shadow: 0 0 14px -3px rgba(14, 165, 233, 0.28);
  }
  .climate-telemetry-tile.active-cool .climate-telemetry-icon {
    background: rgba(14, 165, 233, 0.22);
    border-color: rgba(56, 189, 248, 0.5);
    color: #38bdf8;
  }
  .climate-telemetry-tile.active-cool .climate-telemetry-val {
    color: #e0f2fe;
  }

  .climate-telemetry-tile.active-heat {
    background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(15, 23, 42, 0.72));
    border-color: rgba(251, 146, 60, 0.45);
    box-shadow: 0 0 14px -3px rgba(249, 115, 22, 0.28);
  }
  .climate-telemetry-tile.active-heat .climate-telemetry-icon {
    background: rgba(249, 115, 22, 0.22);
    border-color: rgba(251, 146, 60, 0.5);
    color: #fb923c;
  }
  .climate-telemetry-tile.active-heat .climate-telemetry-val {
    color: #ffedd5;
  }

  .climate-telemetry-tile.active-windscreen {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.72));
    border-color: rgba(251, 191, 36, 0.45);
    box-shadow: 0 0 14px -3px rgba(245, 158, 11, 0.28);
  }
  .climate-telemetry-tile.active-windscreen .climate-telemetry-icon {
    background: rgba(245, 158, 11, 0.22);
    border-color: rgba(251, 191, 36, 0.5);
    color: #fbbf24;
  }
  .climate-telemetry-tile.active-windscreen .climate-telemetry-val {
    color: #fef9c3;
  }

  /* Climate Pre-conditioning Parameters (Duration & Start Delay) */
  .climate-params-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 8px;
    margin-top: 8px;
  }

  .climate-param-tile {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 8px 10px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.55);
    border: 1px solid rgba(148, 163, 184, 0.12);
    transition: all 0.22s ease;
    min-width: 0;
  }

  .climate-param-tile:hover {
    background: rgba(22, 33, 54, 0.72);
    border-color: rgba(56, 189, 248, 0.32);
  }

  .climate-param-header {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .climate-param-icon {
    width: 17px;
    height: 17px;
    color: #38bdf8;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .climate-param-icon svg {
    width: 14px;
    height: 14px;
  }

  .climate-param-lbl {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--ophev-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .climate-param-control {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .climate-param-select {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    background: rgba(9, 13, 22, 0.75);
    color: #f8fafc;
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 9px;
    padding: 6px 24px 6px 9px;
    font-size: 0.8rem;
    font-weight: 700;
    font-family: inherit;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .climate-param-select:hover:not(:disabled) {
    border-color: rgba(56, 189, 248, 0.55);
    background: rgba(14, 21, 35, 0.9);
  }

  .climate-param-select:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 10px rgba(14, 165, 233, 0.25);
  }

  .climate-param-select:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .climate-select-chevron {
    position: absolute;
    right: 8px;
    pointer-events: none;
    font-size: 0.72rem;
    color: var(--ophev-muted);
    line-height: 1;
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

  /* =========================================================
     HEADER EXTENSION ACTIONS (SETTINGS, TIMERS, DIAGNOSTICS)
     ========================================================= */
  .hdr-actions-wrap {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .hdr-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 11px;
    border-radius: 999px;
    background: rgba(30, 41, 59, 0.75);
    border: 1px solid var(--ophev-border-strong);
    color: var(--ophev-text);
    font-size: 0.74rem;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .hdr-action-btn svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  .hdr-action-btn:hover {
    background: rgba(56, 189, 248, 0.18);
    border-color: rgba(56, 189, 248, 0.5);
    transform: translateY(-1px);
  }

  .hdr-action-btn.active {
    background: rgba(14, 165, 233, 0.28);
    border-color: rgba(56, 189, 248, 0.7);
    color: #38bdf8;
    box-shadow: 0 0 12px -2px rgba(14, 165, 233, 0.4);
  }

  /* =========================================================
     COLLAPSIBLE PANELS (TIMERS & DIAGNOSTICS)
     ========================================================= */
  .section-panel {
    background: var(--ophev-panel);
    border: 1px solid var(--ophev-border);
    border-radius: 18px;
    padding: 16px;
    margin-top: 14px;
    display: none;
    flex-direction: column;
    gap: 14px;
    backdrop-filter: blur(10px);
    overflow-anchor: none;
  }

  .section-panel.open {
    display: flex;
  }

  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    font-weight: 800;
    color: #f8fafc;
    letter-spacing: -0.01em;
  }

  .section-title svg {
    width: 17px;
    height: 17px;
    color: #38bdf8;
  }

  /* Subtabs Bar (Timers: Charge vs Climate) */
  .subtabs-bar {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(9, 13, 22, 0.72);
    padding: 3px;
    border-radius: 9px;
    border: 1px solid var(--ophev-border);
    height: 32px;
    box-sizing: border-box;
  }

  .subtab-btn {
    height: 26px;
    padding: 0 10px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: var(--ophev-muted);
    font-size: 0.73rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-family: inherit;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .subtab-btn svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  .subtab-btn:hover {
    color: #f1f5f9;
  }

  .subtab-btn.active {
    background: rgba(14, 165, 233, 0.22);
    color: #e0f2fe;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  }

  /* Timer Slots Pills (1..5) */
  .slots-bar {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
  }

  .slot-pill {
    padding: 7px 12px;
    border-radius: 10px;
    border: 1px solid var(--ophev-border);
    background: rgba(15, 23, 42, 0.7);
    color: var(--ophev-muted);
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: inherit;
  }

  .slot-pill:hover {
    border-color: rgba(56, 189, 248, 0.45);
    color: #f1f5f9;
  }

  .slot-pill.active {
    background: rgba(14, 165, 233, 0.22);
    border-color: rgba(56, 189, 248, 0.65);
    color: #f0f9ff;
    box-shadow: 0 0 10px -2px rgba(14, 165, 233, 0.35);
  }

  .slot-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #64748b;
    flex-shrink: 0;
  }

  .slot-pill.enabled .slot-dot {
    background: #10b981;
    box-shadow: 0 0 6px #10b981;
  }

  /* Master Schedule Banner */
  .timer-master-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.6));
    border: 1px solid rgba(56, 189, 248, 0.25);
  }

  .timer-master-left {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  #timer-master-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: #38bdf8;
  }

  #timer-master-icon svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .timer-master-text {
    font-size: 0.8rem;
    font-weight: 700;
    color: #f8fafc;
  }

  /* Timer Slot Editor Card */
  .timer-editor-card {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid var(--ophev-border);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .timer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .timer-row-label {
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--ophev-muted);
  }

  .timer-input {
    background: rgba(9, 13, 22, 0.88);
    border: 1px solid var(--ophev-border-strong);
    border-radius: 8px;
    color: #f8fafc;
    padding: 6px 11px;
    font-size: 0.84rem;
    font-weight: 700;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .timer-input:focus {
    border-color: #38bdf8;
  }

  .days-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .days-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .day-chip {
    min-width: 36px;
    height: 34px;
    padding: 0 6px;
    border-radius: 9px;
    border: 1px solid var(--ophev-border);
    background: rgba(9, 13, 22, 0.75);
    color: var(--ophev-muted);
    font-size: 0.74rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.18s ease;
    user-select: none;
    font-family: inherit;
    box-sizing: border-box;
  }

  .day-chip:hover {
    border-color: rgba(56, 189, 248, 0.45);
    color: #f1f5f9;
  }

  .day-chip.active {
    background: rgba(16, 185, 129, 0.24);
    border-color: rgba(52, 211, 153, 0.65);
    color: #a7f3d0;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.22);
  }

  .presets-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  .preset-chip {
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--ophev-border);
    background: rgba(9, 13, 22, 0.65);
    color: var(--ophev-muted);
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: inherit;
    box-sizing: border-box;
  }

  .preset-chip:hover {
    border-color: rgba(56, 189, 248, 0.5);
    color: #f1f5f9;
  }

  /* Quick Pre-AC Auxiliary Options (Duration / Delay / Stop Time) */
  .pre-ac-aux-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 8px;
    margin-top: 4px;
  }

  .pre-ac-aux-tile {
    background: rgba(15, 23, 42, 0.68);
    border: 1px solid var(--ophev-border);
    border-radius: 11px;
    padding: 8px 11px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pre-ac-aux-lbl {
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--ophev-muted);
  }

  .pre-ac-aux-val {
    font-size: 0.82rem;
    font-weight: 700;
    color: #f8fafc;
  }

  /* =========================================================
     DIAGNOSTICS & SYSTEM TELEMETRY PANEL
     ========================================================= */
  .diag-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 11px;
  }

  .diag-card {
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid var(--ophev-border);
    border-radius: 14px;
    padding: 13px 14px;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .diag-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .diag-card-title {
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ophev-muted);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .diag-card-title svg {
    width: 14px;
    height: 14px;
  }

  /* Ignition Status Badge */
  .ignition-badge {
    padding: 4px 11px;
    border-radius: 8px;
    font-weight: 800;
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .ignition-badge.ready {
    background: rgba(16, 185, 129, 0.22);
    border: 1px solid rgba(52, 211, 153, 0.65);
    color: #34d399;
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.35);
  }

  .ignition-badge.on {
    background: rgba(14, 165, 233, 0.22);
    border: 1px solid rgba(56, 189, 248, 0.65);
    color: #38bdf8;
  }

  .ignition-badge.acc {
    background: rgba(245, 158, 11, 0.22);
    border: 1px solid rgba(251, 191, 36, 0.65);
    color: #fbbf24;
  }

  .ignition-badge.off {
    background: rgba(100, 116, 139, 0.18);
    border: 1px solid rgba(148, 163, 184, 0.25);
    color: #94a3b8;
  }

  /* Alarm Alert Banner */
  .alarm-banner {
    padding: 9px 12px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.76rem;
  }

  .alarm-banner.triggered {
    background: rgba(239, 68, 68, 0.25);
    border: 1px solid rgba(248, 113, 113, 0.6);
    color: #fca5a5;
    animation: connOfflineGlow 2s ease-in-out infinite;
  }

  .alarm-banner.armed {
    background: rgba(16, 185, 129, 0.16);
    border: 1px solid rgba(52, 211, 153, 0.45);
    color: #a7f3d0;
  }

  .alarm-banner.disarmed {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid var(--ophev-border);
    color: var(--ophev-muted);
  }

  .diag-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.78rem;
  }

  .diag-row-lbl {
    color: var(--ophev-muted);
  }

  .diag-row-val {
    font-weight: 700;
    color: #f8fafc;
    text-align: right;
  }

  .diag-action-btn {
    height: 32px;
    padding: 0 10px;
    min-width: 124px;
    border-radius: 8px;
    border: 1px solid rgba(56, 189, 248, 0.35);
    background: rgba(14, 165, 233, 0.12);
    color: #bae6fd;
    font-size: 0.72rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: inherit;
    white-space: nowrap;
    user-select: none;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .diag-action-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: #38bdf8;
  }

  .diag-action-btn:hover {
    background: rgba(14, 165, 233, 0.24);
    border-color: rgba(56, 189, 248, 0.6);
    color: #f0f9ff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px -2px rgba(14, 165, 233, 0.3);
  }

  .diag-action-btn:active {
    transform: translateY(0);
  }


  /* =========================================================
     MODAL DIALOGS (SETTINGS, TIMERS, DIAGNOSTICS)
     ========================================================= */
  .settings-modal-backdrop,
  .ophev-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(5, 9, 16, 0.82);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    box-sizing: border-box;
  }

  .settings-modal-backdrop.open,
  .ophev-modal-backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }

  .settings-modal-card,
  .ophev-modal-card {
    width: 100%;
    max-width: 820px;
    max-height: 88vh;
    background: linear-gradient(160deg, rgba(17, 24, 39, 0.98), rgba(11, 15, 25, 0.99));
    border: 1px solid var(--ophev-border-strong);
    border-radius: 22px;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(14, 165, 233, 0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: scale(0.96);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-sizing: border-box;
  }

  .settings-modal-backdrop.open .settings-modal-card,
  .ophev-modal-backdrop.open .ophev-modal-card {
    transform: scale(1);
  }

  .modal-head {
    padding: 14px 18px;
    border-bottom: 1px solid var(--ophev-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    background: rgba(15, 23, 42, 0.45);
  }

  .modal-title-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .modal-title {
    font-size: 1.02rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #f8fafc;
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    line-height: 1.25;
  }

  .modal-title svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: #38bdf8;
  }

  .modal-sub {
    font-size: 0.73rem;
    color: var(--ophev-muted);
    margin: 0;
  }

  .modal-head-btns {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .modal-btn-reset {
    height: 32px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid rgba(239, 68, 68, 0.4);
    background: rgba(239, 68, 68, 0.14);
    color: #fca5a5;
    font-size: 0.72rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .modal-btn-reset:hover {
    background: rgba(239, 68, 68, 0.24);
    border-color: rgba(239, 68, 68, 0.65);
  }

  .modal-btn-close {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--ophev-border);
    background: rgba(15, 23, 42, 0.8);
    color: var(--ophev-muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .modal-btn-close svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .modal-btn-close:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    color: #fca5a5;
  }

  .modal-controls-bar {
    padding: 12px 22px;
    border-bottom: 1px solid var(--ophev-border);
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(9, 13, 22, 0.4);
  }

  .modal-search-input {
    width: 100%;
    padding: 9px 13px;
    border-radius: 11px;
    background: rgba(15, 23, 42, 0.88);
    border: 1px solid var(--ophev-border-strong);
    color: #f8fafc;
    font-size: 0.82rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .modal-search-input:focus {
    border-color: #38bdf8;
  }

  .cat-chips-bar {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }

  .cat-chip {
    padding: 5px 11px;
    border-radius: 999px;
    border: 1px solid var(--ophev-border);
    background: rgba(15, 23, 42, 0.7);
    color: var(--ophev-muted);
    font-size: 0.73rem;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.18s ease;
    font-family: inherit;
  }

  .cat-chip:hover {
    border-color: rgba(56, 189, 248, 0.45);
    color: #f1f5f9;
  }

  .cat-chip.active {
    background: rgba(14, 165, 233, 0.22);
    border-color: rgba(56, 189, 248, 0.65);
    color: #e0f2fe;
    box-shadow: 0 0 10px -2px rgba(14, 165, 233, 0.35);
  }

  .modal-body {
    padding: 16px 22px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    overscroll-behavior: contain;
  }

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 11px 14px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid var(--ophev-border);
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .setting-item:hover {
    background: rgba(22, 33, 54, 0.7);
    border-color: rgba(56, 189, 248, 0.35);
  }

  .setting-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .setting-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #f8fafc;
  }

  .setting-cat-badge {
    font-size: 0.66rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #38bdf8;
  }

  .setting-select {
    background: rgba(9, 13, 22, 0.92);
    border: 1px solid var(--ophev-border-strong);
    border-radius: 8px;
    color: #f8fafc;
    padding: 7px 11px;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: inherit;
    outline: none;
    max-width: 250px;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .setting-select:focus {
    border-color: #38bdf8;
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
      { key: 'climate_remaining_entity', labelHu: 'Klíma hátralévő idő (Climate Remaining)', labelEn: 'Climate Remaining Time', domains: ['sensor'] },
      { key: 'climate_stop_time_entity', labelHu: 'Klíma becsült leállási idő (Climate Stop Time)', labelEn: 'Climate Estimated Stop Time', domains: ['sensor'] },
      { key: 'climate_duration_min_entity', labelHu: 'Előfűtés/hűtés időtartama (Duration)', labelEn: 'Pre-conditioning Duration', domains: ['select', 'input_select'] },
      { key: 'climate_start_delay_min_entity', labelHu: 'Előfűtés/hűtés indítási késleltetés (Delay)', labelEn: 'Pre-conditioning Start Delay', domains: ['select', 'input_select'] },
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

        <!-- Connection & MQTT Broker Configuration -->
        <details class="ed-section" open>
          <summary>${localize(lang, 'ed_sec_connection')}</summary>
          <div class="sec-body">
            <div class="field-row">
              <label class="field-label">${localize(lang, 'ed_conn_mode')}</label>
              <select class="ed-select" id="sel-conn-mode">
                <option value="auto" ${(cfg.connection_mode || 'auto') === 'auto' ? 'selected' : ''}>${localize(lang, 'ed_conn_mode_auto')}</option>
                <option value="ha_mqtt" ${cfg.connection_mode === 'ha_mqtt' ? 'selected' : ''}>${localize(lang, 'ed_conn_mode_ha_mqtt')}</option>
                <option value="direct_mqtt" ${cfg.connection_mode === 'direct_mqtt' ? 'selected' : ''}>${localize(lang, 'ed_conn_mode_direct_mqtt')}</option>
                <option value="entities" ${cfg.connection_mode === 'entities' ? 'selected' : ''}>${localize(lang, 'ed_conn_mode_entities')}</option>
              </select>
            </div>

            <div class="field-grid-2">
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_mqtt_prefix')}</label>
                <input class="ed-input" id="inp-mqtt-prefix" type="text" placeholder="phev" value="${cfg.mqtt_topic_prefix ?? 'phev'}" />
              </div>
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_mqtt_vin')}</label>
                <input class="ed-input" id="inp-mqtt-vin" type="text" placeholder="pl. JMBXDGG3WKZ..." value="${cfg.mqtt_vin ?? ''}" />
              </div>
            </div>

            <div class="field-row" id="row-mqtt-url">
              <label class="field-label">${localize(lang, 'ed_mqtt_url')}</label>
              <input class="ed-input" id="inp-mqtt-url" type="text" placeholder="wss://mqtt.lorinszkym.synology.me/mqtt" value="${cfg.mqtt_broker_url ?? ''}" />
            </div>

            <div class="field-grid-2" id="grid-mqtt-auth">
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_mqtt_user')}</label>
                <input class="ed-input" id="inp-mqtt-user" type="text" placeholder="username" value="${cfg.mqtt_username ?? ''}" />
              </div>
              <div class="field-row">
                <label class="field-label">${localize(lang, 'ed_mqtt_pass')}</label>
                <input class="ed-input" id="inp-mqtt-pass" type="password" placeholder="••••••••" value="${cfg.mqtt_password ?? ''}" />
              </div>
            </div>
          </div>
        </details>

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

    // Connection & MQTT fields
    sr.getElementById('sel-conn-mode')?.addEventListener('change', (e) => {
      this._emitConfig({ connection_mode: e.target.value });
    });

    sr.getElementById('inp-mqtt-prefix')?.addEventListener('change', (e) => {
      this._emitConfig({ mqtt_topic_prefix: e.target.value.trim() });
    });

    sr.getElementById('inp-mqtt-vin')?.addEventListener('change', (e) => {
      this._emitConfig({ mqtt_vin: e.target.value.trim() });
    });

    sr.getElementById('inp-mqtt-url')?.addEventListener('change', (e) => {
      this._emitConfig({ mqtt_broker_url: e.target.value.trim() });
    });

    sr.getElementById('inp-mqtt-user')?.addEventListener('change', (e) => {
      this._emitConfig({ mqtt_username: e.target.value.trim() });
    });

    sr.getElementById('inp-mqtt-pass')?.addEventListener('change', (e) => {
      this._emitConfig({ mqtt_password: e.target.value });
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

    const connModeSel = sr.getElementById('sel-conn-mode');
    if (connModeSel && connModeSel.value !== (this._config.connection_mode || 'auto')) {
      connModeSel.value = this._config.connection_mode || 'auto';
    }

    const prefixInp = sr.getElementById('inp-mqtt-prefix');
    if (prefixInp && prefixInp.value !== (this._config.mqtt_topic_prefix ?? 'phev')) {
      prefixInp.value = this._config.mqtt_topic_prefix ?? 'phev';
    }

    const vinInp = sr.getElementById('inp-mqtt-vin');
    if (vinInp && vinInp.value !== (this._config.mqtt_vin ?? '')) {
      vinInp.value = this._config.mqtt_vin ?? '';
    }

    const urlInp = sr.getElementById('inp-mqtt-url');
    if (urlInp && urlInp.value !== (this._config.mqtt_broker_url ?? '')) {
      urlInp.value = this._config.mqtt_broker_url ?? '';
    }

    const userInp = sr.getElementById('inp-mqtt-user');
    if (userInp && userInp.value !== (this._config.mqtt_username ?? '')) {
      userInp.value = this._config.mqtt_username ?? '';
    }

    const passInp = sr.getElementById('inp-mqtt-pass');
    if (passInp && passInp.value !== (this._config.mqtt_password ?? '')) {
      passInp.value = this._config.mqtt_password ?? '';
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

      this._mqtt.publish('set/climate/mode', 'off');
      this._mqtt.publish('set/climate/state', 'off');
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

      this._mqtt.publish('set/climate/duration', String(dur));
      this._mqtt.publish('set/climate/mode', targetMode);
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

})();
