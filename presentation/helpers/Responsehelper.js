const responseCode = require('./Responsecode'); //Resonse code
const responseMessage = require('./ResponseMessage'); //Resonse code

class Responsehelper {

    /**
     * @DESC : Return Response JSON
     * @prams:  String / Int / array
     * @return array/json 
     */

    out(req, res, statusCode, resultData = false) {

        switch (statusCode) {

            case responseCode.HTTP_UNAUTHORIZED:

                res.status(statusCode).json({
                    message: responseMessage.UNAUTHORIZED_USER
                });
                break;

            case responseCode.HTTP_INTERNAL_SERVER_ERROR:
                res.status(statusCode).send({
                    message: responseMessage.INTERNAL_SERVER_ERROR
                });
                break;

            case responseCode.HTTP_NOT_FOUND:
                res.status(statusCode).send({ error_code: responseCode.HTTP_NOT_FOUND, error_msg: responseMessage.DATA_NOT_FOUND });
                break;

            case responseCode.ERR_CONNECTION_RESET:
                res.status(statusCode).send({ error_code: responseCode.ERR_CONNECTION_RESET, error_msg: responseMessage.DATA_NOT_FOUND });
                break;

            case responseCode.HTTP_BAD_REQUEST:

                res.status(statusCode).send({
                    message: responseMessage.REQUIRED_FIELDS_MISSING,
                    fields: resultData
                });
                break;

            case responseCode.HTTP_MULTIPLE_CHOICES:
                res.status(statusCode).send({
                    message: resultData
                });
                break;

            case responseCode.HTTP_NOT_MODIFIED:
                res.status(statusCode).send();
                break;


            case responseCode.HTTP_OK:
                const result = {
                    status: true,
                    message: resultData.message??responseMessage.SUCCESS,
                    data:resultData
                }
                res.status(statusCode).send(result);
                break;


            default:

                if (typeof resultData === 'object' && resultData && (resultData.message || resultData.data)) { /*with data or messgae */
                    res.status(statusCode).send(resultData);

                } else if (typeof resultData === 'object' && resultData) { /*only object without data prop*/
                    res.status(statusCode).send({
                        data: resultData
                    });

                } else { /*only string */
                    res.status(statusCode).send({
                        message: resultData != null ? resultData : 'success'
                    });

                }
        }


    }


}




Responsehelper = new Responsehelper();
module.exports = Responsehelper;