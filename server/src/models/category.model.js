// category-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;
  const category = new Schema({
    description: {
      type: String,
      required: true,
      lowercase: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }
  }, {
    timestamps: true
  });
  category.index({
    'description': 1,
    'userId': 1
  }, {
    'unique': true
  });
  return mongooseClient.model('category', category);
};
