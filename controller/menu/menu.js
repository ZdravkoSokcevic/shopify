const mongoose=require('mongoose');
const Menu=require('../../model/menu.js');

const mongoClient=require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let menuController={
    insertMenu:(req,res)=>{
        let data=req.body;
        let insertData={
            category:data.category,
            name:data.name,
            desc:data.desc,
            price:data.price
        };
        Menu.collection.insert(insertData,(err,doc)=>{
            //console.log(err);
            if(err){
                res.writeHead(404);
                res.write('Something went wrong');
            }else{
                res.writeHead(200);
                res.write('Success');
            }
            res.end();
        });
    },
    getAllMenus:(req, res) => {
        Menu.find((err, docs) => {
            if (err) {
                res.end(err);
            } else {
                console.log(docs);
                res.end(JSON.stringify(docs));
            }
        });
    },
    findById:(menuId)=>{
        return new Promise((res,rej)=>{
            let data=Menu.find({id:menuId});
            console.log(data.exec());
            res(data.exec());
        });
    }

}

module.exports=menuController;