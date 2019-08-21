
// $('#potvr').on('click', () => {
//     let obj = {
//         ime:        $('#ime').val(),
//         email:      $('#email').val(),
//         password:   $('#password').val(),
//         type:       $('#type').val()
//     };
//     console.log(obj);
//     callApi(JSON.stringify(obj));
// });

// let callApi = (dataObj) => {
//     $.ajax({
//         type:           "post",
//         url:            "http://localhost:9999/user/insert",
//         data:           dataObj,
//         contentType:    'application/json',
//         async:          true,
//         success: function(response) {
//         }
//     });
// }


jQuery(document).ready( function(){
    intializeStart();
    //styleBeforeLogin.loginBtn();
});


let intializeStart=()=>{
    if ( isLoggedIn() ) {
        dom.loginPicture.style.display = 'block';
        dom.loginButton.style.display = 'none';
        dom.loginPicture.src=(getLoggedIn().image)?getLoggedIn().image:dom.defaultImage;
        dom.loginPicture.addEventListener('click',()=>{
            listeners.addListener(dom.loginPicture,'','profile-picture');
        });
        // add listener to logout
        listeners.addListener('','','logoutUser');
    }else{
        // listeners.addListener('','','logoutUser');
        styleBeforeLogin.loginBtn();
    }
    listeners.addListener(leftSidebar.menu,'','allMenus');
    listeners.addListener(leftSidebar.allOrders,'','allOrders');
    listeners.addListener(leftSidebar.myOrders,'','myOrders');
    listeners.addListener(leftSidebar.allUsers,'','allUsers');
    api.allMenus().then(data=>{
        fillWithElements.menus(data);
    });
    loginModal.intialStyle();
    listeners.addListener(dom.loginButton,'','loginBtnClick');
}


let storage={
    get:key=>{
        return (localStorage.getItem(key)!==null)?localStorage.getItem(key):false
    }
}