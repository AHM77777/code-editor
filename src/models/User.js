const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
});

UserSchema.virtual('files', {
  ref: 'File',
  localField: '_id',
  foreignField: 'owner'
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
