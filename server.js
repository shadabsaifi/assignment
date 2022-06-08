var express = require('express');
var bodyParser = require('body-parser');
var app  = express();
var path = require('path');
var cors = require('cors');
var config = require('./app/config/config');
var connection = require('./app/config/connection');
var tutorialRoute = require('./app/routes/tutorialRoute');

app.use(bodyParser.json({limit:"100mb"}));

app.use(cors());

app.use('/', express.static(path.resolve('./dist')));
app.use('/api', tutorialRoute);


app.get('/*', (req, res)=>{

    return res.sendFile(path.resolve('./dist/index.html'));
})


app.listen(config.PORT, ()=>{
    console.log("server listening on port ",config.PORT)
});