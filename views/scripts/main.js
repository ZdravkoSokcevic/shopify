
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
//             console.log(response);
//         }
//     });
// }
// console.log("tu jee");


$(window).on('load',()=>{
    intializeStart();
    // console.log(data);
    styleBeforeLogin.loginBtn();
    console.log(storage.get('loggedUser'));
});


let intializeStart=()=>{
    listeners.addListener(leftSidebar.menu,'','allMenus');
    listeners.addListener(leftSidebar.allOrders,'','allOrders');
    listeners.addListener(leftSidebar.myOrders,'','myOrders');
    listeners.addListener(leftSidebar.allUsers,'','allUsers');
    api.allMenus().then(data=>{
        // console.log(data);
        fillWithElements.menus(data);
    });
    loginModal.intialStyle();
    console.log(dom.loginButton);
    listeners.addListener(dom.loginButton,'','loginBtnClick');
}


let storage={
    get:key=>{
        return (localStorage.getItem(key)!==null)?localStorage.getItem(key):false
    }
}