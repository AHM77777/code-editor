require('../../../models/connection');
import FileSchema from "../../../models/File";

export default async function handler(req, res) {
  // For now, no user, retrieve all files in collection
  const files = await FileSchema.find();
  res.status(200).json(files);
}