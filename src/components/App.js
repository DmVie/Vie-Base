import React, { useEffect, useReducer, useState } from 'react';

// User Components
import AppRouter from '../routers/AppRouter';
import ArticlesContext from '../context/ArticlesContext';
import articlesReducer from '../reducers/articles';
import LoadingPage from '../components/LoadingPage';
import LearningsContext from '../context/LearningsContext';
import learningsReducer from '../reducers/learnings';
import projectsReducer from '../reducers/projects';
import ProjectsContext from '../context/ProjectsContext';

import { setProjects } from '../actions/projects';
import { setArticles } from '../actions/articles';
import { setLearnings } from '../actions/learnings';


const App = () => {

  const [ projects, projectsDispatch ] = useReducer(projectsReducer, []);
  const [ articles, articlesDispatch] = useReducer(articlesReducer, []);
  const [ learnings, learningsDispatch ] = useReducer(learningsReducer, []);
  const [ pageLoading, setPageLoading ] = useState(true);

  useEffect(() => {
    setProjects()
      .then((projectsFromDBActionGenerator) => {
        projectsDispatch(projectsFromDBActionGenerator);
        
      })
      .catch((e) => {
        console.log('The Occurence of an error has unexpectedly occurred :( ', e.message);
      })

      setArticles()
      .then((articlesFromDBActionGenerator) => {
        articlesDispatch(articlesFromDBActionGenerator);
      })
      .catch((e) => {
        console.log('The Occurence of an error has unexpectedly occurred :( ', e.message);
      })

      setLearnings()
      .then((learningsFromDBActionGenerator) => {
        learningsDispatch(learningsFromDBActionGenerator);
        setPageLoading(false)
      })
      .catch((e) => {
        console.log('The Occurence of an error has unexpectedly occurred :( ', e.message);
      })
  }, [])

 

  return (

    pageLoading ? 

      <LoadingPage />
    
    :

      <ProjectsContext.Provider value={{projects}}>
      <ArticlesContext.Provider value={{articles}}>
      <LearningsContext.Provider value={{learnings}}>
        <AppRouter />
      </LearningsContext.Provider>
      </ArticlesContext.Provider>      
      </ProjectsContext.Provider>
        
  )
}

export default App
