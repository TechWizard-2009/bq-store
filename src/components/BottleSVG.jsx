export const BottleSVG = ({ color = "#8b7355", accent = "#c9a84c", height = 280 }) => (
  <svg width={height * 0.55} height={height} viewBox="0 0 110 200" fill="none" className="bottle-svg">
    <rect x="38" y="8" width="34" height="16" rx="4" fill={accent} opacity="0.9"/>
    <rect x="44" y="2" width="22" height="10" rx="3" fill={accent}/>
    <path d="M25 40 Q20 55 20 80 L20 170 Q20 185 55 185 Q90 185 90 170 L90 80 Q90 55 85 40 Z" fill={color} opacity="0.9"/>
    <path d="M30 24 L25 40 L85 40 L80 24 Z" fill={color} opacity="0.7"/>
    <rect x="35" y="80" width="40" height="55" rx="3" fill="rgba(255,255,255,0.07)"/>
    <rect x="38" y="83" width="34" height="1" fill={accent} opacity="0.5"/>
    <rect x="38" y="132" width="34" height="1" fill={accent} opacity="0.5"/>
    <text x="55" y="115" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="Cormorant Garamond, serif">LUXE</text>
    <text x="55" y="125" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="Jost, sans-serif" letterSpacing="2">AROMA</text>
    <ellipse cx="55" cy="168" rx="28" ry="8" fill="rgba(0,0,0,0.3)"/>
  </svg>
);
