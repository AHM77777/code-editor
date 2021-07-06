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

UserSchema.statics.getBySessionToken = async function(token) {
  const session = await mongoose.connection.collection('sessions').findOne({
    'sessionToken': token
  });

  const user = await this.findOne({
    _id: session.userId
  });

  return user;
}

UserSchema.statics.getByAccessToken = async function(token) {
  const session = await mongoose.connection.collection('sessions').findOne({
    'accessToken': token
  });

  const user = await this.findOne({
    _id: session.userId
  });

  return user;
}

UserSchema.virtual('files', {
  ref: 'File',
  localField: '_id',
  foreignField: 'owner'
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
