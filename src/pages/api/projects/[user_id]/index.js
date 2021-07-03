require('../../../../models/connection');
import FileSchema from "../../../../models/File";

//@TODO: WORKOUT ONCE PROJECTS GET ADDED
function getProjects(req) {
  return new Promise(resolve => {
    resolve(['1']);
  })
}

function getFiles(req) {
  return new Promise(resolve => {
    resolve(FileSchema.find({
      project_id: projects[0]
    }));
  });
}

async function handler(req, res) {
  const projects = await getProjects(req.user_id);
  const files = await getFiles(projects);
  res.json({ files })
}

export default handler;