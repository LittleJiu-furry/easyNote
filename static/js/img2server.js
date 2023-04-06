function readAsDataURL(data)
{
    if(typeof FileReader=='undifined')          //判断浏览器是否支持filereader
    {
        alert("<p>抱歉，你的浏览器不支持 FileReader</p>")
        return false;
    }
    var file = data;
    if(!/image\/\w+/.test(file.type))           //判断获取的是否为图片文件
    {
        alert("请确保文件为图像文件");
        return false;
    }
    var reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = (e)=>
    {
        let http = new XMLHttpRequest
        http.open("POST","/api/upload.php")
        http.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        http.send("filedata=" + reader.result)
    }
}

function upFile(event) {
	const file = event.target.files[0] || event.dataTransfer.files[0] || this.file.files[0];
	readAsDataURL(file)
}
