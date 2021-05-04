import delay from "delay";

const outdatedValidationUserExist = async (page) => {
    // check username exists or not exists
    const isUsernameNotFound = await page.evaluate(() => {
        // check selector exists
        if(document.getElementsByTagName('h2')[0]) {
            // check selector text content
            if(document.getElementsByTagName('h2')[0].textContent == "Sorry, this page isn't available.") {
                return false;
            }
            return true;
        }
    });
    return isUsernameNotFound
}

const outdatedFetchUserStories = async (page) => {
    // check if will contain stories
    let hasStories = await page.evaluate(async () => {
        // return document.querySelectorAll('header > section > div > h2')[0].innerHTML;
        if(document.querySelector('div[role="presentation"]')) {
            return  true;
        }
        return false;
    });

    // wait and get stories
    let storiesArray = [];
    if (hasStories) {
        await delay(1500);
        // get username picture URL
        storiesArray = await page.evaluate(async () => {
            return [...document
                .querySelector('div[role="presentation"]')
                .querySelectorAll('ul > li')]
                .filter(el => el.querySelector('img'))
                .map(el => {
                    return {
                        src: el.querySelector('img').getAttribute('src'),
                        title: el.querySelector('img').parentNode.parentNode.nextSibling.innerHTML
                    }
                })
        });
    }

    return storiesArray;
}

const outdatedFetchUserData = async (page) => {

    // get username
    let username = await page.evaluate(() => {
        return document.querySelectorAll('header > section > div > h2')[0].textContent;
    });

    // check the account is verified or not
    let isVerifiedAccount = await page.evaluate(() => {
        // check selector exists
        if(document.getElementsByClassName('coreSpriteVerifiedBadge')[0]) {
            return true;
        } else {
            return false;
        }
    });

    // get username picture URL
    let usernamePictureUrl = await page.evaluate(() => {
        return document.querySelectorAll('header img')[0].getAttribute('src');
    });

    // get number of total posts
    let postsCount = await page.evaluate(() => {
        return document.querySelectorAll('header > section > ul > li span')[0].textContent.replaceAll(/\,/g, '');
    });

    // get number of total followers
    let followersCount = await page.evaluate(() => {
        return document.querySelectorAll('header > section > ul > li a span')[0].getAttribute('title').replaceAll(/\,/g, '');
    });

    // get number of total followings
    let followingsCount = await page.evaluate(() => {
        return document.querySelectorAll('header > section > ul > li a span')[1].textContent.replaceAll(/\,/g, '');
    });

    // get bio name
    let name = await page.evaluate(() => {
        // check selector exists
        if(document.querySelectorAll('header > section h1')[0]) {
            return document.querySelectorAll('header > section h1')[0].textContent;
        } else {
            return '';
        }
    });

    // get bio description
    let bio = await page.evaluate(() => {
        if(document.querySelectorAll('header > section > div')[1].querySelectorAll('span')[0]) {
            return document.querySelectorAll('header > section > div')[1].querySelectorAll('span')[0].textContent;
        } else {
            return '';
        }
    });

    // get bio URL
    let bioUrl = await page.evaluate(() => {
        // check selector exists
        if(document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0]) {
            return document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0].getAttribute('href');
        } else {
            return '';
        }
    });

    // get bio display
    let bioUrlDisplay = await page.evaluate(() => {
        // check selector exists
        if(document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0]) {
            return document.querySelectorAll('header > section > div')[1].querySelectorAll('a')[0].textContent;
        } else {
            return '';
        }
    });

    // check if account is private or not
    let isPrivateAccount = await page.evaluate(() => {
        // check selector exists
        if(document.getElementsByTagName('h2')[0]) {
            // check selector text content
            if(document.getElementsByTagName('h2')[0].textContent == 'This Account is Private') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });

    // get recent posts (array of url and photo)
    let recentPosts = await page.evaluate(() => {
        let results = [];

        // loop on recent posts selector
        document.querySelectorAll('div[style*="flex-direction"] div > a').forEach((el) => {
            // init the post object (for recent posts)
            let post = {};

            // fill the post object with URL and photo data
            post.url = 'https://www.instagram.com' + el.getAttribute('href');
            post.photo = el.querySelector('img').getAttribute('src');

            // add the object to results array (by push operation)
            results.push(post);
        });

        // recentPosts will contains data from results
        return results;
    });

    return {
        username: username,
        name: name,
        userImageUrl: usernamePictureUrl,

        bio: bio,
        bioUrl: bioUrl,
        bioUrlName: bioUrlDisplay,

        postCount: postsCount,
        followersCount: followersCount,
        followingsCount: followingsCount,

        isVerified: isVerifiedAccount,
        isPrivate: isPrivateAccount,

        recentPosts: recentPosts
    }
}
