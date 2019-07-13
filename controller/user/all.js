const userModel=require('../../model/user');
const mongoose=require('mongoose');
let allUsers=(req,res)=>{
    // userModel.find((err,doc)=>{
    //     if(err){
    //         res.end("Nisu pronadjeni korisnici");
    //     }else{
    //         let userData=[];
    //         doc.forEach((user,index)=>{
    //             userData.push(user);
    //             userData[index]['id']=mongoose.Types.ObjectId(user._id);
    //         });
    //         res.end(JSON.stringify(userData));
    //     }
    // })
    userModel.find().then(result=>{
        resultData=[];
        result.forEach(user=>{
            resultData.push(user);
        });
        res.end(JSON.stringify(resultData));
    }).catch(err=>{
        console.log(err);
    });
}

module.exports=allUsers;