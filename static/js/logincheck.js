function check(){
    // 请求服务器检查登录情况，并请求用户的基本信息
    
    // 返回模拟数据
    let login_info = {
        "login":"false",
        "name":"狐小九Little_Jiu",
        "icon":"./static/img/testicon.jpg"
    }
    login_info = JSON.parse(JSON.stringify(login_info))
    
    // let login_info = JSON.parse(http.respondText)

    if(login_info.login == "true"){
        document.querySelector("div[login]").style.display = "inline-flex"
        document.querySelector("#usericon").src = login_info.icon
        document.querySelector("#username").innerHTML = "<a href='javascript:void(0)'>" + login_info.name + "</a>"
    }else{
        document.querySelector("div[nologin]").style.display = "inline-flex"
    }
}

check()