function geticp_info(obj){
    let http = new XMLHttpRequest()
    http.open("GET","/api/geticp.php")
    http.send()
    http.onreadystatechange = ()=>{
        if(http.readyState == 4){
            obj.innerHTML = (http.responseText == "" || http.responseText == null)?"备案号":http.responseText
        }
    }
}