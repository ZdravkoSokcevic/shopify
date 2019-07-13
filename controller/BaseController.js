const mongoose=require('mongoose');
const UserController=require('../controller/user/user');
const OrdersController=require('../controller/orders/order');
const MenuController=require('../controller/menu/menu');


async function returnData(){
 let allOrd=await allOrders();
 let contents=[];
for(let order of allOrd){
    // console.log(`Order: ${order}`);
    contents.push(await OrdersController.find(order._id));
    console.log(`Contents: ${contents}`)
}
return contents;
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
                // console.log(element._id);
                OrdersController.find(element._id).then(buildedOrders=>{
                    // console.log(`BuildedOrders ${JSON.stringify(buildedOrders)}`);
                    allDatas.push(buildedOrders);
                });
                // allData.push(OrdersController.find(element._id));
            });
            // console.log(`AllData ${JSON.stringify(allData)}`);
            if(allData!=[] && allData!={} && allData!=' '){
                res(allData);
            }else{
                res(orders);
            }
}

module.exports=returnData;