// 自定义加密方法
function Enc(data,key){
    // 通过私有的authcode标头向服务端申请加密密钥
    // 通过这个密码对authcode和需要加密的数据进行加密
    // 完成后将加密完成的密码放入authcode标头传递
    // 表单中传递的是加密后的authcode以及校验md5
    // 前后端交互使用base64进行简单混淆(需要混入混淆内容)
    // 混淆的内容可以在初次通信时就传递交换完成

    // authcode
    let = atob(data + key)
    let http = new XMLHttpRequest()
    http.open("POST","/api")
}