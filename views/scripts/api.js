let BASE_URL='http://localhost:9999';


let api={
    allMenus:()=>{
        return new Promise((res,rej)=>{
            $.get(BASE_URL+'/menu/all', '').then(data=>{
                res(data);
            });
        });
        
    }
}
