const mongoose=require('mongoose');
const order=require('../controller/orders/order');
const menu=require('../controller/menu/menu');
const user=require('./user/user');

async function oneData(req){
    let orderId=req.query.id;
    if(orderId!==undefined){
        let matchOrder=await order.find(orderId);
        
        let matchMenu=await menu.findById(matchOrder.menuId);
        return {matchOrder,matchMenu};
    }else{
        return false;
    }
}  

module.exports=oneData;