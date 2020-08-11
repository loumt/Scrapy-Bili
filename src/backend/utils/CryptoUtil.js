const crypto = require("crypto")

exports.cryptPwd = ( username , pwd, salt )=>{
    let saltPassword = username + "@" +  pwd + ":" + salt
    let md5 = crypto.createHash("md5")
    let result = md5.update(saltPassword).digest('hex');
    return result;
}

const AESUtil = {}

/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */
AESUtil.encryption = function (data, key, iv) {
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */
AESUtil.decryption = function (data, key, iv) {
    if (!data) {
        return "";
    }
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    return cipherChunks.join('');
}

function generate32Key () {
    const hash = crypto.createHash('sha256');
    hash.update("bili-token-salt");
    return hash.digest('hex').slice(0, 32)
}

/**
 * 生成Token
 * @param username
 * @param password 加密后的
 * @param tokenExpireAge 毫秒
 */
exports.generateToken = (id ,username , tokenExpireAge )=>{
  let nowTimes = Date.now();
  let expireTimes = nowTimes + tokenExpireAge
    let originVarchar = [id,username , expireTimes].join("@")
   let token = AESUtil.encryption(originVarchar, generate32Key() )
    return token;
}

/**
 * 解析Token
 * @param token
 */
exports.parseToken = (token) => {
    const parseVarchar = AESUtil.decryption(token, generate32Key())
    const keys = parseVarchar.split("@")
    return {
        id: keys[0],
        username: keys[1],
        expireTimes: keys[2]
    }
}