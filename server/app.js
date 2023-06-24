const dotenv = require("dotenv");
// const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser())
dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 
app.use(require('./router/auth'));  
// const User = require('./model/userSchema');
const PORT = process.env.PORT || 5000;


// middleware
// const middleware = (req, res, next) => {
//     console.log("gello from middlewar");
//     next();
// }

// app.get('/', (req, res) => {
//     res.send('hello world');
// })

// app.get('/about',(req, res) => {
//     console.log("gello from about");
//     res.send('hello about');
// })

// app.get('/contact', (req, res) => {
//     // res.cookie("jwtoken"," thapa") 
//     res.send('hello contact');
// })

app.get('/signup', (req, res) => {
    res.send('hello signup');
})

app.get('/signin', (req, res) => {
    res.send('hello signin');
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));

}

app.listen(PORT, () => {
    console.log("running server");
})