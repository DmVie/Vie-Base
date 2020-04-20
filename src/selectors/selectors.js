import moment from 'moment';

// GET THE LAST X ITEMS FROM A LIST, WHERE X IS VARIABLE 
/*
           Param name,  Type,   Description
  @Param:  List,    Array,  list of projects or articles
  @Param:  limit        Number, How many to return in the subset
  @Param   includeFeatureItem, Boolean  Should the featuredItem also be included in the subset?
  @Return  An Array - The subset of the list of items, sorted by date, including the latest X number of them where x is the limit param passed in.
*/
export const getLastXListItems = (list, limit, includeFeatureItem) => {

  let filteredList;
  if(!includeFeatureItem) {
    filteredList = list.filter((listItem) => {
      return !listItem.featured
    })
  } 

  // if we're to include the featured project,  then filteredList will always be undefined, and the full list of items will be sorted,  otherwise,  the  featured item will be filtered out and remaining subset will be passed to sort.
  return (filteredList || list).sort((a, b) => {
    return a.createdAt < b.createdAt ? 1 : -1;
  }).slice(0, limit);

};


// RUN A LIST OF ITEMS - PROJECTS OR ARTICLES,  THROUGH THIS FUNCTION TO FILTER AND SORT BASED ON USER PREFERENCES AND RETURN THE SUBSET TO THE VIEW.  type tells the function whether it's a list of projects or articles that have to be checked.
export const getVisibleItems = (listType, list,  { show = 'all',  sortBy = null, startOfRangeDate,  endOfRangeDate }) => {     

    const projects = (project) => {
      let completedStatus = true;
      let startDateOk = true;
      let endDateOk = true;
      if(show === 'completed') {
        completedStatus = project.completed === true;
        startDateOk = !!startOfRangeDate &&  startOfRangeDate.isSameOrBefore(project.completedAt);
        endDateOk = !!endOfRangeDate && endOfRangeDate.isSameOrAfter(project.completedAt);
      }else if(show === 'incomplete') {
        completedStatus = project.completed === false;
        startDateOk = !!startOfRangeDate && startOfRangeDate.isSameOrBefore(project.createdAt);
        endDateOk = !!endOfRangeDate && endOfRangeDate.isSameOrAfter(project.createdAt);
      }else if(show === 'all') {
        startDateOk = !!startOfRangeDate && startOfRangeDate.isSameOrBefore(project.createdAt);
        endDateOk = !!endOfRangeDate && endOfRangeDate.isSameOrAfter(project.createdAt);
      }

      return completedStatus && startDateOk && endDateOk;

    }

    console.log(listType, list, show, sortBy)
    // Default,  this covers both articles and learnings as their flters and sorting options are the same.
    const items = (item) => {
      let startDateOk = true;
      let endDateOk = true;
      let showMatch = show.toLowerCase() === 'all' ? true : item.tags.map((tag) => {
        return tag.toLowerCase();
      }).includes(show.toLowerCase())
      startDateOk = !!startOfRangeDate &&  startOfRangeDate.isSameOrBefore(item.createdAt);
      endDateOk = !!endOfRangeDate && endOfRangeDate.isSameOrAfter(item.createdAt);

      return startDateOk && endDateOk && showMatch;
  
    }

  if(listType === 'projects') {
    return list.filter(projects) // run the projects function one time per each list item
    .sort((a, b) => {
      if(!sortBy) return;
      if(show === 'completed') {
        if(sortBy === 'desc') {
          return a.completedAt < b.completedAt ? 1 : -1;  // Try refactors to a.completedAt || a.createdAt --- if works can remomve if show==completed and else if block..
        }else if(sortBy === 'asc') {
          return a.completedAt < b.completedAt ? -1 : 1;
        }
      }else if(show === 'incomplete' || show === 'all' ) {
        if(sortBy === 'desc') {
          return a.createdAt < b.createdAt ? 1 : -1;
        }else if(sortBy === 'asc') {
          return a.createdAt < b.createdAt ? -1 : 1;
        }
      }
    })
  }else if(listType === 'articles' || listType === 'learnings') {
    return list.filter(items) // run the items function one time per each list item
      .sort((a, b) => {
        if(sortBy === 'desc') {
          return a.createdAt < b.createdAt ? 1 : -1;
        }else if(sortBy === 'asc') {
          return a.createdAt < b.createdAt ? -1 : 1;
        }
      })
    
  }

}


