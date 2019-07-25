
let forms={
    sendLoginForm:(email,password)=>{
        api.sendLoginData({email:email,password:password}).then(result=>{
            if(result.length){
                console.log("usao ovamo");
                // storeInDb(result);
                storeLocal(JSON.parse(result));
                loginModal.intialStyle();
            } else console.log("Invalid creditials");
            console.log(JSON.parse(localStorage.getItem('user')));
            clearFormData();
        })
        .catch(error=>{
            // console.log(error);
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