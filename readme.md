# <span style="color:red !important">重要</span>

本仓库的代码尚未完成，目前正在开发中，<span style="color:red !important"><b>目前请不要直接clone本仓库代码</b></span>，如果您clone了本仓库代码并部署上线，所有后果请您自负！

本仓库从未从未发布在处github之外的任何网站，仓库所有者也从未在github之外的任何git托管平台注册有账号，如果发现本项目出现在上述之外的任何git托管平台，请尽快联系[2638239785@qq.com](mailto:2638239785@qq.com?subject=no%20Gitcode）
# 介绍

这是一个不依赖于任何框架，使用纯PHP开发完成的一个笔记记录系统(PHP 7)\
本网站将计划支持

    1. 存储文件到对象存储系统
    2. 支持外链分享
    3. 支持Markdown语法


本项目的前后端分离较为明显，前端显示均由HTML+CSS+JS来完成(会使用到jQurey框架来实现一些功能)\
PHP将会做为最为纯后端来编写API,API文档将会托管到主站点

# 付费情况

本网站源码完全开源，不会设置任何收费门槛限制您的使用，网站也不会存在任何后门入口\
如果您觉得这个项目写的还很不错，可以通过为本项目点个免费的star，或者通过下面的途经向我进行赞助哦

![wechat pay]()
![alipay]()

# 数据库结构

|数据表名|用途|
|:---|---|
|p_setting|配置文件表，用于存储一些配置|
|p_user|用户信息表，用于存储用户信息|
|p_code|临时验证码表，用于存储正在生效的验证码|
|p_user_ex|用户拓展信息表，用于存储用户的拓展信息|
|p_img_ex|图像存储信息表，主要存储所有图像的索引|


- p_user表结构

本表要求uid、uuid、nick_account#nick_sign唯一

|字段值|类型|用途|
|---|---|---|
|uid|unsigned long|用户索引id,设置主键|
|uuid|text|用户唯一识别码|
|nick_account|text|用户自定义账户号码|
|nick_sign|text|用户标签|
|pwd_1|text|用户密码字段_1|
|pwd_2|text|用户密码字段_2|
|pwd_3|text|用户密码字段_3|
|pwd_i|text|用户密码结构索引|
|pwd_pwd|text|用户随机加密密钥|
|em|text|用户邮箱(base64)|
|nickname|text|用户昵称|
|reg_time|unsigned long|用户注册时间戳|
|code|text|用户验证码识别码|


- p_code表结构

|字段值|类型|用途|
|---|---|---|
|code_id|text|验证码唯一识别码|
|code_content|text|验证码内容|
|code_st|unsigned long|验证码生效时间|
|code_for|text|验证码生效用户，存储用户的uuid|


- p_user_ex表结构

|字段值|数据类型|描述|
|---|---|---|
|uid|int|用户索引id，设置主键，并设置接受来自p_user的外键约束|
|user_exaccount|longtext|用于存储用户的第三方账号信息|
|user_icon|longtext|用户头像|
|user_note|longtext|用户笔记记录区索引|

