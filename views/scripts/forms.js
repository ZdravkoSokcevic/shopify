let forms={
    sendLoginForm:(email,password)=>{
        api.sendLoginData({email:email,password:password}).then(result=>{
            // console.log(result);
            if(result.length && result){
                // console.log("usao ovamo");
                // storeInDb(result);
                // console.log(result);
                
                //  Setup profile picture
                dom.loginPicture.src=(result.image)?result.image:dom.defaultImage;
                dom.loginPicture.addEventListener('click',()=>{
                    listeners.addListener(dom.loginPicture,'','profile-picture');
                });
                
                storeLocal(JSON.parse(result));
                // isLoggedIn();
                console.log(isAdmin());
                loginModal.intialStyle();

                //  switch pictures
                dom.loginButton.style.display='none';
                dom.loginPicture.style.display='';
                // detailModal.detailImage.style.display='';
            } else console.log("Invalid creditials");
            console.log(JSON.parse(localStorage.getItem('user')));
            clearFormData();
        })
        .catch(error=>{
            // console.log(error);
        });

    },
    sendAddUserForm:()=> {
        let data={
            image       : detailModal.inputImage.value,
            password    : detailModal.userPasswordInputField.value,
            email       : detailModal.userEmailInputField.value,
            ime         : detailModal.userNameInputField.value,
            type        : detailModal.userTypeInputField
        };
        console.log(data);
        let validate=validateBeforeSend.addUser(data);
        console.log(validate);
        if(validate.success && validate.error==null) {
            // here data is good and ready to send to api
            api.sendAddUserData(data).then( response=> {
                console.log(response);
            });
        } else {
            // validatation doesn't match
        }
    },
    sendAddMenuForm:()=> {
        // console.log(detailModal.addMenuNameInputField);
        let data= {
            image   : detailModal.addImageInput.value,
            name    : detailModal.addMenuNameInputField.value,
            category: detailModal.addMenuCategoryOption.value,
            desc    : detailModal.addMenuDescriptionInputField.value,
            price   : detailModal.addMenuPriceInputField.value
        }
        let validate=validateBeforeSend.menuForm( data );
        api.sendAddMenuForm( data ).then( response=> {
            console.log(`Response: ${response}`);
            if( response=='Success' ){
                console.log("dobro je");
                detailModal.container.style.display='none';
                detailModal.addMenuContainer.style.display='none';
            }
                
        });
    }
}


validateBeforeSend={
    login:()=>{
        let emailValue=loginModal.emailInput.value;
        let passwordValue=loginModal.passwordInput.value;
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailSuccess=regex.test(String(emailValue).toLowerCase());
        // let psswRegex= /^(/sometext/)(/\w{6,15})$/);
        // let psswdSuccess=psswRegex.test(String(passwordValue));
        if(emailSuccess && passwordValue.length>6)
            forms.sendLoginForm(emailValue,passwordValue);
        else console.log("validacija nije prosla");

        
    },
    addUser:(data)=> {
        let requiredFields=[data.ime,data.email,data.password];
        for( let x=0;x<requiredFields.length;x++ ) 
        {
            if(requiredFields[x]=='' || requiredFields[x]==undefined) {
                return {
                    success:false,
                    error:'Fields are required'
                }
            }
        }
        // Check if passwords doesn't match
        if( detailModal.userPasswordInputField.value !== detailModal.userPsswdRepeatInputField.value ) {
            return {
                success:false,
                error: 'Passwords doesn\'t match'
            }
        }
        return {
            success:true,
            error: null
        }

    },
    menuForm:(data)=> {
        let requiredFields=[data.category,data.name,data.desc,data.price];
        for( let x=0;x<requiredFields.length;x++ ) 
        {
            if(requiredFields[x]=='' || requiredFields[x]==undefined) {
                return {
                    success:false,
                    error:'Fields are required'
                }
            }
        }
    }
}

let storeInDb=(data)=>{
    let db=openDatabase('user','1.0','User store',2*1024*1024);
    db.transaction(tx=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS (id unique,type,ime,email');
    })
}

let storeLocal=(data)=>{
    let storeObj={};
    if(typeof data=='object'){
        for(let x in data){
            if(x!='_id' && x!='password'){
                storeObj[x]=data[x];
            }
        }
    }
    localStorage.setItem('user',JSON.stringify(storeObj));
    
}


let clearFormData=()=>{
    loginModal.emailInput.value='';
    loginModal.passwordInput.value='';
}