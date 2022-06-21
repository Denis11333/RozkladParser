var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();


const fileName = '';


app.use(fileUpload({}));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.setHeader('content-type', 'text/html;charset=utf-8');

    res.write('<h1> Enter your file ( xls only ) </h1>')

    res.write('<form action="/upload" method="POST" enctype="multipart/form-data" >');
    res.write('<input type="file" name="photo">');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
})

app.post('/upload', function (req, res) {
    req.files.photo.mv(__dirname + '/public/pics/' + req.files.photo.name);

    res.end(req.files.photo.name);

    let readFile = require("./readFile.js");

    readFile.gW.readFile(req.files.photo.name)

    function myFunc() {
        let fillPars = require('./fillParsJson');
        fillPars.gW.readFile();
    }

    setTimeout(myFunc, 10000);


    function sleep() {
        let dbPush = require('./dbPushParsJson')
        dbPush.bd.addInBd();
    }

    setTimeout(sleep, 15000);

    console.log(req.files.photo); // the uploaded file object
})
;

var server = app.listen(7999, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http:localhost//%s:%s", host, port)

})


function waitUtilFileCreated(filename) {
    fs.stat(filename, function (err, stats) {
        while (!stats.isFile()) {
            console.log(filename + " is creating");
        }
    });
}
