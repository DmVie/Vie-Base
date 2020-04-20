import React from 'react'
import moment from 'moment'

const ArticlesPostBannerOverlay = ({item}) => {

  return (
    <>
      
      <h1>{item.title} </h1>    
      <p className="articles-banner-posted-date">Posted: {moment(item.createdAt).format("MMM, Do, YYYY")}</p>      
    </>    

  )
}

export default ArticlesPostBannerOverlay
