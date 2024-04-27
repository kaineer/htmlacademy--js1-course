const { promises: { mkdir, readFile } } = require("fs");
const { join } = require("path");

const getContentType = (path) => {
  if (path.endsWith(".html")) {
    return "text/html";
  } else if (path.endsWith(".css")) {
    return "text/css";
  } else if (path.endsWith(".js")) {
    return "text/javascript";
  } else if (path.endsWith(".png")) {
    return "image/png";
  } else if (path.endsWith(".jpg")) {
    return "image/jpeg";
  }
}

//
const runPuppeteer = async (
  page,
  hostUrl,
  rootPath,
  assetsDir,
  screenshotsDir,
) => {
  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const path = request.url().toString().slice(hostUrl.length);
    const filepath = join(rootPath, path);
    try {
      const content = (await readFile(filepath)).toString();
      const contentType = getContentType(path);

      request.respond({
        contentType,
        body: content
      });
    } catch (err) {
      request.abort();
    }
  });

  await page.goto(hostUrl + "index.html");

  const acceptFiles = async (files) => {
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click(".input-file")
    ]);

    await fileChooser.accept(
      files.map((f) => join(assetsDir, f))
    );
  }

  await mkdir(screenshotsDir, { recursive: true });

  await acceptFiles(["white.png", "black.png"]);

  await page.screenshot({
    path: join(screenshotsDir, "01.png")
  });

  await page.evaluate(() => {
    document.querySelector(".file-list a").click()
  });

  await page.screenshot({
    path: join(screenshotsDir, "02.png")
  });

  await acceptFiles(["black.png", "small-white.png"]);

  await page.screenshot({
    path: join(screenshotsDir, "03.png")
  });
}

module.exports = {
  runPuppeteer
}
