require('../../../../models/connection');
import FileSchema from "../../../../models/File";

export default async function handler(req, res) {
  const file = await FileSchema.findOne({
    _id: req.query.id
  });

  res.status(200).json(file)
}
