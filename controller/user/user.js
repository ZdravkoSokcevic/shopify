//      --Default Node modules--    //
const app=require('../../app');
const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;


//      --Node helper methods--     //
const session=require('express-session');
const view=__dirname+'/../../views/html/';

//      --Custom user model--       //
const User=require('../../model/user');


// .connect('mongodb://localhost:27017/shopify');

var url = "mongodb://localhost:27017/";

module.exports={
    all:()=>{
        return new Promise((res,rej)=>{
            User.find().then(result=>{
                res(result);
            }).catch(err=>{
                console.log(err);
            });
        });
        
    },
    findById:(userId)=>{
        return new Promise((res,rej)=>{
            User.find({"id":userId},(err,result)=>{
                // console.log(result);
                if(result!==null){
                    res(result);
                }else{
                    let message='No user found';
                    res(message);
                }
                
            });
        });
    },
    findByMail:(mail)=>{
        return new Promise((res,rej)=>{
            User.find({email:mail},(err,user)=>{
                if(err){
                    rej(err);
                }else{
                    console.log(user);
                    res(user);
                }
            });
        });
       
    },
    login:(request,res)=>{
        return new Promise((resolve,reject)=>{
            let req=request.body;
            let data={
                email:      req.email,
                password:   req.password
            };
            console.log(data);
            User.find(data,(err,doc)=>{
                console.log(doc);
                
                if(!doc.length){
                    //not logged in
                    resolve(false);
                }else{
                    //logged in
                    request.session.user=doc[0];
                    console.log(request.session);
                    resolve(doc[0]);
                }
                
                // res.end();
            });
        });
    },
    getLoggedIn:()=>{
        return 1;
    },
    logout:(req,res)=> {
        return new Promise( (resolve,rejection)=>{
            if( req.session.user!==null) {
                req.session = null;
                res.statusCode=200;
                resolve(true);
            }else{
                res.statusCode=404;
                resolve(false);
            }
        });
    },
    storeUsers:(request,response)=>{
        return new Promise((res,rej)=>{
            let data={
                id:         makeRandomId(16),
                ime:        request.body.ime,
                email:      request.body.email,
                password:   request.body.password,
                type:       request.body.type || 'admin'
            };
            // console.log(data);
            
            User.collection.insert(data,(err,docs)=>{
                if(err){
                    rej(err);
                }else{
                    console.log(docs);
                    response.write(JSON.stringify(docs));
                    response.end();
                }
            });
        })
    }
}

let makeRandomId=(length)=>{
    let letters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id='';
    for(let x=0;x<length;x++){
        id+=letters.charAt(Math.floor(Math.random()*letters.length));
    }
    return id;
}