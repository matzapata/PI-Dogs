const serverless = require("serverless-http");
const router = require("../src/routes/index");
const app = require( "../src/app");

app.use("/.netlify/functions/api", router); // path must route to lambda

module.exports.handler = serverless(app);
