<?php
class retPwd{
    var $s_offset;
    var $pwd;
}

class authClass{
    public function dex(
            string $data,
            string $key,
            int $offset,
            int $length
        ){
            // 进行数据的初始判断
            if($offset>strlen($data)){
                throw new Exception("无效的offset值", 101);
                return ;
            }
            else if($offset + $length > strlen($data)){
                throw new Exception("无效的offset和length组合", 102);
                return ;
            }
            // 获得需要加密的部分
            $pre_word = substr($data,$offset,$length);
            // 对不需要加密进行混淆
            $non_word = substr($data,$offset + $length);
            $non_word = substr($data,0,strlen($data) - strlen($pre_word) - strlen($non_word)) . $non_word;
            $non_pwd = bin2hex($non_word);
            // 对指定部分进行加密
            $key_f = intval(bin2hex($key),16)<<$offset;
            $pwd_f = intval(bin2hex($pre_word),16) ^ $key_f;
            $key_s = intval(bin2hex($key),16)>>$offset;
            $pwd_s = $pwd_f ^ $key_s;

            $ret = new retPwd();
            $ret->s_offset = strlen($non_pwd);
            $ret->pwd = $non_pwd . $pwd_s;
            return json_encode($ret,JSON_UNESCAPED_UNICODE);
        
    }

    public function dedex(
        string $data,
        string $key,
        string $f_offset,
        string $s_offset
    ){
        // 数据判断
        if($data == "" || $data == null){
            throw new Exception("解密的文本无效",103);
            return;
        }
        if($key == "" || $key == null){
            throw new Exception("解密的解密要素不完整",104);
            return ;
        }
        if(is_null($f_offset) || is_null($s_offset)){
            throw new Exception("解密的解密要素不完整",104);
            return ;
        }
        $pwd_s = substr($data,$s_offset);
        $non_pwd = substr($data,0,strlen($data) - strlen($pwd_s));
        $non_pwd = hex2bin($non_pwd); // 获得原来的non_pwd的内容

        $key_s = intval(bin2hex($key),16)>>$f_offset;
        $pwd_f = $pwd_s ^ $key_s;

        $key_f = intval(bin2hex($key),16)<<$f_offset;
        $out_pwd_use = hex2bin(dechex(intval($pwd_f ^ $key_f,10)));

        return substr($non_pwd,0,$f_offset) . $out_pwd_use . substr($non_pwd,$f_offset);
    }
}
?>