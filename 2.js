// const puppeteer = require("puppeteer");
// const fs = require("fs").promises;
// const sleep = (milliseconds) => {
//     return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         executablePath:
//             "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // because we are using puppeteer-core so we must define this option
//         args: ["--remote-debugging-port=9222"],
//     });
//     const page = await browser.newPage();
//     await page.goto("https://accounts.google.com/signin/v2/identifier", {
//         waitUntil: "networkidle2",
//     });

//     await page.type("#identifierId", "duyhuydn1");
//     await page.click("#identifierNext");

//     await page.waitForSelector("#password", {
//         visible: true,
//         hidden: false,
//     });
//     await page.type(
//         "#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input",
//         "YOUR_PASSWORD"
//     );
//     await sleep(1000);
//     await page.click("#passwordNext > div > button");

//     await sleep(10000);

//     //save cookies
//     const cookies = await page.cookies();
//     await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));

//     await browser.close();
// })();
const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const fs = require("fs").promises;
const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        args: ["--remote-debugging-port=9222"],
    });
    const page = await browser.newPage();

    await page.goto("https://www.youtube.com/", {
        waitUntil: "networkidle2",
    });
    await page.click("#buttons > ytd-button-renderer > a");
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    await page.type("#identifierId", "emptydn1");
    await page.click("#identifierNext");

    await page.waitForSelector("#password", {
        visible: true,
        hidden: false,
    });
    await page.type(
        "#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input",
        "huydn1996"
    );
    await sleep(1000);
    await page.click("#passwordNext > div > button");

    await sleep(5000);

    //save cookies
    const cookies = await page.cookies();
    await fs.writeFile("./cookies2.json", JSON.stringify(cookies, null, 2));

    await browser.close();
    // await browser.close();
})();
