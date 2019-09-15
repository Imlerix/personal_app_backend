require('dotenv-flow').config();
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const https = require('https');
const options = { cert: fs.readFileSync('/Users/' + process.env.USER + '/server.crt'), key: fs.readFileSync('/Users/' + process.env.USER + '/server.key')};

const BlogRoute = require('./routes/blog')
const PortfolioRoute = require('./routes/portfolio')
const ContactsRoute = require('./routes/contacts')

const app = express();

app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public/build')));

app.use('/blog', BlogRoute)
app.use('/portfolio', PortfolioRoute)
app.use('/contacts', ContactsRoute)

let server = https.createServer(options, app);
server.listen(8001, function() {
    console.log("server running at https://localhost:8001/")
});


