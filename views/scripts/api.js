const BASE_URL='http://localhost:9999/';

// $.ajaxSetup({
//     beforeSend:(xhr)=>{
//         xhr.setRequestHeader('Content-Type','application/json');
//     }
    
// });

let api={
    allMenus:()=>{
        return new Promise((res,rej)=>{
            $.get(BASE_URL+'menu/all', '').then(data=>{
                res(data);
            });
        });
    },
    sendLoginData:(formData)=>{
        return new Promise((res,rej)=>{
            $.ajax({
                type: 'POST',
                url: BASE_URL+'user/login',
                data: formData,
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "text",
                statusCode:{
                    404:()=>{
                        console.log("not found");
                    },
                    500:()=>{
                        console.log("Internal server error");
                    },
                    400:()=>{
                        console.log("Invalid request");
                    },
                    200:(data)=>{
                        res(data);
                        console.log("All ok");
                    }
                }
            })
        });
    },
    allOrders:()=> {
        return new Promise( (res,rej) =>{
            if( isAdmin() ) {
                $.get( BASE_URL + 'orders/all' ).then(result=>{
                    res( result );
                });
            }

        });
        
    },
    allUsers:()=> {
        return new Promise( (res,rej)=> {
            if( isAdmin() ) {
                
            }
        });
    }
}
