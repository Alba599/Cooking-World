var express = require("express");
var bodyParser = require("body-parser");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Create an express app
var app = express();

// sqlite database
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("cooking.db");

// Launch the express app on a port
var port = 8000;
app.listen(port, () => console.log(`Listening on ${port}`));

mongoose.connect(
  "mongodb+srv://AlbaHalili:Lovely123@cluster0.nio2h.mongodb.net/cooking?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

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
    "INSERT INTO questions (question_text, question_created, user) VALUES (?, ?,?)",
    [
      request.body.question_text,
      request.body.question_created,
      request.body.user,
    ],
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

app.post("/saveanswer", function (request, response) {
  console.log("Answer is: " + request.body.answer_text);
  db.run(
    "INSERT INTO answers (question_id, answer_text, answer_created, user) VALUES (?, ?, ?, ?)",
    [
      request.body.question_id,
      request.body.answer_text,
      request.body.answer_created,
      request.body.user,
      // "",
    ],
    function (err) {
      if (err) {
        console.log(err.message);
      } else {
        response.json({
          question: request.body.answer_text,
          id: this.lastID,
        });
      }
    }
  );
});

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

app.get("/getanswers/:id", function (request, response) {
  console.log("return questions list");
  db.all(
    "SELECT * FROM answers WHERE question_id = ?",
    [request.params.id],
    function (err, rows) {
      if (err) {
        console.log(err.message);
      } else {
        response.json(rows);
      }
    }
  );
});
