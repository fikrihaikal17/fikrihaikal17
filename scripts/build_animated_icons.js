const fs = require('fs');
const path = require('path');

function getExistingInner(name) {
  if (name === 'ubuntu') {
    return `<g transform="translate(48, 48) scale(6.67)">
      <path fill="#E95420" d="M17.61.455a3.41 3.41 0 0 0-3.41 3.41 3.41 3.41 0 0 0 3.41 3.41 3.41 3.41 0 0 0 3.41-3.41 3.41 3.41 0 0 0-3.41-3.41zM12.92.8C8.923.777 5.137 2.941 3.148 6.451a4.5 4.5 0 0 1 .26-.007 4.92 4.92 0 0 1 2.585.737A8.316 8.316 0 0 1 12.688 3.6 4.944 4.944 0 0 1 13.723.834 11.008 11.008 0 0 0 12.92.8zm9.226 4.994a4.915 4.915 0 0 1-1.918 2.246 8.36 8.36 0 0 1-.273 8.303 4.89 4.89 0 0 1 1.632 2.54 11.156 11.156 0 0 0 .559-13.089zM3.41 7.932A3.41 3.41 0 0 0 0 11.342a3.41 3.41 0 0 0 3.41 3.409 3.41 3.41 0 0 0 3.41-3.41 3.41 3.41 0 0 0-3.41-3.41zm2.027 7.866a4.908 4.908 0 0 1-2.915.358 11.1 11.1 0 0 0 7.991 6.698 11.234 11.234 0 0 0 2.422.249 4.879 4.879 0 0 1-.999-2.85 8.484 8.484 0 0 1-.836-.136 8.304 8.304 0 0 1-5.663-4.32zm11.405.928a3.41 3.41 0 0 0-3.41 3.41 3.41 3.41 0 0 0 3.41 3.41 3.41 3.41 0 0 0 3.41-3.41 3.41 3.41 0 0 0-3.41-3.41z"/>
    </g>`;
  }
  if (name === 'npm') {
    return `<g transform="translate(48, 48) scale(6.67)">
      <path fill="#CB3837" d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0z"/>
      <path fill="#FFF" d="M5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
    </g>`;
  }
  const filePath = path.join('assets/icons', name + '.svg');
  if (!fs.existsSync(filePath)) return '';
  const content = fs.readFileSync(filePath, 'utf8');
  const start = content.indexOf('<rect width="256" height="256"');
  if (start === -1) return '';
  const innerSvgEnd = content.indexOf('</svg>', start);
  if (innerSvgEnd === -1) return '';
  const inner = content.substring(start, innerSvgEnd);
  // Remove the background rect to avoid duplicate
  return inner.replace(/<rect width="256" height="256"[^>]*\/>/, '').trim();
}

// Config for each of the 25 icons
const iconConfigs = {
  php: {
    color: '#8892BF',
    dur: '3.2s',
    extras: `
      <!-- Shimmer sweep across PHP -->
      <g clip-path="url(#card-clip-php)">
        <polygon points="0,0 50,0 120,256 70,256" fill="url(#shimmer-grad-php)" opacity="0.45">
          <animateTransform attributeName="transform" type="translate" values="-180,0; 300,0" dur="2.8s" repeatCount="indefinite"/>
        </polygon>
      </g>
    `,
    defs: `
      <linearGradient id="shimmer-grad-php" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="50%" stop-color="#fff" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="card-clip-php">
        <rect width="256" height="256" rx="60"/>
      </clipPath>
    `,
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-14; 0,0; 0,14; 0,0" dur="3.2s" repeatCount="indefinite"/>
    `
  },

  dart: {
    color: '#00C4B3',
    dur: '3.5s',
    extras: `
      <!-- Dart speed glints -->
      <circle cx="60" cy="80" r="3" fill="#00C4B3" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1;4;1" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="180" r="3" fill="#00C4B3" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="0.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1;4;1" dur="2.2s" begin="0.8s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 10,-14; 0,0; -10,8; 0,0" dur="3.5s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; 5 128 128; 0 128 128; -5 128 128; 0 128 128" additive="sum" dur="3.5s" repeatCount="indefinite"/>
    `
  },

  html: {
    color: '#E44D26',
    dur: '2.5s',
    extras: `
      <!-- HTML Solar glow sweep -->
      <g clip-path="url(#card-clip-html)">
        <polygon points="0,0 60,0 140,256 80,256" fill="url(#shimmer-grad-html)" opacity="0.5">
          <animateTransform attributeName="transform" type="translate" values="-180,0; 320,0" dur="2.6s" repeatCount="indefinite"/>
        </polygon>
      </g>
    `,
    defs: `
      <linearGradient id="shimmer-grad-html" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFA000" stop-opacity="0"/>
        <stop offset="50%" stop-color="#FFF" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#E44D26" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="card-clip-html">
        <rect width="256" height="256" rx="60"/>
      </clipPath>
    `,
    innerAnim: `
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.08 1.08; 1 1; 1.03 1.03; 1 1" transform-origin="128 128" dur="2.5s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0; 0,8; 0,0" additive="sum" dur="2.5s" repeatCount="indefinite"/>
    `
  },

  css: {
    color: '#264DE4',
    dur: '2.8s',
    extras: `
      <!-- CSS Blue shine sweep -->
      <g clip-path="url(#card-clip-css)">
        <polygon points="0,0 60,0 140,256 80,256" fill="url(#shimmer-grad-css)" opacity="0.5">
          <animateTransform attributeName="transform" type="translate" values="-180,0; 320,0" dur="2.8s" repeatCount="indefinite"/>
        </polygon>
      </g>
    `,
    defs: `
      <linearGradient id="shimmer-grad-css" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#29B6F6" stop-opacity="0"/>
        <stop offset="50%" stop-color="#FFF" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#264DE4" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="card-clip-css">
        <rect width="256" height="256" rx="60"/>
      </clipPath>
    `,
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-14; 0,0; 0,14; 0,0" dur="2.8s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.06 1.06; 1 1" transform-origin="128 128" additive="sum" dur="2.8s" repeatCount="indefinite"/>
    `
  },

  laravel: {
    color: '#FF2D20',
    dur: '3s',
    extras: `
      <!-- Laravel 3D shadow pulse -->
      <ellipse cx="128" cy="224" rx="55" ry="12" fill="#FF2D20" opacity="0.3">
        <animate attributeName="rx" values="55; 38; 55; 65; 55" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.35; 0.15; 0.35; 0.5; 0.35" dur="3s" repeatCount="indefinite"/>
      </ellipse>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-18; 0,0; 0,10; 0,0" dur="3s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.05 0.96; 1 1; 0.97 1.04; 1 1" transform-origin="128 128" additive="sum" dur="3s" repeatCount="indefinite"/>
    `
  },

  flutter: {
    color: '#44D1FD',
    dur: '2.8s',
    extras: `
      <!-- Flutter breeze sparks -->
      <circle cx="80" cy="190" r="2.5" fill="#44D1FD" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="190;160" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="180" cy="80" r="3" fill="#44D1FD" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.7s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="80;50" dur="2s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; -12,-14; 0,0; 12,8; 0,0" dur="2.8s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; -5 128 128; 0 128 128; 5 128 128; 0 128 128" additive="sum" dur="2.8s" repeatCount="indefinite"/>
    `
  },

  vue: {
    color: '#41B883',
    dur: '2.6s',
    extras: `
      <!-- Vue radiating neon pulse rings -->
      <circle cx="128" cy="180" r="10" fill="none" stroke="#41B883" stroke-width="3" opacity="0.8">
        <animate attributeName="r" values="10; 70" dur="2.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8; 0" dur="2.6s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.1 1.1; 0.94 0.94; 1 1" transform-origin="128 128" dur="2.6s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0; 0,10; 0,0" additive="sum" dur="2.6s" repeatCount="indefinite"/>
    `
  },

  nodejs: {
    color: '#81CD39',
    dur: '12s',
    extras: `
      <!-- Node neon nodes -->
      <circle cx="128" cy="35" r="4" fill="#FFF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="210" cy="78" r="4" fill="#FFF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="210" cy="178" r="4" fill="#FFF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="128" cy="222" r="4" fill="#FFF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
      <circle cx="46" cy="178" r="4" fill="#FFF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" begin="1.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="46" cy="78" r="4" fill="#FFF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" begin="1.5s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; 360 128 128" dur="12s" repeatCount="indefinite"/>
    `
  },

  tailwind: {
    color: '#38BDF8',
    dur: '3s',
    extras: `
      <!-- Wind particles -->
      <line x1="40" y1="90" x2="90" y2="90" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.6">
        <animate attributeName="x1" values="20; 80; 20" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="70; 130; 70" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="2s" repeatCount="indefinite"/>
      </line>
      <line x1="160" y1="160" x2="220" y2="160" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.6">
        <animate attributeName="x1" values="140; 200; 140" dur="2.4s" begin="0.5s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="200; 260; 200" dur="2.4s" begin="0.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="2.4s" begin="0.5s" repeatCount="indefinite"/>
      </line>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; -14,0; 0,0; 14,0; 0,0" dur="3s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.08 0.95; 1 1; 0.94 1.06; 1 1" transform-origin="128 128" additive="sum" dur="3s" repeatCount="indefinite"/>
    `
  },

  bootstrap: {
    color: '#7952B3',
    dur: '3.2s',
    extras: `
      <!-- Royal Purple aura glow -->
      <circle cx="128" cy="128" r="70" fill="none" stroke="#7952B3" stroke-width="4" opacity="0.6">
        <animate attributeName="r" values="65; 95; 65" dur="3.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6; 0.1; 0.6" dur="3.2s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-14; 0,0; 0,14; 0,0" dur="3.2s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.08 1.08; 1 1" transform-origin="128 128" additive="sum" dur="3.2s" repeatCount="indefinite"/>
    `
  },

  postgresql: {
    color: '#336791',
    dur: '3.4s',
    extras: `
      <!-- Elephant water droplets spraying from trunk -->
      <circle cx="70" cy="110" r="4" fill="#64B5F6" opacity="0.9">
        <animate attributeName="cy" values="110; 60; 30" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="70; 55; 45" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1; 0.7; 0" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="3; 6; 2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="72" cy="115" r="3.5" fill="#64B5F6" opacity="0.9">
        <animate attributeName="cy" values="115; 75; 45" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="72; 62; 56" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1; 0.7; 0" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="r" values="2.5; 5; 2" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-12; 0,0; 0,12; 0,0" dur="3.4s" repeatCount="indefinite"/>
    `
  },

  firebase: {
    color: '#FFA000',
    dur: '1.6s',
    extras: `
      <!-- Fire sparks rising -->
      <circle cx="120" cy="90" r="3" fill="#FFD54F" opacity="0.9">
        <animate attributeName="cy" values="90; 40" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="120; 112" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1; 0" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="140" cy="100" r="2.5" fill="#FF7043" opacity="0.9">
        <animate attributeName="cy" values="100; 50" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="140; 148" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1; 0" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.07 1.15; 0.95 0.93; 1.04 1.12; 1 1" transform-origin="128 200" dur="1.6s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="0,0; -2,-12; 2,-4; -1,-8; 0,0" additive="sum" dur="1.6s" repeatCount="indefinite"/>
    `
  },

  gcp: {
    color: '#4285F4',
    dur: '3.6s',
    extras: `
      <!-- 4 Google colored orbiting orbs -->
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 128 128; 360 128 128" dur="8s" repeatCount="indefinite"/>
        <circle cx="128" cy="40" r="6" fill="#4285F4"/>
        <circle cx="216" cy="128" r="6" fill="#EA4335"/>
        <circle cx="128" cy="216" r="6" fill="#FBBC05"/>
        <circle cx="40" cy="128" r="6" fill="#34A853"/>
      </g>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-14; 0,0; 0,14; 0,0" dur="3.6s" repeatCount="indefinite"/>
    `
  },

  ubuntu: {
    color: '#E95420',
    dur: '8s',
    extras: `
      <!-- Ubuntu central glow pulse -->
      <circle cx="128" cy="128" r="28" fill="#E95420" opacity="0.3">
        <animate attributeName="r" values="24; 36; 24" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4; 0.15; 0.4" dur="2s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; 360 128 128" dur="8s" repeatCount="indefinite"/>
    `
  },

  npm: {
    color: '#CB3837',
    dur: '2s',
    extras: `
      <!-- npm jump shadow -->
      <ellipse cx="128" cy="205" rx="70" ry="12" fill="#CB3837" opacity="0.3">
        <animate attributeName="rx" values="70; 45; 78; 70" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.35; 0.15; 0.5; 0.35" dur="2s" repeatCount="indefinite"/>
      </ellipse>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-20; 0,4; 0,-6; 0,0" dur="2s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 0.95 1.08; 1.06 0.92; 0.98 1.02; 1 1" transform-origin="128 170" additive="sum" dur="2s" repeatCount="indefinite"/>
    `
  },

  git: {
    color: '#F05032',
    dur: '3.5s',
    extras: `
      <!-- Git branch commit pulse traveling -->
      <circle cx="128" cy="128" r="8" fill="#FFF" opacity="0.8">
        <animate attributeName="r" values="6; 12; 6" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8; 0.2; 0.8" dur="1.8s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; 7 128 128; 0 128 128; -7 128 128; 0 128 128" dur="3.5s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.06 1.06; 1 1" transform-origin="128 128" additive="sum" dur="3.5s" repeatCount="indefinite"/>
    `
  },

  github: {
    color: '#FFFFFF',
    dur: '3s',
    extras: `
      <!-- Cosmic Octocat aura -->
      <circle cx="128" cy="128" r="75" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.4">
        <animate attributeName="r" values="70; 95; 70" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5; 0.1; 0.5" dur="3s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-14; 0,0; 0,14; 0,0" dur="3s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.07 1.07; 1 1" transform-origin="128 128" additive="sum" dur="3s" repeatCount="indefinite"/>
    `
  },

  vscode: {
    color: '#007ACC',
    dur: '3s',
    extras: `
      <!-- VS Code Energy beam sweep -->
      <g clip-path="url(#card-clip-vscode)">
        <polygon points="0,0 50,0 130,256 80,256" fill="url(#shimmer-grad-vscode)" opacity="0.55">
          <animateTransform attributeName="transform" type="translate" values="-180,0; 320,0" dur="2.6s" repeatCount="indefinite"/>
        </polygon>
      </g>
    `,
    defs: `
      <linearGradient id="shimmer-grad-vscode" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#007ACC" stop-opacity="0"/>
        <stop offset="50%" stop-color="#FFF" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#00E5FF" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="card-clip-vscode">
        <rect width="256" height="256" rx="60"/>
      </clipPath>
    `,
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-14; 0,0; 0,14; 0,0" dur="3s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.07 1.07; 1 1" transform-origin="128 128" additive="sum" dur="3s" repeatCount="indefinite"/>
    `
  },

  androidstudio: {
    color: '#3DDC84',
    dur: '2.5s',
    extras: `
      <!-- Android green pulse rings -->
      <circle cx="128" cy="128" r="65" fill="none" stroke="#3DDC84" stroke-width="3" opacity="0.5">
        <animate attributeName="r" values="60; 90; 60" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6; 0.1; 0.6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-16; 0,0; 0,-6; 0,0" dur="2.5s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; 5 128 128; 0 128 128; -5 128 128; 0 128 128" additive="sum" dur="2.5s" repeatCount="indefinite"/>
    `
  },

  antigravity: {
    color: '#4285F4',
    dur: '4s',
    extras: `
      <!-- Zero gravity stars -->
      <circle cx="65" cy="70" r="3" fill="#FFF" opacity="0.8">
        <animate attributeName="opacity" values="0.2; 1; 0.2" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1; 4; 1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="195" cy="80" r="3" fill="#FFF" opacity="0.8">
        <animate attributeName="opacity" values="0.2; 1; 0.2" dur="2.4s" begin="0.7s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1; 4; 1" dur="2.4s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="180" cy="190" r="2.5" fill="#4285F4" opacity="0.8">
        <animate attributeName="opacity" values="0.2; 1; 0.2" dur="1.8s" begin="1.2s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 8,-16; -8,-8; 0,14; 0,0" dur="4s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; 6 128 128; -6 128 128; 0 128 128" additive="sum" dur="4s" repeatCount="indefinite"/>
    `
  },

  figma: {
    color: '#A259FF',
    dur: '2.5s',
    extras: `
      <!-- Figma color sparkles -->
      <circle cx="50" cy="50" r="3" fill="#F24E1E" opacity="0.7">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="206" cy="50" r="3" fill="#A259FF" opacity="0.7">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="206" cy="206" r="3" fill="#0ACF83" opacity="0.7">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.8s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.12 1.12; 0.95 0.95; 1 1" transform-origin="128 128" dur="2.5s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-12; 0,0; 0,12; 0,0" additive="sum" dur="2.5s" repeatCount="indefinite"/>
    `
  },

  arduino: {
    color: '#00979D',
    dur: '3s',
    extras: `
      <!-- Arduino LED blinkers -->
      <circle cx="95" cy="128" r="5" fill="#00E5FF">
        <animate attributeName="opacity" values="0.3; 1; 0.3" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="r" values="3; 6; 3" dur="1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="161" cy="128" r="5" fill="#FF5252">
        <animate attributeName="opacity" values="1; 0.3; 1" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="r" values="6; 3; 6" dur="1s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-12; 0,0; 0,12; 0,0" dur="3s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.06 1.06; 1 1" transform-origin="128 128" additive="sum" dur="3s" repeatCount="indefinite"/>
    `
  },

  ai: {
    color: '#FF9A00',
    dur: '2.6s',
    extras: `
      <!-- Illustrator pen tool beacon -->
      <circle cx="180" cy="70" r="4" fill="#FF9A00">
        <animate attributeName="r" values="3; 8; 3" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1; 0.3; 1" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <line x1="160" y1="90" x2="200" y2="50" stroke="#FF9A00" stroke-width="2" opacity="0.6">
        <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="1.8s" repeatCount="indefinite"/>
      </line>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.09 1.09; 1 1" transform-origin="128 128" dur="2.6s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0; 0,10; 0,0" additive="sum" dur="2.6s" repeatCount="indefinite"/>
    `
  },

  canva: {
    color: '#00C4CC',
    dur: '9s',
    extras: `
      <!-- Canva creative halo -->
      <circle cx="128" cy="128" r="70" fill="none" stroke="#00C4CC" stroke-width="3" stroke-dasharray="20 15" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" values="0 128 128; 360 128 128" dur="9s" repeatCount="indefinite"/>
      </circle>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="rotate" values="0 128 128; -360 128 128" dur="18s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" values="1 1; 1.06 1.06; 1 1" transform-origin="128 128" additive="sum" dur="3s" repeatCount="indefinite"/>
    `
  },

  postman: {
    color: '#FF6C37',
    dur: '2.4s',
    extras: `
      <!-- Rocket thruster flame! -->
      <polygon points="120,180 136,180 128,220" fill="#FFC107" opacity="0.9">
        <animate attributeName="points" values="120,180 136,180 128,215; 121,180 135,180 128,235; 120,180 136,180 128,210; 119,180 137,180 128,240; 120,180 136,180 128,215" dur="0.4s" repeatCount="indefinite"/>
      </polygon>
      <polygon points="123,180 133,180 128,205" fill="#FFF" opacity="0.95">
        <animate attributeName="points" values="123,180 133,180 128,205; 124,180 132,180 128,218; 123,180 133,180 128,202; 122,180 134,180 128,222; 123,180 133,180 128,205" dur="0.4s" repeatCount="indefinite"/>
      </polygon>
    `,
    defs: '',
    innerAnim: `
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-16; 0,0; 0,10; 0,0" dur="2.4s" repeatCount="indefinite"/>
    `
  }
};

let count = 0;
for (const [name, cfg] of Object.entries(iconConfigs)) {
  const innerPaths = getExistingInner(name);
  if (!innerPaths) {
    console.error('Failed to get inner paths for', name);
    continue;
  }

  // Generate SVG with:
  // 1. Dark squircle base (#242938, rx="60")
  // 2. High-visibility animated laser stroke tracing perimeter
  // 3. Ambient glow
  // 4. Logo inner animation (SMIL + CSS fallback)
  // 5. Extras (droplets, flames, sparkles, beams, orbits)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" fill="none">
  <defs>
    ${cfg.defs || ''}
    <filter id="glow-${name}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Card -->
  <rect width="256" height="256" rx="60" fill="#242938"/>

  <!-- High-Visibility Laser Border Tracing -->
  <rect x="4" y="4" width="248" height="248" rx="56" fill="none" stroke="${cfg.color}" stroke-width="8" stroke-dasharray="160 300">
    <animate attributeName="stroke-dashoffset" from="0" to="920" dur="3.5s" repeatCount="indefinite"/>
  </rect>

  <!-- Ambient Glow Corner Highlights -->
  <circle cx="28" cy="28" r="18" fill="${cfg.color}" opacity="0.15">
    <animate attributeName="opacity" values="0.15; 0.45; 0.15" dur="${cfg.dur}" repeatCount="indefinite"/>
  </circle>
  <circle cx="228" cy="228" r="18" fill="${cfg.color}" opacity="0.15">
    <animate attributeName="opacity" values="0.15; 0.45; 0.15" dur="${cfg.dur}" repeatCount="indefinite"/>
  </circle>

  <!-- Technology Logo with Signature Animation -->
  <g id="logo-${name}">
    ${cfg.innerAnim}
    ${innerPaths}
  </g>

  <!-- Unique Particle / Element Effects -->
  ${cfg.extras || ''}
</svg>
`;

  const outputPath = path.join('assets/icons', name + '.svg');
  fs.writeFileSync(outputPath, svg, 'utf8');
  count++;
  console.log(`[OK] Generated animated ${name}.svg (${svg.length} bytes)`);
}

console.log(`\nSuccessfully built all ${count} animated icons!`);
