const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser=require('cookie-parser');


const insertData = require('./sources/data');

const dbPath = 'mongodb://localhost:27017/shopify';

const appPort=9999;
const exec=require('child_process').exec;

let onExit=()=>{
    console.log("izasao proces");
    process.exit();
}

app.listen(appPort,'0.0.0.0');
// process.on('exit',onExit);

// const db=mongoose.createConnection('mongodb://localhost:27017/shopify',{useNewUrlParser:true});
mongoose.connect(dbPath, { useNewUrlParser: true });
mongoose.set('debug',true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





// app.use(express.errorHandler());

//////////////////////////////////////
//      manage session              //
//////////////////////////////////////
app.use(cookieParser());
app.use(session({
    secret: 'userId',
    resave: true,
    saveUninitialized: true
}));
// app.use('/',(req,res,next)=>{
//     console.log('Dosao u middleware');
//     // res.write(JSON.stringify("Dosaoo"));
//     // res.end();
//     // next();
// });

app.use((req, res, next) => {
    // res.set('page-size':20);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.engine('html', require('ejs').renderFile);

// try{
//     insertData();
// }catch(e){
//     console.log(e);
// }



module.exports = app;