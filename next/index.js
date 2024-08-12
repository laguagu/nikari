const puppeteer = require("puppeteer");
const fs = require("fs").promises;

async function scrapeText() {
  // Luodaan selaininstanssi
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Siirrytään Nikarin tuotesivulle
  await page.goto(
    "https://nikari.fi/products/chairs,linea-collection/akademia-armrest/",
    { waitUntil: "networkidle0" },
  );

  // Kerätään kaikki luokan "col-inner" sisällä olevien <p>-elementtien tekstisisällöt
  const textContent = await page.evaluate(() => {
    const texts = Array.from(
      document.querySelectorAll(".col-inner p"),
      (element) => element.innerText,
    );
    return texts;
  });

  // Suljetaan selain
  await browser.close();

  // Tallennetaan tekstisisällöt tekstitiedostoon
  fs.appendFile(
    "nikari-texts.txt",
    textContent.join("\n\n"),
    "utf-8",
    (err) => {
      if (err) throw err;
      console.log('Tekstit tallennettu tiedostoon "nikari-texts.txt".');
    },
  );
}

scrapeText().catch(console.error);
