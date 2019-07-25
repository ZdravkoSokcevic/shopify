let dom={
    logo:document.getElementById('logo').children[0],
    navbarRight:document.getElementById('nav-right'),
    loginButton:document.getElementById('nav-right').children[0],
    loginPicture:document.getElementById('nav-right').children[1],
    mainCards:document.getElementsByClassName('main-section')[0],
    leftNavbar:document.getElementsByClassName('left-navbar')[0],
    defaultImage:'/assets/pictures/default-food.jpg'   
}


let detailModal={
    container:document.getElementsByClassName('detail-modal')[0],
    // For menus
    title:document.getElementsByClassName('detail-modal')[0].children[0].children[1].children[0],
    category:document.getElementsByClassName('detail-modal')[0].children[0].children[1].children[1],
    detailImage:document.getElementsByClassName('detail-modal')[0].children[0].children[0].children[0],
    closeButton:document.getElementsByClassName('detail-modal__close_btn')[0],
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
    fillModal:(dataType,data)=>{
        detailModal.setTitle(data.name);
        detailModal.setCategory(data.category);
        (data.image!==undefined && data.image!=='')?detailModal.src=data.image:detailModal.src=dom.defaultImage;
        // console.log(detailModal.detailImage);
    listeners.closeModalBtnListener(detailModal.closeButton);
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

let styleBeforeLogin={
    loginBtn:()=>{
        dom.loginPicture.style.display='none';
        dom.loginButton.style.display='visible';
    }
}

//  Fill dom elements with api's data
let fillWithElements={
    menus:(menus)=>{
        // console.log(menus);
        let data=JSON.parse(menus);
        for(let i=0;i<data.length;i++)
        {
            let objectData=data[i];
            fillDomCards.menu(objectData,i);
        }
    }
}

let fillDomCards={
    menu:(data,i)=>{
        // console.log(data);

        //  main div is container,div is one card
        let mainDiv=document.querySelector('.cards');
        let card=document.createElement('div');
        card.className+='card';
        // console.log(dom.mainCards);
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

        listeners.addListener(card,data,'allMenus');
    }
}


// console.log(dom.leftNavbar);