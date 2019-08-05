//      --Default Nodejs modules--      //
const express = require('express');
const app = require('../app.js');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

//      --Custom modules--              //
const UserController = require('../controller/user/user');
const OrdersController = require('../controller/orders/order');
const MenuController = require('../controller/menu/menu');
const userOrders = require('../controller/allOrders');
const Orders=require('../controller/orders/allWithMenu');
const oneData=require('../controller/oneData');
const BaseController=require('../controller/BaseController');


const Middleware=require('../controller/middleware/middleware');

const view = __dirname + '/../views/html/';
const session=require('express-session');



// /home/zdravko/Documents/programiranje/rajko_node/views/html/index.html
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
// console.log(__dirname+'/../views');
app.use(express.static(__dirname+ '/../views'));
// app.use(express.static(path.join(__dirname + 'sources')));
// app.set('/styles',express.static(path.join(__dirname + '/../views/styles')));
// app.set('/html',express.static(path.join(__dirname + '/views/html')));
// app.set('/scripts',express.static(path.join(__dirname + '/views/scripts')));
// app.set('/bootstrap',express.static(path.join(__dirname+'/sources/bootstrap/css')));

//      --Basic middleware--        //
app.use('/',(req,res,next)=>{
    if(req.session.nesto){
        req.session.nesto++;
        console.log('Dobrodosao '+req.session.nesto+' put');
        
    }else{
        req.session.nesto=1;
        console.log('dobrodosao prvi put');
    }
    next();
});


//      --Admin helper middleware function
let AdminMiddleware=(route,method)=>{
    // console.log(app[method]);
    app.all(route,(req,res,next)=>{
        //  Check if user is admin
        if(Middleware.isAdmin(req,res,next)){
            next();
        }else{
            let message='Admin only can add new user!';
            res.end(JSON.stringify(message));
        }
    });
}

let loggedInMiddleware=(route,method)=>{
    app.all(route,(req,res,next)=>{
        if(Middleware.isLoggedIn(req,res,next)){
            next();
        }else{
            let message='Must be logged in';
            res.end(JSON.stringify(message));
        }
    })
}


app.get('/',(req,res,next)=>{
    data = fs.readFile(view + 'index.html', function(err, data) {
        console.log(data);
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
        res.end();
    });
});
// app.get('/', function(req, res) {
//     data = fs.readFile(view + 'index.html', function(err, data) {
//         console.log(data);
//         res.setHeader('Content-Type', 'text/html');
//         res.send(data);
//         res.end();
//     });
// });



app.get('/login', (req, res) => {
    res.render(view + 'login.ejs');
    res.end();
});

app.post('/user/login', (req, res) => {
    UserController.login(req,res).then(result=>{
        console.log(result);
        res.end(JSON.stringify(result));
    });
    // res.end();
});


AdminMiddleware('/user/insert','post');
app.post('/user/insert', (req, res) => {
    console.log(req.body);
    UserController.storeUsers(req,res);
});

loggedInMiddleware('/user/logout','get');
app.get('/user/logout', (req,res)=> {
    UserController.logout(req,res).then(result=> {
        res.end(JSON.stringify(result));
    });
});


app.get('/orders', (req, res) => {
    OrdersController.allOrders().then(data=>{
        res.render('html/orders',{'data':JSON.stringify(data)});
    });
    // fs.readFile(view + 'orders.ejs', (err, data) => {
    //     res.setHeader('Content-Type', 'text/html');
    //     res.send(data);
    //     res.end();
    // });
});

app.get('/orders/all', (req, res) => {
    BaseController.allData().then(result=>{
        res.end(JSON.stringify(result));
    });
});

loggedInMiddleware('/orders/insert','post');
app.post('/orders/insert', (req, res) => {
    OrdersController.storeOrders(req, res);
});

app.get('/orderedById',(req,res)=>{
    let id=req.query.id;
    // console.log(id);
    BaseController.findByUserId(id).then((orders)=>{
        res.end(JSON.stringify(orders));
    });
});

AdminMiddleware('/menu/insert','post');
app.post('/menu/insert', (req, res) => {
    MenuController.insertMenu(req, res);
});

app.get('/all', (req, res) => {
    userOrders(req, res).then(result=>{
        res.end(JSON.stringify(result));
    });
});

app.get('/menu/all', (req, res) => {
    MenuController.getAllMenus(req, res);
});

app.get('/orders/all', (req, res) => {
    allOrders(req, res);
});


AdminMiddleware('/users/all','get');

app.get('/users/all',(req,res)=>{
    UserController.all().then(users=>{
        res.end(JSON.stringify(users));
    });
});

app.get('/users/get',(req,res)=>{
    console.log(req.query.id);
    UserController.findById(req.query.id).then(result=>{
        if(result!==undefined){
            res.end(JSON.stringify(result));
        }
    });
});

app.get('/users/find',(req,res)=>{
    console.log(req.body.mail);
    UserController.findByMail(req.body.mail).then(user=>{
        res.end(JSON.stringify(user));
    });
});

app.get('/orders/find',(req,res)=>{
    id=req.query.id;
    console.log(id);
    OrdersController.find(id).then(order=>{
        console.log(order);
        res.end(JSON.stringify(order));
    });
});

app.get('/menu/find',(req,res)=>{
    console.log(req.query.id);
    if(req.query.id!==undefined){
        MenuController.findById(req.query.id).then(response=>{
            res.end(JSON.stringify(response));
        });
    }
    
});

//  Get all orders just with menus
app.get('/menu/orders',(req,res)=>{
    Orders().then(result=>{
        res.end(JSON.stringify(result));
    });
});


//
app.get('/order/get',(req,res)=>{
    oneData(req).then(data=>{
        res.end(JSON.stringify(data));
    });
    // res.end(JSON.stringify({error:'Not found'}));
});

///     testing orders find method
app.get('/orders/where',(req,res)=>{
    try{
        console.log(req.query);
        let condition=req.query.condition;
        let value=req.query.value;
        // console.log(condition);
        OrdersController.where(condition,value).then(result=>{
            res.end(JSON.stringify(result));
        });
    }catch(e){
        let message='Queries not found';
        res.end(JSON.stringify(message));
    }
    
   
});

app.get('/categories/all',(req,res)=>{
    MenuController.allCategories().then( categories=>{
        res.end(JSON.stringify(categories));
    });
});

loggedInMiddleware('/orders/loggedIn','get');
app.get('/orders/loggedIn',(req,res,next)=>{
    BaseController.ordersForLoggedIn(req,res,next).then((result)=>{
        res.end(JSON.stringify(result));
    });
});