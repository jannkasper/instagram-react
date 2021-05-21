## Instagram Clone
- Live: https://instagram-jannkasper.vercel.app/ (be patient, server is sleeping)

[![Product Name Screen Shot][product-screenshot]](https://github.com/jannkasper/instagram-react/blob/master/video.gif)

## :rocket: Tech Stack

- ReactJs
- Next
- Axios
- NodeJs
- Puppeteer
- Express
- Testing Library
- Jest

## :warning: Prerequisite

- node
- npm

## :cd: How to run local

```bash
# Clone this repository
$ git clone https://github.com/jannkasper/instagram-react

# Go into server
$ cd instagram-react/server

# Create configuration file (instruction below)
$ echo 'INSTAGRAM_COOKIE=<your-cookie>' > .env

# Install dependencies
$ npm install

# Start the backend server
$ npm run dev

# On another terminal, go to the client folder
$ cd instagram-react/client

# Create configuration file
$ echo 'SITE_NAME=<server-host>' > .env

# Install dependencies
$ npm install

# Start the frontend client
$ npm run start
```
Find your-cookie: Login to Instagram > DevTools (F12) > Network > Any Request -> Request Headers > cookie: <your-cookie>

## :mag_right: Testing

```bash
$ cd instagram-react/server
$ npm run test
$
$ cd ../client
$ npm run test
```

## :globe_with_meridians: Deploy

#### Deploying Server App on Heroku
- Login to Instagram > DevTools (F12) > Network > Any Request -> Request Headers > cookie: <your-cookie>
- Create a [Heroku](https://dashboard.heroku.com/new-app) new app.
- Go to app settings
- Add the following enviroments.
    - INSTAGRAM_COOKIE (to use your Instagram connection)
- Add Nodejs to buildpacks

-
      # Go into the repository
      $ cd instagram-react

      # Heroku Setup
      $ npm install -g heroku
      $ heroku login
      $ heroku git:remote -a your-app-name

      # push subdirectory repository with subtree
      $ git subtree push --prefix server heroku master

#### Deploying Client App on Vercel

- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fjannkasper%2Fwhatsapp-react-clone&env=SITE_NAME)
- Select client directory
- Add heroku api url to SITE_NAME enviorement
- Finally deploy client application


## :book: Directory Structure

```
├── app/
│   ├── client/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── __tests__/
│   │   │   ├── actions/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── img/
│   │   │   ├── reducers/
│   │   │   ├── store/
│   │   │   ├── util/
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   └── setupTests.js
│   │   │
│   │   ├── .env
│   │   ├── jest.config.js
│   │   └── package.json
│   │
│   ├── server/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── mappers/
│   │   │   ├── scrappings/
│   │   │   ├── utils/
│   │   │   ├── app.js
│   │   │   ├── config.js
│   │   │   ├── routes.js
│   │   │   └── server.js
│   │   │
│   │   ├── tests/
│   │   ├── .babelrc
│   │   ├── .env
│   │   └── package.json
│   │
```

## :memo: License

This project is made available under the MIT License.





<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: video.gif
