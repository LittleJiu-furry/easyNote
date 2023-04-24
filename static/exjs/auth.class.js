class authClass{
    _bin2hex(str) {
        var ret = '';
        var r = /[0-9a-zA-Z_.~!*()]/;
        for (var i = 0, l = str.length; i < l; i++) {
            if (r.test(str.charAt(i))) {
                ret += str.charCodeAt(i).toString(16);
            } else {
                ret += encodeURIComponent(str.charAt(i)).replace(/%/g, '');
            }
        }
        return ret;
    }
    
    _hex2bin(str) {
        var ret = '';
        var tmp = '';
        for (var i = 0; i < str.length - 1; i += 2) {
            var c = String.fromCharCode(parseInt(str.substr(i, 2), 16));
            if (c.charCodeAt() > 127) {
                tmp += '%' + str.substr(i, 2);
                if (tmp.length == 9) {
                    ret += decodeURIComponent(tmp);
                    tmp = '';
                }
            } else {
                ret += c;
            }
        }
        return ret;
    }

    dex(data,key,offset,length){
        if(offset>data.length){
            return null;
        }
        else if(offset + length){
            return null;
        }
        let pre_word = data.substr(offset,length);
        let non_word = data.substr(0,data.length - pre_word.length - non_word.length) + non_word;
        non_word = this._bin2hex(non_word);
        let key_f = this._bin2hex(non_word).toString(16)<<offset;
        let pwd_f = this._bin2hex(pre_word).toString(16) ^ key_f;
        let key_s = this._bin2hex(key).toString(16)>>offset;
        let pwd_s = pwd_f ^ key_s;
        let ret = new Object();
        ret.s_offset = non_word.length;
        ret.pwd = non_word + pwd_s;
        return JSON.stringify(ret);
    }
}

var useAuthClass = new authClass();