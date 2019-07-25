let listeners={
    addListener:(item,data='',typeOf='')=>{
        // console.log(typeOf);
        switch(typeOf)
        {
            case 'allMenus':{
                item.addEventListener('click',(e)=>{
                    console.log(data);
                    toggle.show(detailModal.container);
                    detailModal.intialStyle();
                    detailModal.fillModal('menu',data);
                });
            };break;
            case 'login':{
                item.addEventListener('click',forms.sendLoginForm);
            };break;
            case 'loginBtnClick':{
                // console.log(loginModal.container);
                dom.loginButton.addEventListener('click',()=>{
                    loginModal.show();
                    // when we click submit button
                    document.addEventListener('keydown',(e)=>{
                        if(e.which==13 || e.keyCode==13){
                            validateBeforeSend.login();
                        }
                    })
                    loginModal.loginSubmit.addEventListener('click',(e)=>{

                        validateBeforeSend.login();
                    });
                });
                loginModal.closeButton.addEventListener('click',()=>{
                    loginModal.intialStyle();
                });
                // loginModal.show();
            };break;
        }
        
    },
    closeModalBtnListener:(item)=>{
        item.addEventListener('click',(e)=>{
            detailModal.container.style.display='none';
        })
    }
}