const BASE_URL='http://localhost:9999/';

// $.ajaxSetup({
//     beforeSend:(xhr)=>{
//         xhr.setRequestHeader('Content-Type','application/json');
//     }
    
// });

let api={
    allMenus:()=>{
        return new Promise( (res,rej)=> {
            $.get(BASE_URL+'menu/all', '').then(data=>{
                res(data);
            });
        });
    },
    sendLoginData:(formData)=>{
        return new Promise( (res,rej)=> {
            $.ajax({
                type: 'POST',
                url: BASE_URL + 'user/login',
                data: formData,
                async:true,
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "text",
                statusCode:{
                    404:()=> {
                        console.log( "not found" );
                    },
                    500:()=> {
                        console.log( "Internal server error" );
                    },
                    400:()=> {
                        console.log( "Invalid request" );
                    },
                    200:(data)=> {
                        res( data );
                        console.log( "All ok" );
                    }
                }
            })
        });
    },
    logout:()=> {
        if( isLoggedIn() ) {
            return new Promise( (res,rej)=> {
                $.get( BASE_URL + 'user/logout').then( result=> {
                    res(result);
                });
            });
            
        }
    },
    allOrders:()=> {
        return new Promise( (res,rej) => {
            if( isAdmin() ) {
                $.get( BASE_URL + 'orders/all' ).then( data=> {
                    res( data );
                });
            }

        });
        
    },
    allUsers:()=> {
        return new Promise( (res,rej)=> {
            if( isAdmin() ) {
                $.get( BASE_URL + 'users/all' ).then( data=> {
                    res( data );
                });
            }
        });
    },
    myOrders:()=> {
        return new Promise( (res,rej)=> {
            if( isAdmin() ) {
                $.get( BASE_URL + 'orderedById?id=' + getLoggedIn().id ).then( data=> {
                   res( data );
                });
            }
        });
    },
    menuById:( menuId )=> {
        return new Promise( (res,rej)=> {
            if( isLoggedIn() ) {
                $.get( BASE_URL + 'orders/find?id=' + menuId ).then( data=> {
                    res( data );
                });
            }
        });
    },
    getCategories: ()=> {
        return new Promise( (res,rej)=> {
            if( isLoggedIn() ) {
                $.get( BASE_URL + 'categories/all' ).then( categories=> {
                    res( categories );
                });
            }
        });
    },
    sendAddUserData: (formData)=> {
        return new Promise( ( res,rej )=> {
            $.ajax({
                method  : 'POST',
                url     : BASE_URL + 'user/insert',
                data    : formData,
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "text",
                statusCode:{
                    404:()=> {
                        console.log( "not found" );
                    },
                    500:()=> {
                        console.log( "Internal server error" );
                    },
                    400:()=> {
                        console.log( "Invalid request" );
                    },
                    200:(response)=> {
                        res( response );
                        console.log( "All ok" );
                    }
                }

            })
        });
    },
    sendAddMenuForm:( formData )=> {
        return new Promise( ( res,rej )=> {
            console.log(formData.image);
            $.ajax({
                method  : 'POST',
                url     : BASE_URL + 'menu/insert',
                data    : formData,
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: "text",
                statusCode:{
                    404:()=> {
                        console.log( "not found" );
                    },
                    500:()=> {
                        console.log( "Internal server error" );
                    },
                    400:()=> {
                        console.log( "Invalid request" );
                    },
                    200:(response)=> {
                        res( response );
                        console.log( "All ok" );
                    }
                }

            })
        });
    }
}
