const mongoose = require('mongoose')
require('../../../../../../models/connection');
import UserSchema from "../../../../../../models/User"
import FileSchema from "../../../../../../models/File";

export default async function handler(req, res) {
  const user = await UserSchema.getByAccessToken(req.query.userid)
  const file = await FileSchema.findOne({
    _id: req.query.id
  });

  // Get objects to compare
  const userid = mongoose.Types.ObjectId(user._id);
  const fileid = mongoose.Types.ObjectId(file.owner);

  if (userid.toString() === fileid.toString()) {
    res.status(200).send();
  } else {
    res.status(400).send();
  }
}
