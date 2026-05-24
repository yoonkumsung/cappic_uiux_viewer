const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Import screen data from single source
const data = require('./screens-data.js');
const screens = data.screens.map(s => s.id);

const BASE = 'http://localhost:3030';
const DIR = path.join(__dirname, 'thumbs');

(async () => {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 3 });

  const heights = {};
  const failed = [];

  for (let i = 0; i < screens.length; i++) {
    const id = screens[i];
    const isLandscape = data.screens.find(s => s.id === id)?.landscape;
    try {
      await page.goto(`${BASE}/app.html?screen=${id}`, { waitUntil: 'networkidle0', timeout: 10000 });
      await page.evaluate((sid) => { if (typeof go === 'function') go(sid); }, id);
      await new Promise(r => setTimeout(r, 500));

      // 가로 모드 화면 지원 (P-31)
      if (isLandscape) {
        await page.setViewport({ width: 812, height: 375, deviceScaleFactor: 3 });
      }

      const contentHeight = await page.evaluate((sid) => {
        const screen = document.getElementById(sid);
        if (!screen) return 812;
        const body = screen.querySelector('.screen-body');
        if (body) return Math.max(body.scrollHeight + 100, 812);
        return Math.max(screen.scrollHeight, 812);
      }, id);

      const w = isLandscape ? 812 : 375;
      const h = isLandscape ? 375 : contentHeight;

      await page.setViewport({ width: w, height: h, deviceScaleFactor: 3 });
      await new Promise(r => setTimeout(r, 300));

      await page.screenshot({
        path: path.join(DIR, `${id}.webp`),
        type: 'webp',
        quality: 85,
        clip: { x: 0, y: 0, width: w, height: h },
      });

      // 카드 높이 계산 (overview용, 160px 카드 너비 기준)
      const cardH = Math.round(h * (160 / w));
      heights[id] = Math.max(cardH, 280);

      await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 3 });
      console.log(`[${i + 1}/${screens.length}] ${id} ✓ (${w}x${h} → card ${heights[id]}px)`);
    } catch (e) {
      failed.push(id);
      heights[id] = 346; // 기본값
      console.log(`[${i + 1}/${screens.length}] ${id} ✗ ${e.message}`);
    }
  }

  // screens-data.js의 cardHeights를 실제 측정값으로 자동 업데이트
  const sdPath = path.join(__dirname, 'screens-data.js');
  let sdContent = fs.readFileSync(sdPath, 'utf-8');
  const heightsJson = JSON.stringify(heights);
  sdContent = sdContent.replace(
    /const cardHeights\s*=\s*\{[^}]+\};/,
    'const cardHeights = ' + heightsJson + ';'
  );
  fs.writeFileSync(sdPath, sdContent);
  console.log(`\nscreens-data.js cardHeights updated (${Object.keys(heights).length} screens)`);

  if (failed.length > 0) {
    console.log(`\n⚠ Failed (${failed.length}): ${failed.join(', ')}`);
  }

  await browser.close();
  console.log('Done!');
})();
