const model=require('../../model/user.js');


async function storeUsers(request,response){
    return new Promise((res,rej)=>{
        let data={
            ime:request.body.ime,
            email:request.body.email,
            password:request.body.password
        };
        model.collection.insert(data,(err,docs)=>{
            if(err){
                rej(err);
            }else{
                console.log(docs);
                response.write(JSON.stringify(docs));
                response.end();
            }
        });
    }).catch(e=>{
        console.log(e);
    });
}
module.exports=storeUsers;

