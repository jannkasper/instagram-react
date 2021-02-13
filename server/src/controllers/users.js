import {getPage} from "../utils/session.js";


export const userContent = async (req, res) => {
    const username1 = req.params.username;
    const page = getPage()

    console.log("4\tEnter selected profile")
    await page.goto(`https://www.instagram.com/${username1}`);
    // await getPage().screenshot({path: `public/${Date.now()}.png`});

    // // check username exists or not exists
    // let isUsernameNotFound = await page.evaluate(() => {
    //     // check selector exists
    //     if(document.getElementsByTagName('h2')[0]) {
    //         // check selector text content
    //         if(document.getElementsByTagName('h2')[0].textContent == "Sorry, this page isn't available.") {
    //             return true;
    //         }
    //     }
    // });
    //
    // if(isUsernameNotFound) {
    //     console.log('Account not exists!');
    //
    //     // close browser
    //     return res.status(200).json({hasError: true, message: 'Account not exists!'});
    // }
    //
    // // get username
    // let username = await page.evaluate(() => {
    //     return document.querySelectorAll('header > section > div > h2')[0].textContent;
    // });
    //
    // // check the account is verified or not
    // let isVerifiedAccount = await page.evaluate(() => {
    //     // check selector exists
    //     if(document.getElementsByClassName('coreSpriteVerifiedBadge')[0]) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });
    //
    // // get username picture URL
    // let usernamePictureUrl = await page.evaluate(() => {
    //     return document.querySelectorAll('header img')[0].getAttribute('src');
    // });
    //
    // // get number of total posts
    // let postsCount = await page.evaluate(() => {
    //     return document.querySelectorAll('header > section > ul > li span')[0].textContent.replace(/\,/g, '');
    // });
    //
    // // get number of total followers
    // let followersCount = await page.evaluate(() => {
    //     return document.querySelectorAll('header > section > ul > li a span')[0].getAttribute('title').replace(/\,/g, '');
    // });
    //
    // // get number of total followings
    // let followingsCount = await page.evaluate(() => {
    //     return document.querySelectorAll('header > section > ul > li a span')[1].textContent.replace(/\,/g, '');
    // });
    //
    // // get bio name
    // let name = await page.evaluate(() => {
    //     // check selector exists
    //     if(document.querySelectorAll('header > section h1')[0]) {
    //         return document.querySelectorAll('header > section h1')[0].textContent;
    //     } else {
    //         return '';
    //     }
    // });
    //
    // // get bio description
    // let bio = await page.evaluate(() => {
    //     if(document.querySelectorAll('header > section > div')[1].querySelectorAll('span')[0]) {
    //         return document.querySelectorAll('header > section > div')[1].querySelectorAll('span')[0].textContent;
    //     } else {
    //         return '';
    //     }
    // });
    //
    // // get bio URL
    // let bioUrl = await page.evaluate(() => {
    //     // check selector exists
    //     if(document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0]) {
    //         return document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0].getAttribute('href');
    //     } else {
    //         return '';
    //     }
    // });
    //
    // // get bio display
    // let bioUrlDisplay = await page.evaluate(() => {
    //     // check selector exists
    //     if(document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0]) {
    //         return document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0].textContent;
    //     } else {
    //         return '';
    //     }
    // });
    //
    // // check if account is private or not
    // let isPrivateAccount = await page.evaluate(() => {
    //     // check selector exists
    //     if(document.getElementsByTagName('h2')[0]) {
    //         // check selector text content
    //         if(document.getElementsByTagName('h2')[0].textContent == 'This Account is Private') {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         return false;
    //     }
    // });
    //
    // // get recent posts (array of url and photo)
    // let recentPosts = await page.evaluate(() => {
    //     let results = [];
    //
    //     // loop on recent posts selector
    //     document.querySelectorAll('div[style*="flex-direction"] div > a').forEach((el) => {
    //         // init the post object (for recent posts)
    //         let post = {};
    //
    //         // fill the post object with URL and photo data
    //         post.url = 'https://www.instagram.com' + el.getAttribute('href');
    //         post.photo = el.querySelector('img').getAttribute('src');
    //
    //         // add the object to results array (by push operation)
    //         results.push(post);
    //     });
    //
    //     // recentPosts will contains data from results
    //     return results;
    // });
    //
    // // display the result to console
    // const user = {'username': username,
    //     'is_verified_account': isVerifiedAccount,
    //     'username_picture_url': usernamePictureUrl,
    //     'posts_count': postsCount,
    //     'followers_count': followersCount,
    //     'followings_count': followingsCount,
    //     'name': name,
    //     'bio': bio,
    //     'bio_url': bioUrl,
    //     'bio_url_display': bioUrlDisplay,
    //     'is_private_account': isPrivateAccount,
    //     'recent_posts': recentPosts};


    let sharedData = await page.evaluate(() => {
        return window._sharedData.entry_data.ProfilePage[0].graphql.user;
    });

    return res.status(200).json(sharedData);

}