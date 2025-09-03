const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

// Configuration for the video recording
const config = {
  followNewTab: true,
  fps: 25,
  ffmpeg_Path: null, // Set this if you have a custom ffmpeg path
  videoFrame: {
    width: 1920,
    height: 1080,
  },
  videoCrf: 18,
  videoCodec: "libx264",
  videoPreset: "ultrafast",
  videoBitrate: 1000,
  autopad: {
    color: "black",
  },
  aspectRatio: "16:9",
};

// This function will perform a smooth, human-like scroll
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100; // How many pixels to scroll each step
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100); // The delay between each scroll step in milliseconds
    });
  });
}

// Main function to run the automation
(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to 'new' for headless or false to watch it run
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const recorder = new PuppeteerScreenRecorder(page, config);
  const savePath = "./website_scroll.mp4";

  console.log("Starting recording...");
  await recorder.start(savePath);

  console.log("Navigating to the website...");
  await page.goto("http://localhost:3002", {
    waitUntil: "networkidle0",
  });

  console.log("Scrolling the page...");
  await autoScroll(page);

  // Example of an interaction: wait for 2 seconds then click an element
  console.log("Performing an interaction...");
  await page.waitForTimeout(2000); // Wait for 2 seconds
  // You could add a click here, e.g., await page.click('#some-button');

  console.log("Stopping recording...");
  await recorder.stop();

  console.log("Closing browser...");
  await browser.close();

  console.log("✅ Video saved as website_scroll.mp4");
})();
