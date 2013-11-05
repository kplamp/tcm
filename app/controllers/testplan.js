var samplePlan = {
  "extrnId": "Sample Plan",
  "softwareChange": "Sample",
  "testStrategy": "Sample",
  "category": [
    {
      "name": "Sample",
      "testSteps": [
        {
          "setup": "Sample",
          "action": "Sample",
          "outcome": "Sample",
          "result": ""
        }
      ]
    }
  ]
};

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

exports.removePlan = function(req,res) {
  for(i=0; i<testPlans.length; i++) {
    if(testPlans[i].extrnId == req.params.extrnId) {
      testPlans.splice(i, 1);
    }
  }
  
  res.send(testPlans);
};