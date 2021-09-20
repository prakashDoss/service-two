 //require controller
const secondaryServicectrl = require('../../presentation/controllers/UserSecondaryService');

module.exports = function (router, opts, done) {  
  router.get('/users-list', {}, secondaryServicectrl.userDetailsList);
  done()
}