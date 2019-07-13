$('#potvr').on('click', () => {
    let obj = {
        ime: $('#ime').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };
    console.log(obj);
    callApi(JSON.stringify(obj));
});

let callApi = (dataObj) => {
    $.ajax({
        type: "post",
        url: "http://localhost:9999/user/insert",
        data: dataObj,
        contentType: 'application/json',
        async: true,
        success: function(response) {
            console.log(response);
        }
    });
}