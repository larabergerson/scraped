// Dependencies:

var express = require("express");
var mongojs = require("mongojs");

// require Cheerio and Axios to make the web scraping possible:

var cheerio = require("cheerio");
var axios = require("axios");

// initialize Express:
var app = express();

// DB config:
var databaseUrl = "scraped";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("DB ERROR:", error);
});

app.get("/", function (req, res) {
  db.scrapedData.find({}, function (error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function (req, res) {
  axios.get("https://www.theonion.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    console.log("grabbing threads...");
    var onion = $(".theonion");
    // var results = [];

    console.log(onion.html());
  
      // $(".title").each(function (i, element) {
        $("a .js-link").each(function (i, element) {
    
        
        var title = $(element).children("a").text();
        var summary = $(element).text();
        var link = $(element).children().attr("href");
      
        if (title && link) {
          db.scrapedData.insert({
            title: title,
            summary: summary,
            link: link
          },
            function (err, inserted) {
              if (err) {
                console.log(err)
              }
              else {
                console.log(inserted);
              }
            });
        }
      });
      res.send("Scraped web successfully");
  })
});



  app.listen(3000, function () {
    console.log("App listening on port: 3000");
  });

      
  //       // results.push({
  //         //   title: title,
  //         //   summary: summary,
  //         //     link: link
  //         //   });
  //         // });
      
  //     //     console.log(results);
  //     // });
    
