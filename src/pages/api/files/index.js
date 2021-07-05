require('../../../models/connection');
const mongoose = require('mongoose');
import UserSchema from "../../../models/User";
import FileSchema from "../../../models/File";

export default async function handler(req, res) {
  // @TODO: FIND A SAFER WAY TO GET USER DATA NOT THROUGH ACCESS TOKEN
  if (req.query.user) {
    const session = await mongoose.connection.collection('sessions').findOne({
      'sessionToken': req.query.user
    });
  
    const user = await UserSchema.findOne({
      _id: session.userId
    });
  
    try {
      await user.populate({
        path: 'files',
        match: {},
        options: {}
      }).execPopulate();
      console.log(user);
  
      res.status(200).json(files);
    } catch (e) {
      res.status(500).send();
    } 
  } else {
    const files = await FileSchema.find();
    res.status(200).json(files);
  }
}