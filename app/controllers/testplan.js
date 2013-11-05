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
  res.status(404).send('Error retrieving test plan');
};

exports.addPlan = function(req,res) {
  testPlans.push(req.body.testplan);
  try {
    res.send({msg: "Successfully added test plan"});
  }
  catch(err) {
    res.status(404).send('Error adding plan');
  }
};

exports.updatePlan = function(req,res) {
  for(i=0; i<testPlans.length; i++) {
    if(testPlans[i].extrnId == req.params.extrnId) {
      testPlans[i] = req.body.testplan;
    }
    else {
      // nothing
    }
  }
  res.status(200).send({msg: "Successfully updated test plan."});
};

exports.removePlan = function(req,res) {
  for(i=0; i<testPlans.length; i++) {
    if(testPlans[i].extrnId == req.params.extrnId) {
      testPlans.splice(i, 1);
    }
  }
  
  res.status(200).send({msg: "Successfully removed test plan."});
};