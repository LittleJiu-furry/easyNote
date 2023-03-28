function loginAction(){
    // 登录动作

    // 先获得数据
    let Account = document.querySelector("input#userAccount").value
    let userPwd = document.querySelector("input#userPwd").value

    // 保护数据
    let Pwd = strEnc(userPwd)
    let http = new XMLHttpRequest()
    http.open("POST","/api/login.php")

}

function getPwd(){
    let http = new XMLHttpRequest()
    http.open("GET","/api/login.php?op=2")


}

function regAction(){
    window.location.href = "/reg/"
}

function loginAsQQ(){
    alert("正在加急更新中，尽请期待！")
    // window.location.href = "/api/qqconnect/oauth/"
}

