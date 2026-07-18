const http = require('https');
const localHttp = require('http');
const fs = require('fs');
const path = require('path');

const GEM_QUERIES = {
  diamond: "Diamond crystal specimen",
  ruby: "Ruby crystal specimen",
  sapphire: "Sapphire crystal specimen",
  emerald: "Emerald crystal specimen",
  alexandrite: "Alexandrite crystal specimen",
  tanzanite: "Tanzanite crystal specimen",
  spinel: "Spinel crystal specimen",
  topaz: "Topaz crystal specimen",
  opal: "Precious opal specimen",
  peridot: "Peridot crystal specimen",
  tourmaline: "Tourmaline crystal specimen",
  zircon: "Zircon crystal specimen",
  aquamarine: "Aquamarine crystal specimen",
  amethyst: "Amethyst crystal specimen",
  citrine: "Citrine crystal specimen",
  jadeite: "Jadeite jade specimen",
  nephrite: "Nephrite jade specimen",
  chrysoberyl: "Chrysoberyl crystal specimen",
  almandine_garnet: "Almandine garnet crystal",
  pyrope_garnet: "Pyrope garnet crystal",
  spessartine_garnet: "Spessartine garnet crystal",
  tsavorite_garnet: "Tsavorite garnet crystal",
  morganite: "Morganite crystal specimen",
  kunzite: "Kunzite crystal specimen",
  moonstone: "Moonstone mineral specimen",
  turquoise: "Turquoise mineral specimen",
  lapis_lazuli: "Lapis lazuli specimen",
  iolite: "Iolite mineral specimen",
  apatite: "Apatite crystal specimen",
  chrome_diopside: "Chrome diopside mineral specimen"
};

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
  nephrite: "Nephrite",
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

// Known verified working fallbacks
const KNOWN_GOOD = {
  peridot: "https://upload.wikimedia.org/wikipedia/commons/9/90/Peridot_%28GeoDIL_number_-_1027%29.jpg",
  amethyst: "https://upload.wikimedia.org/wikipedia/commons/4/40/Amethyst_specimen.jpg",
  morganite: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop"
};

async function apiGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      headers: {
        'User-Agent': 'GeoCertAssistant/1.0 (https://ai.studio/build; assistant@example.com)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function searchWikimedia(query) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&utf8=1`;
  try {
    const searchRes = await apiGet(searchUrl);
    const results = searchRes.query?.search || [];
    const urls = [];
    
    for (const item of results.slice(0, 4)) { // Try top 4 candidates
      const title = item.title;
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
      const infoRes = await apiGet(infoUrl);
      const pages = infoRes.query?.pages || {};
      const pageId = Object.keys(pages)[0];
      const imageInfo = pages[pageId]?.imageinfo?.[0];
      if (imageInfo?.url) {
        urls.push(imageInfo.url);
      }
    }
    return urls;
  } catch (err) {
    console.error(`Error searching Wikimedia for "${query}":`, err);
    return [];
  }
}

async function verifyImage(imageUrl, gemId, gemName) {
  // Wait 3 seconds to prevent hitting Gemini API rate limits/quotas
  await new Promise(resolve => setTimeout(resolve, 3000));
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      gemId: gemId,
      imageUrl: imageUrl,
      gemName: gemName
    });

    const req = localHttp.request({
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
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ error: "Failed to parse: " + data });
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
  console.log("Starting full-catalog audit and fix...");
  
  // 1. Load existing verified-gemstone-images.json if it exists to support recovery
  let mapping = {};
  const backupFilePath = path.join(process.cwd(), 'verified-gemstone-images.json');
  if (fs.existsSync(backupFilePath)) {
    try {
      mapping = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
      console.log(`Loaded ${Object.keys(mapping).length} pre-verified images from verified-gemstone-images.json to skip duplicate work.`);
    } catch (e) {
      console.warn("Could not parse existing verified-gemstone-images.json, starting fresh.");
    }
  }

  function saveProgress(currentMapping) {
    try {
      // Write the mapping to a local json file for backup
      fs.writeFileSync(backupFilePath, JSON.stringify(currentMapping, null, 2));
      console.log("Incrementally saved verified-gemstone-images.json.");
      
      // Update App.tsx
      const appPath = path.join(process.cwd(), 'src', 'App.tsx');
      let appContent = fs.readFileSync(appPath, 'utf8');
      
      // Find the GEMSTONE_IMAGES block
      const startMarker = 'const GEMSTONE_IMAGES: Record<string, string> = {';
      const endMarker = '};';
      
      const startIndex = appContent.indexOf(startMarker);
      if (startIndex !== -1) {
        const endIndex = appContent.indexOf(endMarker, startIndex);
        if (endIndex !== -1) {
          let newBlock = 'const GEMSTONE_IMAGES: Record<string, string> = {\n';
          for (const [key, val] of Object.entries(currentMapping)) {
            newBlock += `  ${key}: "${val}",\n`;
          }
          // Fill in any missing keys from original mapping so we don't break the app
          const originalBlockStr = appContent.substring(startIndex, endIndex + endMarker.length);
          const regex = /^\s*([a-zA-Z0-9_]+):\s*"([^"]+)",/gm;
          let match;
          while ((match = regex.exec(originalBlockStr)) !== null) {
            const origKey = match[1];
            const origVal = match[2];
            if (!currentMapping[origKey]) {
              newBlock += `  ${origKey}: "${origVal}",\n`;
            }
          }
          newBlock += '};';
          
          appContent = appContent.replace(originalBlockStr, newBlock);
          fs.writeFileSync(appPath, appContent, 'utf8');
          console.log("Incrementally updated App.tsx with newly verified image(s).");
        }
      }
    } catch (err) {
      console.error("Failed to save progress incrementally:", err);
    }
  }
  
  for (const gemId of Object.keys(GEM_QUERIES)) {
    console.log(`\n==========================================`);
    console.log(`Auditing gemstone: ${gemId} (${gemNames[gemId]})...`);
    
    // Check if we already have a verified image for this gemstone from a prior run
    if (mapping[gemId] && mapping[gemId].startsWith("http")) {
      console.log(`Skipping: Gemstone ${gemId} already has verified image: ${mapping[gemId]}`);
      continue;
    }
    
    // 1. Check known good fallbacks
    if (KNOWN_GOOD[gemId]) {
      console.log(`Using pre-verified known-good URL for ${gemId}...`);
      mapping[gemId] = KNOWN_GOOD[gemId];
      saveProgress(mapping);
      continue;
    }
    
    const query = GEM_QUERIES[gemId];
    const candidates = await searchWikimedia(query);
    console.log(`Found ${candidates.length} candidates.`);
    
    let verifiedUrl = null;
    for (const url of candidates) {
      console.log(`Testing candidate: ${url}...`);
      const result = await verifyImage(url, gemId, gemNames[gemId]);
      if (result.verified) {
        console.log(`✅ VERIFIED! Rating: ${result.rating}`);
        verifiedUrl = url;
        break;
      } else {
        console.log(`❌ Failed: Rating=${result.rating || 'N/A'}, Verdict=${result.verdict || 'N/A'}`);
        if (result.critique) console.log(`Critique: ${result.critique}`);
      }
    }
    
    if (verifiedUrl) {
      mapping[gemId] = verifiedUrl;
      saveProgress(mapping);
    } else {
      console.log(`⚠️ WARNING: No verified image found for ${gemId}. Keeping existing fallback temporarily.`);
      // Try to find a general crystal image as a backup
      const backupCandidates = await searchWikimedia(`${gemNames[gemId]} crystal`);
      for (const url of backupCandidates) {
        console.log(`Testing backup candidate: ${url}...`);
        const result = await verifyImage(url, gemId, gemNames[gemId]);
        if (result.verified) {
          console.log(`✅ VERIFIED BACKUP!`);
          verifiedUrl = url;
          break;
        }
      }
      if (verifiedUrl) {
        mapping[gemId] = verifiedUrl;
        saveProgress(mapping);
      } else {
        // Ultimate fallback: search for "mineral specimen"
        const finalCandidates = await searchWikimedia(`${gemNames[gemId]} specimen`);
        for (const url of finalCandidates) {
          console.log(`Testing final backup candidate: ${url}...`);
          const result = await verifyImage(url, gemId, gemNames[gemId]);
          if (result.verified) {
            console.log(`✅ VERIFIED FINAL BACKUP!`);
            verifiedUrl = url;
            break;
          }
        }
        if (verifiedUrl) {
          mapping[gemId] = verifiedUrl;
          saveProgress(mapping);
        } else {
          // Keep current App.tsx fallback
          console.log(`❌ ALL AUDITS FAILED FOR ${gemId}.`);
        }
      }
    }
  }
  
  console.log(`\n==========================================`);
  console.log("FINAL MAPPING OF VERIFIED IMAGES:");
  console.log(JSON.stringify(mapping, null, 2));
}

run();
