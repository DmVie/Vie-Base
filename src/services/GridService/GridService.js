import React from 'react'
import { Link } from 'react-router-dom';
import GridImgOverlay from './GridImgOverlay';


const GridService = ({list=[], addClassName, imgOverlay=false, serviceType=null, staticOverlay=false, getArticlesByTag}) => {

  // This function offers mobile users a way to click the Info font awesome icon and have the overlay appear,  since they don't have the hover facility.
  const mobileShowOverlay = (e) => {
    const targetEl = e.target.parentElement.lastElementChild;
    if(targetEl.classList.contains('show-overlay')) {
      targetEl.classList.remove('show-overlay')
    }else {
      targetEl.classList.add('show-overlay')
    }       
  }

  return (
    <>
    <ul className={addClassName ? `grid-service ${addClassName}` : 'grid-service' }>
    {list.map((item) => {
      return (
        <li key={item.id}>
            {/* If the grid item has an overlay, and one that is not static, ie appears / disapears on hover / clicking info icon*/} 
            {imgOverlay && !staticOverlay && <i className="fas fa-info-circle" title="Click for more details" onClick={mobileShowOverlay}></i>}                
            {/* The actual thumbnail  */}
            <img src={item.thumbPic} alt={item.name || item.title} className={`${serviceType}Img`}/>
            {/* The overlay which is an <GridImgOverlay component. */}
            {imgOverlay && 
              <GridImgOverlay 
                item={item} 
                serviceType={serviceType} 
                staticOverlay={staticOverlay}
                getArticlesByTag={getArticlesByTag}
              />            
            }
        </li>
      )

    })}
  </ul> 
    </>
  )
}

export default GridService
