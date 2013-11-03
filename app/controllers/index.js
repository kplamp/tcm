exports.render = function(req,res) {
  res.render('index', JSON.stringify({'title': 'samplePlan'}));
};

