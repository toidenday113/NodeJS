var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport('smtps://toidenday113%40gmail.com:Hoangkha007@smtp.gmail.com?secure=true');

var mailOptions = {
    from: '"Toi Ne👥" <toidenday113@gmail.com>', // sender address
    to: 'tranhoangkha007@gmail.com', // list of receivers
    subject: 'Hello ', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
