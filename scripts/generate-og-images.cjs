// Create a 1200×630 PNG social card for every published blog post from its cover image.
// Facebook, LinkedIn, X and WhatsApp do not render SVG, so each post needs a raster card at
// public/Blogs/<slug>/og-card.png. Existing cards are kept; pass --force to rebuild them.
// Run after adding a post: `npm run og:images` (also runs automatically before `npm run build`).
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const blogDir = path.join(root, 'src/pages/blog');
const force = process.argv.includes('--force');

const field = (frontmatter, key) => frontmatter.match(new RegExp(`^${key}:\\s*"?([^"\\r\\n]+)"?\\s*$`, 'm'))?.[1]?.trim();

async function main() {
  let created = 0, kept = 0, skipped = 0;
  for (const file of fs.readdirSync(blogDir).filter(name => name.endsWith('.md'))) {
    const slug = file.slice(0, -3);
    const frontmatter = fs.readFileSync(path.join(blogDir, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
    if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;
    const cover = field(frontmatter, 'coverImage');
    const target = path.join(root, 'public/Blogs', slug, 'og-card.png');
    if (!cover) { skipped++; console.warn(`og:images ${slug}: no coverImage, the site card will be used`); continue; }
    if (fs.existsSync(target) && !force) { kept++; continue; }
    const source = path.join(root, 'public', decodeURIComponent(cover.replace(/^\//, '')));
    if (!fs.existsSync(source)) throw new Error(`og:images ${slug}: cover not found at ${cover}`);
    const input = /\.svg$/i.test(source) ? sharp(source, { density: 160 }) : sharp(source);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    await input
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .flatten({ background: '#f6f5f1' })
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(target);
    created++;
  }
  console.log(`og:images created ${created}, kept ${kept}, without cover ${skipped}`);
}

main().catch(error => { console.error(error.message); process.exit(1); });
