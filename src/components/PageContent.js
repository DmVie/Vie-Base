import React from 'react'

const PageContent = ({children}) => {
  return (
    <>

    <div className="page-content">
      <div className="main-wrapper">
        {children}
      </div>      
    </div>
    </>
  )
}

export default PageContent
