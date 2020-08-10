const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
const Form = require('./models/forms');
const url = 'mongodb://localhost:27017/epass';
const connect = mongoose.connect(url);

const hostname = 'localhost';
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/homepage'));
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));


app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end("<html><body>Hello</body></html>");

});


const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log("Server Running");
});

