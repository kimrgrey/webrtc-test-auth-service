const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TurnSecretSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
});

TurnSecretSchema.statics = {
  current() {
    return this.findOne().exec();
  },
};

module.exports = mongoose.model('turn_secret', TurnSecretSchema);
