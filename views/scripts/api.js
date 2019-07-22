let BASE_URL='http://localhost:9999';

let api={
    allMenus:$.get(BASE_URL+'/menu/all', '',function(data, textStatus, jqXHR){
        // passing string data to function
        fillWithElements.menus(data);
    })
        // .then(res=>{
        //     console.log(res);
        // })
}