# PI-dogs

Individual project created for Henry bootcamp making use of <a href="https://thedogapi.com/">the dog api</a> and the following technologies: 

- React
- Redux
- Express
- Sequelize - Postgres
- Jest and mocha for testing the api and client
- Tailwindcss (with responsive design)

The deployment has been made with netlify for both, backend and frontend with ElephantSQL for the database. The link can be found here: https://pi-dogs-zapata.netlify.app

## Run this project locally

1. Clone repository `git clone https://github.com/matzapata/PI-Dogs.git`

2. Install dependencies in both `client` and `api` with `npm install`

3. Create a postgres database locally with `psql` shell using the `create database dogs;` command.

4. Copy both `.env.example` from `api` and `client` to `.env` and load your values.

5. Start the backend by running `npm run dev` in the `api` folder.

6. Start the frontend by running `npm run start` in the `client` folder.

7. That's it!!

## Project screenshots

Checkout all <a href="https://github.com/matzapata/PI-Dogs/tree/master/screenshots">screenshots</a> at the `screenshots` folder.

![Landing](/screenshots/landing.png)