const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TurnSecretSchema = new Schema({
  realm: {
    type: String
  },
  value: {
    type: String,
    required: true,
  },
}, {
  collection: 'turn_secret'
});

TurnSecretSchema.statics = {
  current(realm) {
    return this.findOne({ realm }).exec();
  },
};

module.exports = mongoose.model('turn_secret', TurnSecretSchema);
