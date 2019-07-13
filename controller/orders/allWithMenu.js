const mongo=require('mongodb').MongoClient;
const mongoose=require('mongoose');
const db=mongoose.createConnection('mongodb://localhost:27017/shopify',{useNewUrlParser:true});
async function getAllData(){
    var menu=await getAllFromMenu();
    var orders=await getAllFromOrders();
    let obj={menu:menu,orders:orders};
    var finalData=await groupData(obj);
    return finalData;
}

function getAllFromMenu(){
    return new Promise((res,rej)=>{
        let data=[];
        db.collection('menus').find().toArray((err,doc)=>{
            if(doc){
                for(let x in doc){
                    data.push(doc[x]);
                }
                res(data);
            }else{
                rej(err);
            }
        });
    });
}

function getAllFromOrders(){
    return new Promise((res,rej)=>{
        let data=[];
        // db.collection.aggregate($lookup:{from: 'menu'}).toArray((err,doc){
        //     console.log(doc);
        // });
        db.collection('orders').find().toArray((err,doc)=>{
            if(doc){
                for(let x in doc){
                    data.push(doc[x]);
                }
                res(data);
            }else{
                rej(err);
            }
        });
    });
}

function groupData(obj,res){
    // console.log(obj.menu[0]._id);
    obj.menu=JSON.parse(JSON.stringify(obj.menu));
    obj.orders=JSON.parse(JSON.stringify(obj.orders));
    let menu=[];
    let orders=[];
    let full_obj=[];
    for(let x in obj.menu){
        menu.push(JSON.stringify(obj.menu[x]));
    }
    for(let y in obj.orders){
        orders.push(JSON.stringify(obj.orders[y]));
    }
    // console.log(typeof orders,typeof menu);
    // console.log(JSON.parse(orders[0])._id);
    menu.forEach(menuItem => {
        let singleMenu=JSON.parse(menuItem);
        
        orders.forEach(ordersItem => {
            let order=JSON.parse(ordersItem);
            if(singleMenu._id==order._id){
                // console.log('isti');
                for(let x in order){
                    singleMenu[x]=order[x];
                }
            }
        });
        full_obj.push(singleMenu);
    });
    return full_obj;
}

module.exports=getAllData;