require('dotenv-flow').config();
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const https = require('https');
const options = { cert: fs.readFileSync('/Users/' + process.env.USER + '/server.crt'), key: fs.readFileSync('/Users/' + process.env.USER + '/server.key')};
const notesRoute = require('./routes/notes')

const connectPg = 'postgres://vadim:1234@localhost/homepage_portfolio'

const app = express();

app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public/build')));

app.use('/notes', notesRoute)

let server = https.createServer(options, app);
server.listen(8001, function(){
    console.log("server running at https://localhost:8001/")
});


