function showExMenu(){
    const obj = document.querySelector(".loginmune")
    if(obj.style.opacity == "1"){
        // 隐藏
        obj.style.height = "0px"
        window.setTimeout(()=>{
            obj.hidden = true
            obj.style.opacity = "0"
        },300)
    }
    else{
        obj.hidden = false
        obj.style.opacity = "1"
        obj.style.height = "100px"
    }
    
}

function reqLogin(){
    window.location.href = "/login/"
}


function reqReg(){
    window.location.href = "/reg/"
}

function leftMenu(obj,type){
    const se_ele = document.querySelector("div[type='menu select']")
    se_ele.setAttribute("type","menu")
    obj.parentElement.setAttribute("type","menu select")
}

function hideLeft(){
    const left_ele = document.querySelector("div.leftmenu")
    let me = document.querySelector(".hideleft")
    if(left_ele.getAttribute("type") == "_hide"){
        // 尚未隐藏
        document.querySelector(".leftmenu>.menushow").style.opacity = 0
        window.setTimeout(()=>{
            left_ele.style.left = "-150px"
            document.querySelector(".textbody").style.width = "calc(100% - 18px)"
            left_ele.setAttribute("type","hide")
            me.title = "展开侧边栏"
        },300)
    }
    else if(left_ele.getAttribute("type") == "hide"){
        // 隐藏了
        left_ele.style.left = "0"
        document.querySelector(".textbody").style.width = "calc(100% - 168px)"
        window.setTimeout(()=>{
            document.querySelector(".leftmenu>.menushow").style.opacity = 1
            left_ele.setAttribute("type","_hide")
            me.title = "折叠侧边栏"
        },500)  
    } 
}

function hile(){
    const left_ele = document.querySelector("div.leftmenu")
    if(left_ele.getAttribute("type") == "hide"){
        hideLeft()
    }
}


//保存选中内容
function saveSelectionText(){
    const contentDiv = document.querySelector("#editordiv")
    
}
