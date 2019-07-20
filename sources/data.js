const userModel = require('../model/user');
const ordersModel = require('../model/orders');
const menuModel = require('../model/menu');
const fs = require('fs');

// const workersPath='workers.json';
const workersPath = 'sources/workers.json';
const menuPath = 'sources/menus.json';
const ordersPath = 'orders.json';

const dir=__dirname;
// console.log(`Dir: ${dir}`);
// userModel.collection.drop();
// ordersModel.collection.drop();
// menuModel.collection.drop();

async function insertData(){
    await insertMenu();
    await insertUsers();
    let success=insertOrders().then(result=>{
        console.log(result);
    });

}

let insertMenu=()=>{
    return new Promise((res,rej)=>{
        let userData;
    //    console.log(fs.lstatSync(menuPath).isDirectory());
            fs.readFile(menuPath,'utf8', (err, data) => {
                if(err){
                    console.log(err);
                }
                let doc = JSON.parse(data.toString());
               
                let insdata = [];
                for (let x = 0; x < doc.length; x++) {
                    let menuId=Math.random().toString(36).substring(5);
                    Object.assign(doc[x],{'id':menuId});
                    
                    // console.log(doc[x]);
                    let obj = doc[x];
                    menuModel.collection.insert(doc[x]);
                }
                res(true);
            });
        
    
    });
    // fs.readFile(ordersPath, (err, data) => {
    //     let doc = JSON.parse(data.toString());
    //     let insdata = [];
    //     for (let x = 0; x < doc.length; x++) {
    //         let obj = doc[x];
    //         ordersModel.collection.insert(obj);
    //     }
    // });

}

let insertUsers=()=>{
    return new Promise((res,rej)=>{
            fs.readFile(workersPath, (err, data) => {
                let doc = JSON.parse(data.toString());
                let insdata = [];
                for (let x = 0; x < doc.length; x++) {
                    let userId=Math.random().toString(36).substring(5);
                    Object.assign(doc[x],{'id':userId});
                    let obj = doc[x];
                    userModel.collection.insertOne(obj,(err,result)=>{
                    });
                }
                res(true);
            });
        
    });
}


let insertOrders=()=>{
    return new Promise((res,rej)=>{
        menuModel.find({},(err,menus)=>{
            // console.log(menus);
            for(let x=0;x<menus.length;x++){
                console.log(menus[x].id);
                insertOrderWithUser(menus[x].id);
            }
            // res(doc);
        });
    });
}

let insertOrderWithUser=(menuId)=>{
    if(menuId!==undefined){
        let userData=[];
        require('../controller/user/user').all().then(result=>{
            // console.log(JSON.stringify(result));
            let userId=result[Math.floor(Math.random()*result.length)].id;
            console.log(userId);
            let insertObject={
                menu:menuId,
                user:userId,
                count:Math.random()*100
            }
            ordersModel.collection.insert(insertObject);
        });
        // userModel.find({},(err,doc)=>{
        //     let userId=Math.floor(Math.random(doc.length));
        //     console.log(userId);
        // });
    }
}

module.exports = insertData;