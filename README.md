# <h1> Login App </h1>

## Demo

https://oauth-h3cg.onrender.com

## Tech Stack

**Client:** CSS, EJS

**Server:** Node, Express, MongoDB, PassPort JS

<h2>Using Packages</h2>
<ul>
<li>express</li>
<li>bcryptjs</li>
<li>ejs</li>
<li>cors</li>
<li>mongoose</li>
<li>morgan</li>
<li>helmet</li>
<li>cookie-parser</li>
<li>cookie-session</li>
<li>jsonwebtoken</li>
<li>passport</li>
<li>passport-github2</li>
<li>passport-google-oauth20</li>
<li>express-session</li>
</ul>

## Run Locally

Clone the project

```bash
  git clone https://github.com/who-0/Oauth.git
```

Go to the project directory

```bash
  cd Oauth
```

Install dependencies

```bash
  npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=3000`

`MONGO_URL ="mongodb+srv://nasa-api:kmd123@nasacluster.uvu3kll.mongodb.net/oauth?retryWrites=true&w=majority"`

`COOKIE_KEY_1 = oauth_app`

`COOKIE_KEY_R = Oauth_app_R`

`GOOGLE_CLIENT_ID = Your google clinet id`

`GOOGLE_CLIENT_SECRET = Your google clinet secret`

`GITHUB_CLIENT_ID = Your github clinet id`

`GITHUB_CLIENT_SECRET = Your github clinet secret`

```bash
  npm start
```

# File Structre

## Front_End

<pre>
  -public
    |__css
    |   |__error.css
    |   |__home.css
    |   |__login.css
    |   |__profile.css
    |   |__signup.css
    |
    |__img
        |__error.svg
        |__github.svg
        |__google.svg
        |__user.png

  -views
    |__cookie.ejs
    |__error.ejs
    |__home.ejs
    |__login.ejs
    |__privacy.ejs
    |__profile.ejs
    |__signup.ejs
</pre>

## Back_End

<pre>
  -src
    |__app.js
    |__server.js
    |__config
    |   |__.env
    |   |__github.passport.js
    |   |__google.passport.js
    |   |__mongodb.js
    |
    |__controllers
    |   |__auth.controller.js
    |   |__home.controller.js
    |   |__profile.controller.js
    |
    |__middlewares
    |   |__verify.middleware.js
    |
    |__models
    |   |__users.model.js
    |   |__users.mongo.js
    |
    |__routes
        |__api.js
        |__auth.router.js
        |__home.router.js
        |__profile.router.js


</pre>

# Oauth App UI Design

## Oauth App Login Page

![login page](https://user-images.githubusercontent.com/56252622/215082157-3503a30f-fe6a-478e-9458-6e065fa90a44.png)

## Oauth App Signup Page

![signup page](https://user-images.githubusercontent.com/56252622/215082751-0831f847-4e53-4513-9bfc-7d87bacf71cd.png)

## Oauth App Home Page

![home page](https://user-images.githubusercontent.com/56252622/215083125-43130c34-95d2-4c25-9c5c-e0edc7a7a0ba.png)

## Oauth App Profile Page

![profile page](https://user-images.githubusercontent.com/56252622/215083459-dfacab95-34ee-4b5e-98cb-0fb6419ed34e.png)
