function check(){
    // 请求服务器检查登录情况，并请求用户的基本信息
    let http = new XMLHttpRequest()
    http.open("GET","/api/login.php")
    http.send()
    http.onreadystatechange = (e)=>{
        if(http.readyState == 4){
            // // 返回模拟数据
            // let login_info = {
            //     "login":"true",
            //     "name":"狐小九Little_Jiu",
            //     "icon":"./static/img/testicon.jpg"
            // }
            let login_info = JSON.parse(http.responseText)

            // let login_info = JSON.parse(http.respondText)

            if(login_info.login == "true"){
                document.querySelector("div[login]").style = ""
                document.querySelector("#usericon").src = login_info.icon
                document.querySelector("#username").innerHTML = "<a href='javascript:void(0)'>" + login_info.name + "</a>"
            }else{
                document.querySelector("div[nologin]").style = ""
            }

            // 请求笔记记录列表
            // getNoteList()
        }
    }
}

function getNoteList(){
    let http = new XMLHttpRequest()
    http.open("GET","/api/getnote_list.php")
    http.send()
}


check()