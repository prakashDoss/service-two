const crypto = require("crypto");
const constant = require('../../constants');


class EncryptAndDecrypt {
    constructor() {        
    }

    async encryption(requestData) {
        const initVector = crypto.randomBytes(constant.RANDOM_BYTES_16);
        const securityKey = crypto.randomBytes(constant.SECURITY_KEY_32_BYTES);
        const cipher = crypto.createCipheriv(constant.ALGORITHM.AES256, Buffer.from(securityKey), initVector);
        let encrypted = cipher.update(requestData);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
       
        return {
            iv: initVector.toString(constant.ENCRYPTION_FORMAT.HEX),
            securityKey: securityKey.toString(constant.ENCRYPTION_FORMAT.HEX),
            encryptdata: encrypted.toString(constant.ENCRYPTION_FORMAT.HEX)
        }
    }

    async decryption(requestData) {
        const iv = Buffer.from(requestData.iv, constant.ENCRYPTION_FORMAT.HEX);
        const securityKey = Buffer.from(requestData.securityKey, constant.ENCRYPTION_FORMAT.HEX);
        let encryptedData = Buffer.from(requestData.encryptdata, constant.ENCRYPTION_FORMAT.HEX);
        let decipher = crypto.createDecipheriv(constant.ALGORITHM.AES256, securityKey, iv);
        let decrypted = decipher.update(encryptedData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

}


const encryptanddecrypt = new EncryptAndDecrypt();
module.exports = encryptanddecrypt;