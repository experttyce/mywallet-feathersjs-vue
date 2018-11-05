// balance-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;
  const balance = new Schema({
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: 0
    }

  }, {
    timestamps: true
  });

  return mongooseClient.model('balance', balance);
};
