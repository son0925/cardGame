const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    default: 100000
  }
})


const User = mongoose.model('cardUser', userSchema);


module.exports = User