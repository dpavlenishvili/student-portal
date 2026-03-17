import sharp from 'sharp';

// SVG source for the app icon — graduation cap on dark blue background
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#1e3a5f"/>
  <polygon points="256,140 420,210 256,280 92,210" fill="#ffffff" opacity="0.95"/>
  <polygon points="256,140 420,210 256,175" fill="#ffffff"/>
  <rect x="390" y="210" width="8" height="60" rx="4" fill="#60a5fa"/>
  <circle cx="394" cy="278" r="12" fill="#60a5fa"/>
  <rect x="196" y="265" width="120" height="14" rx="7" fill="#ffffff" opacity="0.5"/>
  <path d="M176,320 L176,370 L336,370 L336,320 C336,320 310,340 256,340 C202,340 176,320 176,320 Z" fill="#ffffff" opacity="0.9"/>
</svg>
`;

const sizes = [
  { size: 192, file: 'apps/student/public/icons/icon-192.png' },
  { size: 512, file: 'apps/student/public/icons/icon-512.png' },
  { size: 180, file: 'apps/student/public/icons/apple-touch-icon.png' },
];

for (const { size, file } of sizes) {
  await sharp(Buffer.from(svgIcon))
    .resize(size, size)
    .png()
    .toFile(file);
  console.log(`Generated ${file}`);
}
