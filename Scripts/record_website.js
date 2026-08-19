const { chromium } = require('playwright');
const express = require('express');
const path = require('path');
const fs = require('fs');

async function recordWebsite() {
  const outputDir = path.join(__dirname, '../remotion-video/public/assets/walkthrough');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Start local server
  const app = express();
  app.use(express.static(path.join(__dirname, '..')));
  app.use((req, res) => res.sendFile(path.join(__dirname, '../index.html')));

  const server = app.listen(3009, () => {
    console.log('Local record server listening on http://localhost:3009');
  });

  console.log('Launching Playwright Chromium for 1920x1080 Landscape recording...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: outputDir,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3009', { waitUntil: 'networkidle' });

  // Add custom CSS to hide scrollbars for ultra-clean video recording
  await page.addStyleTag({
    content: `
      ::-webkit-scrollbar { display: none !important; }
      html { scroll-behavior: smooth !important; }
    `
  });

  console.log('Capturing Section 1: Hero');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outputDir, 'hero.png') });

  console.log('Capturing Section 2: About Dt. Akhila');
  await page.evaluate(() => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(outputDir, 'about.png') });

  console.log('Capturing Section 3: Clinical Services');
  await page.evaluate(() => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(outputDir, 'services.png') });

  console.log('Capturing Section 4: Nutrition Guide & Reviews');
  await page.evaluate(() => {
    const el = document.querySelector('#gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(outputDir, 'gallery.png') });

  await page.evaluate(() => {
    const el = document.querySelector('#testimonials');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(outputDir, 'testimonials.png') });

  console.log('Capturing Section 5: Booking Consultation');
  await page.evaluate(() => {
    const el = document.querySelector('#booking') || document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(outputDir, 'booking.png') });

  console.log('Recording complete. Closing browser...');
  await page.close();
  await context.close();
  await browser.close();
  server.close();

  // Rename recorded video file to standard filename
  const files = fs.readdirSync(outputDir);
  const videoFile = files.find(f => f.endsWith('.webm'));
  if (videoFile) {
    const targetPath = path.join(outputDir, 'website_recording.webm');
    if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
    fs.renameSync(path.join(outputDir, videoFile), targetPath);
    console.log(`Saved website screen recording to ${targetPath}`);
  }
}

recordWebsite().catch(err => {
  console.error('Error recording website:', err);
  process.exit(1);
});
