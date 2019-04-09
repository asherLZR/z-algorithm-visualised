const express = require('express');
const port = process.env.PORT || 8080;
const app  = express();
const favicon = require('serve-favicon');
const path = require('path');

app.use(express.static(__dirname + "/dist/"));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.get(/.*/, function(req, res){
	res.sendFile(__dirname + "/dist/index.html")
});
app.listen(port);

console.log('server started...');