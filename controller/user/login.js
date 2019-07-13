const mongoose=require('mongoose');
const session=require('express-session');
const userModel=require('../../model/user');
const app=require('../../app');
const view=__dirname+'/../../views/html/';
let login=(request,res)=>{
    return new Promise((resolve,reject)=>{
        let req=request.body;
        let data={
            email:req.email,
            password:req.password
        };
        console.log(data);
        userModel.find(data,(err,doc)=>{
            if(!doc.length){
                //not logged in
                res(false);
            }else{
                //logged in
                res(true);
            }
            
            // res.end();
        });
    });
    
    
}

module.exports=login;