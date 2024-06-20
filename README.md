# Nomad Clone

Nomad Clone is a web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, log in, and view a list of cities sorted by popularity. When a user hovers over or clicks on a city, more information about various categories is displayed.

## Features

- `User Registration:` Secure registration with hashed passwords.
- `User Login:` Secure authentication for logging in.
- `Home Page:` Displays a list of cities sorted by rank.
- `City Details:` Detailed information about cities on hover or click.
- `Responsive Design:` Optimized for various devices and screen sizes.
- `Interactive UI:` Smooth transitions and user-friendly interactions.

### Nomad Signup

![screenshot of Signup](https://github.com/Arie139/Nomad-Clone/blob/main/server/images/signup.png?raw=true)

### Home Page

![screenshot of Home Page](https://github.com/Arie139/Nomad-Clone/blob/main/server/images/home_page.png?raw=true)

### Overview

![screenshot of Overview](https://github.com/Arie139/Nomad-Clone/blob/main/server/images/overview.png?raw=true)

### Scores

![screenshot of Scores](https://github.com/Arie139/Nomad-Clone/blob/main/server/images/scores.png?raw=true)

### Pros and Cons

![screenshot of Pros and Cons](https://github.com/Arie139/Nomad-Clone/blob/main/server/images/pro_con.png?raw=true)

## Stack

- `MongoDB:` Database to store user and city data.
- `Express:` Backend framework for building the REST API.
- `React:` Frontend library for building user interfaces.
- `Node.js:` JavaScript runtime for server-side development.
- `Redux:` State management for handling complex application states.
- `bcrypt:` For hashing passwords to ensure user data security.
- `JWT:` JSON Web Tokens for secure user authentication.

## Setup

- Node -v `v20.14.0`
- Install dependencies with `npm install`.
- Create a `.env` file in the `server directory with the following content:
  1. `MONGO_URL`
  2. `TOKEN_KEY`
  3. `PORT`
- npm start to run the app at http://localhost:3000/
- Fetch data from Mongodb at http://localhost:3001/
