const mongoose=require('mongoose');
const UserController=require('../controller/user/user');
const OrdersController=require('../controller/orders/order');
const MenuController=require('../controller/menu/menu');

const session=require('express-session');

let BaseController={
    allData:async function returnallData(){
        let allOrd=await allOrders();
        let contents=[];
        for(let order of allOrd){
            // console.log(`Order: ${order}`);
            contents.push(await OrdersController.find(order._id));
            // console.log(`Contents: ${contents}`)
        }
        return contents;
    },
    // get all data by user id
    findByUserId:async function get(id){
            let data=[];
            let orderData=await OrdersController.where('user',id);
            for(let order of orderData){
                await MenuController.findById(order.menu).then(result=>{
                    data.push({"Menu":result,"Order":order});
                });
                
            }
        return data;
    },
    ordersForLoggedIn:(req,res,next)=>{
        return new Promise((resolve,rejection)=>{
            let loggedUser=req.session.user;
            if(loggedUser!==undefined){
                BaseController.findByUserId(loggedUser.id).then(orders=>{
                    resolve(orders);
                });
            }else{
                resolve('You must be logged in for this');
            }
        });
        
    }
}


let allOrders=()=>{
    return new Promise((res,rej)=>{
        let allData=[];
        OrdersController.allOrders().then(orders=>{
            if(orders){
                res(orders);
            }else{
                rej('nesto');
            }
            // res(orders);
        });
    });
    

}

let allData=(collection)=>{
    let allDatas=[];
            orders.forEach(element => {
                OrdersController.find(element._id).then(buildedOrders=>{
                    // console.log(`BuildedOrders ${JSON.stringify(buildedOrders)}`);
                    allDatas.push(buildedOrders);
                });
            });
            if(allData!=[] && allData!={} && allData!=' '){
                res(allData);
            }else{
                res(orders);
            }
}

module.exports=BaseController;



