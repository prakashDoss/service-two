const encryptanddecrypt = require('../datasecurity/EncryptAndDecrypt');

class UsersList {
    constructor() {
    }

    async getUsersList(userList)
    {                               
        return await encryptanddecrypt.encryption(JSON.stringify(userList));                
    }
}

const usersList = new UsersList();
module.exports = usersList;