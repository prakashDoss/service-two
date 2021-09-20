/**
 * @DESC : RABBITMQ Credentials 
 * @param: void
 * @return :array/object
 */
const credentials = {
  staging: {
    host: process.env.RABBITMQ_URL || 'amqp://localhost',
    queuename: process.env.RABBITMQ_QUEUE_NAME || 'userprimaryservices',
    exchangetype: process.env.RABBITMQ_EXCHANGE_TYPE || 'direct',
    exchangename: process.env.RABBITMQ_EXCHANGE_NAME || 'main',
    key: process.env.RABBITMQ_KEY || 'e18f8da1799de009eb712e05215b6dfe'
  },
  production: {
    host: process.env.RABBITMQ_URL || 'amqp://localhost',
    queuename: process.env.RABBITMQ_QUEUE_NAME || 'userprimaryservices',
    exchangetype: process.env.RABBITMQ_EXCHANGE_TYPE || 'direct',
    exchangename: process.env.RABBITMQ_EXCHANGE_NAME || 'main',
    key: process.env.RABBITMQ_KEY || 'e18f8da1799de009eb712e05215b6dfe'
  },
  //default - Will use Local development
  default: {
    host: process.env.RABBITMQ_URL || 'amqp://localhost',
    queuename: process.env.RABBITMQ_QUEUE_NAME || 'userprimaryservices',
    exchangetype: process.env.RABBITMQ_EXCHANGE_TYPE || 'direct',
    exchangename: process.env.RABBITMQ_EXCHANGE_NAME || 'main',
    key: process.env.RABBITMQ_KEY || 'e18f8da1799de009eb712e05215b6dfe'
  }
}



exports.getCredentials = function getCredentials(env) {
  return credentials[env] || credentials.default;
}