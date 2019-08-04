var LOGIN_PICTURE_CLICK=0;
let listeners={
    addListener:(item,data='',typeOf='')=>{
        // console.log(typeOf);
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
                // console.log(loginModal.container);
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
                if( isAdmin() ) {
                    leftSidebar.myOrders.addEventListener( 'click', ()=> {
                        if( isAdmin() ) {
                            api.myOrders().then( data=> {
                                let Menu  = data[0].Menu;
                                let Order = data[1].Order;
                                fillWithElements.myOrders( data );
                            });
                        }
                       
                    });
                }
            }
        }
        
    },
    // Ovdje treba napisati listener za kartice i sve premjestiti iz actions i fillModal
    cardsClick:( element,data,context )=> {
        
        switch(context)
        {
            case 'menuCard': {
                element.addEventListener( 'click',()=> {
                    detailModal.fillModal( 'allMenus',data );
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