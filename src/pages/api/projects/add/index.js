require('../../../../models/connection');
import FileSchema from "../../../../models/File";

async function handler(req, res) {
  // Create new file
  const added = await FileSchema.create({
    filename: 'Test File' + Math.random(0, 99999999999999999999),
    html: '',
    css: '',
    js: '',
    projectId: '1'
  });

  res.json({ status: added });
}

export default handler;