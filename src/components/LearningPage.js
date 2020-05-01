import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LearningsContext from '../context/LearningsContext';

const LearningPage = (props) => {
  const { learnings } = useContext(LearningsContext);

  const learning = learnings.find((learningsElement) => {
    return learningsElement.id === props.match.params.id;
  })


  const getLiveSiteLink = () => {
    if(learning.liveSiteLink) {
      return (
        <span id="liveSiteLink">               
          <a href={learning.liveSiteLink} className="button button--btn-green">View Live Site</a>
        </span>
      )
    } else {
      return (
        <span id="liveSiteLink">
          <span className="button button--disabled" title="I'm working on it!">View Live Site</span>
        </span>
      )
    }
  }

  return (
    <>
      <div className="row row1">
        <div className="col col1">
          <h1>{learning.name} </h1>
          <img src={learning.thumbPic} alt={learning.name} />
          <div className="btn-links-wrapper">
            <span className="git-hub-link">
              <a href={learning.githubLink} className="button button--btn1">
                Github Repo
              </a>
            </span>
            {getLiveSiteLink()}
          </div>
        </div>
        <div className="col col2">
          <h2>About this Course / Tutorial:</h2>
          <hr className="sect-line" />
          <div>
            <p>{learning.longDescription}</p>
          </div> 
          <div className="btn-links-wrapper">
            {learning.studyArticleId && <Link to={`/articles/${learning.studyArticleId}`} className="button button--btn1">Developer Study</Link>}
          </div>         
        </div>
      </div>
      <div className="row row2">
        <div className="col col1">
          <h2 className="contains-icon contains-icon--no-margin">Build Tools <i className="fas fa-toolbox"></i></h2>
          <hr className="sect-line" />
          <ul className="fa-ul listTools">
            {learning.tools.map((tool) => {
              return <li key={tool}><span className="fa-li"><i className="fas fa-check-square"></i></span>{tool}</li>
            })}
          </ul>
        </div>
        <div className="col col2">
          <h2 className="contains-icon contains-icon--no-margin">Site Features 
            <i className="fas fa-box-open"></i>
          </h2>
          <hr className="sect-line" />
          <ul className="fa-ul listFeatures">
            {learning.features.map((feature) => {
              return <li key={feature}><span className="fa-li"><i className="fas fa-check-square"></i></span>{feature}</li>
            })}
          </ul>   
        </div>
      </div>
    </>
  )

}

export default LearningPage;