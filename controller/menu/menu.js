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
            // console.log(`Menu id :${menuId}`);
            
            // mongoClient.connect(url,(err,db)=>{
            //     let dbo=db.db("shopify");
            //     dbo.collection('menus').find({_id:menuId}).toArray((err,menus)=>{
            //         console.log(`Menu inside ${JSON.stringify(menus)}`);                    
            //         res(menus);
            //     });
                
            // });
            // idd=mongoose.Types.ObjectId();
            // let data=Menu.find({'_id':'ObjectId('+idd+')'},(err,doc)=>{
            // console.log(err);
            //     res(doc);
            // });
            let data=Menu.findById(menuId);
            console.log(data.exec());
            res(data.exec());

            // Menu.find({},(err,doc)=>{
            //     console.log(doc);
            //     res(doc);
            // });

            // Menu.findById(menuId,(err,doc)=>{
            //     console.log(doc);
            //     res(doc);
            // })
        });
    }

}

module.exports=menuController;