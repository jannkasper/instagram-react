import dotenv from 'dotenv'
dotenv.config();

const config = {
    instagramCookie: process.env.INSTAGRAM_COOKIE || '',
    port: process.env.PORT || 3005,
    protocol: process.env.PROTOCOL || 'http',
    instagramCredentials: {
        username: process.env.INSTA_USERNAME || '',
        password: process.env.INSTA_PASSWORD || ''
    },
};

export default config
