let mongoose = require('mongoose');

let User = mongoose.model('User', {
  email: {
    type: String,
    require: true,
    trim: true,
    minlegth: 2
  }
});

module.exports = {User};
