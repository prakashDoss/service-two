require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;
const rabbitMq = require('../infrastructure/rabbitmq/RabbitMq');
const mongoDbconnection = require('../infrastructure/mongodb/helpers/MongoConnector');
// Require the framework and instantiate it
const app = require('fastify')({
    genReqId: function (req) { return Math.random().toString(26).slice(2) },
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        base: { pid: undefined, hostname: undefined },
        serializers: {
            req(req) {
                return {
                    method: req.method,
                    url: req.url,
                    "user-agent": req.headers['user-agent']
                }
            }
        }
    }
});

// Declare a route -[version-v1]
app.get('/', (req, res) => res.status(200).send({ message:'server is healthy'})); //Healthy entry
app.register(require('../domain/routes'), { prefix: '/v1' });

//Logger Global
global.applog = app;

// Run the server!
const start = async () => {
    try {
        await app.listen(port, host);
        console.log(`App listening on port is : ${port}!`);
        await rabbitMq.consume();
    } catch (err) {
        app.log.error(err)
        process.exit(1);
    }
};

start();

module.exports = app;