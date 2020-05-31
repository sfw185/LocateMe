const http = require("http");
const url = require("url");
const pug = require("pug");

const redis = require("redis");
const redis_client = redis.createClient(process.env.REDIS_URL);

const { promisify } = require("util");
const getAsync = promisify(redis_client.get).bind(redis_client);
const setAsync = promisify(redis_client.set).bind(redis_client);

const LOCATION_KEY = "LOCATION";
const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  
  const params = new URL(request.url, "https://dummy.site/").searchParams;
  const location = params.get("loc");
  const password = params.get("pass");

  if (request.url.startsWith("/update") && password == process.env.PASSWORD) {
    setAsync(LOCATION_KEY, location).then(() => {
      console.log(`Location has been updated to ${location}`)
      response.end(pug.renderFile("template.pug", { location: "updated" }));
    });
  } else {
    getAsync(LOCATION_KEY).then((location) => {
      response.end(pug.renderFile("template.pug", { location }));
    });
  }
});

server.listen(port, null, () => {
  console.log(`Server running at ${port}`);
});
