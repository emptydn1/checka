// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const _getAllFilesFromFolder = (dir) => {
    let results = [];
    // console.log(fs.readdirSync(dir));
    fs.readdirSync(dir)
        .sort((a, b) => +a.match(/^\d+/gm)[0] - +b.match(/^\d+/gm)[0])
        .forEach((file) => {
            if (file === "node_modules") return;
            let pathNameFile = path.join(dir, file);
            const stat = fs.statSync(pathNameFile);

            if (stat && stat.isDirectory())
                results = results.concat(_getAllFilesFromFolder(pathNameFile));
            else results.push(pathNameFile);
        });
    return results;
};

const getAllFromFolder = async (dir) => {
    let results = [];
    // console.log(fs.readdirSync(dir));
    fs.readdirSync(dir)
        .sort((a, b) => +a.match(/^\d+/gm)[0] - +b.match(/^\d+/gm)[0])
        .forEach((file) => {
            if (file === "node_modules") return;
            let pathNameFile = path.join(dir, file);
            const stat = fs.statSync(pathNameFile);

            if (stat && stat.isDirectory()) {
                results = results.concat(_getAllFilesFromFolder(pathNameFile));
            } else {
                results.push(file);
            }
        });
    return { results };
};

(async () => {
    const rootFolder = path.join(
        __dirname,
        "React and Typescript_ Build a Portfolio Project"
    );
    let { results } = await getAllFromFolder(rootFolder);
    // let results = [];
    let mp4File = results.filter((e) => /.mp4$/g.test(e));
    let txtFile = results.filter((e) => /.txt$/g.test(e));

    console.log(mp4File, txtFile, mp4File.length, txtFile.length);

    const browser = await puppeteer.launch({
        headless: false,
        executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        args: ["--remote-debugging-port=9222"],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    //load cookies
    const cookiesString = fs.readFileSync("./cookies.json");
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    await page.goto(
        "https://studio.youtube.com/channel/UC-Op6E-hbL4gOasjD0jkMoA/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D",
        {
            waitUntil: "networkidle2",
        }
    );
    // await page.waitForNavigation({ waitUntil: "networkidle2" });
    // await page.waitForTimeout(10000);
    let valFile = 0;

    try {
        // for (let i = 0; i < mp4File.length; i++) {
        for (let i = 36; i < 90; i++) {
            console.log(mp4File[i], i);
            valFile = i;
            console.log(valFile);
            await page.click("#create-icon");
            await page.waitForTimeout(2000);
            await page.click("#text-item-0");
            await page.waitForTimeout(2000);

            await page
                .waitForSelector("#content > input[type=file]")
                .then((e) => e.uploadFile(mp4File[i]));
            await page.waitForTimeout(5000);
            await page
                .waitForSelector(
                    "#basics > div:nth-child(7) > div.compact-row.style-scope.ytcp-video-metadata-editor-basics > div:nth-child(1) > ytcp-video-metadata-playlists > ytcp-text-dropdown-trigger > ytcp-dropdown-trigger > div > div.right-container.style-scope.ytcp-dropdown-trigger > tp-yt-iron-icon"
                )
                .then((e) => e.click());
            await page
                .waitForSelector("#items > ytcp-ve:nth-child(2) > li > label")
                .then((e) => e.click());
            await page
                .waitForSelector("#html-body > tp-yt-iron-overlay-backdrop")
                .then((e) => e.click());
            await page
                .waitForSelector("#radioContainer")
                .then((e) => e.click());
            await page.waitForSelector("#next-button").then((e) => e.click());

            // // subtitle
            await page
                .waitForSelector("#subtitles-button > div")
                .then((e) => e.click());
            await page
                .waitForSelector("#choose-upload-file")
                .then((e) => e.click());
            // await page.waitForTimeout(20000);
            await page
                .waitForSelector(
                    "#file-type > tp-yt-paper-radio-button:nth-child(2)"
                )
                .then((e) => e.click());
            await page
                .waitForSelector("#captions-file-loader")
                .then((e) => e.uploadFile(txtFile[i]));
            await page.waitForTimeout(5000);
            await page.click("#publish-button");
            // // end subtitle

            await page.waitForTimeout(2000);
            await page.click("#next-button");
            await page.waitForTimeout(2000);
            await page.click("#next-button");
            await page.waitForTimeout(5000);
            await page
                .waitForSelector(
                    "#privacy-radios > tp-yt-paper-radio-button:nth-child(19)"
                )
                .then((e) => e.click());
            await page.waitForTimeout(2000);
            await page.waitForSelector("#done-button").then((e) => e.click());
            await page.waitForTimeout(3000);
            await page
                .waitForSelector("#close-button > div")
                .then((e) => e.click());
        }
    } catch (e) {
        console.log("error", valFile);
        await page.waitForTimeout(20000);
    }
    ////////////////////////////////////////////////////////////////////////////
    // https://codepen.io/farnous/pen/KKZzPBO
    // await page.goto("https://codepen.io/farnous/pen/KKZzPBO");
    // const iframeHandle = await page.$("#result");
    // let frame = await iframeHandle.contentFrame();
    // let elementHandle = await frame.waitForSelector("#logo");

    // const filePath = path.join(__dirname, "1.jpg");
    // await elementHandle.uploadFile(filePath);

    // await browser.close();
})();
