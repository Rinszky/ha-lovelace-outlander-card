export const CARD_STYLES = `
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
