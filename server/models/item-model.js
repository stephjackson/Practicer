const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  bpm: {
    type: Number
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }],
  stats: [{
    bpm: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  }]
},
  {
    timestamps: true
  }
)

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;