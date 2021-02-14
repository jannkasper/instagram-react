import {getPage} from "../utils/session.js";
import delay from "delay";
import axios from "axios";


export const userContent = async (req, res) => {
    const username1 = req.params.username;
    const page = getPage()

    console.log("4\tEnter selected profile")
    await page.goto(`https://www.instagram.com/${username1}`);
    // await getPage().screenshot({path: `public/${Date.now()}.png`});

    // check username exists or not exists
    let isUsernameNotFound = await page.evaluate(() => {
        // check selector exists
        if(document.getElementsByTagName('h2')[0]) {
            // check selector text content
            if(document.getElementsByTagName('h2')[0].textContent == "Sorry, this page isn't available.") {
                return true;
            }
        }
    });

    if(isUsernameNotFound) {
        console.log('Account not exists!');

        // close browser
        return res.status(200).json({hasError: true, message: 'Account not exists!'});
    }

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
        await delay(1000);
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

    const cleanData = transformUserData(sharedData);

    cleanData.storiesArray = storiesArray;


    return res.status(200).json(cleanData);

}


const transformUserData = (fetchData) => {

    const userData = {
        id: fetchData.id,
        username: fetchData.username,
        isVerified: fetchData.is_verified,
        userImageUrl: fetchData.profile_pic_url,
        postCount: fetchData.edge_owner_to_timeline_media?.count,
        followersCount: fetchData.edge_followed_by?.count,
        followingsCount: fetchData.edge_follow?.count,
        name: fetchData.full_name,
        bio: fetchData.biography,
        bioUrl: fetchData.external_url_linkshimmed,
        bioUrlName: fetchData.external_url,
        isPrivate: fetchData.is_private,
    };
    if (fetchData.edge_mutual_followed_by && fetchData.edge_mutual_followed_by.count) {
        userData.mutualFollow = {
            count: fetchData.edge_mutual_followed_by.count,
            usernameArray: fetchData.edge_mutual_followed_by.edges.map(element => element.node.username)
        }
    }

    userData.timelineMedia = transformMediaData(fetchData.edge_owner_to_timeline_media);
    return userData;
}

const transformMediaData = (fetchData) => {

    const mediaArray = [];

    for (let edge of fetchData.edges) {
        edge = edge.node;

        const mediaData = {
            postId: edge.shortcode,
            likeCount: edge.edge_liked_by?.count,
            commentCount: edge.edge_media_to_comment?.count,
            isVideo: edge.is_video,
            thumbnailArray : edge.thumbnail_resources
        }

        mediaArray.push(mediaData)
    }

    return {
        mediaArray: mediaArray,
        pageInfo: {
            hasNextPage: fetchData.page_info?.has_next_page,
            endCursor: fetchData.page_info?.end_cursor,
        }
    }

}

const url = 'https://instagram.com/graphql/query/';

export const nextPageContent = async (req, res) => {
    const { userId, first, endCursor} = req.query;

    const { data } = await axios.get(url, {
        params: {
            query_id: '17888483320059182',
            id: userId,
            first: first,
            after: endCursor
        }
    });

    if (data?.data?.user?.edge_owner_to_timeline_media) {
        const result = transformMediaData(data.data.user.edge_owner_to_timeline_media);
        return res.status(200).json(result);
    }

    return res.status(200);

}