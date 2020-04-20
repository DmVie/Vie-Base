import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import ProjectsContext  from '../context/ProjectsContext';

const ProjectPage = (props) => {

  const { projects } = useContext(ProjectsContext);

  const project = projects.find((projectsElement) => {
    return projectsElement.id === props.match.params.id;
  })

  const getLiveSiteLink = () => {
    if(project.liveSiteLink) {
      return (            
        <Link to={project.liveSiteLink} className="button button-btn1">View Live Site</Link>
      )
    } else {
      return (
        <span className="button button--disabled" title="I'm working on it!">View Live Site</span>  
      )
    }
  }

  return (
    <>
      <section className="sect project-page">
        <h1>{project.name}</h1>
        <div className="flex-split">
          <div className="flex-split__left-side constrain">
            <img src={project.thumbPic} alt={project.name}/>
            <div className="project-code-links-wrapper">              
              <Link to={project.githubLink} className="button button--btn1">
                View Live Site
              </Link>
              {getLiveSiteLink()}    
            </div>
          </div>
          <div className="flex-split__right-side">
            <h2>About this project:</h2>
            <hr className="sect-line" />
            <p>{project.longDescription}</p>
          </div>        
        </div>
      </section>

      <div className="flex-split">
        <div className="flex-split__left-side">
          <section className="sect sect--no-margin-top project-page ">
            <h2 className="contains-icon contains-icon--no-margin">Build Tools <i className="fas fa-toolbox"></i></h2>
            <hr className="sect-line" />
            <ul className="fa-ul listTools">
              {project.tools.map((tool) => {
                return <li key={tool}><span className="fa-li"><i className="fas fa-check-square"></i></span>{tool}</li>
              })}
            </ul>
          </section>
        </div>
        <div className="flex-split__right-side">
          <section className="sect sect--no-margin-top project-page ">               
            <h2 className="contains-icon contains-icon--no-margin">Site Features 
              <i className="fas fa-box-open"></i>
            </h2>
            <hr className="sect-line" />
            <ul className="fa-ul listFeatures">
              {project.features.map((feature) => {
                return <li key={feature}><span className="fa-li"><i className="fas fa-check-square"></i></span>{feature}</li>
              })}
            </ul>
          </section>
        </div>
      </div>

    </>
  )
}

export default ProjectPage
