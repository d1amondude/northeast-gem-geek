const http = require('http');

const id = process.argv[2] || 'GVnK9N_xtKM';
const gemName = process.argv[3] || 'Amethyst';

const url = id.startsWith('http') ? id : `https://images.unsplash.com/photo-${id}?q=80&w=600&auto=format&fit=crop`;

console.log(`Testing Unsplash ID: ${id} (${url}) for ${gemName}...`);

const postData = JSON.stringify({
  gemId: gemName.toLowerCase(),
  imageUrl: url,
  gemName: gemName
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
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch {
      console.log("Failed to parse JSON:", data);
    }
  });
});

req.on('error', (e) => {
  console.log("Error:", e.message);
});

req.write(postData);
req.end();
