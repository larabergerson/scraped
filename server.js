// Dependencies:

var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");

// require Cheerio and Axios to make the web scraping possible:

// Require all models
var db = require("./models");

var cheerio = require("cheerio");
var axios = require("axios");

// initialize Express:
var app = express();

app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.get("/", function (req, res) {
  db.scraped.find({}, function (error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function (req, res) {
  axios.get("https://www.nytimes.com/section/science").then(function (response) {
    var $ = cheerio.load(response.data);
    console.log("grabbing threads...");
    // var onion = $(".theonion");
    var results = [];

    // console.log(onion.html());

    // $(".title").each(function (i, element) {
    $("div.css-10wtrbd").each(function (i, element) {
      // console.log(element.children.children)

      var href = $(this)
        .find("h2")
        .find("a")
        .attr("href")

      var text = $(this)
        .find("h2")
        .find("a")
        .text()
      console.log("one record", href, text)

      // // console.log(text)
      db.Articles.create({
        title: text,
        link: "https://www.nytimes.com"+ href
      })
      // console.log(results)
    });
    res.send("Scraped web successfully");
  })
});




app.listen(3000, function () {
  console.log("App listening on port: 3000");
});

