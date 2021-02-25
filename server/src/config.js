import dotenv from 'dotenv'
dotenv.config();

const config = {
    port: process.env.PORT || 3005,
    protocol: process.env.PROTOCOL || 'http',
    cookiesFilePath: process.env.COOKIE_FILE_PATH || 'cookies.json',
    cookieString: process.env.COOKIE_JSON || '',
    instagramCredentials: {
        username: process.env.INSTA_USERNAME || '',
        password: process.env.INSTA_PASSWORD || ''
    },
    requestConfig: {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'pl,en-US;q=0.9,en;q=0.8,nl;q=0.7,nb;q=0.6',
            'cache-control': 'max-age=0',
            'cookie': 'ig_cb=2; ig_did=88BB498E-E955-405F-A830-3DB7BC47A8AE; mid=X-DhrwAEAAFWBn9a9lE9zRScjQRf; fbm_124024574287414=base_domain=.instagram.com; shbid=19194; datr=Ay8iYAsdTFJuw4kRnu92mOox; shbts=1613798901.7801588; rur=FRC; ig_lang=en; csrftoken=9gEpsDgAROJLNkg2wXSA6SBHuSg65vh3; ds_user_id=46117109912; sessionid=46117109912%3APyjQy074GtUNKP%3A16; fbsr_124024574287414=faidg1eK8ALtvpSirNS6vpF9WhbRkL851TPIqyzXu_k.eyJ1c2VyX2lkIjoiMTAwMDAxMTMyMjcxMzU5IiwiY29kZSI6IkFRQm5XcFBBRENVSy15bFBlU0RzeTM4Q3FJWTdtRFN1LVEzWEJUckdUODRZc2FnbDYyV2lMQzA0Q1B3NlRZeVRybkhpTVhXeC1FRmFKWmtJZkw4VVQxdkk5cS1Jdm85YmNYMnV1b3M0RVNsNkFPR0RuVFRoaGdQVkxjaFF4N1NCcWd2WU5tZ3VJUC12Z0NVNjJmNTNERFNURVNOS2ZHY3o3ZE1mX2NacWJmTUFRZEFiVy1kLTVncXlERnV5S1pDQXU4UFpyT2gtcm9VaWNIVjBTNXpNd190MG5VNWthVDhVREc4MWxzVWJJeHkxa2xwTU45VHRpQ3RzZTQ1RS1lOGRKdzh2MlA5d2lDRm5LTF9BWmZhLThfLXJuc3BKUUVHYVMwYmtqMTl0TVFkY1dFTndEUTdaTmxTTktFeHlaY21zZDQ2eXhCTk13UGh5aW1CRDlVbjk4dWliIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUNHdnZWVHlMT1FvTHh6d2ZQTzM5N0JUYUV5UmlHRkM1Rzc0N2VxVWJaQm9lb2U5MUFYOHVKdklQMVB2a3VHeHhuY01QeVZhTmRjZVlrc3g0eEhmN2NJbkRzOFJ1bDZQTmJOaUpkYUJWYXJaQXMxOGpObDhPRk9wRFhYbVBnckF4ZmF1Q1JnZXZiVXJoVnBaQlZqSWExU2NJcjZORFpDenBOeG1oWDd6IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTQxNTQzMTl9',
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
};

export default config