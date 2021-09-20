const rabbit = require('amqplib');
const credentials = require('../../configuration/rabbitMq');
const userSecondaryService = require('../../presentation/controllers/UserSecondaryService');


class RabbitMq {

  constructor() {
    this.RMQ_CONFIG = credentials.getCredentials(process.env.NODE_ENV);
  }

  async consume() {
    
    applog.log.info({RABBIT_MQ_CONSUMER_STATUS:'CONSUMER_STARTED'});

    const connection = rabbit.connect(this.RMQ_CONFIG.host);

    connection.then(async (conn) => {
      const channel = await conn.createChannel();

      await channel.assertQueue(this.RMQ_CONFIG.queuename);

      channel.consume(this.RMQ_CONFIG.queuename, async (message) => {        
       
        applog.log.info({RECIEVED_MEESAGED:message});
        
        //Store user details
        await userSecondaryService.upsertUserDetails({
          bufferMessage: message.content,
          fileType: message.properties.headers.filetype,
          correlationId: message.properties.correlationId
        });

        applog.log.info({RABBIT_MQ_CONSUMER_STATUS:'CONSUMER_FINISHED'});
        
        channel.ack(message);        
      })
    })
  }

}

const rabbitMq = new RabbitMq();
module.exports = rabbitMq