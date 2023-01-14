# <h1> Login App </h1>

## Tech Stack

**Client:** CSS, EJS

**Server:** Node, Express, MongoDB, PassPort

<h2>Using Packages</h2>
<ul>
<li>express</li>
<li>ejs</li>
<li>mongoose</li>
<li>morgan</li>
<li>helmet</li>
<li>passport</li>
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

`GOOGLE_CLIENT_ID = your google api id`

`GOOGLE_CLIENT_SECRET = your google client secret`
Start the server

```bash
  npm start
```
