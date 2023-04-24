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
    // 配置样式
    const se_ele = document.querySelector("div[type='menu select']")
    if(se_ele == obj.parentElement){
        // 点击了自己，不进行操作
        return ;
    }
    se_ele.setAttribute("type","menu")
    obj.parentElement.setAttribute("type","menu select")
    // 重新进入未编辑状态
    document.querySelector(".toolbar[type='editStatus']").style.display = "none"
    document.querySelector(".toolbar[type='no_editStatus']").style = ""
    document.querySelector(".pre").hidden = false
    window.setTimeout(()=>{
        document.querySelector(".pre").style.width = "100%"
    },10)
    document.querySelector(".eidback").style.width = "0"
    window.setTimeout(()=>{
        document.querySelector(".eidback").hidden = true
    },1000)
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
            const prev = document.querySelector("#showmd")
            left_ele.setAttribute("type","hide")
            me.title = "展开侧边栏"
        },300)
    }
    else if(left_ele.getAttribute("type") == "hide"){
        // 隐藏了
        left_ele.style.left = "0"
        document.querySelector(".textbody").style.width = "calc(100% - 168px)"
        const prev = document.querySelector("#showmd")
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

function newNoteID(){
    let t = new Date().getTime()
    let md5 = new Hashes.MD5
    return md5.hex(t + "utext_easynote_" + Math.random()).substr(0,6)
}


function addNewNote(){
    const newNoteNode = document.createElement("div");
    let noteID = newNoteID()
    newNoteNode.dataset["id"] = "utext-" + noteID;
    newNoteNode.setAttribute("type","menu");
    newNoteNode.oncontextmenu = (ev)=>{
        rightMenu(ev,this)
    }
    newNoteNode.innerHTML = '\
        <div onclick="leftMenu(this,1)">\
            <span id="title">新的笔记</span>\
            <div>\
            </div>\
        </div>\
        <span>></span>\
    ';
    document.querySelector(".leftmenu>.menushow").appendChild(newNoteNode);
    window.setTimeout(()=>{
        const se_ele = document.querySelector("div[type='menu select']")
        se_ele.setAttribute("type","menu")
        newNoteNode.setAttribute("type","menu select")
        document.querySelector("#editStatusBtn").click()
    },30)
    

    
    
}

function closeAbout(){
    const AboutBack =  document.querySelector(".about_back")
    AboutBack.style.zIndex = "-50"
    AboutBack.hidden = true
}

