<?php
// 利用socket方法发送邮件

class SocketMail{
    var $socket;
    private $u;
    function __construct(
        string $mail_server_name,
        int $mail_server_port,
        string $emUser,
        string $emPass
        )
    {
        $this->socket = socket_create(AF_INET,SOCK_STREAM,getprotobyname('tcp'));
        $uem = $this->socket;
        socket_connect($uem, $mail_server_name, $mail_server_port);  //连接端口

        // 执行认证流程
        // helo socketmail
        socket_write($uem,"helo socketmail \r\n");
        // ehlo socketmail
        socket_write($uem,"ehlo socketmail \r\n");
        // auth login
        socket_write($uem,"auth login \r\n");
        // 账号
        socket_write($uem,$this->b64_euser($emUser) . " \r\n");
        // 密码
        socket_write($uem,base64_encode($emPass) . " \r\n");
        $this->u = $emUser;
        

    }
    private function b64_euser(string $s){
        $tem = "";
        for ($i=0; $i < strlen($s); $i++) {
            $q = "";
            $q = substr($s,$i,1);
            if($q != '@'){
                $tem = $tem . $q;
            }
            else{
                break;
            }
            
        }
        return base64_encode($tem);
    }

    public function send_mail(
        string $to,
        string $sub,
        string $body
    ){
        $uem = $this->socket;
        // mail from:<emUser>
        socket_write($uem,"mail from:<" . $this->u . ">");
        // data
        socket_write($uem,"data \r\n");
        // "Mime-Version: 1.0
        // Content-Type: multipart/mixed;
        //     boundary=".$boundary."
        //     Content-Transfer-Encoding: 8Bit";
        //发送具体内容：需要返回状态码 250
        $command = "from: ".$this->u."\r\n";
        $subject = "=?UTF-8?B?".base64_encode($sub)."?=";
        $command .= "Subject: ".$subject."\r\n";
        $command .= "Content-Type: text/html;\r\n";
        $command .= "Content-Transfer-Encoding: base64\r\n";
        $command .= "\r\n" .base64_encode($body). "\r\n\r\n";
        $command .= ".\r\n";
        socket_write($uem,$command);
        socket_write($uem,"commet-commet\r\n");
        socket_write($uem,"quit\r\n");
    }
}

?>