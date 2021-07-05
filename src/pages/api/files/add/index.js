require('../../../../models/connection');
import FileSchema from "../../../../models/File";

async function handler(req, res) {
  // Create new file
  await FileSchema.create({
    filename: req.body.name,
    html: req.body.code.html,
    css: req.body.code.css,
    js: req.body.code.js
  }, (err, result) => {
    console.log(err)
    console.log(result)

    if (err) {
      res.status(500).json({message: err.message})
    } else {
      res.json({
        file_id: result._id
      })
    }
  });
}

export default handler;