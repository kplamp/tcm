module.exports = function(app) {
  
  var plan = require('../app/controllers/testplan');
  app.get('/testplans/:extrnId', plan.getOne);
  app.get('/testplans', plan.getAll);
  app.post('/testplans', plan.addPlan);
  app.delete('/testplans/:extrnId', plan.removePlan);
  
  var about = require('../app/controllers/about');
  app.get('/about', about.sendall);
  
  var index = require('../app/controllers/index');
  app.get('/', index.render);
}