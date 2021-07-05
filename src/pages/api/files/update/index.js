require('../../../../models/connection');
import mongoose from "mongoose"
import FileSchema from "../../../../models/File";

async function handler(req, res) {
  // Update file
  const updated = await FileSchema.updateOne({ _id: mongoose.Types.ObjectId(req.body.id) }, {
    filename: req.body.name,
    html: req.body.code.html,
    css: req.body.code.css,
    js: req.body.code.js
  });

  res.json({ status: updated });
}

export default handler;