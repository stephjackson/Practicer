const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
},
  {
    timestamps: true
  }
)

const List = mongoose.model('List', ListSchema);
module.exports = List;