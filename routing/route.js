const app = require('../app.js');
const userInsert = require('../controller/user/insert');
const ordersController = require('../controller/orders/order');
const menuController = require('../controller/menu/menu');
const allUsers=require('../controller/user/all');
const user=require('../controller/user');
const userOrders = require('../controller/allOrders');
const Orders=require('../controller/orders/allWithMenu');
const oneData=require('../controller/oneData');
const login = require('../controller/user/login');
const express = require('express');

const view = __dirname + '/../views/html/';

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// /home/zdravko/Documents/programiranje/rajko_node/views/html/index.html

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname + 'sources')));

app.get('/', function(req, res) {
    data = fs.readFile(view + 'index.html', function(err, data) {
        console.log(data);
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
        res.end();
    });
});



app.get('/login', (req, res) => {
    res.render(view + 'login.ejs');
    res.end();
});

app.post('/user/login', (req, res) => {
    login(req, res);
    // res.end();
});


app.post('/user/insert', (req, res) => {
    console.log(req.body);
    userInsert(req, res);
});


app.get('/orders', (req, res) => {
    fs.readFile(view + 'orders.ejs', (err, data) => {
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
        res.end();
    });
});

app.get('/orders/all', (req, res) => {
    ordersController.allOrders(req, res).then(allOrderData=>{
        if(allOrders!==undefined){
            res.end(JSON.stringify(allOrderData))
        }
    });
});

app.post('/orders/insert', (req, res) => {
    login(req,res).then(approve=>{
        if(approve){
            ordersController.storeOrders(req, res);
        }else{
            res.json('Invalid creditials');
        }
    })
    
});

app.post('/menu/insert', (req, res) => {
    menuController.insertMenu(req, res);
});


app.get('/all', (req, res) => {
    userOrders(req, res).then(result=>{
        res.end(JSON.stringify(result));
    });
});

app.get('/menu/all', (req, res) => {
    menuController.getAllMenus(req, res);
});

app.get('/orders/all', (req, res) => {
    allOrders(req, res);
});

app.get('/users/all',(req,res)=>{
    user.all().then(users=>{
        res.end(JSON.stringify(users));
    });
});

app.get('/users/get',(req,res)=>{
    console.log(req.query.id);
    user.findById(req.query.id).then(result=>{
        if(result!==undefined){
            res.end(JSON.stringify(result));
        }
    });
    // res.end('newst');
});

app.get('/users/find',(req,res)=>{
    console.log(req.body.mail);
    user.findByMail(req.body.mail).then(user=>{
        res.end(JSON.stringify(user));
    });
});

app.get('/orders/find',(req,res)=>{
    id=req.query.id;
    console.log(id);
    ordersController.find(id).then(order=>{
        console.log(order);
        res.end(JSON.stringify(order));
    });
});

app.get('/menu/find',(req,res)=>{
    console.log(req.query.id);
    if(req.query.id!==undefined){
        menuController.findById(req.query.id).then(response=>{
            res.end(JSON.stringify(response));
        });
    }
    
});

app.get('/menu/orders',(req,res)=>{
    Orders().then(result=>{
        res.end(JSON.stringify(result));
    });
});

app.get('/ord/all',(req,res)=>{
    oneData(req).then(data=>{
        res.end(JSON.stringify(data));
    });
    // res.end(JSON.stringify({error:'Not found'}));
});