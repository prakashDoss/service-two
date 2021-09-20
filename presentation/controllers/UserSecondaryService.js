const response = require('../helpers/Responsehelper');
const responseCode = require('../helpers/Responsecode');
const protobuffer = require('../../application/repositories/protoBuffer');
const userDetailsDb = require('../../data/mongodb/UserDetails');
const generateFiles = require('../utils/GenerateAndStoreFiles');
const constant = require('../../constants');
const userList = require('../../data/usecase/UsersList');

class UserSecondaryService {

    constructor() { }

    /**
     * @DESC : Strore the user details
     * @param : string/Int in JSON object
     * @returns : array/object
     */

    upsertUserDetails = async (userDetails) => {
        try {

            const { fileType, correlationId, bufferMessage } = userDetails;

            // Decode Google Proto buffer
            const decodedRequestData = await protobuffer.decode(bufferMessage);

            decodedRequestData.uuid = correlationId;
            decodedRequestData.fileExtension = fileType.toLowerCase();

            const userExists = await userDetailsDb.findOne({ uuid: correlationId });
            const isFiledeleted = userExists ? Object.keys(userExists).length : constant.INDEX_ZERO;

            //generate and store files 
            decodedRequestData.fileName = await generateFiles.generateAndStoreFiles(decodedRequestData, fileType, isFiledeleted);

            if (userExists && Object.keys(userExists).length) {
                //store data to db
                return await userDetailsDb.updateOne(decodedRequestData);
            } else {
                return await userDetailsDb.save(decodedRequestData);
            }

        } catch (err) {
            applog.log.info({USER_DETAILS_ERROR:err});
            return err;
        }
    }

    /**
     * @DESC : Getusers List
     * @param : string/Int in JSON object
     * @returns : array/object
     */

    userDetailsList = async (req, res) => {
        try {

            const uuid = req.query.uuid;
            let responseData = {};

            if (!uuid) {
                const getAllUsers = await userDetailsDb.findAll();
                responseData = await userList.getUsersList(getAllUsers)
            } else {
                const Getusers = await userDetailsDb.findOne({ uuid: uuid });
                if (Getusers) {
                    responseData = await generateFiles.readFiledata(Getusers);
                }
            }

            return response.out(req, res, responseCode.HTTP_OK, responseData);

        } catch (err) {            
            return response.out(req, res, responseCode.ERR_CONNECTION_RESET, err);
        }
    }

}

const userSecondaryService = new UserSecondaryService();
module.exports = userSecondaryService;