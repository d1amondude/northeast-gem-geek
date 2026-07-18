const http = require('http');

const GEMSTONE_IMAGES = {
  diamond: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=600&auto=format&fit=crop",
  ruby: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop",
  sapphire: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop",
  emerald: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
  alexandrite: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
  tanzanite: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
  spinel: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=600&auto=format&fit=crop",
  topaz: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop",
  opal: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=600&auto=format&fit=crop",
  peridot: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600&auto=format&fit=crop",
  tourmaline: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=600&auto=format&fit=crop",
  zircon: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
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
  zircon: "Zircon"
};

async function check(id) {
  // Wait 3 seconds to prevent hitting Gemini API rate limits/quotas
  await new Promise(resolve => setTimeout(resolve, 3000));
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      gemId: id,
      imageUrl: GEMSTONE_IMAGES[id],
      gemName: gemNames[id]
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
  console.log("Starting full gemstone audit...");
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
    }
    console.log(`Critique: ${res.critique || res.error || 'No critique'}`);
    console.log("------------------------------------------");
  }
}

run();
