const userModel=require('../model/user');
const mongoose=require('mongoose');
// .connect('mongodb://localhost:27017/shopify');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports={
    all:()=>{
        return new Promise((res,rej)=>{
            userModel.find().then(result=>{
                // resultData=[];
                // result.forEach(user=>{
                //     resultData.push(user);
                // });
                res(result);
            }).catch(err=>{
                console.log(err);
            });
        });
        
    },
    findById:(userId)=>{
        return new Promise((res,rej)=>{
            // console.log(`Id: ${userId}`);
            // let id=mongoose.Types.ObjectId(userId);
            // console.log(id);
            // userModel.find({_id:id},(err,doc)=>{
            //     console.log(doc);
            //     if(err){
            //         console.log(err);
            //         rej(err);
            //     }else{
            //         console.log(doc);
            //     }
            // }).then(respon=>{
            //     console.log(respon);
            //     res(respon);
            // });
            // let id=mongoose.Types.ObjectId('5d1798aaec271d4da702687b');
            // // console.log(id);
            // let iid='5d1798aaec271d4da702687b';
            // console.log(iid);
            // userModel.find({_id:id},(err,doc)=>{
            //     console.log(doc);
            // });
            // userModel.findById(id,(err,doc)=>{
            //     console.log(doc);
            // });
            // mongoose.model('user').find({_id:id},(err,doc)=>{
            //     console.log(doc);
            // });
            MongoClient.connect(url,(err,db)=>{
                userModel.findById(userId,(err,result)=>{
                    // console.log(result);
                    res(result);
                });
            });
        });
    },
    findByMail:(mail)=>{
        return new Promise((res,rej)=>{
            userModel.find({email:mail},(err,user)=>{
                if(err){
                    rej(err);
                }else{
                    console.log(user);
                    res(user);
                }
            });
        });
       
    }
}