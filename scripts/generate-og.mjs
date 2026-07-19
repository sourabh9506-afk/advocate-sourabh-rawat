import sharp from 'sharp'
import fs from 'fs'

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B2A4A"/>
      <stop offset="100%" stop-color="#2C4A7C"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Gold accent line top -->
  <rect x="60" y="0" width="4" height="630" fill="#C9963A" opacity="0.3"/>
  <rect x="60" y="60" width="120" height="3" fill="#C9963A"/>

  <!-- SR Logo box -->
  <rect x="60" y="80" width="56" height="56" rx="4" fill="#C9963A"/>
  <text x="88" y="118" font-family="Georgia, serif" font-size="22"
    font-weight="700" fill="#1B2A4A" text-anchor="middle">SR</text>

  <!-- Site label -->
  <text x="132" y="118" font-family="Arial, sans-serif" font-size="16"
    fill="#F5F0E8" letter-spacing="3" opacity="0.8">HIGH COURT · LUCKNOW</text>

  <!-- Gold label -->
  <text x="60" y="260" font-family="Arial, sans-serif" font-size="15"
    fill="#C9963A" letter-spacing="5">PRACTICING ADVOCATE · LUCKNOW</text>

  <!-- Main name -->
  <text x="60" y="340" font-family="Georgia, serif" font-size="68"
    font-weight="700" fill="#F5F0E8">Advocate</text>
  <text x="60" y="420" font-family="Georgia, serif" font-size="68"
    font-weight="700" fill="#C9963A">Sourabh Rawat</text>

  <!-- Practice areas -->
  <text x="60" y="470" font-family="Arial, sans-serif" font-size="22"
    fill="#F5F0E8" letter-spacing="3" opacity="0.7">
    CRIMINAL · CIVIL · FAMILY LAW
  </text>

  <!-- Bottom divider -->
  <rect x="60" y="550" width="1080" height="1" fill="#C9963A" opacity="0.3"/>

  <!-- Bottom left -->
  <text x="60" y="590" font-family="Arial, sans-serif" font-size="16"
    fill="#F5F0E8" opacity="0.5">advocatelucknow.in</text>

  <!-- Bottom right tags -->
  <text x="940" y="590" font-family="Arial, sans-serif" font-size="13"
    fill="#C9963A" opacity="0.7" letter-spacing="1">BAR COUNCIL OF UP · BCI COMPLIANT</text>
</svg>`

fs.mkdirSync('public/images', { recursive: true })

await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .jpeg({ quality: 90 })
  .toFile('public/images/og-image.jpg')

console.log('✓ OG image generated: public/images/og-image.jpg')
