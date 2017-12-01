// server.js
// where your node app starts

// init project
const fs = require('fs');
const path = require('path');
var express = require('express');
var app = express();
var compression = require('compression');
var mcache = require('memory-cache');

app.use(compression())
let max =31557600000;

//var sitemap = require('express-sitemap')();


var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}



app.use(express.static('views'));
/*
app.get('/',cache(10), function(req, res) {
  res.render('views/index.html');
});
*/
app.get('/', cache(1000), (req, res) => {
  setTimeout(() => {
    res.render('views/index.html', { maxAge: max })
  }, 5000) //setTimeout was used to simulate a slow processing request
})
// http://expressjs.com/en/starter/basic-routing.html

app.get("/sw.js", function (req, res) {
  res.sendFile(__dirname + '/sw.js');
});
app.get("/manifest.json", function (req, res) {
  res.sendFile(__dirname + '/manifest.json');
});
app.get("/Robots.txt", function (req, res) {
  res.sendFile(__dirname + '/Robots.txt');
});

app.get('/sitemap.xml', function(req, res) {
    var sitemap = generate_xml_sitemap(); // get the dynamically generated XML sitemap
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);     
})

//https://www.hacksparrow.com/xml-sitemap-generator-in-node-js-sitemap-xml-gz.html
function generate_xml_sitemap() {
    // this is the source of the URLs on your site, in this case we use a simple array, actually it could come from the database
    var urls = ['index.html', 'javascript.html', 'css.html', 'about.html'];
    // the root of your website - the protocol and the domain name with a trailing slash
    var root_path = 'https://profuse-authorization.glitch.me/';
    // XML sitemap generation starts here
    var priority = 0.5;
    var freq = 'monthly';
    var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for (var i in urls) {
        xml += '<url>';
        xml += '<loc>'+ root_path + urls[i] + '</loc>';
        xml += '<changefreq>'+ freq +'</changefreq>';
        xml += '<priority>'+ priority +'</priority>';
        xml += '</url>';
        i++;
    }
    xml += '</urlset>';
    return xml;
}

app.get('/node_modules/workbox-sw/build/importScripts/:version', (request, response) => {
  response.sendFile(`${__dirname}/node_modules/workbox-sw/build/importScripts/${request.params.version}`);
});

// Simple in-memory store for now



// listen for requests :)

//https://varvy.com/pagespeed/


const listener = app.listen(5000, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
