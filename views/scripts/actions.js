var LOGIN_PICTURE_CLICK=0;
let listeners={
    addListener:(item,data='',typeOf='')=>{
        // console.log(typeOf);
        switch(typeOf)
        {
            case 'allMenus': {
                leftSidebar.menu.addEventListener('click',(e)=>{
                    console.log(data);
                    toggle.show(detailModal.container);
                    detailModal.intialStyle();
                    detailModal.fillModal('menu',data);
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
                        console.log(data);
                    });
                });
            };break;
            case 'myOrders': {
                if( isAdmin() ) {
                    leftSidebar.myOrders.addEventListener( 'click', ()=> {
                        if( isAdmin() ) {
                            api.myOrders().then( data=> {
                                console.log( data );
                            });
                        }
                       
                    });
                }
            }
        }
        
    },
    // Ovdje treba napisati listener za kartice i sve premjestiti iz actions i fillModal
    cardsClick:( type,data )=> {

    },
    closeModalBtnListener:(item)=>{
        item.addEventListener('click',(e)=>{
            detailModal.container.style.display='none';
        })
    }
}