import styles from './ProjectList.module.scss';

const ProjectList = ({ projects }) => {
  return (<>
  {projects.map((project) => {
    <Project>{project.name}</Project>
  })}
  </>);
}
 
export default ProjectList;