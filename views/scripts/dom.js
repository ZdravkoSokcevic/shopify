const colors={
}   

let dom={
    logo:document.getElementById('logo').children[0],
    navbarRight:document.getElementById('nav-right'),
    loginButton:document.getElementById('nav-right').children[0],
    loginPicture:document.getElementById('nav-right').children[1],
    mainCards:document.getElementsByClassName('main-section')[0],
    leftNavbar:document.getElementsByClassName('left-navbar')[0],
    profileModal:document.getElementsByClassName('header__profile-modal')[0],
    defaultImage:'/assets/pictures/default-food.jpg',
    addButton:document.getElementsByClassName('fa-plus-circle')[0],
    logoutButton:document.getElementsByClassName('logout')[0]
}


let detailModal={
    container:document.getElementsByClassName('detail-modal')[0],
    // For menus
    title:document.getElementsByClassName('detail__about-titleText')[0],
    category:document.getElementsByClassName('detail__about-category')[0],
    detailImage:document.getElementsByClassName('detail__picture_img')[0],
    closeButton:document.getElementsByClassName('detail-modal__close_btn')[0],
    // for all users
    userContainer:document.getElementsByClassName('user_detail__modal')[0],
    userImg:document.getElementsByClassName('user_detail_modal_img')[0],
    userAbout:document.getElementsByClassName('user_detail__modal_about')[0],
    // for all orders
    ordersContainer:document.getElementsByClassName('all_orders_modal')[0],
    orderImage:document.getElementsByClassName('all_orders_modal__img')[0],
    orderTitle:document.getElementsByClassName('all_orders_title')[0],
    orderUserContainer:document.getElementsByClassName('all_orders_user')[0],
    orderUserPhoto:document.getElementsByClassName('all_orders_user_photo')[0],
    orderUserInfo:document.getElementsByClassName('all_orders_user_info')[0],
    orderDescription:document.getElementsByClassName('all_orders_description')[0],
    // for logged in user orders
    myOrdersContainer:document.getElementsByClassName('my_orders_modal')[0],
    myOrdersImage:document.getElementsByClassName('my_orders_modal_img')[0],
    myOrdersTitle:document.getElementsByClassName('my_orders_modal__description__title')[0],
    myOrdersCategory:document.getElementsByClassName('my_orders_modal__description__category')[0],
    myOrdersOrderCount:document.getElementsByClassName('my_orders_modal__description__order')[0],
    myOrdersOrderPrice:document.getElementsByClassName('my_orders_modal__description__price')[0],
    myOrdersOrderTotal:document.getElementsByClassName('my_orders_modal__description__total')[0],
    // Add new user form for admin
    addUserForm:document.getElementsByClassName('add_user_modal')[0],
    addUserImage:document.getElementsByClassName('add_user_modal_form__image_div')[0],
    inputImage:document.getElementById('add_user_modal_form_image-input'),
    addUserSubmit:document.getElementsByClassName('add_user__submit_button')[0],
    addUserReset:document.getElementsByClassName('add_user__reset_button')[0],
    userNameInputField:document.getElementById('add_user_name_input'),
    userEmailInputField:document.getElementById('add_user_email_input'),
    userPasswordInputField:document.getElementById('add_user_password_input'),
    userPsswdRepeatInputField:document.getElementById('add_user_repeat_password'),
    userTypeInputField:'user',
    userTypeButtons:document.getElementsByClassName('user-type__button'),
    userTypeUserButton:document.getElementsByClassName('user-type__user')[0],
    userTypeAdminButton:document.getElementsByClassName('user-type__admin')[0],
    // add new food to menu form for admin
    addMenuContainer:document.getElementsByClassName('add_menu_modal')[0],
    addMenuForm:document.getElementsByClassName('add_menu_modal_form')[0],
    addImageDivField:document.getElementsByClassName('add_menu_modal__image-div_main')[0],
    addImageInput:document.getElementById('add_menu_modal__image-input'),
    addMenuCategoryOption:document.getElementsByClassName('add_menu__category')[0],
    addMenuNameInputField:document.getElementById('add_menu__name'),
    addMenuPriceInputField:document.getElementById('add_menu__price'),
    addMenuDescriptionInputField:document.getElementById('add_menu__description'),
    addMenuSubmitButton:document.getElementsByClassName('add_menu__submit')[0],
    addMenuResetButton:document.getElementsByClassName('add_menu__reset')[0],
    // addMenuImageInputFile:document.getElementById('add_menu_modal__image-input')[0],
    //  make order reference to div,container and elements
    makeOrderModal:document.getElementsByClassName('make_order_modal')[0],
    makeOrderContainer:document.getElementsByClassName('make_order__container')[0],
    makeOrderDiv:document.getElementsByClassName('make_order__div')[0],
    makeOrderInput:document.getElementById('make_order__order-quantity'),
    makeOrderSinglePrice:document.getElementsByClassName('make_order__single-price')[0],
    makeOrderFullPrice:document.getElementsByClassName('make_order__order-price')[0],
    makeOrderSubmit:document.getElementsByClassName('make_order__order-submit')[0],
    // methods for manipulate detail model,showing data from api
    show:()=> {
        detailModal.container.style.display='block';
    },
    intialStyle:()=>{
        detailModal.container.style.display='block';
        detailModal.container.style.zIndex=2000;
    },
    removeElement:()=>{
        detailModal.container.style.display='none';
    },
    setTitle:(title)=>{
        detailModal.title.innerHTML=title;
    },
    setCategory:(category)=>{
        detailModal.category.innerHTML=category;
    },
    userTypeButtonsIntialStyle:()=> {
        for( let x=0;x<detailModal.userTypeButtons.length;x++) {
            detailModal.userTypeButtons[x].style.backgroundColor='gray';
        }
    },
    fillModal:(dataType,data)=>{
        detailModal.container.focus();
        let childs=document.body.childNodes;
        // document.body.childNodes.opacity=0.1;
        
        // $(document).children().css('opacity','0.1');
        // // detailModal.container.css('opacity','1');
        // $(detailModal.container).css('opacity','1');
        
        switch( dataType ) {
            case 'allMenus':
            {
                detailModal.setTitle(data.name);
                detailModal.setCategory(data.category);
                (data.image!==undefined && data.image!=='')?detailModal.src=data.image:detailModal.src=dom.defaultImage;
                detailModal.setViewContext( 'allMenus' );
                detailModal.show();
                // document.getElementsByClassName('menu-modal')[0].style.display='none';
        // document.getElementsByClassName('user_detail__modal_img_div')[0].style.display='none';
                listeners.closeModalBtnListener(detailModal.closeButton);
            };break;
            case 'allOrders':
            {
                let Order=data.order;
                let Menu=data.menu;
                let User=data.user;
                try{
                    detailModal.orderImage.src=(Menu.image!==undefined && Menu.image!==null)?Menu.image:'/assets/images/default.jpg';
                }catch(e){
                    console.log(e);
                }
                detailModal.orderTitle.innerHTML=Menu.name;
                // ----------
                // To Do
                // ----------
                // detailModal.orderCount.innerHTML=Order.count;
                // detailModal.total.innerHTML=Order.count*Menu.price;
                try{
                    detailModal.orderUserPhoto.innerHTML=User.image||'/assets/images/default.jpg';
                }catch(e){
                    console.log(e);
                }
                detailModal.orderUserInfo.innerHTML=User.ime;
                detailModal.orderDescription.innerHTML=Menu.desc;
                
                detailModal.setViewContext( 'allOrders' );
                detailModal.show();
                listeners.closeModalBtnListener(detailModal.closeButton);
            };break;
            case 'myOrders':
            {
                let Object=data;
                detailModal.myOrdersTitle.innerHTML=data.menu.name;
                detailModal.myOrdersCategory.innerHTML=data.menu.category;

                detailModal.setViewContext( 'myOrders' );
                detailModal.show();
                listeners.closeModalBtnListener(detailModal.closeButton);
            };break;
            case 'allUsers':
            {

            };break;
           
        }
    },
    setViewContext:(context)=> {
        let childrens=detailModal.container.children[0];
        for( let x=0;x<childrens.children.length;x++) 
        {
            childrens.children[x].style.display='none';
        }

        switch( context )
        {
            case 'allOrders':
            {
                detailModal.ordersContainer.style.display='block';
            };break;
            case 'allMenus':
            {
                document.getElementsByClassName('menu-modal')[0].style.display='flex';
                
            };break;
            case 'myOrders':
            {
                detailModal.myOrdersContainer.style.display='flex';
                detailModal.myOrdersContainer.style.flexWrap='wrap';
            };break;
            case 'addUserAdmin':
            {
                detailModal.container.style.display='block';
                detailModal.addUserForm.style.display='flex';
                detailModal.addUserForm.style.flexDirection='row';

                // enable div click to input image
                detailModal.addUserImage.addEventListener( 'click',(inputClick)=> {
                let element=$('#add_user_modal_form_image-input');
                simulateAction( element,'click' );
                },false);

                detailModal.userTypeUserButton.style.backgroundColor='green';
                detailModal.userTypeUserButton.addEventListener( 'click',(e)=> {
                    detailModal.userTypeButtonsIntialStyle();
                    detailModal.userTypeUserButton.style.backgroundColor='green';
                    detailModal.userTypeInputField='user';
                });
                detailModal.userTypeAdminButton.addEventListener( 'click',(e)=> { 
                    detailModal.userTypeButtonsIntialStyle();                   
                    detailModal.userTypeAdminButton.style.backgroundColor='green';
                    detailModal.userTypeInputField='admin';
                });

                // add what happens when we click submit and reset button
                detailModal.addUserSubmit.addEventListener( 'click',()=> {
                    if( isAdmin() ) {
                        forms.sendAddUserForm();
                    }
                });
                listeners.closeModalBtnListener(detailModal.closeButton);
            };break;
            case 'addMenus':
            {
                // need to fetch categories from api

                detailModal.container.style.display='block';
                // detailModal.style.display='flex';
                detailModal.addMenuContainer.style.display='flex';
                detailModal.addMenuContainer.style.flexDirection='row';
                api.getCategories().then( result=> {
                    let res=JSON.parse(result);
                    for( let x=0;x<res.length;x++ ) {
                        let opt=document.createElement('option');
                        opt.value=res[x];
                        opt.innerHTML=res[x];
                        detailModal.addMenuCategoryOption.appendChild(opt);
                        detailModal.addMenuCategoryOption.style.display='block';
                    }
                    
                });
                detailModal.addImageDivField.addEventListener( 'click',()=> {
                    let imageDiv=$('#add_menu_modal__image-input');
                    simulateAction( imageDiv,'click' );
                })

                detailModal.addMenuSubmitButton.addEventListener( 'click',()=> {
                    forms.sendAddMenuForm();
                });

                listeners.closeModalBtnListener(detailModal.closeButton);
            };break;
            case 'makeOrder':
            {
                detailModal.container.style.display='block';
                detailModal.makeOrderModal.style.display='flex';
                detailModal.makeOrderContainer.style.display='flex';
                detailModal.makeOrderDiv.style.display='flex';
                listeners.closeModalBtnListener(detailModal.closeButton);
            };break;
            case 'none':
            {
                detailModal.container.style.display='none';
                detailModal.style.display='none';
            }
        }
    },
    showAddUserForm: ()=> {
        detailModal.setViewContext( 'addUserAdmin' );
    },
    showAddMenusForm: ()=> {
        detailModal.setViewContext( 'addMenus' );
    }
}

let loginModal={
    container:document.getElementsByClassName('modal-login-register')[0],
    emailInput:document.getElementsByClassName('login-email')[0],
    passwordInput:document.getElementsByClassName('login-password')[0],
    loginSubmit:document.getElementsByClassName('modal-login-form__submit-button')[0],
    register:document.getElementsByClassName('register')[0],
    forgotPsswd:document.getElementsByClassName('forgot-psswd')[0],
    closeButton:document.getElementsByClassName('close-login-modal__button')[0],
    intialStyle:()=>{
        loginModal.container.style.display='none';
    },
    show:()=>{
        loginModal.container.style.display='block';
        loginModal.container.style.zIndex=2000;
    }
}

let userInfo={
    infoContainer:document.getElementsByClassName('user-info')[0],
    userName:document.getElementsByClassName('user-info__username')[0],
    email:document.getElementsByClassName('user-info__email')[0],
    type:document.getElementsByClassName('user-info__type')[0],
    logout:document.getElementsByClassName('user-info__logout')[0],
    show:()=>{
        toggle.show(userInfo.infoContainer);
        userInfo.infoContainer.style.display='flex';
    },
    hide:()=>{
        toggle.hide(userInfo.infoContainer);
    }
}

let leftSidebar={
    container:document.getElementsByClassName('left-navbar')[0],
    menu:document.getElementsByClassName('menus')[0],
    myOrders:document.getElementsByClassName('My-Orders')[0],
    allOrders:document.getElementsByClassName('all_orders')[0],
    allUsers:document.getElementsByClassName('all_users')[0]
}

let styleBeforeLogin={
    loginBtn:()=>{
        dom.loginPicture.style.display='none';
        dom.loginButton.style.display='visible';
    }
}

//  Fill dom elements with api's data
let fillWithElements={
    menus:(menus)=>{
        emptyCards();
        expandCard( 'allMenus' );
        console.log(menus);
        // let data=JSON.parse( menus );
        data=menus;
        for(let i=0;i<data.length;i++)
        {
            let objectData=data[i];
            fillDomCards.menu(objectData,i);
        }
        dom.addButton.addEventListener( 'click',()=> {
            detailModal.showAddMenusForm();
        });
    },
    allOrders: (data)=> {
        emptyCards();
        expandCard( 'allOrders' );
        let orders=JSON.parse( data );
        for( let i=0;i<orders.length;i++ ) 
        {
            let order=orders[i];
            fillDomCards.allOrders( order,i );
        }
    },
    myOrders: (data)=> {
        emptyCards();
        expandCard( 'myOrders' );
        let Orders = JSON.parse( data );
        // let myData=[];
        for( let x=0;x<Orders.length;x++ )
        {
            fillDomCards.myOrders( Orders[x] );
        }
    },
    allUsers: (data)=> {
        let Users= JSON.parse( data );
        emptyCards();
        expandCard( 'allUsers' );
        //  Add user button click

        dom.addButton.addEventListener( 'click',()=> {
            detailModal.showAddUserForm();
        });
        for( let x=0;x<Users.length;x++ ) 
        {
            fillDomCards.allUsers( Users[x] );
        }
    }
}
// ------------------------------------
        // FILL CENTRAL CARDS
// ------------------------------------
let fillDomCards={
    menu:(data,i)=>{
        //  main div is container,div is one card
        let mainDiv=document.querySelector('.cards');

        let card=document.createElement('div');
        card.className+='card detail';
        card.setAttribute('data-id',data.id);
        mainDiv.appendChild(card);

        let image=document.createElement('img');
        image.className+='card__image';
        image.src='/assets/pictures/default-food.jpg';
        card.appendChild(image);
        
        // append image,title and price 
        let title=document.createElement('div');
        title.className='card__title';
        title.innerHTML=data.name;
        card.appendChild(title);

        let price=document.createElement('div');
        price.className+='card__price';
        price.innerHTML=data.price+' din';
        card.appendChild(price);

        let orderIcon=document.createElement('i');
        // // orderIcon.className+='fal fa-file-export my_orders_order';
        orderIcon.className+='fas fa-store my_orders__order';
        orderIcon.style.display='none';
        
        let deleteIcon=document.createElement('i');
        deleteIcon.className+='fa fa-trash-o my_orders__delete';
        deleteIcon.style.display='none';

        // console.log(deleteIcon);
        card.addEventListener( 'mouseenter',()=> {
            orderIcon.style.display='block';
            deleteIcon.style.display='block';
            card.style.color='red';
            card.style.fontSize=25+'px';
            card.style.fontWeight='bold';
        });
        card.addEventListener( 'mouseleave',()=>{
            orderIcon.style.display='none';
            deleteIcon.style.display='none';
            card.style.color='black';
            card.style.fontSize=18+'px';
            card.style.fontWeight='normal';
        });

        // listeners.addListener(orderIcon,data,'makeOrder');
        // listeners.addListener(deleteIcon,data,'deleteOrder');
        
        card.appendChild(orderIcon);
        card.appendChild(deleteIcon);

        listeners.cardsClick(card,data,'menuCard' );
        // listeners.addListener(card,data,'allMenus');
    },
    allOrders:( data,index )=> {
        
        const Order= data[0].Order[0];
        const Menu= data[1].Menu[0];
        const User= data[2].User[0];

        console.log(data);
        let mainDiv=document.querySelector('.cards');
        let card=document.createElement('div');
        card.className+='card';

        mainDiv.appendChild( card );

        let image=document.createElement('img');
        image.className+='card__image';
        image.src=Order.image || '/assets/pictures/default-food.jpg';
        card.appendChild(image);

        let title=document.createElement('div');
        title.className='card__title';
        title.innerHTML=Menu.name;
        card.appendChild(title);

        let price=document.createElement('div');
        price.className+='card__price';
        price.innerHTML=Menu.price+' din';
        card.appendChild(price);

        let dataObject={
            menu:   Menu,
            order:  Order,
            user:   User
        };
        listeners.cardsClick(card,dataObject,'allOrderCard');
    },
    myOrders:( data,index )=> {
        console.log(data);
        let Menu=data.Menu[0];
        let Order=data.Order;
        // console.log();
        
        // calculate full price of order
        console.log( data );
        let orderprice= ( Menu.price*Order.count ).toFixed(2);
        
        let mainDiv=document.querySelector('.cards');
        let card=document.createElement('div');
        card.className+='card';

        mainDiv.appendChild( card );

        let image=document.createElement('img');
        image.className+='card__image';
        image.src=Order.image || '/assets/pictures/default-food.jpg';
        card.appendChild(image);

        let title=document.createElement('div');
        title.className='card__title';
        title.innerHTML=Menu.name;
        card.appendChild(title);

        let price=document.createElement('div');
        price.className+='card__price';
        price.innerHTML=orderprice+' din';
        card.appendChild(price);

        let objectData={
            menu        : Menu,
            order       : Order,
            orderprice  : orderprice
        }
        listeners.cardsClick( card,objectData,'myOrders' );
    },
    allUsers:( user,index )=> {
        // emptyModal();

        let mainDiv=document.querySelector('.cards');
        let card=document.createElement('div');
        card.className+='card';

        mainDiv.appendChild( card );

        let image=document.createElement('img');
        image.className+='card__image';
        image.src=user.image || '/assets/pictures/default-food.jpg';
        card.appendChild(image);

        let name=document.createElement('div');
        name.className='card__title';
        name.innerHTML=user.ime;
        
        name.style.position='absolute';
        name.style.left='50%';
        card.appendChild(name);

        let userModal=document.getElementsByClassName('user_detail__modal')[0];

    }
}


let emptyCards=()=> {
    let mainContainer=dom.mainCards.children[0];
     while (mainContainer.hasChildNodes()) {
        mainContainer.removeChild( mainContainer.lastChild );
    }
}

let emptyModal=()=> {
    let childrens=detailModal.container.children;
    // console.log(childrens);
    for( let x=0;x<childrens.length;x++ )
    {
        // console.log(childrens[x]);
        childrens[x].style.display='none';
    }
}

// console.log(dom.leftNavbar);