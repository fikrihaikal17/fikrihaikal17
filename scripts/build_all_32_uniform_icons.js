const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) resolve(data);
        else reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      });
    }).on('error', reject);
  });
}

// Extract SVG inner content and viewBox dimensions
function parseSvg(rawSvg) {
  const vbMatch = rawSvg.match(/viewBox=["']([0-9.\s-]+)["']/i);
  let vbWidth = 128;
  let vbHeight = 128;
  if (vbMatch) {
    const parts = vbMatch[1].trim().split(/\s+/).map(Number);
    if (parts.length === 4) {
      vbWidth = parts[2];
      vbHeight = parts[3];
    }
  } else {
    const wMatch = rawSvg.match(/width=["']([0-9.]+)["']/i);
    const hMatch = rawSvg.match(/height=["']([0-9.]+)["']/i);
    if (wMatch && hMatch) {
      vbWidth = parseFloat(wMatch[1]);
      vbHeight = parseFloat(hMatch[1]);
    }
  }

  // Strip XML declaration, doctype, and outer <svg> tags
  let inner = rawSvg
    .replace(/<\?xml[\s\S]*?\?>/i, '')
    .replace(/<!DOCTYPE[\s\S]*?>/i, '')
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '')
    .trim();

  return { inner, vbWidth, vbHeight };
}

const iconsList = [
  // Row 1
  { id: 'js', name: 'JavaScript', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', color: '#F7DF1E', dur: '3.0s' },
  { id: 'ts', name: 'TypeScript', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg', color: '#3178C6', dur: '3.2s' },
  { id: 'python', name: 'Python', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg', color: '#3776AB', dur: '3.4s' },
  { id: 'php', name: 'PHP', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg', color: '#777BB4', dur: '3.1s' },
  { id: 'dart', name: 'Dart', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg', color: '#0175C2', dur: '3.3s' },
  { id: 'html', name: 'HTML', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg', color: '#E34F26', dur: '2.9s' },
  { id: 'css', name: 'CSS', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg', color: '#1572B6', dur: '3.0s' },
  { id: 'restapi', name: 'Rest API', isCustom: 'restapi', color: '#00E5FF', dur: '3.2s' },

  // Row 2
  { id: 'laravel', name: 'Laravel', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg', color: '#FF2D20', dur: '3.2s' },
  { id: 'flutter', name: 'Flutter', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg', color: '#02569B', dur: '3.0s' },
  { id: 'react', name: 'React', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg', color: '#61DAFB', dur: '3.4s' },
  { id: 'vue', name: 'Vue.js', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg', color: '#4FC08D', dur: '3.1s' },
  { id: 'nodejs', name: 'Node.js', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg', color: '#5FA04E', dur: '3.3s' },
  { id: 'tailwind', name: 'Tailwind', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4', dur: '2.8s' },
  { id: 'bootstrap', name: 'Bootstrap', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg', color: '#7952B3', dur: '3.2s' },
  { id: 'nginx', name: 'Nginx', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg', color: '#009639', dur: '3.5s' },

  // Row 3
  { id: 'mysql', name: 'MySQL', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg', color: '#4479A1', dur: '3.1s' },
  { id: 'postgresql', name: 'PostgreSQL', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg', color: '#4169E1', dur: '3.3s' },
  { id: 'firebase', name: 'Firebase', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg', color: '#FFCA28', dur: '2.9s' },
  { id: 'gcp', name: 'GCP', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg', color: '#4285F4', dur: '3.2s' },
  { id: 'ubuntu', name: 'Ubuntu', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-plain.svg', color: '#E95420', dur: '3.4s' },
  { id: 'npm', name: 'npm', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg', color: '#CB3837', dur: '2.8s' },
  { id: 'git', name: 'Git', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg', color: '#F05032', dur: '3.1s' },
  { id: 'github', name: 'GitHub', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg', color: '#FFFFFF', dur: '3.3s' },

  // Row 4
  { id: 'vscode', name: 'VS Code', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg', color: '#007ACC', dur: '3.0s' },
  { id: 'androidstudio', name: 'Android Studio', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/androidstudio/androidstudio-original.svg', color: '#3DDC84', dur: '3.2s' },
  { id: 'antigravity', name: 'Antigravity', isCustom: 'antigravity', color: '#4285F4', dur: '3.5s' },
  { id: 'figma', name: 'Figma', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg', color: '#F24E1E', dur: '3.1s' },
  { id: 'arduino', name: 'Arduino', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg', color: '#00979D', dur: '3.3s' },
  { id: 'ai', name: 'Illustrator', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/illustrator/illustrator-plain.svg', color: '#FF9A00', dur: '3.0s' },
  { id: 'canva', name: 'Canva', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/canva/canva-original.svg', color: '#00C4CC', dur: '3.2s' },
  { id: 'postman', name: 'Postman', url: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg', color: '#FF6C37', dur: '2.9s' }
];

async function generateAll() {
  const outputDir = path.join(__dirname, '..', 'assets', 'icons');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Pre-load Antigravity PNG as base64
  const antigravityPngPath = path.join(__dirname, '..', 'assets', 'antigravity.png');
  let antigravityBase64 = '';
  if (fs.existsSync(antigravityPngPath)) {
    antigravityBase64 = fs.readFileSync(antigravityPngPath).toString('base64');
  }

  for (const item of iconsList) {
    let innerContent = '';
    let scale = 1;
    let offsetX = 53;
    let offsetY = 53;

    if (item.isCustom === 'restapi') {
      innerContent = `
        <rect x="0" y="0" width="150" height="150" rx="28" fill="#132F38"/>
        <text x="75" y="70" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="900" font-size="34" fill="#00E5FF">{REST}</text>
        <text x="75" y="108" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-weight="800" font-size="24" fill="#80DEEA" letter-spacing="5">API</text>
      `;
      offsetX = 53;
      offsetY = 53;
      scale = 1;
    } else if (item.isCustom === 'antigravity') {
      innerContent = `
        <image href="data:image/png;base64,${antigravityBase64}" width="150" height="150" preserveAspectRatio="xMidYMid meet"/>
      `;
      offsetX = 53;
      offsetY = 53;
      scale = 1;
    } else {
      const raw = await fetchUrl(item.url);
      const parsed = parseSvg(raw);
      innerContent = parsed.inner;

      // Fit inside 150x150 target box
      const targetSize = 150;
      const maxDim = Math.max(parsed.vbWidth, parsed.vbHeight) || 128;
      scale = +(targetSize / maxDim).toFixed(4);
      const renderedW = parsed.vbWidth * scale;
      const renderedH = parsed.vbHeight * scale;
      offsetX = +((256 - renderedW) / 2).toFixed(2);
      offsetY = +((256 - renderedH) / 2).toFixed(2);

      // GitHub logo needs to be white to stand out on dark card
      if (item.id === 'github') {
        innerContent = innerContent.replace(/fill="#[0-9a-fA-F]+"/g, 'fill="#FFFFFF"');
      }
    }

    // Build the final uniform animated SVG
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" fill="none">
  <!-- Card Background -->
  <rect width="256" height="256" rx="60" fill="#242938"/>

  <!-- High-Visibility Traveling Laser Border Tracing -->
  <rect x="4" y="4" width="248" height="248" rx="56" fill="none" stroke="${item.color}" stroke-width="8" stroke-dasharray="160 300">
    <animate attributeName="stroke-dashoffset" from="0" to="920" dur="3.5s" repeatCount="indefinite"/>
  </rect>

  <!-- Ambient Glow Corner Highlights -->
  <circle cx="28" cy="28" r="18" fill="${item.color}" opacity="0.18">
    <animate attributeName="opacity" values="0.18; 0.55; 0.18" dur="${item.dur}" repeatCount="indefinite"/>
  </circle>
  <circle cx="228" cy="228" r="18" fill="${item.color}" opacity="0.18">
    <animate attributeName="opacity" values="0.18; 0.55; 0.18" dur="${item.dur}" repeatCount="indefinite"/>
  </circle>

  <!-- Centered Logo with Uniform Levitation & Breathing Animation -->
  <g transform="translate(0, 0)">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0; 0,10; 0,0" dur="${item.dur}" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="scale" values="1 1; 1.05 1.05; 1 1; 0.98 0.98; 1 1" transform-origin="128 128" additive="sum" dur="${item.dur}" repeatCount="indefinite"/>
    
    <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">
      ${innerContent}
    </g>
  </g>
</svg>
`;

    const outPath = path.join(outputDir, `${item.id}.svg`);
    fs.writeFileSync(outPath, svg, 'utf8');
    console.log(`[OK] Built ${item.id}.svg (${item.name}) - ${svg.length} bytes`);
  }

  console.log('\nAll 32 uniform animated icons built successfully!');
}

generateAll().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
