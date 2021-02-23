import delay from "delay";
import axios from "axios";
import {getPage, startBrowser} from "../utils/session.js";
import { transformMediaData } from "./posts.js";

const config = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
        'cache-control': 'max-age=0',
        'cookie': 'ig_cb=2; ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; shbts=1613798901.7801588; rur=FRC; ig_lang=en; csrftoken=9gEpsDgAROJLNkg2wXSA6SBHuSg65vh3; ds_user_id=46117109912; sessionid=46117109912%3APyjQy074GtUNKP%3A16; fbsr_124024574287414=MMuAHLzlpG2NEwV10fNy8UstuBJwEugDzU8olG_-h_c.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRREZsRTZKS1FnRmtMQldESFpCME82Vk5wQ2xVUmRqMThEUjk4dE4yMGJPLXo1NV9wNjB3cmhhUVNsbWlyakdHNXF4UTV4d1FFNTN0Z1NHeW9VTkd4VUwzOWU5N1ZVTVdsQ0R1VGdBNEQyMWJiMlU2TFJ4RHFjSm5nOE83cmRQa0lwc0U2d0FMaUFlWVV0WkxfU2V0THVZV25tcWRIc2JaVUZKcFJldDR0blVNWE1zQWdNc2lwN1NBSkhleWt4cDBnRTY3bVVzcFdXLXFCRE1uMFJFbmVYQ3ZUYTJWajFqTmtqSFBZbEhicXpVcHgwbGpicWxYOVBVWjJkVFRZVTA0WGpjaTh1Qjl6QUNVbko1cUxRYWVPV1doQjRHNV9KdlVsb0hzU1hHdGkyTk02eUV5QjAxU2tOS3R2RGRPWjBmY25mcjU3M054d2dSb1VQMjE4TnZ5TVlUIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUtkNDFaQ2tvRlRaQVQ3WFUzV2FXMlpCY1pBV2VybXllYXVLWWlFaDIyTm4wSkNmZFl4Um9WYjFFc0xUdjBvZFZMdnJFR3BEbWFaQzJDUDc0T05uRm1vazZSR05HT2d1MHFTcWJMb3VMWVB5cjVUS1J1QXR3M3YyVEMxT25EUFJoZlBvdUFHaWV4b01HT1djZUs3YVBDczM3N0VlZklibktiRkkwQnhOVSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE0MDY0MzM3fQ',
        'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    }
}

export const userContent = async (req, res) => {
    const username1 = req.params.username;
    // const page = getPage()
    // const {page} = await startBrowser();
    //
    // console.log("*\tOpen user in browser\t*")
    // await page.goto(`https://www.instagram.com/${username1}`, { waitUntil: 'networkidle0' });
    //
    // const userExists = await validationUserExist(page);
    // if(!userExists) {
    //     console.log("*\tUsername doesn't exist\t*")
    //     return res.status(200).json({hasError: true, message: 'Account not exists!'});
    // }
    //
    // let sharedData = await page.evaluate(() => {
    //     return window._sharedData.entry_data.ProfilePage[0].graphql.user;
    // });

    const sharedData = await axios.get(`https://www.instagram.com/${username1}`, config)
        .then(function (response) {
            // handle success
            let jsonObject = response.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/);
            if (jsonObject) {
                jsonObject = jsonObject[1].slice(0, -1);
                const userInfo = JSON.parse(jsonObject)
                return userInfo.entry_data.ProfilePage[0].graphql.user
            }
            console.log(jsonObject)
            return null
        })

    if (sharedData == null) {
        return res.status(200).json(null);
    }
    // const cleanData = oldFetchUserData(page);
    const cleanData = convertUserData(sharedData);

    if (!cleanData.isPrivate) {
        // cleanData.storiesArray = fetchUserStories(page);
        cleanData.timelineMedia = transformMediaData(sharedData.edge_owner_to_timeline_media);
    }

    return res.status(200).json(cleanData);

}

const validationUserExist = async (page) => {
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

const fetchUserStories = async (page) => {
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

const convertUserData = (fetchData) => {

    const userData = {
        id: fetchData.id,
        username: fetchData.username,
        name: fetchData.full_name,
        userImageUrl: fetchData.profile_pic_url,

        bio: fetchData.biography,
        bioUrl: fetchData.external_url_linkshimmed,
        bioUrlName: fetchData.external_url,

        postCount: fetchData.edge_owner_to_timeline_media.count,
        followersCount: fetchData.edge_followed_by.count,
        followingsCount: fetchData.edge_follow.count,

        isVerified: fetchData.is_verified,
        isPrivate: fetchData.is_private,

        mutualFollow: {
            count: fetchData.edge_mutual_followed_by.count,
            usernameArray: fetchData.edge_mutual_followed_by.edges.map(element => element.node.username)
        }
    };

    return userData;
}

const API_URL = 'https://instagram.com/graphql/query/';

export const nextPageContent = async (req, res) => {
    const { userId, first, endCursor} = req.query;

    console.log("START FETCH POSTS")
    // const config = {
    //     params: {
    //         query_id: '17888483320059182',
    //         id: userId,
    //         first: first,
    //         after: endCursor
    //     },
    //     withCredentials: true,
    //     headers: {
    //         'X-CSRF-TOKEN': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //         'csrf-token': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //         'csrftoken': '345Kulb8w9jSD0yhKdJ8brA17sVR8qnY',
    //         Cookie: {
    //             'X-CSRF-TOKEN': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //             'csrf-token': "345Kulb8w9jSD0yhKdJ8brA17sVR8qnY",
    //             'csrftoken': '345Kulb8w9jSD0yhKdJ8brA17sVR8qnY'
    //         }
    //     }
    // };
    // console.log(`https://instagram.com/graphql/query/?query_id=17888483320059182&id=${userId}&first=${first}&after=${endCursor}`)
    const url = 'https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables=';
    const params = `{"id":"${userId}","first":${first},"after":"${endCursor}"}`
    const transformParams = params.replace(',', '%2C')
        .replace('{', '%7B')
        .replace('}', '%7D')
        .replace(':', '%3A')
        .replace('"', '%22')
        .replace('=', '%3D');
    const data = await axios.get(url + transformParams, config)
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    console.log(data)
    console.log("FINISH FETCH POSTS")
    if (data?.data?.user?.edge_owner_to_timeline_media) {
        console.log("TRANSFORM POSTS")
        const result = transformMediaData(data.data.user.edge_owner_to_timeline_media);
        return res.status(200).json(result);
    }
    console.log("EMPTY POSTS")
    return res.status(200).json();

}


const oldFetchUserData = async (page) => {

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
        return document.querySelectorAll('header > section > ul > li span')[0].textContent.replace(/\,/g, '');
    });

    // get number of total followers
    let followersCount = await page.evaluate(() => {
        return document.querySelectorAll('header > section > ul > li a span')[0].getAttribute('title').replace(/\,/g, '');
    });

    // get number of total followings
    let followingsCount = await page.evaluate(() => {
        return document.querySelectorAll('header > section > ul > li a span')[1].textContent.replace(/\,/g, '');
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