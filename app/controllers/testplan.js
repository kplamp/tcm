var testPlans = require('../../config/sampleTestPlans.json');

exports.getAll = function(req,res) {
  res.send({testplans: testPlans});
};

exports.getOne = function(req,res) {
  for(i=0; i<testPlans.length; i++) {
    if(testPlans[i].extrnId == req.params.extrnId) {
      res.send({plan: testPlans[i]});
    }
  }
};

exports.addPlan = function(req,res) {
  testPlans.push(req.body.testplan);
  res.send({msg: "Successfully added testplan"});
};

exports.updatePlan = function(req,res) {
  console.log('PRE');
  console.log('==========');
  console.log(testPlans);
  for(i=0; i<testPlans.length; i++) {
    if(testPlans[i].extrnId == req.params.extrnId) {
      testPlans[i] = req.body.testplan;
    }
    else {
      // nothing
    }
  }
  res.send({msg: "Successfully updated test plan."});
};

exports.removePlan = function(req,res) {
  for(i=0; i<testPlans.length; i++) {
    if(testPlans[i].extrnId == req.params.extrnId) {
      testPlans.splice(i, 1);
    }
  }
  
  res.send({msg: "Successfully removed test plan."});
};