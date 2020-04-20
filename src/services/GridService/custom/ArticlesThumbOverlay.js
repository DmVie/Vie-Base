import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

const ArticlesThumbOverlay = ({item, getArticlesByTag}) => {

  const getDate = (stamp) => {
    return moment(stamp).format('MMMM Do, YYYY');
  }

  const onClick = (e) => {
    const content = e.target.textContent;
    console.log(content)
    getArticlesByTag(content)
  }
 
  return (
    <>
      <p className="articles-thumb-date">Posted:{getDate(item.createdAt)}</p>
      <h2>{item.title} <hr className="hr-underline hr-underline--gradient" /></h2>
      <div> 
        <Link to={`/articles/${item.id}`}>
          Read Article
        </Link>
      </div>           
      <ul className="articles-thumb-tags"> 
        {item.tags.map((tag) => {
          return <li key={tag} onClick={onClick}><i className="fas fa-tags"></i>{tag}</li>
        })}        
      </ul>   
    </>    

  )
}

export default ArticlesThumbOverlay
