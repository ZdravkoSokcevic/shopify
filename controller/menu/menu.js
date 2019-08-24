const mongoose=require('mongoose');
const Menu=require('../../model/menu.js');
const Order=require('../../model/orders');

const mongoClient=require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let menuController= {
    insertMenu: (req, res) => {
        let data = req.body;
        let insertData = {
            id: makeRandomId('20'),
            category: data.category,
            name: data.name,
            desc: data.desc,
            price: data.price
        };
        Menu.collection.insert(insertData, (err, doc) => {
            if (err) {
                res.writeHead(404);
                res.write('Something went wrong');
            } else {
                res.writeHead(200);
                res.write('Success');
            }
            res.end();
        });
    },
    getAllMenus: (req, res) => {
        Menu.find((err, docs) => {
            if (err) {
                res.end(err);
            } else {
                res.end(JSON.stringify(docs));
            }
        });
    },
    findById: (menuId) => {
        return new Promise((res, rej) => {
            let data = Menu.find({id: menuId});
            res(data.exec());
        });
    },
    allCategories: () => {
        return new Promise((res, rej) => {
            let query = Menu.find({}).select('category -_id').distinct('category');
            query.exec((err, doc) => {
                if (err)
                    rej(err);
                res(doc);
            });
        });
    },
    deleteById: function (id) {
        return new Promise((resolve, rejection) => {
            console.log("tu si");
            let query = Order.deleteMany({menu: id});
            let menuToDelete = Menu.deleteMany({id: id});
            resolve(true);
        });
    }
}
let makeRandomId=(length)=>{
    let letters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id='';
    for(let x=0;x<length;x++){
        id+=letters.charAt(Math.floor(Math.random()*letters.length));
    }
    return id;
}

module.exports=menuController;