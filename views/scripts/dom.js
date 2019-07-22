let dom={
    logo:document.getElementById('logo').children[0],
    navbarRight:document.getElementById('nav-right'),
    loginButton:document.getElementById('nav-right').children[0],
    loginPicture:document.getElementById('nav-right').children[1],
    mainCards:document.getElementsByClassName('main-section')[0],
    leftNavbar:document.getElementsByClassName('left-navbar')[0]   
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
        console.log(data);

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
        title.innerHTML=data.category;
        card.appendChild(title);

        let price=document.createElement('div');
        price.className+='card__price';
        price.innerHTML=data.price+' din';
        card.appendChild(price);

        card.addEventListener('click',()=>{
            listeners.addListener(card,data);
        });
    }
}

styleBeforeLogin.loginBtn();
console.log(dom.leftNavbar);