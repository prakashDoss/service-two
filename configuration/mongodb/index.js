/**
 * @DESC : Database Credentials - STAG/PREPROD/PROD[MONGODB]
 * @param: void
 * @return :array/object
 */
  const credentials = {
     staging: {
         username: process.env.MONGODB_USERNAME,
         password: process.env.MONGODB_PASSWORD,
         host: process.env.MONGODB_HOST,
         port: process.env.MONGODB_PORT,
         databsase: process.env.MONGODB_DATABASE
     },
     preproduction: {
         username: process.env.MONGODB_USERNAME,
         password: process.env.MONGODB_PASSWORD,
         host: process.env.MONGODB_HOST,
         port: process.env.MONGODB_PORT,
         databsase: process.env.MONGODB_DATABASE
     },
     production: {
         username: process.env.MONGODB_USERNAME,
         password: process.env.MONGODB_PASSWORD,
         host: process.env.MONGODB_HOST,
         port: process.env.MONGODB_PORT,
         databsase: process.env.MONGODB_DATABASE
     },
     //default - Will use Local development
     default: {
         username: process.env.MONGODB_USERNAME,
         password: process.env.MONGODB_PASSWORD,
         host: process.env.MONGODB_HOST,
         port: process.env.MONGODB_PORT,
         databsase: process.env.MONGODB_DATABASE
     }
 };
 
 exports.getCredentials = function getCredentials(env) {
     return credentials[env] || credentials.default;
 }
 