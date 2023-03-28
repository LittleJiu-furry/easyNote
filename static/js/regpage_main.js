var temp = new Object()
function save(i){
    let ele,newEle
    switch(i){
        case 1: // 用户昵称
            ele = document.querySelector("#name")
            if(ele.value == "" || ele.value == undefined){
                shakeElement(ele,500)
                showErrorBlock("请填写昵称!")
            }
            else{
                temp.name = ele.value
                document.querySelector("#inputName").innerHTML = ele.value
                ele.parentElement.style.opacity = "0"
                window.setTimeout(()=>{
                    ele.parentElement.style.zIndex = "-50"
                    ele.parentElement.hidden = true
                    newEle = document.querySelector(".card[type='email']")
                    newEle.hidden = false
                    newEle.style.zIndex = "2"
                    window.setTimeout(()=>{
                        newEle.style.opacity = "1"
                    },300)
                },550)
            }
            break;
        case 2: // 用户邮箱
            ele = document.querySelector("#email")
            if(ele.value == "" || ele.value == undefined){
                shakeElement(ele,500)
                showErrorBlock("请填写邮箱！")
            }else{
                // 正则匹配，检查是否符合邮箱输入标准
                let RegExresult = ele.value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi)
                if(RegExresult != null){
                    // 符合标准
                    temp.email = ele.value
                    let http = new XMLHttpRequest()
                    http.open("GET","/api/sendVef.php?email="+ele.value+"&use="+temp.name)
                    http.send()
                    ele.parentElement.style.opacity = "0"
                    window.setTimeout(()=>{
                        ele.parentElement.style.zIndex = "-50"
                        ele.parentElement.hidden = true
                        newEle = document.querySelector(".card[type='emailVef']")
                        newEle.hidden = false
                        newEle.style.zIndex = "2"
                        window.setTimeout(()=>{
                            newEle.style.opacity = "1"
                        },300)
                    },550)
                }
                else{
                    shakeElement(ele,500)
                    showErrorBlock("邮箱格式不正确，请检查输入")
                }
            }
            break;
        case 6: // 邮箱验证码
            document.querySelector("#Vefnext").disabled = true
            ele = document.querySelector("#emailVef")
            if(ele.value == "" || ele.value == undefined){
                shakeElement(ele,500)
                showErrorBlock("请填写验证码！")
                document.querySelector("#Vefnext").disabled = false
            }
            else{
                let http = new XMLHttpRequest()
                http.open("GET","/api/checkVef.php?code=" + ele.value + "&em=" + temp.email)
                http.send()
                http.onreadystatechange = ()=>{
                    if(http.readyState == 4){
                        let j = JSON.parse(http.responseText)
                        if(j.code != 0){
                            shakeElement(ele,500)
                            showErrorBlock(j.msg)
                            document.querySelector("#Vefnext").disabled = false
                        }else{
                            ele.parentElement.style.opacity = "0"
                            window.setTimeout(()=>{
                                ele.parentElement.style.zIndex = "-50"
                                ele.parentElement.hidden = true
                                newEle = document.querySelector(".card[type='Fpwd']")
                                newEle.hidden = false
                                newEle.style.zIndex = "2"
                                window.setTimeout(()=>{
                                    newEle.style.opacity = "1"
                                },300)
                            },550)
                        }
                    }
                }
            }
            break;
        case 3: // 第一次输入密码
            ele = document.querySelector("#Fpwd")
            if(ele.value == "" || ele.value == undefined){
                shakeElement(ele,500)
                showErrorBlock("请填写密码!")
            }else{
                temp.pwd = ele.value
                ele.parentElement.style.opacity = "0"
                window.setTimeout(()=>{
                    ele.parentElement.style.zIndex = "-50"
                    ele.parentElement.hidden = true
                    newEle = document.querySelector(".card[type='Spwd']")
                    newEle.hidden = false
                    newEle.style.zIndex = "2"
                    window.setTimeout(()=>{
                        newEle.style.opacity = "1"
                    },300)
                },550)
            }
            break;
        case 4: // 重复验证密码
            ele = document.querySelector("#Spwd")
            if(ele.value == "" || ele.value == undefined){
                shakeElement(ele,500)
                showErrorBlock("你还没有填写任何内容!")
            }else{
                if(ele.value != temp.pwd){
                    shakeElement(ele,500)
                    showErrorBlock("两次输入的密码不匹配")
                }
                else{
                    // 为login页面设置cookie
                    document.cookie = "_input_em=" + temp.email+"; path=/login/;"
                    // 提交数据至服务器，由服务器完成保存工作
                    let http = new XMLHttpRequest()
                    http.open("POST","/api/saveUser.php")
                    http.setRequestHeader("Content-Type: application/x-www-from-urldecode")
                    http.send("d="+JSON.stringify(temp))
                    window.location.replace("/login/")
                }
            }

    }
}

function shakeElement(obj,time){
    let timeID, oc = 0
    obj.style.position="relative"
    window.setTimeout(()=>{
        clearInterval(timeID)
        obj.style = ""    
    },time)
    timeID = window.setInterval(()=>{
        if(oc == 0){
            obj.style.right = "unset"
            obj.style.left = "3px"
            oc = 1
        }
        else{
            obj.style.left = "unset"
            obj.style.right = "3px"
            oc = 0
        }        
    },75)
}

function showErrorBlock(errormsg){
    let errele = document.querySelector(".showError")
    errele.innerHTML = errormsg
    errele.style.right = "10px"
    window.setTimeout(()=>{
        errele.style.right = "-1000px"
    },3000)
}

function returnEmail(){
    let ele = document.querySelector(".card[type='emailVef']")
    ele.style.opacity = "0"
    ele.style.zIndex = "-50"
    window.setTimeout(()=>{
        let ole = document.querySelector(".card[type='email']")
        ele.hidden = true
        ole.hidden = false
        ole.style.zIndex = "2"
        window.setTimeout(()=>{
            ole.style.opacity = "1"
        },300)
    },550)
}

function resendVef(btnobj){
    btnobj.disabled = true
    let Time = new Date()
    let disTime = Time.getTime()
    let _TimerID

    let http = new XMLHttpRequest()
    http.open("GET","/api/reSendVef.php?em=" + temp.email + "&inputuser=" + temp.name)
    http.send()
    http.onreadystatechange = ()=>{
        if(http.readyState == 4){
            btnobj.innerHTML = "30s"
            showErrorBlock("验证码已经重发，请注意查收")
            // 嵌套函数，用于实现定时器自销毁
            function clear(ID){
                clearInterval(ID)
            }

            // 30s倒计时，实现按钮点击事件节流并实现倒计时显示
            _TimerID = window.setInterval(()=>{
                let now = new Date().getTime()
                if(now - disTime > 30*1000){
                    btnobj.disabled = false
                    btnobj.innerHTML = "重新发送"
                    clear(_TimerID)
                }
                else{
                    btnobj.innerHTML = (30-Math.round((now-disTime)/1000)) +"s"
                }
            },1000)
        }
    } 
}

function returnFpwd(){
    let ele = document.querySelector(".card[type='Spwd']")
    ele.style.opacity = "0"
    ele.style.zIndex = "-50"
    window.setTimeout(()=>{
        let ole = document.querySelector(".card[type='Fpwd']")
        ele.hidden = true
        ole.hidden = false
        ole.style.zIndex = "2"
        window.setTimeout(()=>{
            ole.style.opacity = "1"
        },300)
    },550)
}
