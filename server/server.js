var express = require("express");

// Create an express app
var app = express();
var port = 8000;

// Launch the express app on a port
app.listen(port, () => console.log(`Listening on ${port}`));

// Same request handler as in case of an HTTP server
var requestHandler = function (request, response) {
  console.log(request.url);
  const responseObject = {
    status: true,
    version: "1.0",
  };
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.end(JSON.stringify(responseObject));
};

// These are the routes (first arg: path, second: callback function)
app.get("/", requestHandler);

app.get("/pets", function (request, response) {
  console.log(request.url);
  const responseObject = [
    {
      name: "Bini",
      type: "Bunny",
    },
    {
      name: "Siku",
      type: "Polar bear",
    },
  ];
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.end(JSON.stringify(responseObject));
});
