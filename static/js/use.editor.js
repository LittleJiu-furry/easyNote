var converter = new showdown.Converter() // 初始化转换器

$("#editordiv").bind("input propertychange",function(){
    console.log(document.querySelector("#editordiv").innerText)
    document.querySelector(".textbody>.show").innerHTML = converter.makeHtml(document.querySelector("#editordiv").innerText)
})
