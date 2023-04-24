var converter = new showdown.Converter() // 初始化转换器
var perviewElement = "" // 预览显示元素

// md解析配置
converter.setOption("tables",true) // 表格解析
converter.setOption("smoothLivePreview",true) // 平滑预览
converter.setOption("simplifiedAutoLink",true)


// jQuery 支持 监听输入以及内容改变
$("#editordiv").bind("input propertychange",function(){
    let intext = document.querySelector("#editordiv").innerText
    // 实现总字数显示
    document.querySelector("#totalLetter").innerHTML = intext.length
    // 处理尾部转义换行不生效的问题
    intext = intext.replace(/\\$/gms,"<br>")
    document.querySelector("#showmd").innerHTML = converter.makeHtml(intext)
})

// 工具栏按钮响应中转函数
function toolbar_click(type,obj){
    switch(type){
        case 1:
            let frec = document.querySelector("#uploadFile")
            frec.click()
            break
        case 2:
            // 撤销
            break
        case 3:
            // 恢复
            break
        case 4:
            // 保存
            break
        case 5:
            // 预览
            let previewElement = document.querySelector("#showmd")
            let editorElement = document.querySelector(".textbody>.eidback")
            if(previewElement.hidden){
                obj.querySelector("img").src = "./static/svg/text_hideAc.svg"
                editorElement.style.width = "50%"
                window.setTimeout(()=>{
                    previewElement.hidden = false
                    window.setTimeout(()=>{
                        previewElement.style.width = "calc(50% - 5px)"
                    },30)
                },30)
            }
            else{
                previewElement.style.width = "0px"
                editorElement.style.width = "100%"
                obj.querySelector("img").src = "./static/svg/text_showAc.svg"
                window.setTimeout(()=>{
                    previewElement.hidden = true
                },900)
            }
            break
        case 6:
            // 未在编辑状态下的按钮
            // 进入编辑状态
            document.querySelector(".toolbar[type='no_editStatus']").style.display = "none"
            document.querySelector(".toolbar[type='editStatus']").style = ""
            document.querySelector(".pre").style.width = "calc(50% - 5px)"
            window.setTimeout(()=>{
                document.querySelector(".eidback").hidden = false
                window.setTimeout(()=>{
                    document.querySelector(".eidback").style.width = "50%"
                },30)
                
            },30)
            break
        case 7:
            // 保存并退出编辑状态
            toolbar_click(4,obj) // 执行保存的操作
            document.querySelector(".toolbar[type='editStatus']").style.display = "none"
            document.querySelector(".toolbar[type='no_editStatus']").style = ""
            document.querySelector(".pre").style.width = "100%"
            document.querySelector(".eidback").style.width = "0"
            window.setTimeout(()=>{
                document.querySelector(".eidback").hidden = true
            },1000)
            break
        case 8:
            // 关于编辑器
            const AboutBack =  document.querySelector(".about_back")
            AboutBack.style.zIndex = "5"
            AboutBack.hidden = false

            
    }
}


 
$("#editordiv").on("paste", function (event) {
    textPaste(event)
});
 
function textPaste(event) {
    event.preventDefault();
    var text;
    var clp = (event.originalEvent || event).clipboardData;
    // 兼容针对于opera ie等浏览器
    if (clp === undefined || clp === null) {
        text = window.clipboardData.getData("text") || "";
        if (text !== "") {
            if (window.getSelection) {
            // 针对于ie11 10 9 safari
                var newNode = document.createElement("span");
                newNode.innerHTML = text; 
                window.getSelection().getRangeAt(0).insertNode(newNode);
            } else {
            // 兼容ie10 9 8 7 6 5
                document.selection.createRange().pasteHTML(text);
            }
        }
    } else {
     // 兼容chorme或hotfire
        text = clp.getData('text/plain') || "";
        if (text !== "") {
            document.execCommand('insertText', false, text);
        }
    }
}
 
var showLeftLayoutMenuElement = null;
function rightMenu(e,obj){
    //取消默认的浏览器自带右键 很重要！！
    showLeftLayoutMenuElement = obj
    e.preventDefault();

    //获取我们自定义的右键菜单
    let menu = document.querySelector(".leftmenuLayout");

    //根据事件对象中鼠标点击的位置，进行定位
    menu.style.left=e.clientX+'px';
    menu.style.top=e.clientY+'px';

    // 重置显示的内容
    obj = document.querySelector(".leftmenuLayout>.item[data-i]")
    obj.dataset["i"] = 1
    obj.querySelector("img").src = "./static/svg/Layout_del.svg"
    obj.querySelector("span").innerHTML = "删除"

    //改变自定义菜单的高宽，让它显示出来
    menu.style.height='auto';
    menu.style.width='auto';
    menu.style.zIndex="100"
}

//关闭右键菜单
function layoutCheck(e,obj,type){
    switch(type){
        case 1:
            // 删除-第一次
            if(obj.dataset["i"] == 1){
                obj.querySelector("img").src = "./static/svg/Layout_del2.svg"
                obj.querySelector("span").innerHTML = "确认删除么？"
                obj.dataset["i"] = 2
            }
            else if(obj.dataset["i"] == 2){
                    //用户触发click事件就可以关闭了
                    document.querySelector('.leftmenuLayout').style.height = 0;
                    document.querySelector('.leftmenuLayout').style.width = 0;
                    if(showLeftLayoutMenuElement != null){
                        let data_i = showLeftLayoutMenuElement.dataset["id"]
                        showLeftLayoutMenuElement.remove()
                        if(showLeftLayoutMenuElement.getAttribute("type") == "menu select"){
                            // 被选择的元素
                            // 删除页面的显示内容
                        }
                    }
                    showLeftLayoutMenuElement = null
                    obj.dataset["i"] = 1
                    obj.querySelector("img").src = "./static/svg/Layout_del.svg"
                    obj.querySelector("span").innerHTML = "删除"
            }
            break
        case 2:
            // 关闭菜单
            document.querySelector('.leftmenuLayout').style.height = 0;
            document.querySelector('.leftmenuLayout').style.width = 0;
            obj = document.querySelector(".leftmenuLayout>.item[data-i]")
            obj.dataset["i"] = 1
            obj.querySelector("img").src = "./static/svg/Layout_del.svg"
            obj.querySelector("span").innerHTML = "删除"
            break
    }



}
