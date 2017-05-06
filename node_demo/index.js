var express = require("express");
var bodyParser = require('body-parser');
var multer  = require('multer');

var app = express();

// Cấu hình template engin cho tất cả các template khác
app.set('view engine', 'ejs');

// Cấu hình thư muc chứa views
app.set('views', './views');

app.listen(3000);

app.get("/", function(req, res){

	res.send("Hello");
});

app.post("/hello",function(req, res){
	res.send("<h1> Welcome to KhaTran </h1>");
});

app.get("/post", function(req, res){
	res.send('<form action="/post"  method="post">\
	<input type="text" name="ten"> <input type="text" name="matkhau">\
	<input type="submit"  value="thu thi">\
	</form>');
});

// Lấy dư liệu bằng post phải dựa vào thần body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/post', urlencodedParser, function(req, res){
		var u = req.body.ten;
		var p = req.body.matkhau;

		res.send("Ten: " + u + "<br> Mat Khau: " + p );
});

// Lấy giá trị bằng phương thức get.
app.get('/giatri/:id', function(req, res){
	var id = req.params['id'];
	res.send(id);
});


// Gọi template
app.get('/templates', function(req, res){
	res.render('template');
});

// Chuyền tham số qua template bằng chuổi
app.get('/chuyenthamso', function(req, res){
	var str = "Hoang Kha";
	res.render('nhanthamso', {str:str });
});

// Chuyên giá trị qua template bằng mảng
app.get('/sendarray', function(req, res){
	var arr = [1,2,3,4,5];
	res.render('nhanthamso', {arr:arr});
});

//Goi file upload
app.get('/upload', function(req, res){
	res.render('uploadfile');
});

// Upload file lên server
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '-' + file.originalname );
  }
})

 var upload = multer({ storage: storage })


//var upload = multer({ dest: 'uploads/' });
//var upload = multer();

app.post('/upload',upload.single('avatar'), function(req, res, next){
	//console.log(req.file.originalname);

	console.log(req.file);

	res.redirect('/upload');

});

app.get('/master', function(req, res){
		res.render('master');
});
