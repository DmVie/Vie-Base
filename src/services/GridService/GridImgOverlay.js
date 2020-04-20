import React from 'react'
import { useHistory } from 'react-router-dom';

import ArticlesPostBannerOverlay from'./custom/ArticlesPostBannerOverlay';
import ArticlesThumbOverlay from './custom/ArticlesThumbOverlay';
import ProjectsOverlay from './custom/ProjectsOverlay';

const GridImgOverlay = ({item, serviceType, staticOverlay, getArticlesByTag}) => {
  // Refactor this to employ state to track the adding / removing of classes instead of the below dom manipulations.
  
  let history = useHistory();

  const onMouseEnter = (e) => {
    e.target.classList.add('show-overlay')
  };

  const onMouseLeave = (e) => {
    e.target.classList.remove('show-overlay');
  }

  const redir = () => {
    serviceType === 'projectsThumb' ? history.push(`/projects/${item.id}`) : history.push(`/learnings/${item.id}`)
    
  }

  const getServiceType = () => {
    switch (serviceType) {
      case 'projectsThumb': 
        return <ProjectsOverlay item={item}/>
      case 'learningsThumb': 
        return <ProjectsOverlay item={item} urlPath='learnings'/> // learning uses the projects overlay as it's identical except for where you should go when you click on the item <ProjectOverlay/> lnks to projects/:id by default,  this tells it in learnings cases to link to the learnings route instead //
      case 'articlesThumb': 
        return <ArticlesThumbOverlay item={item} getArticlesByTag={getArticlesByTag}/>
      case 'articlePostBanner':
        return <ArticlesPostBannerOverlay item={item} />
    }
  }

  return (

      <div 
        className={`grid-thumb-overlay ${serviceType}`} 
        onMouseLeave={!staticOverlay ? onMouseLeave : undefined} 
        onMouseEnter={!staticOverlay ? onMouseEnter : undefined} 
        onClick={!staticOverlay ? redir : undefined}>
          {getServiceType()}    
      </div>
  )
}

export default GridImgOverlay
