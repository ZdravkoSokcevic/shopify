const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const insertData = require('./sources/data');

const dbPath = 'mongodb://localhost:27017/shopify';
// const db=mongoose.createConnection('mongodb://localhost:27017/shopify',{useNewUrlParser:true});
mongoose.connect(dbPath, { useNewUrlParser: true });
mongoose.set('debug',true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(9999, '0.0.0.0');


app.use(express.static(__dirname + '/views/scripts'));



//////////////////////////////////////
//      manage session              //
//////////////////////////////////////
app.use(session({
    secret: 'user',
    resave: true,
    saveUninitialized: true
}));
session.Session.prototype.login = (user, cb) => {

}

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


// app.get('/',function(req,res){
//     getAllData().then((data)=>{
//         console.log(data);
//         res.end(JSON.stringify(data));
//     }).catch(e=>{
//         console.log(e);
//     });
// });



// const insert=require('./controller/user/insert');

// app.post('/user/insert',(req,res)=>{
//     insert(req,res).then((data)=>{
//         console.log(data);
//     })
// });








// async function getAllData(){
//     var menu=await getAllFromMenu();
//     var orders=await getAllFromOrders();
//     let obj={menu:menu,orders:orders};
//     var finalData=await groupData(obj);
//     return finalData;
// }

// function getAllFromMenu(){
//     return new Promise((res,rej)=>{
//         let data=[];
//         db.collection('menu').find().toArray((err,doc)=>{
//             if(doc){
//                 for(let x in doc){
//                     data.push(doc[x]);
//                 }
//                 res(data);
//             }else{
//                 rej(err);
//             }
//         });
//     });
// }

// function getAllFromOrders(){
//     return new Promise((res,rej)=>{
//         let data=[];
//         // db.collection.aggregate($lookup:{from: 'menu'}).toArray((err,doc){
//         //     console.log(doc);
//         // });
//         db.collection('orders').find().toArray((err,doc)=>{
//             if(doc){
//                 for(let x in doc){
//                     data.push(doc[x]);
//                 }
//                 res(data);
//             }else{
//                 rej(err);
//             }
//         });
//     });
// }

// function groupData(obj,res){
//     // console.log(obj.menu[0]._id);
//     obj.menu=JSON.parse(JSON.stringify(obj.menu));
//     obj.orders=JSON.parse(JSON.stringify(obj.orders));
//     let menu=[];
//     let orders=[];
//     let full_obj=[];
//     for(let x in obj.menu){
//         menu.push(JSON.stringify(obj.menu[x]));
//     }
//     for(let y in obj.orders){
//         orders.push(JSON.stringify(obj.orders[y]));
//     }
//     // console.log(typeof orders,typeof menu);
//     // console.log(JSON.parse(orders[0])._id);
//     menu.forEach(menuItem => {
//         let singleMenu=JSON.parse(menuItem);

//         orders.forEach(ordersItem => {
//             let order=JSON.parse(ordersItem);
//             if(singleMenu._id==order._id){
//                 // console.log('isti');
//                 for(let x in order){
//                     singleMenu[x]=order[x];
//                 }
//             }
//         });
//         full_obj.push(singleMenu);
//     });
//     return full_obj;
// }

module.exports = app;