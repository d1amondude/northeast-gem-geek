const fs = require('fs');
const http = require('http');

// Extract GEMSTONE_IMAGES from src/App.tsx
const appText = fs.readFileSync('src/App.tsx', 'utf8');
const startIdx = appText.indexOf('const GEMSTONE_IMAGES: Record<string, string> = {');
const endIdx = appText.indexOf('};', startIdx);
const block = appText.substring(startIdx, endIdx + 2);

// Evaluate the block to get the JS object
let GEMSTONE_IMAGES;
eval(block.replace('const GEMSTONE_IMAGES: Record<string, string> =', 'GEMSTONE_IMAGES ='));

const gemNames = {
  diamond: "Diamond",
  ruby: "Ruby",
  sapphire: "Blue Sapphire",
  emerald: "Emerald",
  alexandrite: "Alexandrite",
  tanzanite: "Tanzanite",
  spinel: "Spinel",
  topaz: "Topaz",
  opal: "Precious Opal",
  peridot: "Peridot",
  tourmaline: "Tourmaline",
  zircon: "Zircon",
  aquamarine: "Aquamarine",
  amethyst: "Amethyst",
  citrine: "Citrine",
  jadeite: "Jadeite",
  nephrite: "Nephrite Jade",
  chrysoberyl: "Chrysoberyl",
  almandine_garnet: "Almandine Garnet",
  pyrope_garnet: "Pyrope Garnet",
  spessartine_garnet: "Spessartine Garnet",
  tsavorite_garnet: "Tsavorite Garnet",
  morganite: "Morganite",
  kunzite: "Kunzite",
  moonstone: "Moonstone",
  turquoise: "Turquoise",
  lapis_lazuli: "Lapis Lazuli",
  iolite: "Iolite",
  apatite: "Apatite",
  chrome_diopside: "Chrome Diopside"
};

async function check(id) {
  // Wait 3 seconds to prevent hitting Gemini API rate limits/quotas
  await new Promise(resolve => setTimeout(resolve, 3000));
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      gemId: id,
      imageUrl: GEMSTONE_IMAGES[id],
      gemName: gemNames[id] || id
    });

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/gemini/verify-catalog-item',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ error: "Failed to parse JSON: " + data });
        }
      });
    });

    req.on('error', (e) => {
      resolve({ error: e.message });
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log("Starting full 30 gemstone audit directly from App.tsx...");
  for (const id of Object.keys(GEMSTONE_IMAGES)) {
    console.log(`Auditing ${id}...`);
    const start = Date.now();
    const res = await check(id);
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`[${id.toUpperCase()}] Result after ${duration}s:`);
    if (res.verified) {
      console.log(`✅ VERIFIED: Rating=${res.rating}, Verdict=${res.verdict}`);
    } else {
      console.log(`❌ FAILED: Rating=${res.rating || 'N/A'}, Verdict=${res.verdict || 'N/A'}`);
      console.log(`Critique: ${res.critique || res.error || 'No critique'}`);
    }
    console.log("------------------------------------------");
  }
}

run();
