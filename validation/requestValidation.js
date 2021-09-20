
/**
 * @DESC : Request payload Validation
 * @param : string/int
 * @returns : array/object
 */
module.exports.verifyrequest = () => {

    const queryStringJsonSchema = {
        type: 'object',
        properties: {
          uuid: { type: 'string' }
        }
      

    }

    //schema - validation -decalarations
    const schema = {
        querystring: queryStringJsonSchema        
    }
    return schema;
};