<div align="center">

# 🚗 Mitsubishi Outlander PHEV Lovelace Card (`phev2mqtt`)

**Fotorealisztikus, interaktív felülnézeti Home Assistant Lovelace kártya a Mitsubishi Outlander PHEV (`phev2mqtt` és [`Rinszky/phev2mqtt`](https://github.com/Rinszky/phev2mqtt)) összes érzékelőjéhez, vezérlőjéhez, ETACS beállításához és időzítőjéhez**

[![Verzió](https://img.shields.io/badge/verzi%C3%B3-v1.3.0-0ea5e9?style=for-the-badge)](./package.json)
[![HACS](https://img.shields.io/badge/HACS-Custom-10b981?style=for-the-badge)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Lovelace-38bdf8?style=for-the-badge&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![phev2mqtt Fork](https://img.shields.io/badge/Gateway-Rinszky%2Fphev2mqtt-8b5cf6?style=for-the-badge&logo=github)](https://github.com/Rinszky/phev2mqtt)
[![buxtronix/phev2mqtt](https://img.shields.io/badge/Upstream-buxtronix%2Fphev2mqtt-6366f1?style=for-the-badge&logo=github)](https://github.com/buxtronix/phev2mqtt)
[![Élő Demó](https://img.shields.io/badge/%F0%9F%8E%AE_%C3%89l%C5%91_Dem%C3%B3-Kipr%C3%B3b%C3%A1l%C3%A1s-f59e0b?style=for-the-badge)](https://rinszky.github.io/ha-lovelace-outlander-card/demo/)

<br />

<a href="./docs/screenshots/hero-lights-doors-editor.png">
  <img src="./docs/screenshots/hero-lights-doors-editor.png" alt="Mitsubishi Outlander PHEV Lovelace Card — Animált világítás, ajtónyitás, szélvédőfűtés és Vizuális Szerkesztő" width="100%" />
</a>

*Felkapcsolt tompított fényszóró és hátsó helyzetjelző, nyitott vezetőoldali ajtó biztonsági ívvel, aktív szélvédő-páramentesítés, `37%`-os arányos akkumulátor-színezés és az 1-kattintásos Vizuális Szerkesztő.*

</div>

---

## 📸 Képernyőképek és Állapotok

<table>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="./docs/screenshots/charging-active.png">
        <img src="./docs/screenshots/charging-active.png" alt="Aktív töltés — 58% töltöttség és animált töltőkábel" width="100%" />
      </a>
      <br />
      <b>⚡ Aktív töltés (<code>58%</code>)</b><br />
      <sub>Smaragdzöld energia-aura, nyitott jobb hátsó töltőfedél pulzáló töltőkábellel és valós idejű karosszéria-színezéssel.</sub>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="./docs/screenshots/idle-locked-simulator.png">
        <img src="./docs/screenshots/idle-locked-simulator.png" alt="Zárolt alapállapot és beépített Szenzor Szimulátor" width="100%" />
      </a>
      <br />
      <b>🔒 Zárolt alapállapot &amp; Szenzor Szimulátor</b><br />
      <sub>Letisztult sötét stúdió megjelenés zárolt központi zárral, napi töltés jelvényekkel és az interaktív tesztpanellel.</sub>
    </td>
  </tr>
</table>

<div align="center">
  <a href="./docs/screenshots/telemetry-controls.png">
    <img src="./docs/screenshots/telemetry-controls.png" alt="Meghajtó akkumulátor telemetria, W és kWh sparkline grafikonok, előfűtés/klíma és világítás vezérlőpanelek" width="88%" />
  </a>
  <br />
  <b>📊 Telemetria, 24 órás Sparkline Grafikonok és Vezérlőpanelek</b><br />
  <sub>Hátralévő töltési idő és várható befejezés, külső fali töltő teljesítmény (<code>W</code>) és energia (<code>kWh</code>) grafikonok, egyérintéses klíma-előfűtés/hűtés/szélvédő vezérlés, valamint világítás- és rendszerkapcsolók.</sub>
</div>

---

## ✨ Főbb funkciók

- **Részletgazdag felülnézeti Mitsubishi Outlander PHEV (Dynamic Shield) SVG grafika**
  - Szabadon választható metálfényezés (8 gyári színprofil + egyedi színválasztó, alapértelmezett: sötétszürke/grafitfekete).
  - Balkormányos (LHD) és jobbkormányos (RHD) kivitel támogatása (kormánykerék és vezetőoldali ajtó automatikus tükrözésével).
- **Töltöttség-arányos színezés közvetlenül az autón (`0–100%`)**
  - Az autó karosszériája hátulról előre pontosan olyan százalékban kap dinamikus energiaszínezést és lézeres/hullámzó határvonalat (`%` jelölővel), ahány százalékon áll a meghajtó akkumulátor.
  - Opcionális **PHEV akkupakk röntgennézet** az utastér padlója alatt.
- **Valósághű animációk**
  - **Ajtónyitás**: A 4 oldalajtó (a visszapillantó tükrökkel együtt!), a **motorháztető** (alatta látható MIVEC + PHEV inverter motortérrel) és a **csomagtartó** finom fizikával nyílik, biztonsági figyelmeztető ívvel.
  - **Világítás**: Felkapcsolt **tompított fényszórónál** dupla xenon fénycsóva vetül az autó elé; **helyzetjelzőnél** világítanak az első LED menetfények és a hátsó rubinvörös lámpák; **elakadásjelzőnél** ütemesen villog a 4 sarokindex és a tükörindex; **belső világításnál** meleg fény dereng az utastérben.
  - **Klíma-animáció**: Hűtésnél jeges kék légáramlás, fűtésnél meleg narancs hőáramlás az utastérben, szélvédő-páramentesítésnél pedig hullámzó fűtőszál-effekt a szélvédőn.
  - **Jobb hátsó töltőcsatlakozó**: Csatlakoztatott kábelnél kinyílik a töltőfedél és megjelenik a töltőkábel, aktív töltésnél pedig pulzáló energiaimpulzusok futnak be az autóba.
- **⚙️ ETACS & Klíma Beállítások Popup Modal ([`Rinszky/phev2mqtt`](https://github.com/Rinszky/phev2mqtt))**
  - Közvetlen fejléc-ikonnal nyitható üveghatású felugró ablak.
  - **Kategorizált szűrőkapszulák**: *Ablaktörlők*, *Irányjelző* (komfort 3-villanás), *Kulcsnélküli & Riasztó*, *Világítás* (hazakísérő fény késleltetés), *Tükrök* (automatikus behajtás zárásra/nyitásra), *Ajtózárak* (sebességfüggő automatikus zárás), *Ablakok*, *Klíma* (külső levegő / belső keringetés prioritás), *Egyéb*.
  - **Élő keresőmező** a beállítások azonnali szűrésére.
  - **Gyári beállítások visszaállítása (Factory Reset)** egy kattintással megerősítéssel.
- **⏰ Töltés és Előfűtés Időzítők Kezelése (Timers 1–5)**
  - Külön alfülek a **Klíma & Fűtés időzítőknek** és a **Töltési időzítőknek**.
  - **Slot-választó kapszulák (1..5)** aktív állapotjelző ponttal és mentett időponttal.
  - Részletes slot-szerkesztő: indulási idő, töltési kezdet/vége, időtartam választó (10/20/30 perc), nap-kiválasztó gombok (Hét..Vas) és gyors presetek (*Minden nap*, *Hétköznapok*, *Hétvégék*).
  - Főkapcsoló és üzemmód (hűtés/fűtés/szélvédő) közvetlen eléréssel.
- **🔍 Dedikált Diagnosztika Blokk (Diagnostics & Security)**
  - **Gyújtás állapot**: `OFF`, `ACC`, `ON`, `READY` dinamikus állapotjelző jelvény.
  - **Lopásgátló riasztó**: Élesítve / Hatástalanítva banner, riasztás esetén villogó riasztási sáv és egyérintéses **Riasztás törlése** gomb.
  - **Jármű belső órája** valós idejű kijelzéssel és **Óra szinkronizálása a Home Assistanttal** gombbal.
  - **Autó keresése (Fénykürt)**: Gombnyomásra villogtatja a fényszórókat.
  - **Wi-Fi telemetria**: Wi-Fi csatorna, folyamatos ébrentartás (`keep_wifi_always_active`).
  - **Akkumulátor védelem**: Akku hőmérséklet állapot és akkumulátorfűtés jelzés.
  - **Jármű azonosítók**: Alvázszám (VIN), ECU verzió és regisztrált telefonok száma.
- **🛡️ Ugrásmentes Gördülés (Scroll Stability Fix)**
  - Megszüntetve az oldal aljára görgetéskor jelentkező 1–2 másodperces felugrási hiba.
  - Intelligens entitás-változás figyelés: a más helyiségekben frissülő szenzorok nem okoznak felesleges DOM újrarendezést és layout reflow-t.
  - `overflow-anchor: none` védelem és optimális kártyaméret (`getCardSize: 16`) a Lovelace Masonry rácshoz.
- **Külső és Napi töltésmérő segéd-entitások támogatása**
  - Opcionálisan beköthető **Napi töltés energiában (`kWh` / `kW`)** és **Napi töltési idő órában (`h` / `perc` / `history_stats`)** segéd-entitás.
  - Opcionálisan beköthető külső fali töltő / okoskonnektor **Teljesítmény (`W` / `kW`)** és **Elfogyasztott energia (`kWh`)** szenzor 24 órás Home Assistant előzmény-grafikonnal (sparkline).
- **Látványos Kapcsolati / Offline (Alvó) Állapotjelzés**
  - Fejlécben pulzáló telemetria-kapszula (`Kapcsolódva` / `Nincs kapcsolat`).
  - Ha megszakad a Wi-Fi kapcsolat az autóval, az autó elszürkül és egy üveghatású **Offline HUD kártya** jelenik meg rajta hullámzó radar-animációval és közvetlen **Wi-Fi újracsatlakozás** gombbal.
- **✨ 1-kattintásos `phev2mqtt` automatikus felismerés és Vizuális Szerkesztő**
  - Automatikusan megkeresi az összes Outlander PHEV entitást (mind az alap `buxtronix/phev2mqtt`, mind a bővített `Rinszky/phev2mqtt` integrációból).

---

## 🔌 Előfeltételek és Szükséges Eszközök (`phev2mqtt`)

A Lovelace kártya működésének előfeltétele a [**buxtronix/phev2mqtt**](https://github.com/buxtronix/phev2mqtt) átjáró futtatása, amely összeköti az autó gyári Wi-Fi vezérlőmodulját a Home Assistant **MQTT** brókerével (pl. *Mosquitto*).

### Miért kell hozzá külön eszköz (pl. Raspberry Pi), és hogyan csatlakozik?

A Mitsubishi Outlander PHEV nem csatlakozik fel az otthoni Wi-Fi hálózatra és nem használ felhős API-t, hanem **saját, zárt 2.4 GHz-es Wi-Fi hotspotot** (`REMOTE...` SSID, internetkapcsolat nélkül) sugároz. Emiatt egy két hálózati interfésszel rendelkező kis híd-eszközre van szükség a garázsban vagy a parkolóhely Wi-Fi hatótávján belül:

- **🍓 Raspberry Pi (3B / 3B+ / 4 / 5, vagy Zero 2 W + LAN adapter):**
  - **LAN kábelen (`eth0`)** csatlakozik az **otthoni routerhez/switchhez** — ezen keresztül kommunikál a Home Assistant MQTT szerverével és éri el az internetet.
  - **Beépített Wi-Fi-n (`wlan0`)** közvetlenül az **autó saját `REMOTE...` Wi-Fi hotspotjára** csatlakozik automatikusan, amint hazaérsz az autóval.
- **🏠 Home Assistant + MQTT bróker (*Mosquitto*):** A `phev2mqtt` a beépített *MQTT Auto-Discovery* segítségével automatikusan létrehozza az összes érzékelőt és kapcsolót a Home Assistantban.

> 👉 **Részletes telepítési leírás:** A Raspberry Pi hálózati beállítását (LAN + Wi-Fi útválasztás), a `phev2mqtt` lefordítását, az autó kulcsos regisztrációs módját és az automatikus `systemd` indítást lépésről lépésre megtalálod itt:
> **[📖 `phev2mqtt` telepítése és összekötése a Home Assistanttal (`docs/phev2mqtt-telepites.md`)](./docs/phev2mqtt-telepites.md)**

---

## 📦 Telepítés (Lovelace Kártya)

### A) HACS (Egyéni tárolóként / Custom Repository)
1. Nyisd meg a **HACS** felületet a Home Assistantban.
2. Kattints a jobb felső `⋮` menüre -> **Egyéni tárolók (Custom repositories)**.
3. Add meg a GitHub tároló URL-jét, kategóriának válaszd az **Irányítópult (Dashboard / Lovelace)** típust, majd telepítsd.

### B) Kézi telepítés (1 fájl bemásolásával)
1. Másold a gyökérkönyvtárban található [`outlander-phev-card.js`](./outlander-phev-card.js) fájlt a Home Assistant `/config/www/` mappájába.
2. A Home Assistantban menj ide: **Beállítások -> Irányítópultok -> `⋮` (jobb felül) -> Erőforrások (Resources)**.
3. Kattints az **Erőforrás hozzáadása** gombra:
   - **URL:** `/local/outlander-phev-card.js?v=1.3.0`
   - **Típus:** `JavaScript modul (JavaScript Module)`
4. Frissítsd a böngészőt (`Ctrl+F5` / `Cmd+Shift+R`), majd add hozzá a **Mitsubishi Outlander PHEV Card** kártyát bármelyik irányítópulthoz!

---

## YAML Konfigurációs Példa

> **Tipp:** Ha csak annyit adsz meg, hogy `type: custom:outlander-phev-card`, a kártya automatikusan megpróbálja felismerni a `phev2mqtt` entitásaidat, illetve mindent beállíthatsz a grafikus felületen!

```yaml
type: custom:outlander-phev-card
title: Outlander PHEV
language: hu
steering_side: left
car_color: "#2b2f36"
battery_fill_mode: always      # always | xray | charging | off
battery_fill_opacity: 36       # 15..75 (%)
layout_mode: auto              # auto | wide | compact
daily_charge_position: header  # header | panel | both
max_ev_range: 45               # Becsült max EV hatótáv km-ben (0 = elrejtve)
show_card_frame: true          # false = külső keret/háttér elrejtése, csak a belső blokkok háttere marad
offline_dimming: true          # Autó és elérhetetlen vezérlők elszürkítése offline állapotban
show_sunroof: true
interactive_car: true
confirm_wifi_restart: true

# Akkumulátor és töltés (phev2mqtt + opcionális napi és külső mérők)
battery_entity: sensor.phev_battery
daily_charge_energy_entity: sensor.napi_toltes_kwh
daily_charge_time_entity: sensor.napi_toltes_ido
charging_entity: binary_sensor.phev_charging
charger_connected_entity: binary_sensor.phev_charger_connected
charge_remaining_entity: sensor.phev_charge_remaining
charge_remaining_hrs_entity: sensor.phev_charge_remaining_hrs
estimated_completion_entity: sensor.phev_estimated_charge_completion
disable_charge_timer_entity: switch.phev_disable_charge_timer
charger_power_entity: sensor.tolto_teljesitmeny_w
charger_energy_entity: sensor.tolto_elfogyasztott_kwh

# Ajtók és központi zár
locked_entity: binary_sensor.phev_locked
driver_door_entity: binary_sensor.phev_driver_door
front_passenger_door_entity: binary_sensor.phev_front_passenger_door
rear_left_door_entity: binary_sensor.phev_rear_left_door
rear_right_door_entity: binary_sensor.phev_rear_right_door
bonnet_entity: binary_sensor.phev_bonnet
boot_entity: binary_sensor.phev_boot

# Klíma
climate_state_entity: select.phev_climate_state
cool_entity: switch.phev_cool
heat_entity: switch.phev_heat
windscreen_entity: switch.phev_windscreen

# Világítás és kapcsolat
head_lights_entity: light.phev_head_lights
park_lights_entity: light.phev_park_lights
hazard_lights_entity: binary_sensor.phev_hazard_lights
interior_lights_entity: binary_sensor.phev_interior_lights
connected_entity: binary_sensor.phev_connected
restart_wifi_entity: button.phev_restart_wifi_connetion
```

---

## Helyi Interaktív Demó kipróbálása

A projekt tartalmaz egy önálló böngészős szimulátort a [`./demo/index.html`](https://rinszky.github.io/ha-lovelace-outlander-card/demo/) fájlban, amellyel Home Assistant nélkül is azonnal kipróbálhatod az összes ajtó-, lámpa-, töltés- és klíma-animációt, valamint a vizuális szerkesztőt.

Ha módosítod a `src/` mappában lévő fájlokat, az egyfájlos `outlander-phev-card.js` csomag újraépítéséhez futtasd:

```bash
npm run build
```
