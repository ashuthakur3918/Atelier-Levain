import React from 'react';

interface BakeryArtworkProps {
  type: string;
  className?: string;
}

export const BakeryArtwork: React.FC<BakeryArtworkProps> = ({
  type,
  className = 'w-full h-full',
}) => {
  switch (type) {
    case 'chocolate-chip-walnut':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#F5ECE0] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="270" rx="130" ry="20" fill="#20150E" fillOpacity="0.14" filter="blur(6px)" />
            {/* Giant 6-oz Mound Body */}
            <circle cx="200" cy="180" r="105" fill="url(#levainCookieGold)" />
            {/* Chunky irregular cookie crags & crevices */}
            <path d="M125 155 Q160 135 200 145 Q245 135 275 160" stroke="#8A4A1C" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M140 215 Q195 235 260 210" stroke="#68340E" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            {/* Melted chocolate pools & chunks (Levain's trademark semi-sweet chips) */}
            <ellipse cx="160" cy="160" rx="18" ry="14" fill="#240E04" />
            <ellipse cx="158" cy="158" rx="6" ry="4" fill="#52240D" opacity="0.6" />

            <ellipse cx="225" cy="150" rx="22" ry="16" fill="#1C0902" />
            <ellipse cx="222" cy="147" rx="8" ry="5" fill="#4E200B" opacity="0.7" />

            <ellipse cx="195" cy="210" rx="24" ry="18" fill="#240E04" />
            <ellipse cx="192" cy="207" rx="8" ry="5" fill="#52240D" opacity="0.6" />

            <ellipse cx="255" cy="195" rx="16" ry="12" fill="#1C0902" />
            <ellipse cx="135" cy="200" rx="15" ry="12" fill="#240E04" />
            {/* Toasted California walnut halves */}
            <path d="M165 190 Q175 175 185 190 Q175 200 165 190 Z" fill="#996035" stroke="#5E3516" strokeWidth="1.5" />
            <path d="M230 185 Q242 170 252 185 Q242 195 230 185 Z" fill="#996035" stroke="#5E3516" strokeWidth="1.5" />
            <path d="M190 130 Q200 118 210 130 Q200 140 190 130 Z" fill="#A86E40" stroke="#5E3516" strokeWidth="1.5" />
            {/* Crisp crackle highlights */}
            <circle cx="140" cy="130" r="2" fill="#FFEACC" />
            <circle cx="260" cy="135" r="2.5" fill="#FFEACC" />
            <circle cx="210" cy="175" r="2" fill="#FFEACC" />
            <defs>
              <radialGradient id="levainCookieGold" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#F7C97F" />
                <stop offset="50%" stopColor="#DE953B" />
                <stop offset="85%" stopColor="#AB6018" />
                <stop offset="100%" stopColor="#663107" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      );

    case 'two-chip-chocolate':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#F5ECE0] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="270" rx="130" ry="20" fill="#20150E" fillOpacity="0.14" filter="blur(6px)" />
            {/* Giant Mound */}
            <circle cx="200" cy="180" r="105" fill="url(#twoChipGold)" />
            {/* Dark & Semi-sweet chips melting together */}
            <ellipse cx="150" cy="150" rx="20" ry="16" fill="#150601" />
            <ellipse cx="215" cy="140" rx="24" ry="18" fill="#3D1809" />
            <ellipse cx="210" cy="137" rx="8" ry="6" fill="#753516" opacity="0.6" />

            <ellipse cx="180" cy="195" rx="26" ry="20" fill="#150601" />
            <ellipse cx="176" cy="190" rx="9" ry="7" fill="#461805" opacity="0.8" />

            <ellipse cx="245" cy="185" rx="22" ry="16" fill="#3D1809" />
            <ellipse cx="130" cy="195" rx="18" ry="14" fill="#3D1809" />
            <ellipse cx="240" cy="225" rx="16" ry="12" fill="#150601" />
            {/* Sea salt flake scatter */}
            <circle cx="160" cy="175" r="2" fill="#FFF" />
            <circle cx="225" cy="165" r="2" fill="#FFF" />
            <circle cx="195" cy="135" r="1.5" fill="#FFF" />
            <defs>
              <radialGradient id="twoChipGold" cx="45%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#F9D08B" />
                <stop offset="55%" stopColor="#E29C44" />
                <stop offset="85%" stopColor="#B3661C" />
                <stop offset="100%" stopColor="#632E07" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      );

    case 'dark-chocolate-pb':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#F5ECE0] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="270" rx="130" ry="20" fill="#20150E" fillOpacity="0.14" filter="blur(6px)" />
            {/* Deep Dutch Dark Chocolate Cookie Base */}
            <circle cx="200" cy="180" r="105" fill="url(#darkCocoaBase)" />
            {/* Creamy Peanut Butter Chips */}
            <circle cx="150" cy="150" r="14" fill="#E5A64E" stroke="#AB6E1B" strokeWidth="1.5" />
            <circle cx="215" cy="140" r="16" fill="#E5A64E" stroke="#AB6E1B" strokeWidth="1.5" />
            <circle cx="180" cy="195" r="18" fill="#E5A64E" stroke="#AB6E1B" strokeWidth="1.5" />
            <circle cx="245" cy="185" r="14" fill="#E5A64E" stroke="#AB6E1B" strokeWidth="1.5" />
            <circle cx="130" cy="195" r="12" fill="#E5A64E" stroke="#AB6E1B" strokeWidth="1.5" />
            <circle cx="220" cy="225" r="13" fill="#E5A64E" stroke="#AB6E1B" strokeWidth="1.5" />
            {/* Molten PB swirl */}
            <path d="M175 190 Q180 180 185 195" stroke="#FFF0C4" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <radialGradient id="darkCocoaBase" cx="45%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#4A2518" />
                <stop offset="60%" stopColor="#2E1309" />
                <stop offset="100%" stopColor="#150602" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      );

    case 'birthday-cake-cookie':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#F5ECE0] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="270" rx="125" ry="18" fill="#20150E" fillOpacity="0.12" filter="blur(6px)" />
            {/* Milk Bar Birthday Vanilla Dough Mound */}
            <circle cx="200" cy="180" r="100" fill="url(#birthdayDough)" />
            {/* White chocolate chips */}
            <ellipse cx="160" cy="155" rx="15" ry="12" fill="#FFF9E6" stroke="#E5D6B3" strokeWidth="1" />
            <ellipse cx="225" cy="165" rx="16" ry="13" fill="#FFF9E6" stroke="#E5D6B3" strokeWidth="1" />
            <ellipse cx="185" cy="210" rx="15" ry="11" fill="#FFF9E6" stroke="#E5D6B3" strokeWidth="1" />
            {/* Milk Bar Rainbow Sprinkles (Jimmies) */}
            <rect x="140" y="130" width="12" height="4" rx="2" fill="#FF3366" transform="rotate(25 140 130)" />
            <rect x="230" y="135" width="12" height="4" rx="2" fill="#00CCFF" transform="rotate(-30 230 135)" />
            <rect x="180" y="145" width="12" height="4" rx="2" fill="#FFCC00" transform="rotate(45 180 145)" />
            <rect x="250" y="175" width="12" height="4" rx="2" fill="#33CC66" transform="rotate(15 250 175)" />
            <rect x="135" y="180" width="12" height="4" rx="2" fill="#9933FF" transform="rotate(-40 135 180)" />
            <rect x="165" y="215" width="12" height="4" rx="2" fill="#FF3366" transform="rotate(20 165 215)" />
            <rect x="220" y="210" width="12" height="4" rx="2" fill="#00CCFF" transform="rotate(-15 220 210)" />
            <rect x="195" y="175" width="12" height="4" rx="2" fill="#FF9900" transform="rotate(60 195 175)" />
            <defs>
              <radialGradient id="birthdayDough" cx="45%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#FFF4D4" />
                <stop offset="60%" stopColor="#F5D89F" />
                <stop offset="100%" stopColor="#C99852" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      );

    case 'cereal-milk-truffle':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#F5ECE0] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="270" rx="140" ry="18" fill="#20150E" fillOpacity="0.12" filter="blur(6px)" />
            {/* Trio of Milk Bar Cereal Milk Truffles */}
            {/* Truffle 1 */}
            <circle cx="145" cy="195" r="48" fill="#FFF5DC" stroke="#E8D1A5" strokeWidth="2" />
            <circle cx="130" cy="180" r="3" fill="#FF3366" />
            <circle cx="155" cy="175" r="3" fill="#00CCFF" />
            <circle cx="140" cy="205" r="2.5" fill="#FFCC00" />
            <circle cx="160" cy="210" r="2.5" fill="#33CC66" />

            {/* Truffle 2 (Front Center) */}
            <circle cx="200" cy="165" r="54" fill="#FFF5DC" stroke="#E8D1A5" strokeWidth="2" />
            <circle cx="185" cy="150" r="3.5" fill="#FF3366" />
            <circle cx="215" cy="145" r="3.5" fill="#00CCFF" />
            <circle cx="195" cy="175" r="3" fill="#FFCC00" />
            <circle cx="220" cy="180" r="3" fill="#9933FF" />
            <circle cx="175" cy="185" r="2.5" fill="#33CC66" />

            {/* Truffle 3 */}
            <circle cx="255" cy="195" r="48" fill="#FFF5DC" stroke="#E8D1A5" strokeWidth="2" />
            <circle cx="245" cy="180" r="3" fill="#FF9900" />
            <circle cx="270" cy="185" r="3" fill="#00CCFF" />
            <circle cx="250" cy="210" r="2.5" fill="#FF3366" />
          </svg>
        </div>
      );

    case 'cookie-gift-tin':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#F5ECE0] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="275" rx="145" ry="20" fill="#20150E" fillOpacity="0.15" filter="blur(6px)" />
            {/* Levain Iconic Navy Blue Gift Box / Tin */}
            <rect x="80" y="110" width="240" height="150" rx="16" fill="#0B1D3A" stroke="#1A2F54" strokeWidth="3" />
            {/* Box Lid Edge */}
            <rect x="75" y="100" width="250" height="35" rx="8" fill="#0E2345" stroke="#1A2F54" strokeWidth="2" />
            {/* Levain Signature Cornflower Blue Satin Ribbon */}
            <rect x="185" y="100" width="30" height="160" fill="#4B86E8" />
            <rect x="75" y="160" width="250" height="25" fill="#4B86E8" />
            {/* Ribbon Knot Bow */}
            <circle cx="200" cy="100" r="16" fill="#3874DC" />
            <ellipse cx="175" cy="88" rx="22" ry="14" fill="#4B86E8" transform="rotate(-25 175 88)" />
            <ellipse cx="225" cy="88" rx="22" ry="14" fill="#4B86E8" transform="rotate(25 225 88)" />
            {/* Gold Embossed Baker's Seal */}
            <circle cx="200" cy="172" r="18" fill="#E5A64E" stroke="#B87B28" strokeWidth="1.5" />
            <text x="200" y="176" textAnchor="middle" fill="#2E1309" fontSize="10" fontWeight="bold" fontFamily="serif">LEV</text>
          </svg>
        </div>
      );

    case 'country-boule':
    default:
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#F5ECE0] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="270" rx="140" ry="22" fill="#24140E" fillOpacity="0.14" filter="blur(6px)" />
            <ellipse cx="200" cy="180" rx="125" ry="95" fill="url(#bouleCrust)" />
            <path d="M78 195 C85 240 140 265 200 265 C260 265 315 240 322 195 C310 230 250 255 200 255 C150 255 90 230 78 195 Z" fill="#4A2311" fillOpacity="0.85" />
            <path d="M110 140 C145 120 220 120 285 160 C240 145 160 145 125 170 C110 180 102 160 110 140 Z" fill="#E8BD7F" stroke="#3D1808" strokeWidth="2.5" />
            <defs>
              <radialGradient id="bouleCrust" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#DF9C53" />
                <stop offset="45%" stopColor="#BC631F" />
                <stop offset="80%" stopColor="#7E3711" />
                <stop offset="100%" stopColor="#4A1E0B" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      );
  }
};
