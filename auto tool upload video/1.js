const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async (url) => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
        deviceScaleFactor: 1,
    });
    // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    await page.goto(url, { timeout: 0 });
    await page.click(`[onclick="handleThemeModalClose()"]`, { delay: 50 });
    await page.waitForTimeout(1000);
    await page.type('input[name="tbLogin"]', "huy", { delay: 100 });
    await page.type('input[name="tbPassword"]', "huydz", { delay: 50 });

    await page.click(`[name="btnLogin"]`, { delay: 50 });
    await page.waitForTimeout(10000);

    // await page.type('input[id="ctl00_C1_ctl05_txtProductNamevi_I"]', "huydz", {
    //     delay: 50,
    // });

    let a = "Hoa Cuoi ";
    for (let i = 42; i <= 64; i++) {
        let temp = a + (i < 10 ? "0" + i : i);
        await page.click(`[onclick="ThemShops_ProductsNew()"]`);
        await page.waitForTimeout(5000);

        //handle select iframe
        let iframeHandle = await page.$("#ctl00_pop1_p1_CIF-1");
        let frame = await iframeHandle.contentFrame();
        let inputElement = await frame.waitForSelector(
            "#ctl00_C1_ctl05_txtProductNamevi_I"
        );
        await inputElement.type(`${temp}`);

        let inputElement2 = await frame.waitForSelector("#ctl00_C1_txtImage_I");
        await inputElement2.type(
            `UploadImages/shops/Hoa cuoi/hoa-cuoi-${i < 10 ? "0" + i : i}.jpg`
        );

        let inputElement3 = await frame.waitForSelector(
            `#ctl00_C1_txtShops_Sources_I`
        );
        await inputElement3.click();
        let inputElement4 = await frame.waitForSelector(
            "#ctl00_C1_txtShops_Sources_DDD_L_LBI1T0"
        );
        await inputElement4.click();

        let save = await frame.waitForSelector("#ctl00_C1_btnLuu_CD");
        await save.click();
        await page.waitForTimeout(3000);

        await page.click(`[onclick="ThongBaoStyles_Thoat()"]`, { delay: 50 });
        // const example = await page.evaluate(async () => {
        //     document.querySelector(`#ctl00_C1_ctl05_txtProductNamevi_I`).focus();
        // });
        // await browser.close();
    }
})("https://demo.shophoatuoidanang.com/portal/login.aspx");
