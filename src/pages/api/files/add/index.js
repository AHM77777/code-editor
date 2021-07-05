require('../../../../models/connection');
import FileSchema from "../../../../models/File";
import UserSchema from "../../../../models/User";

async function handler(req, res) {
  // Look for user ID in database
  const user = await UserSchema.findOne({
    email: req.body.owner_email
  });

  if (user) {
    // Create new file
    await FileSchema.create({
      filename: req.body.name,
      html: req.body.code.html,
      css: req.body.code.css,
      js: req.body.code.js,
      owner: user._id
    }, (err, result) => {
      if (err) {
        res.status(500).json({message: err.message})
      } else {
        res.json({
          file_id: result._id
        })
      }
    });
  }
}

export default handler;