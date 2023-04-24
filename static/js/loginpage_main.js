function loginAction(){
    if(document.querySelector("#userAccount").value == "" || document.querySelector("#userPwd").value == ""){
        alert("账户名或密码不能为空！")
        return
    }
    let acp = new authClass();
    let http = new XMLHttpRequest();
    let p = acp.dex(document.querySelector("#userPwd").value,"","","")
    http.open("GET","/api/auth/")
    
}


function regAction(){
    window.location.href = "/reg/"
}

function loginAsQQ(){
    alert("正在加急更新中，尽请期待！")
    // window.location.href = "/api/qqconnect/oauth/"
}

