var express = require("express");
var bodyParser = require("body-parser");

// Create an express app
var app = express();
var port = 8000;

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("cooking.db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Launch the express app on a port
app.listen(port, () => console.log(`Listening on ${port}`));

app.get("/question/:id", function (request, response) {
  db.get(
    "SELECT * FROM questions WHERE rowid = ?",
    [request.params.id],
    function (err, row) {
      if (err) {
        console.log(err.message);
      } else {
        response.json(row);
      }
    }
  );
});

app.post("/savequestion", function (request, response) {
  console.log("New question: " + request.body.question_text);
  db.run(
    "INSERT INTO questions (question_text, question_created) VALUES (?,?)",
    [request.body.question_text, request.body.question_created],
    function (err) {
      if (err) {
        console.log(err.message);
      } else {
        response.json({
          question: request.body.question_text,
          id: this.lastID,
        });
      }
    }
  );
});

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

app.get("/getallquestions", function (request, response) {
  console.log("return questions list");
  db.all("SELECT * FROM questions", function (err, rows) {
    if (err) {
      console.log(err.message);
    } else {
      response.json(rows);
    }
  });
});

// These are the routes (first arg: path, second: callback function)
app.get("/", requestHandler);

// app.get("/pets", function (request, response) {
//   console.log(request.url);
//   const responseObject = [
//     {
//       name: "Bini",
//       type: "Bunny",
//     },
//     {
//       name: "Siku",
//       type: "Polar bear",
//     },
//   ];
//   response.setHeader("Access-Control-Allow-Origin", "*");
//   response.end(JSON.stringify(responseObject));
// });
