import React from 'react'
import moment from 'moment'

const ArticlesPostBannerOverlay = ({item}) => {

  return (
    <>
      <div className="main-wrapper">
        <h1>{item.title} </h1>   
      </div> 
      <p className="articles-banner-posted-date">Posted: {moment(item.createdAt).format("MMM, Do, YYYY")}</p>      
    </>    

  )
}

export default ArticlesPostBannerOverlay
