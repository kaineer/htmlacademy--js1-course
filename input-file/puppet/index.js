//

const puppeteer = require("puppeteer");
const { runPuppeteer } = require("./screenshots")

const { join } = require("path");
const { promises: { readFile } } = require("fs");
const projectPath = join(__dirname, "../project");

const testHost = "http://test.local/";

const fn = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await runPuppeteer(
    page,
    testHost,
    projectPath,
    join(__dirname, "images"),
    join(__dirname, "screenshots")
  );

//  await page.setRequestInterception(true);
//  page.on('request', async (request) => {
//    const path = request.url().toString().slice(testHost.length);
//    const filepath = join(projectPath, path);
//    try {
//      const content = (await readFile(filepath)).toString();
//      const contentType = getContentType(path);

//      request.respond({
//        contentType,
//        body: content
//      });
//    } catch (err) {
//      request.abort();
//    }
//  });
//  await page.goto(testHost + "index.html");

//  const getFilechooser = async () => {
//    const [fileChooser] = await Promise.all([
//      page.waitForFileChooser(),
//      page.click(".input-file")
//    ]);

//    return fileChooser;
//  }

//  await (await getFilechooser()).accept([
//    join(__dirname, "images", "white.png"),
//    join(__dirname, "images", "black.png")
//  ]);

//  await page.screenshot({ path: "01-two-images.png" });

//  await page.evaluate(() => {
//    document.querySelector(".file-list a").click();
//  });

//  await page.screenshot({ path: "02-two-images-close.png" });

//  await (await getFilechooser()).accept([
//    join(__dirname, "images", "black.png"),
//    join(__dirname, "images", "small-white.png")
//  ]);

//  await page.screenshot({ path: "03-add-third.png" });

  await browser.close();
}

fn().then(() => console.log("done"));
