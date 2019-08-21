const mongoose = require('mongoose');
const userModel = require('../model/user');
const ordersModel = require('../model/orders');
const userController=require('./user/user');
const menuController=require('../controller/menu/menu');
const menuModel = require('../model/menu');

async function getAll(req, res) {
    let allUsers = await userController.all();
    let allMenus = await findAllMenus();
    let orders = await findAllOrders();
    let joinData = joinDocs(allMenus, allUsers, orders);
    return joinData;
}

let findAllUsers = () => {
    return new Promise((res, rej) => {
        userModel.find({}, (err, users) => {
            if (err) {
                rej(err);
            } else {
                let userData=[];
                users.forEach((user,index)=>{
                    let obj={};
                    for(let x in user)
                    {
                        obj[x]=user[x];
                    }
                    // obj['id']=mongoose.Types.ObjectId(user._id);
                    // console.log(obj.id);
                    userData.push(obj);
                    // userData[index]['id']=mongoose.Types.ObjectId(user._id);
                });
                // console.log(userData);
                res(JSON.parse(JSON.stringify(userData)));
            }
        });
    });
}

let findAllMenus = () => {
    return new Promise((res, rej) => {
        menuModel.find({}, (err, menus) => {
            if (err) {
                rej(err);
            } else {
                res(JSON.parse(JSON.stringify(menus)));
            }
        });
    });
}

let findAllOrders = () => {
    return new Promise((res, rej) => {
        ordersModel.find({}, (err, orders) => {
            if (err) {
                rej(err);
            } else {
                res(JSON.parse(JSON.stringify(orders)));
            }
        });

    });

}


let joinDocs = (menus, users, orders) => {
    return new Promise((resolve, rejection) => {
        let data = [];
        for (let x = 0; x < orders.length; x++) {
            let id=orders[x].userId;
            let sinObjData={};
            let user={};
            let menuObj={};
            // console.log(id);
            userController.findById(orders[x].user).then((res)=>{
                for(let x in res){
                    user[x]=res[x];
                }
                menuController.findById(orders[x].menu).then((result)=>{
                    // console.log(`Menu in orders: ${JSON.stringify(result)}`);
                    let obbj=JSON.parse(JSON.stringify(result));
                    // console.log(`OBBJ: ${JSON.stringify(obbj)}`);
                    for(let x in obbj)
                    {
                        menuObj[x]=obbj[x];
                        // console.log(obbj[x]);
                    }
                    // console.log(menuObj);
                }).then(()=>{
                    let obj=[];
                    const AllData=Object.assign({},menuObj,user);
                    data.push(AllData);
                });
                

            });
            //  cloning two objects menu and user
            if(x==orders.length-1){
                // console.log(data);
                
                resolve(data);
            }
        }
        
    });
}

module.exports = getAll;