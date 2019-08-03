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