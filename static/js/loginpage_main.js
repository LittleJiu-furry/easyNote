function loginAction(){
    if(document.querySelector("#userAccount").value == "" || document.querySelector("#userPwd").value == ""){
        alert("账户名或密码不能为空！")
        return
    }
    eval('(()=>{'+'let _p = document.querySelector("#userAccount").value;'+'let _a = document.querySelector("#userPwd").value;'+'let __ = new Hashes.MD5;'+'let ___ = __.hex(_a);'+'let _0x97__ = new Object();'+'_0x97__["em"] = _p;'+'_0x97__["pwd_sha256"] = ___;'+'_0x97__["login_type"] = 1;'+'let _0x83 = JSON.stringify(_0x97__);'+'document.cookie = "u_token="+_0x83+"; expires=0; path=/";'+'let _h = new XMLHttpRequest();'+'_h.open("GET","/api/login.php");'+'_h.setRequestHeader("Content_Type","application/form-data");'+'_h.send();'+'})()')
}


function regAction(){
    window.location.href = "/reg/"
}

function loginAsQQ(){
    alert("正在加急更新中，尽请期待！")
    // window.location.href = "/api/qqconnect/oauth/"
}

