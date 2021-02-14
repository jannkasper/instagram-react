import puppeteer from "puppeteer";
import delay from "delay";
import config from "../config.js";
import {saveCookies, setCookies} from "./cookies.js";

const USERNAME_SELECTOR = 'input[name="username"]';
const PASSWORD_SELECTOR = 'input[name="password"]';
const CTA_SELECTOR = 'button[type="submit"]';

let page = null;
export const getPage = () => page;

async function startBrowser() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--window-size=1920,1080',
            '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"'
        ]
    });
    // const context = await browser.createIncognitoBrowserContext();
    page = await browser.newPage();
    await page.setViewport({width: 1680, height: 938});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    page.on('console', consoleObj => console.log(consoleObj.text()));
    await setCookies(page);

    return {browser, page};
}

async function closeBrowser(browser) {
    return browser.close();
}

export async function startSession(url) {
    const {browser, page} = await startBrowser();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // await delay(300)
    console.log("1\tEnter login page")
    const [button] = await page.$x("//button[contains(., 'Accept')]");
    if (button) {
        await button.click();
    }
    const isLoginPage = await page.waitForSelector(USERNAME_SELECTOR, { timeout: 1000 }).then(() => {
        return true;
    }).catch(e => {
        return false;
    });
    if (isLoginPage) {
        console.log("2\tStart typing credentials")
        await page.type(USERNAME_SELECTOR, config.instagramCredentials.username);
        await page.type(PASSWORD_SELECTOR, config.instagramCredentials.password);
        console.log("2a\tSubmit credentials")
        await Promise.all([
            page.click(CTA_SELECTOR),
            page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);

        await saveCookies(page);
    }
    console.log("3\tSession ready")
    const [notificationButton] = await page.$x("//button[contains(., 'Not Now')]");
    if (notificationButton) {
        console.log("3a\tReject notification access")
        await notificationButton.click()
    }

    return page;
}