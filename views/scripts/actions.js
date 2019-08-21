var LOGIN_PICTURE_CLICK=0;
let listeners={
    addListener:(item,data='',typeOf='')=>{
        switch(typeOf)
        {
            case 'allMenus': {
                leftSidebar.menu.addEventListener('click',(e)=>{
                    api.allMenus().then( data=> {
                        fillWithElements.menus( data );
                    });
                    
                });
            };break;
            case 'login': {
                item.addEventListener('click',forms.sendLoginForm);
            };break;
            case 'loginBtnClick': {
                dom.loginButton.addEventListener('click',()=>{
                    loginModal.show();
                    // when we click submit button
                    document.addEventListener( 'keydown' ,(e)=> {
                        if(e.which==13 || e.keyCode==13){
                            validateBeforeSend.login();
                        }
                    })
                    loginModal.loginSubmit.addEventListener( 'click' ,(e)=> {

                        validateBeforeSend.login();
                    });
                });
                loginModal.closeButton.addEventListener( 'click' ,()=> {
                    loginModal.intialStyle();
                });
                // loginModal.show();
            };break;
            case 'profile-picture': {
                if( LOGIN_PICTURE_CLICK++%2 ) {
                    userInfo.hide();
                }else{
                    userInfo.show();
                    userInfo.infoContainer.style.display='flex';
                }
                
                
            };break;

            case 'allOrders': {
                leftSidebar.allOrders.addEventListener('click',()=>{
                    if( isAdmin() ) {
                        api.allOrders().then( res=> {
                            fillWithElements.allOrders( res );
                        });
                    }
                });
            };break;
            case 'allUsers': {
                leftSidebar.allUsers.addEventListener('click', ()=> {
                    api.allUsers().then( data=> {
                        fillWithElements.allUsers( data );
                    });
                });
            };break;
            case 'myOrders': {
                    leftSidebar.myOrders.addEventListener( 'click', ()=> {
                        if( isLoggedIn() ) {
                            api.myOrders().then( data=> {
                                let Menu  = data[0].Menu;
                                let Order = data[1].Order;
                                fillWithElements.myOrders( data );
                            });
                        }   
                    });
            };break;
            case 'logoutUser': {
                dom.logoutButton.addEventListener( 'click',()=> {
                    api.logout().then( res=> {
                        if( res ) {
                            session.removeLocal();
                            userInfo.infoContainer.style.display='none';
                            dom.loginButton.style.display='block';
                            dom.loginPicture.style.display='none';
                        }
                    });
                });
            };break;
            case 'makeOrder': {
                // ToDo add form which has an input as quantity
                item.addEventListener( 'click',()=> {
                    if( isLoggedIn() ) {
                        detailModal.setViewContext( 'makeOrder' );
                        // detailModal.makeOrderInput.value='';
                        detailModal.makeOrderSinglePrice.innerHTML= data.price;
                        detailModal.makeOrderFullPrice.innerHTML= data.price;
                        var quantity='';
                        let fullPrice=1;
                        detailModal.makeOrderInput.addEventListener( 'keyup',(e)=> {
                            fullPrice= data.price*detailModal.makeOrderInput.value;
                            detailModal.makeOrderFullPrice.innerHTML= fullPrice;
                            // quantity+=e.key;
                        });
                        
                        //  Here we make order
                        var sendData={
                            quantity    : detailModal.makeOrderInput.value,
                            price       : data.price,
                            menuId      : data.id
                        }
                        detailModal.makeOrderSubmit.addEventListener( 'click',()=> {
                            
                            forms.makeOrderForm( sendData );
                        });
                    }
                });  
            };break;
            case 'deleteOrder':
            {
                item.addEventListener( 'click',()=> {
                    
                });
            }
        }
        
    },
    // Ovdje treba napisati listener za kartice i sve premjestiti iz actions i fillModal
    cardsClick:( element,data,context )=> {
        switch(context)
        {
            case 'menuCard': {
                element.addEventListener( 'click',(e)=> {
                    if( e.target.className.includes('fas') )
                        listeners.addListener( e.target,data,'makeOrder' );
                    else detailModal.fillModal( 'allMenus',data );
                });
            };break;
            case 'allOrderCard': {
                element.addEventListener( 'click',()=> {
                    detailModal.fillModal( 'allOrders',data );
                });
            };break;
            case 'allUsers': {
                element.addEventListener( 'click',()=> {
                    detailModal.fillModal( 'allUsers',data );
                });
            };break;
            case 'myOrders': {
                element.addEventListener( 'click',()=> {
                    detailModal.fillModal( 'myOrders',data );
                });
            }
        }
    },
    closeModalBtnListener:(item)=>{
        item.addEventListener('click',(e)=>{
            detailModal.container.style.display='none';
        })
    }
}

let simulateAction=( jqElement,action )=> {
    // let event=new MouseEvent( action,{ 
    //     bubbles     : true,
    //     cancelable  : true,
    //     view        : window 
    // });

    // let canceled=!element.dispatchEvent(event);
    // // element.removeEventListener(action,)


    // let event;
    // if(document.createEvent) {
    //     event = document.createEvent('event');
    //     event.initEvent( action,true,true );
    // } else {
    //     event = document.createEventObject();
    //     event.eventType = action;
    // }

    // event.eventName = action;

    // if( document.createEvent ) {
    //     element.dispatchEvent( event );
    // } else {
    //     element.fireEvent( 'on' + eventType,event ); 
    // }
    jqElement.show();
    jqElement.focus();
    jqElement.click();
    jqElement.hide();
    
}