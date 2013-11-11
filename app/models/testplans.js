var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var TestPlanSchema = new Schema({
  meta: {
    creator: {
      type: String,
      default: 'N/A'
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
    modifiedDate: {
      type: Date
    },
    active: {
      type: Boolean,
      default: true 
    }  
  },
  details: {
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
  }
});

mongoose.model('TestPlan', TestPlanSchema);