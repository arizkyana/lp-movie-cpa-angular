var express = require('express');
var app = express();

app.use('/themes/js', express.static(__dirname + '/themes/js'));
app.use('/themes/css', express.static(__dirname + '/themes/css'));
app.use('/themes/font-awesome', express.static(__dirname + '/themes/font-awesome'));
app.use('/themes/img', express.static(__dirname + '/themes/img'));
app.use('/themes/fonts', express.static(__dirname + '/themes/fonts'));
app.use('/controllers', express.static(__dirname + '/controllers'));
app.use('/models', express.static(__dirname + '/models'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.all('/*', function(req, res, next) {
    // res.send('ok');
    res.sendFile('index.html', { root: __dirname });
});

app.listen(8080);
console.log('Open : ', 'http://localhost:8080');