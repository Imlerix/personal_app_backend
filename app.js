require('dotenv-flow').config();
const express = require('express');
const fs = require('fs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path');
const http = require('http');
const cors = require('cors');
const PORT = 5000;

const BlogRoute = require('./routes/blog')
const PortfolioRoute = require('./routes/portfolio')
const ContactsRoute = require('./routes/contacts')
const AdminRoute = require('./routes/admin')

const app = express();

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
const corsOptions = {
    origin: '*',
    credentials: true,
    allowedHeaders: [ 'Content-Type', 'Authorization' ]
}
app.use(require('cors')(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public/build')));

app.use('/api/blog', BlogRoute)
app.use('/api/portfolio', PortfolioRoute)
app.use('/api/contacts', ContactsRoute)
app.use('/admin', AdminRoute)

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

