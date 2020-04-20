import React from 'react'
import { Link } from 'react-router-dom';

const ProjectsOverlay = ({item}) => {

  return (
    <>
      <h2>{item.name} <hr className="hr-underline" /></h2>
      
      <p>{item.shortDescription}</p>
      <p>Built With: {item.tools.map((tool) => {
        return (` ${tool}, `)
      })}</p>
    </>
  )
}

export default ProjectsOverlay
