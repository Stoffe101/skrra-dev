const path = require("node:path");
const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const htmlPath = path.join(__dirname, "cv.html");
  await page.goto("file:///" + htmlPath.replace(/\\/g, "/"));
  await page.emulateMedia({ media: "print" });

  const outPath = path.join(__dirname, "..", "..", "public", "cv.pdf");
  await page.pdf({
    path: outPath,
    width: "210mm",
    height: "297mm",
    printBackground: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    pageRanges: "1",
  });

  await browser.close();
  console.log("Wrote", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
