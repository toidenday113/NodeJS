var express = require("express");
var app = express();
var pg = require('pg');
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');

var config = {
  'user':'postgres',
  'database': 'demonodejs',
  'password':'root',
  'host':'localhost',
  'port': 5432,
  'max' : 10,
  idleTimeoutMillis: 30000,
};
var pool = new pg.Pool(config);

app.get('/hinh/:id', function(req, res){
      var id = req.params.id;
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('SELECT * FROM "hotgirt" WHERE "id" = ' + id,  function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          return console.error('error running query', err);
        }
        console.log(result.rows[0].hinh);
          var hinh1 = result.rows[0].hinh;
          res.render("trangchu", { hinh: hinh1 });
      });
    });

    pool.on('error', function (err, client) {
      console.error('idle client error', err.message, err.stack)
    });
ùa
});
app.listen(300);
