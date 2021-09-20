const DbUserDetailsModel = require('../../infrastructure/mongodb/models/DbUserDetailsModel');

class UserDetails {
    constructor() {
    }

    async save(data) {
        return new DbUserDetailsModel(data)
            .save()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                applog.log.info({MONGO_DB_USER_DEATILS_SAVE_ERROR:error});
                return error;

            });
    }

    async findAll() {
        return DbUserDetailsModel.find({})
            .select('uuid name salary age fileName')
            .then((res) => {
                return res;
            })
            .catch((error) => {
                applog.log.info({MONGO_DB_USER_DEATILS_FINDALL_ERROR:error});
                return error;
            });
    }

    async findOne(data) {
        return DbUserDetailsModel.findOne({ uuid: data.uuid })
            .select('uuid fileName salary age fileName fileExtension')
            .then((res) => {
                return res;
            })
            .catch((error) => {
                applog.log.info({MONGO_DB_USER_DEATILS_FINDONE_ERROR:error});
                return error;
            });
    }

    async updateOne(data) {

        return await DbUserDetailsModel.updateOne({ uuid: data.uuid }, {
            uuid: data.uuid,
            name: data.name,
            salary: data.salary,
            age: data.age,
            fileName: data.fileName,
            fileExtension: data.fileExtension
        });
    }


    async findOneAndRemove(data) {
        return DbUserDetailsModel.findOneAndRemove({ uuid: data.uuid })
            .then((res) => {
                return res;
            })
            .catch((error) => {
                applog.log.info({MONGO_DB_USER_DEATILS_FINDONE_AND_REMOVE_ERROR:error});
                return error;
            });
    }
}


const userDetails = new UserDetails();
module.exports = userDetails;