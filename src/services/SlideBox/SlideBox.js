import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated, config } from 'react-spring'

const SlideBox = ({show, toggleSlideBox, children}) => {

  const transitions = useTransition(show, null, {
    from: {transform: 'translateX(-100%)'},
    enter: {transform: 'translateX(0%)'},
    leave: {transform: 'translateX(-100%)'},  
    config: { mass: 1, tension: 200, friction: 30 }
  })

  const renderSlideBox = () => {
      return (
        <div>
          {transitions.map(({ item, key, props }) =>
          item && 
          <animated.div key={key} style={props} className="slide-box">
            {children}          
          </animated.div>
          )
        }
        </div>
    
      )
    
  }
  return ReactDOM.createPortal(renderSlideBox(), document.querySelector('body'))
}

export default SlideBox 