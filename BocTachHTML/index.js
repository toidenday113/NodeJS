var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
var request  = require('request');
var cheerio = require('cheerio');
 app.get('/', function(req, res){
   request('http://vnexpress.net/', function(error, response, body){
      if(error){
        console.log(error);
        res.render('trangchu', {html:"Có lỗi xảy ra"});
      }else {
        //console.log(body);
        $ = cheerio.load(body);
        var ds = $(body).find('a.txt_link');
        var arr = [];
        ds.each(function(i, e) {
        arr.push( $(this).text());
        });
          res.render('trangchu', {html:arr});
      }
   });

 });

 app.listen(800);
