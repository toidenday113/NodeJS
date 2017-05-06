var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(800, function(){
  console.log("Server Start...!");
});

//Cấu hình connert mysql
var connetion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_nodejs'
})

/*  Cấu hìn bodyParser */
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// Cấu hình postgresSQL
//var config = "postgres://postgres:root@localhost:5432/BanHang";
// var config = {
//   user: 'postgres', //env var: PGUSER
//   database: 'BanHang', //env var: PGDATABASE
//   password: 'root', //env var: PGPASSWORD
//   host: 'localhost', // Server hosting the postgres database
//   port: 5432, //env var: PGPORT
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// };
//var pool = new pg.Client(config);

///////////////////////////////////
connetion.connect();
app.get('/', function(req, res){

  var qrs = "SELECT * FROM User";
  connetion.query(qrs, function(err, rows, fields){
    if(!err){
        // Chuc năng  này res.json(rows) làm web serive app android Ios
      //  console.log(rows);

        res.render('trangchu', {rs: rows});
      }
  });

});

app.post('/login', urlencodedParser, function (req, res) {
    var HoTen = req.body.HoTen;
    var Username = req.body.username;
    var Password = req.body.password;
    var DienThoai = req.body.DienThoai;
    var Email = req.body.Email;
    var qr = "INSERT INTO User(HoTen, Username, Password, DienThoai, Email) VALUES('"+HoTen +"', '"+Username+"', '"+Password+"', '"+DienThoai+"', '"+Email +"')"
    connetion.query(qr, function(err, rows, fields){
        if(!err){
          console.log("Thanh Cong");
            res.redirect('/');
          //  connetion.end();
        }
    });
  //  connetion.end();

    //connetion.end();
});
