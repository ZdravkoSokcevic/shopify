let detailModalAnimation={
    
}

let toggle={
    hide:(element)=>{
        element.style.display='none'
    },
    show:(element)=>{
        element.style.display='block';
    }
}

let expandCard=( context )=> {
    for( let x=0;x<leftSidebar.container.children.length;x++ )
    {
        // console.log( leftSidebar.container.children.length );
        leftSidebar.container.children[x].style.backgroundColor='#fff';
    }
    
    switch( context )
    {
        case 'allMenus':
        {
            leftSidebar.menu.style.backgroundColor='lightblue';
        };break;
        case 'allOrders':
        {
            leftSidebar.allOrders.style.backgroundColor='lightblue';
        };break;
        case 'allUsers':
        {
            leftSidebar.allUsers.style.backgroundColor='lightblue';
        };break;
        case 'myOrders':
        {
            leftSidebar.myOrders.style.backgroundColor='lightblue';
        };break;
    }
}