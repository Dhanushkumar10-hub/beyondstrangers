const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Function to generate a simple uncompressed/deflated valid PNG buffer with custom dimensions and solid/gradient colors
function createPNG(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(2, 9); // Truecolor (RGB)
  ihdr.writeUInt8(0, 10); // Deflate
  ihdr.writeUInt8(0, 11); // Filter method
  ihdr.writeUInt8(0, 12); // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data: for each scanline: filter byte (0) + width * 3 bytes (RGB)
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData.writeUInt8(0, rowOffset); // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      // Slight vertical gradient / variation
      const factor = 1 - (y / height) * 0.3;
      rawData.writeUInt8(Math.min(255, Math.floor(r * factor)), pxOffset);
      rawData.writeUInt8(Math.min(255, Math.floor(g * factor)), pxOffset + 1);
      rawData.writeUInt8(Math.min(255, Math.floor(b * factor)), pxOffset + 2);
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

const table = (() => {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }
  return table;
})();

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const toCrc = buf.slice(4, 8 + len);
  const crc = crc32(toCrc);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

const brandLogoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" rx="32" fill="#0B0F17"/>
  <circle cx="100" cy="100" r="76" fill="#161F2E" stroke="#FF5A36" stroke-width="4"/>
  <polygon points="100,38 116,92 100,82 84,92" fill="#FF5A36"/>
  <polygon points="100,162 116,108 100,118 84,108" fill="#9CA3AF"/>
  <circle cx="100" cy="100" r="10" fill="#F3F4F6"/>
  <circle cx="100" cy="100" r="5" fill="#0B0F17"/>
</svg>`;

const filesToCreate = [
  // Brand Logo
  { rel: 'assets/brand/logo.png', w: 200, h: 200, r: 255, g: 90, b: 54 },
  { rel: 'assets/brand/logo.svg', content: brandLogoSVG },

  // Destinations
  { rel: 'assets/images/destinations/kodaikanal.jpg', w: 800, h: 600, r: 22, g: 31, b: 46 },
  { rel: 'assets/images/destinations/ooty.jpg', w: 800, h: 600, r: 24, g: 38, b: 58 },
  { rel: 'assets/images/destinations/valparai.jpg', w: 800, h: 600, r: 18, g: 35, b: 30 },
  { rel: 'assets/images/destinations/kolli_hills.jpg', w: 800, h: 600, r: 35, g: 28, b: 45 },
  { rel: 'assets/images/destinations/meghamalai.jpg', w: 800, h: 600, r: 20, g: 40, b: 50 },
  { rel: 'assets/images/destinations/gavi.jpg', w: 800, h: 600, r: 16, g: 31, b: 24 },
  { rel: 'assets/images/destinations/munnar.jpg', w: 800, h: 600, r: 20, g: 45, b: 35 },
  { rel: 'assets/images/destinations/coorg.jpg', w: 800, h: 600, r: 30, g: 25, b: 20 },

  // Experiences
  { rel: 'assets/images/experiences/forest_trails.jpg', w: 600, h: 450, r: 22, g: 38, b: 30 },
  { rel: 'assets/images/experiences/private_waterfalls.jpg', w: 600, h: 450, r: 20, g: 42, b: 60 },
  { rel: 'assets/images/experiences/reservoir_boating.jpg', w: 600, h: 450, r: 18, g: 36, b: 55 },
  { rel: 'assets/images/experiences/natural_surroundings.jpg', w: 600, h: 450, r: 25, g: 45, b: 35 },
  { rel: 'assets/images/experiences/evening_campfire.jpg', w: 600, h: 450, r: 65, g: 30, b: 20 },
  { rel: 'assets/images/experiences/meet_new_people.jpg', w: 600, h: 450, r: 40, g: 30, b: 55 },
  { rel: 'assets/images/experiences/tea_walk.jpg', w: 600, h: 450, r: 22, g: 45, b: 30 },
  { rel: 'assets/images/experiences/cloud_sunrise.jpg', w: 600, h: 450, r: 60, g: 35, b: 40 },

  // Stories & Avatars
  { rel: 'assets/images/stories/story_kodaikanal.jpg', w: 600, h: 450, r: 25, g: 35, b: 50 },
  { rel: 'assets/images/stories/story_ooty.jpg', w: 600, h: 450, r: 30, g: 40, b: 55 },
  { rel: 'assets/images/stories/story_valparai.jpg', w: 600, h: 450, r: 22, g: 38, b: 32 },
  { rel: 'assets/images/stories/story_kolli.jpg', w: 600, h: 450, r: 35, g: 30, b: 48 },
  { rel: 'assets/images/stories/story_campfire.jpg', w: 600, h: 450, r: 60, g: 28, b: 22 },
  { rel: 'assets/images/stories/avatar_dharsh.jpg', w: 200, h: 200, r: 45, g: 50, b: 65 },
  { rel: 'assets/images/stories/avatar_priya.jpg', w: 200, h: 200, r: 65, g: 40, b: 55 },
  { rel: 'assets/images/stories/avatar_arjun.jpg', w: 200, h: 200, r: 40, g: 55, b: 60 },
  { rel: 'assets/images/stories/avatar_sneha.jpg', w: 200, h: 200, r: 55, g: 45, b: 65 },
  { rel: 'assets/images/stories/avatar_rahul.jpg', w: 200, h: 200, r: 45, g: 60, b: 50 },
];

// Write into both /public/ and root /
const targets = [
  path.join(__dirname, '..'),
  path.join(__dirname, '..', 'public')
];

targets.forEach(baseDir => {
  filesToCreate.forEach(item => {
    const fullPath = path.join(baseDir, item.rel);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (item.content) {
      fs.writeFileSync(fullPath, item.content);
    } else {
      const pngBuf = createPNG(item.w, item.h, item.r, item.g, item.b);
      fs.writeFileSync(fullPath, pngBuf);
    }
  });
});

console.log('Successfully generated all local assets in both public/assets and assets directories!');
