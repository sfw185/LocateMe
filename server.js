const http = require("http");
const jade = require("jade");
const template = jade.compileFile("template.jade");

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  if (request.path === "/update") {
    console.log("Update redis here");
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  response.end(template({ location: "blah,blah" }));
});

server.listen(port, null, () => {
  console.log(`Server running at ${port}`);
});
