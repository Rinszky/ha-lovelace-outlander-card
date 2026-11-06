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

export const CAR_NOSE_Y = 105;
export const CAR_REAR_Y = 675;
export const CAR_BODY_LEN = CAR_REAR_Y - CAR_NOSE_Y; // 570

export function renderOutlanderSvg(uid) {
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
       8. PROPORTIONAL BATTERY PERCENTAGE CAR FILL OVERLAY
       ========================================================= -->
  <g class="layer-battery-overlay">
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
       9. ANIMATED BONNET, BOOT & 4 SWINGING DOORS
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
