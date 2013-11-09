var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var TestPlanSchema = new Schema({
  extrnId: {
    type: String
  },
  softwareChange: {
    type: String
  },
  testStrategy: {
    type: String
  },
  category: [
    {
      name: {
        type: String
      },
      testSteps: [
        {
          setup: {
            type: String
          },
          action: {
            type: String
          },
          outcome: {
            type: String
          },
          result: {
            type: String,
            default: false
          }
        }
      ]
    }
  ]
});

mongoose.model('TestPlan', TestPlanSchema);