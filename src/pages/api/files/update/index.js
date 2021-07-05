require('../../../../models/connection');
import FileSchema from "../../../../models/File";

async function handler(req, res) {
  // Create new file
  const added = await FileSchema.update({
    filename: req.body.name,
    html: req.body.code.html,
    css: req.body.code.css,
    js: req.body.code.js
  });

  res.json({ status: added });
}

export default handler;