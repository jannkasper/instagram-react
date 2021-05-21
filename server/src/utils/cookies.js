import config from "../config.js";
import fs from "fs";

export async function setCookies(page) {
    const parsedCookies = JSON.parse(config.instagramCookie);
    if (parsedCookies.length !== 0) {
        for (let cookie of parsedCookies) {
            await page.setCookie(cookie)
        }
        console.log('Session has been loaded in the browser')
    }
    // const previousSession = fs.existsSync(config.cookiesFilePath)
    // if (previousSession) {
    //     // If file exist load the cookies
    //     const cookiesString = fs.readFileSync(config.cookiesFilePath);
    //     const parsedCookies = JSON.parse(cookiesString);
    //     if (parsedCookies.length !== 0) {
    //         for (let cookie of parsedCookies) {
    //             await page.setCookie(cookie)
    //         }
    //         console.log('Session has been loaded in the browser')
    //     }
    // }
}

export async function saveCookies(page) {
// Save Session Cookies
    const cookiesObject = await page.cookies()
// Write cookies to temp file to be used in other profile pages
    fs.writeFile(config.cookiesFilePath, JSON.stringify(cookiesObject),
        function(err) {
            if (err) {
                console.log('The file could not be written.', err)
            }
            console.log('Session has been successfully saved')
        })
}
