var mongoose = require('mongoose'),
    TestPlan = mongoose.model('TestPlan');

exports.getAll = function(req,res) {
  TestPlan.find({}, function(err, testPlans) {
    if(err) {
      res.status(404).send(err);
    }
    else {
      res.send({testplans: testPlans});
    }
  });
};

exports.getOne = function(req,res) {
  TestPlan.findOne({'extrnId': req.params.extrnId}, function(err, testplan) {
    if(err) {
      res.status(404).send(err);
    }
    else{
      res.send({plan: testplan});
    }
  });
};

exports.addPlan = function(req,res) {
  var testplan = new TestPlan(req.body.testplan);
  
  testplan.save(function(err) {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      res.send({msg: "Successfully added test plan"});
    }
  });
};

exports.updatePlan = function(req,res) {
  TestPlan.findOne({_id: req.body.testplan._id}, function(err, testplan) {
    if(err) {
      res.status(500).send({msg: "Error updating testplan: \n" + err});
    }
    else {
      testplan.softwareChange = req.body.testplan.softwareChange;
      testplan.testStrategy = req.body.testplan.testStrategy;
      testplan.category = req.body.testplan.category;
      testplan.save();
      res.status(200).send({msg: 'Successfully updated test plan.'});
    }
  });
};

exports.removePlan = function(req,res) {
  TestPlan.remove({_id: req.params._id}, function(err) {
    if(err) {
      res.status(500).send({msg: "Error deleting test plan. \n" + err});
    }
    else {
      res.status(200).send({msg: "Successfully deleted testplan."});
    }
  });
};