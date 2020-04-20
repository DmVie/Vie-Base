import React, { useState } from 'react'

const PaginationService = (
  {
    listLength = 0, 
    onPageClicked, 
    paginationSettings
  }
  ) => {

  const paginationLinks = () => {
    let links;
    if(listLength > 0) {
      links = Math.ceil(listLength / paginationSettings.itemsPerPage)
    }else {
      links = 1
    }

    let i = 1;
    const arr = [];
    while(i <= links) {
      arr.push(i)
      i++
    }
    return arr;
  }  

  return (
    <div className="links-bar">

      <span>Results:  
        <span className="results-count">
            {listLength}
        </span>
      </span>

      <ul>
        <span className="pagination-bar-pages">Pages: </span>
        {paginationLinks().map((pageNumber) => {
          return (
            <li
            key={pageNumber}
            className={`paginate-li ${paginationSettings.onPage === pageNumber ?  "current-page" : ""}`}
            onClick={onPageClicked}
            >
              {pageNumber}

          </li>)
        })}
      </ul>
    </div>
  )
}

export default PaginationService
