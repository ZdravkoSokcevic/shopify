const mongoose=require('mongoose');
const User=require('../../model/user');
const UserController=require('../user/user');


module.exports={
    isAdmin:(req,res,next)=>{
        let user=req.session.user;
        try{
            let type=user.type;
            if(type!==undefined && type=='admin')
                return true;
            return false;
        }catch(e){
            return false;
        }
    },
    isLoggedIn:(req,res,next)=>{
        try{
            let user=req.session.user;
            if(user!==undefined)
                return true;
        }catch(e){
            return false;
        }
    }
};