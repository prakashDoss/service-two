const protoBuffer = require('protobufjs');

class ProtoBuffer {
  
    constructor () {
    }

  /**
   * @DESC : Verify the request object
   * param JSON object 
   * return JSON object 
   */
    async verify(requestObj) {      
        const rootResponse = await protoBuffer.load('./application/repositories/protoBuffer/usecase/userDto.proto');
        const User = rootResponse.lookupType('userpackage.User');
        return User.verify(requestObj);
    }

    /**
   * @DESC : Encode the request object
   * param JSON object 
   * return JSON object
   */
  
    async encode(requestObj) {      
        const rootResponse = await protoBuffer.load('./application/repositories/protoBuffer/usecase/userDto.proto');
        const User = rootResponse.lookupType('userpackage.User');
        return User.encode(requestObj).finish()
    }

    /**
   * @DESC : Decode the request object
   * param JSON object 
   * return JSON object
   */

    async decode(buf) {      
        const root = await protoBuffer.load('./application/repositories/protoBuffer/usecase/userDto.proto');
        const User = root.lookupType('userpackage.User');
        return User.decode(buf)      
    }
    
}

const protobuffer = new ProtoBuffer();
module.exports = protobuffer;