const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  lists:
    [{
      type: Schema.Types.ObjectId,
      ref: 'List'
    }]
},
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema);
module.exports = User;