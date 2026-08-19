const { chromium } = require('playwright');
const express = require('express');
const path = require('path');
const fs = require('fs');

async function recordMobileWebsite() {
  const outputDir = path.join(__dirname, '../remotion-video/public/assets/walkthrough_mobile');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Start local server
  const app = express();
  app.use(express.static(path.join(__dirname, '..')));
  app.use((req, res) => res.sendFile(path.join(__dirname, '../index.html')));

  const server = app.listen(3009, () => {
    console.log('Mobile record server listening on http://localhost:3009');
  });

  console.log('Launching Playwright Chromium for Mobile 9:16 (430x932 @ 2.5x) recording...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2.5,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3009', { waitUntil: 'networkidle' });

  // Add CSS to hide scrollbars for clean presentation
  await page.addStyleTag({
    content: `
      ::-webkit-scrollbar { display: none !important; }
      body { -webkit-font-smoothing: antialiased; }
    `
  });

  await page.waitForTimeout(2000);

  console.log('Capturing Optimized Full-Page Mobile Screenshot...');
  await page.screenshot({
    path: path.join(outputDir, 'mobile_fullpage.jpg'),
    fullPage: true,
    type: 'jpeg',
    quality: 90,
  });

  console.log('Optimized Full-Page Mobile Screenshot captured successfully!');

  await page.close();
  await context.close();
  await browser.close();
  server.close();
}

recordMobileWebsite().catch(err => {
  console.error('Error recording mobile website:', err);
  process.exit(1);
});
