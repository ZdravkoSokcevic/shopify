const mongoose = require('mongoose');
const Orders=require('../../model/orders');
const Menu=require('../../model/menu');
const User=require('../../model/user');

const MenuController=require('../../controller/menu/menu');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let orderController={
    storeOrders : (req, res) => {
        let data = req.body;
        let insertData = {
            userId: data.user,
            menuId: data.menu,
            count: data.count,
            date: new Date()
        }
        Orders.collection.insert(insertData, (err, doc) => {
            let message = '';
            if (err) {
                message = err;
            } else {
                message = 'Uspesno dodato';
            }
            res.write(JSON.stringify(message));
            res.end();
        });
    },
    allOrders : (req, res) => {
        return new Promise((resolve,rejection)=>{
            require('../../model/orders').find({},(err, doc) => {
                console.log(doc);
                if (err) {
                    rejection(err);
                }else{
                    resolve(doc);
                }
            });
        });
        
    },
    find:(oId)=>{
        return new Promise((res,rej)=>{
            oId=mongoose.Types.ObjectId(oId);
            let query=Orders.find({_id:oId}).populate('users').populate('menus');
            query.exec((err,doc)=>{

                let allData=[];
                allData.push({"Order:":doc});
                let menuId=doc[0].menu;
                let userId=doc[0].user;
                Menu.find({id:menuId}).then(menuResult=>{
                    return menuResult;//Object.assign(resObjData,menuResult);
                }).then((menuObj)=>{
                    allData.push({"Menu":menuObj});
                    User.find({id:userId},{'password':0},(err,user)=>{
                        let userObj={};
                        allData.push({"User":user});
                        res(allData);
                    });
                    
                });
                
                
            });


            // let allData=[];
            // Orders.aggregate([{
            //     $lookup:{
            //         from:'menu',
            //         localField:"_id",
            //         foreignField:"menu",
            //         as:"menuOrder"
            //     }
            // },{
            //     $lookup:{
            //         from:'user',
            //         localField:"_id",
            //         foreignField:"user",
            //         as:"userOrder"
            //     }
                
            // }]).exec((err,doc)=>{
            //     console.log(doc);
            //     // res(doc);
            //     allData.push(doc);
            // });
            // allData.forEach(elem=>{
            //     console.log(elem);
            // });
            // res(allData);

            //  not returning user and menu
            // let query=Orders.findById(oId);
            // // console.log(query.exec());
            // let data=query.exec().then((err,doc)=>{
            //     console.log(doc);
            //     res(doc);
            //     let user=mongoose.Types.ObjectId(doc.user);
            //     console.log(user);
            // });

            // console.log(data.menu);
            // console.log(Menu.findById(data.menuId).exec());
            // res(query.exec());

            // MongoClient.connect(url,(err,db)=>{
            //     // let dbo=db.db("shopify");
                
            //     // dbo.collection('orders').find({_id:oId}).toArray((err,result)=>{
            //     //     console.log(result);
            //     //     res(result);
            //     // });
            // });
        });
    },
    where:(column,value)=>{
        return new Promise((res,rej)=>{
            try{
                console.log(column);

                let object={};
                object[column]=value;
                Orders.find(object,(err,doc)=>{
                    if(err){
                        let message='Not found';
                        res(message);
                    }else{
                        res(doc);
                    }
                });
            }catch(e){
                res(e);
            }
        });
        
    }
    

}
module.exports = orderController;