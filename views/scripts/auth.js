let isAdmin=()=> {
    if( !isLoggedIn )
        return false;
    else{
        return ( isLoggedIn().type=='admin' )?true:false;
    }
}

let isLoggedIn=()=> {
    return (localStorage.getItem( 'user' )===null)?false:JSON.parse( localStorage.getItem('user') );
}

let getLoggedIn=()=> {

    return ( isLoggedIn() )?isLoggedIn():false;
}