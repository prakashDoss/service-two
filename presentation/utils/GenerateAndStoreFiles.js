const json2csvConverter = require('json-2-csv');
const js2xmlparser = require("js2xmlparser");
const { parseString } = require('xml2js');
const fs = require('fs');
const path = require('path');
const constants = require('../../constants');
const encryptanddecrypt = require('../../data/datasecurity/EncryptAndDecrypt');

class GenerateFiles {

    async generateAndStoreFiles(decodedRequestData, fileType, isFiledeleted) {

        const fileName = `${decodedRequestData.uuid}.${fileType.toLowerCase()}`;

        if (fileType.toLowerCase() == constants.FILETPES.CSV) {
            await this._convertJSONToCSV(decodedRequestData, fileName, isFiledeleted);
        }

        if (fileType.toLowerCase() == constants.FILETPES.XML) {
            await this._convertJSONToXML(decodedRequestData, fileName, isFiledeleted);
        }

        return fileName;
    }

    async _convertJSONToCSV(decodedRequestData, fileName, isFiledeleted) {

        const userDatacsvfile = await json2csvConverter.json2csvAsync(decodedRequestData)

        if (isFiledeleted && isFiledeleted != constants.INDEX_ZERO) {
            fs.unlink(path.join(__dirname, `../../public/userdetailscsv/${fileName}`), function (err) {
                if (err) throw err;
            });
        }

        return fs.writeFileSync(path.join(__dirname, `../../public/userdetailscsv/${fileName}`), userDatacsvfile);
    }

    async _convertJSONToXML(decodedRequestData, fileName, isFiledeleted) {
        const userDataxmlfile = js2xmlparser.parse(constants.XML_PARENT_TAG, decodedRequestData);

        if (isFiledeleted && isFiledeleted != constants.INDEX_ZERO) {
            fs.unlink(path.join(__dirname, `../../public/userdetailsxml/${fileName}`), function (err) {
                if (err) throw err;
            });
        }

        return fs.writeFileSync(path.join(__dirname, `../../public/userdetailsxml/${fileName}`), userDataxmlfile);
    }

    async readFiledata(userData) {

        if (userData.fileExtension == constants.FILETPES.CSV) {
            return await this._convertCSVTOJSON(userData.fileName);
        }

        if (userData.fileExtension == constants.FILETPES.XML) {
            return await this._convertXMLTOJSON(userData.fileName);
        }

    }

    async _convertCSVTOJSON(fileName) {

        const userData = await new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, `../../public/userdetailscsv/${fileName}`), constants.UNIQUECODES.UTF_8, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });

        const userDatajson = await json2csvConverter.csv2jsonAsync(userData);
        return await encryptanddecrypt.encryption(JSON.stringify(userDatajson[constants.INDEX_ZERO]));
    }

    async _convertXMLTOJSON(fileName) {

        //Read File
        const userData = await new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, `../../public/userdetailsxml/${fileName}`), constants.UNIQUECODES.UTF_8, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });

        //Parse XML to JSON
        const userDatajson = await new Promise((resolve, reject) => {
            parseString(userData, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(JSON.stringify(JSON.stringify(result)));
            });
        });

        return await encryptanddecrypt.encryption(userDatajson);
    }

}


const generateFiles = new GenerateFiles();
module.exports = generateFiles;