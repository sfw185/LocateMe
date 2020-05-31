const http = require("http");
const jade = require("pug");
const template = jade.compileFile("template.pug");
const redis_client = require('redis').createClient(process.env.REDIS_URL);

const LOCATION_KEY = "LOCATION";

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  
  if (request.path === "/update") {
    redis_client.set("LOCATION", LOCATION_KEY, () => {
      response.end(template({ location: "updated" }));
    });
  }

  redis_client.get(LOCATION_KEY, (error, location) => {
    response.end(template({ location }));
  });
});

server.listen(port, null, () => {
  console.log(`Server running at ${port}`);
});
