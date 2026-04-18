const HomeIllustration = () => {
  return (
    <svg
      width="100%"
      viewBox="0 0 680 520"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Home service illustration</title>
      <desc>
        A modern flat illustration of a house with service workers and tools
      </desc>

      {/* Sky background */}
      <rect x="0" y="0" width="680" height="520" fill="#EFF6FF" rx="24" />

      {/* Clouds */}
      <ellipse cx="120" cy="80" rx="55" ry="28" fill="white" opacity="0.9" />
      <ellipse cx="160" cy="68" rx="45" ry="32" fill="white" opacity="0.9" />
      <ellipse cx="85" cy="72" rx="38" ry="24" fill="white" opacity="0.9" />
      <ellipse cx="530" cy="90" rx="50" ry="25" fill="white" opacity="0.8" />
      <ellipse cx="570" cy="78" rx="42" ry="30" fill="white" opacity="0.8" />
      <ellipse cx="498" cy="83" rx="35" ry="22" fill="white" opacity="0.8" />

      {/* Ground */}
      <rect x="0" y="400" width="680" height="120" fill="#BBF7D0" />
      <rect x="0" y="415" width="680" height="105" fill="#86EFAC" />

      {/* House shadow */}
      <rect
        x="188"
        y="248"
        width="320"
        height="200"
        rx="8"
        fill="#DBEAFE"
        opacity="0.5"
      />
      {/* House base */}
      <rect x="180" y="240" width="320" height="200" rx="8" fill="white" />

      {/* Roof */}
      <polygon points="155,245 340,100 525,245" fill="#2563EB" />
      <polygon
        points="155,245 340,100 525,245"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="2"
      />
      <line
        x1="340"
        y1="100"
        x2="340"
        y2="245"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeDasharray="4,4"
        opacity="0.5"
      />

      {/* Chimney */}
      <rect x="420" y="130" width="40" height="80" rx="4" fill="#1E40AF" />
      <rect x="415" y="125" width="50" height="14" rx="4" fill="#1D4ED8" />
      {/* Smoke */}
      <path
        d="M435,120 Q428,105 435,92 Q442,79 435,66"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M448,118 Q441,103 448,90 Q455,77 448,64"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Door */}
      <rect x="295" y="330" width="90" height="110" rx="45" fill="#2563EB" />
      <rect x="305" y="340" width="70" height="90" rx="38" fill="#1D4ED8" />
      <circle cx="372" cy="393" r="7" fill="#FCD34D" />
      <rect x="280" y="435" width="120" height="10" rx="4" fill="#BFDBFE" />

      {/* Window left */}
      <rect x="205" y="278" width="90" height="78" rx="10" fill="#DBEAFE" />
      <rect x="207" y="280" width="86" height="74" rx="8" fill="#EFF6FF" />
      <line
        x1="250"
        y1="280"
        x2="250"
        y2="354"
        stroke="#BFDBFE"
        strokeWidth="2.5"
      />
      <line
        x1="207"
        y1="317"
        x2="293"
        y2="317"
        stroke="#BFDBFE"
        strokeWidth="2.5"
      />
      <rect
        x="205"
        y="278"
        width="90"
        height="78"
        rx="10"
        fill="none"
        stroke="#93C5FD"
        strokeWidth="2"
      />

      {/* Window right */}
      <rect x="385" y="278" width="90" height="78" rx="10" fill="#DBEAFE" />
      <rect x="387" y="280" width="86" height="74" rx="8" fill="#EFF6FF" />
      <line
        x1="430"
        y1="280"
        x2="430"
        y2="354"
        stroke="#BFDBFE"
        strokeWidth="2.5"
      />
      <line
        x1="387"
        y1="317"
        x2="473"
        y2="317"
        stroke="#BFDBFE"
        strokeWidth="2.5"
      />
      <rect
        x="385"
        y="278"
        width="90"
        height="78"
        rx="10"
        fill="none"
        stroke="#93C5FD"
        strokeWidth="2"
      />

      {/* Window flowers */}
      <circle cx="220" cy="272" r="5" fill="#FCA5A5" />
      <circle cx="235" cy="268" r="5" fill="#FCD34D" />
      <circle cx="250" cy="272" r="5" fill="#86EFAC" />
      <circle cx="265" cy="268" r="5" fill="#FCA5A5" />
      <rect x="218" y="272" width="55" height="6" rx="3" fill="#4ADE80" />

      {/* Tree left */}
      <rect x="90" y="350" width="16" height="60" rx="4" fill="#92400E" />
      <ellipse cx="98" cy="310" rx="42" ry="50" fill="#4ADE80" />
      <ellipse cx="98" cy="295" rx="32" ry="38" fill="#22C55E" />

      {/* Tree right */}
      <rect x="565" y="355" width="16" height="55" rx="4" fill="#92400E" />
      <ellipse cx="573" cy="318" rx="38" ry="45" fill="#4ADE80" />
      <ellipse cx="573" cy="304" rx="28" ry="34" fill="#22C55E" />

      {/* Fence left */}
      <rect
        x="160"
        y="400"
        width="8"
        height="35"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="185"
        y="400"
        width="8"
        height="35"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="158"
        y="408"
        width="38"
        height="6"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="158"
        y="420"
        width="38"
        height="6"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />

      {/* Fence right */}
      <rect
        x="507"
        y="400"
        width="8"
        height="35"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="532"
        y="400"
        width="8"
        height="35"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="505"
        y="408"
        width="38"
        height="6"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="505"
        y="420"
        width="38"
        height="6"
        rx="3"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />

      {/* Worker left — plumber */}
      <circle cx="108" cy="318" r="20" fill="#FED7AA" />
      <ellipse cx="108" cy="304" rx="20" ry="10" fill="#92400E" />
      <ellipse cx="108" cy="302" rx="22" ry="8" fill="#FCD34D" />
      <rect x="86" y="298" width="44" height="8" rx="2" fill="#F59E0B" />
      <rect x="88" y="338" width="40" height="50" rx="8" fill="#2563EB" />
      <rect x="70" y="340" width="20" height="36" rx="6" fill="#2563EB" />
      <rect x="110" y="340" width="20" height="36" rx="6" fill="#2563EB" />
      <circle cx="80" cy="378" r="8" fill="#FED7AA" />
      <circle cx="120" cy="378" r="8" fill="#FED7AA" />
      <rect x="90" y="385" width="16" height="35" rx="6" fill="#1E40AF" />
      <rect x="114" y="385" width="16" height="35" rx="6" fill="#1E40AF" />
      <ellipse cx="98" cy="420" rx="10" ry="6" fill="#1E3A5F" />
      <ellipse cx="122" cy="420" rx="10" ry="6" fill="#1E3A5F" />
      {/* Wrench */}
      <rect x="60" y="368" width="22" height="8" rx="4" fill="#94A3B8" />
      <circle cx="60" cy="372" r="7" fill="#64748B" />
      <circle cx="60" cy="372" r="3" fill="#94A3B8" />

      {/* Worker right — painter */}
      <circle cx="572" cy="318" r="20" fill="#FED7AA" />
      <ellipse cx="572" cy="304" rx="20" ry="10" fill="#1E293B" />
      <ellipse cx="572" cy="302" rx="22" ry="8" fill="#F97316" />
      <rect x="550" y="298" width="44" height="8" rx="2" fill="#EA580C" />
      <rect x="552" y="338" width="40" height="50" rx="8" fill="#F97316" />
      <rect x="534" y="340" width="20" height="36" rx="6" fill="#F97316" />
      <rect x="574" y="340" width="20" height="36" rx="6" fill="#F97316" />
      <circle cx="544" cy="378" r="8" fill="#FED7AA" />
      <circle cx="584" cy="378" r="8" fill="#FED7AA" />
      <rect x="554" y="385" width="16" height="35" rx="6" fill="#9A3412" />
      <rect x="578" y="385" width="16" height="35" rx="6" fill="#9A3412" />
      <ellipse cx="562" cy="420" rx="10" ry="6" fill="#1E3A5F" />
      <ellipse cx="586" cy="420" rx="10" ry="6" fill="#1E3A5F" />
      {/* Paint roller */}
      <rect x="585" y="362" width="28" height="10" rx="4" fill="#94A3B8" />
      <rect x="595" y="348" width="8" height="16" rx="2" fill="#64748B" />
      <rect x="590" y="360" width="18" height="12" rx="3" fill="#2563EB" />
      {/* Paint bucket */}
      <rect x="600" y="400" width="28" height="24" rx="4" fill="#DBEAFE" />
      <rect x="598" y="396" width="32" height="8" rx="2" fill="#93C5FD" />
      <path
        d="M606,396 Q614,388 622,396"
        fill="none"
        stroke="#64748B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Toolbox */}
      <rect x="44" y="398" width="44" height="30" rx="5" fill="#F97316" />
      <rect x="52" y="392" width="28" height="10" rx="4" fill="#EA580C" />
      <line
        x1="44"
        y1="413"
        x2="88"
        y2="413"
        stroke="#EA580C"
        strokeWidth="2"
      />
      <rect x="50" y="415" width="6" height="10" rx="2" fill="#FCD34D" />
      <rect x="60" y="415" width="6" height="10" rx="2" fill="#FCD34D" />
      <rect x="70" y="415" width="6" height="10" rx="2" fill="#FCD34D" />

      {/* Sun */}
      <circle cx="590" cy="65" r="30" fill="#FCD34D" />
      <line
        x1="590"
        y1="22"
        x2="590"
        y2="10"
        stroke="#FCD34D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="619"
        y1="36"
        x2="628"
        y2="27"
        stroke="#FCD34D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="633"
        y1="65"
        x2="645"
        y2="65"
        stroke="#FCD34D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="619"
        y1="94"
        x2="628"
        y2="103"
        stroke="#FCD34D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="561"
        y1="36"
        x2="552"
        y2="27"
        stroke="#FCD34D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="547"
        y1="65"
        x2="535"
        y2="65"
        stroke="#FCD34D"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Badge: verified */}
      <rect
        x="30"
        y="180"
        width="130"
        height="50"
        rx="12"
        fill="white"
        opacity="0.95"
      />
      <rect
        x="30"
        y="180"
        width="130"
        height="50"
        rx="12"
        fill="none"
        stroke="#DBEAFE"
        strokeWidth="1.5"
      />
      <circle cx="56" cy="205" r="14" fill="#22C55E" />
      <path
        d="M49,205 L54,210 L63,199"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="76"
        y="201"
        fontFamily="sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#1E293B"
      >
        Verified
      </text>
      <text x="76" y="215" fontFamily="sans-serif" fontSize="10" fill="#64748B">
        All providers
      </text>

      {/* Badge: rating */}
      <rect
        x="520"
        y="175"
        width="140"
        height="50"
        rx="12"
        fill="white"
        opacity="0.95"
      />
      <rect
        x="520"
        y="175"
        width="140"
        height="50"
        rx="12"
        fill="none"
        stroke="#DBEAFE"
        strokeWidth="1.5"
      />
      <circle cx="546" cy="200" r="14" fill="#EAB308" />
      <text
        x="539"
        y="205"
        fontFamily="sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="white"
      >
        ★
      </text>
      <text
        x="566"
        y="196"
        fontFamily="sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#1E293B"
      >
        4.9 Rating
      </text>
      <text
        x="566"
        y="210"
        fontFamily="sans-serif"
        fontSize="10"
        fill="#64748B"
      >
        2,400+ reviews
      </text>

      {/* Walkway */}
      <rect
        x="300"
        y="435"
        width="80"
        height="80"
        rx="2"
        fill="#E2E8F0"
        opacity="0.7"
      />
      <rect x="310" y="445" width="24" height="14" rx="2" fill="#CBD5E1" />
      <rect x="340" y="445" width="24" height="14" rx="2" fill="#CBD5E1" />
      <rect x="310" y="464" width="24" height="14" rx="2" fill="#CBD5E1" />
      <rect x="340" y="464" width="24" height="14" rx="2" fill="#CBD5E1" />
    </svg>
  );
};

export default HomeIllustration;
