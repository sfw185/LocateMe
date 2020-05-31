const http = require("http");
const pug = require("pug");

const redis = require("redis");
const redis_client = redis.createClient(process.env.REDIS_URL);
const { promisify } = require("util");
const getAsync = promisify(redis_client.get).bind(redis_client);
const setAsync = promisify(redis_client.set).bind(redis_client);

redis_client.on("error", function(error) {
  console.error(error);
});

const LOCATION_KEY = "LOCATION";

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  const path = request.path;
  
  if (path == "/update") {
    setAsync(LOCATION_KEY, "testing").then(() => {
      response.end(pug.renderFile("template.pug", { path, location: "updated" }));
    });
  }
  
  getAsync(LOCATION_KEY).then((location) => {
    response.end(pug.renderFile("template.pug", { path, location }));
  })
});

server.listen(port, null, () => {
  console.log(`Server running at ${port}`);
});
