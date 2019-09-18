require('dotenv-flow').config();
const express = require('express');
const fs = require('fs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const http = require('http');
const PORT = 5000;

const BlogRoute = require('./routes/blog')
const PortfolioRoute = require('./routes/portfolio')
const ContactsRoute = require('./routes/contacts')

const app = express();

app.use(require('cors')());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public/build')));

app.use('/api/blog', BlogRoute)
app.use('/api/portfolio', PortfolioRoute)
app.use('/api/contacts', ContactsRoute)

let server = http.createServer(app);
server.listen(PORT, function() {
    console.log("server running: " + PORT)
});


// DB
// DB_LOGIN
// DB_PASSWORD
//
// GMAIL_USER
// GMAIL_PASSWORD
//
// DEV

