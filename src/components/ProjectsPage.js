import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

import ProjectsContext from '../context/ProjectsContext';


import GridService from '../services/GridService/GridService';
import SelectService from '../services/SelectService/SelectService';
import { getVisibleItems } from '../selectors/selectors';
import PaginationService from '../services/PaginationService/PaginationService';

const falseFunc = () => false;

const ProjectsPage = () => {

  const { projects, error } = useContext(ProjectsContext);
  // filteredItems is  local copy of all of the projects,  this get's updated via filtering and sorting
  const [ filteredItems, setfilteredItems ] = useState([...projects]);
  // paginatedItems takes the filtered items and tracks the current page of projects
  const [ paginatedItems, setPaginatedItems ] = useState([...filteredItems])

  const [ paginationSettings, setPaginationSettings ] = useState({
    onPage: 1,
    itemsPerPage: 6
  });

  const [ filters, setFilters ] = useState({
    show: 'all',
    sortBy: 'asc',
    startOfRangeDate: moment().subtract(90, 'days'),
    endOfRangeDate: moment()
  })
  
  // For react-dates date-picker
  const [ focusedInput, setFocusedInput ] = useState(null) 


  // Pass an array to the SelectService, it holds the options fields value and textContent values.
  const projectFilterOptions = [{
    optionValue: 'completed',
    textContent: 'Completed',
  },{
    optionValue: 'incomplete',
    textContent: 'Incomplete'
  },{
    optionValue: 'all',
    textContent: 'All'
  }]

  const projectSortOptions = [{
    optionValue: 'desc',
    textContent: 'Latest Top'
  },{
    optionValue: 'asc',
    textContent: 'Oldest Top'
  }]

  const onCompleteStatusChange = (e) => {
    setfilteredItems([...projects]) // reset local list to all projects
    setFilters({  // change the filters (which causes useEffect to re-render)
      ...filters,
      show: e.target.value
    })
  }

  const onSortChange = (e) => {    
    setfilteredItems([...projects])  // need to reset filteredItems
    setFilters({
      ...filters,
      sortBy: e.target.value
    })
  }

  const onDatesChange = ({startDate, endDate}) => { 
    setfilteredItems([...projects])
    setFilters({
      ...filters,
      startOfRangeDate: startDate,
      endOfRangeDate: endDate
    })

  }

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput)
  }

  const onPageClicked = (e) => {    
    console.log(`Page number ${parseInt(e.target.textContent)} was clicked....`);    
    setPaginationSettings({
      ...paginationSettings,
      onPage: parseInt(e.target.textContent)
    })
  }


  const getPageItems = () => {
    const skip = (paginationSettings.onPage - 1) * paginationSettings.itemsPerPage;
    const paginated = [...filteredItems].splice(skip, paginationSettings.itemsPerPage);
    setPaginatedItems(paginated)
  }


  useEffect(() => {
    setfilteredItems(getVisibleItems('projects', filteredItems, filters));
    setPaginationSettings({
      ...paginationSettings,
      onPage: 1
    })
  }, [filters])

  // Hook to call pagination every time the list changes, say for example, by user changing sorting / filtering,  the display results need to reflect this across all pages...
  useEffect(() => {
     getPageItems()
  }, [filteredItems, paginationSettings])

  return (
    <>
    <section className="sect projects-page">
      <h1>Projects</h1>

      <div className="select-filters projects-filters">

        <SelectService 
          addClass='select-css' 
          options={projectFilterOptions} 
          onChange={onCompleteStatusChange} 
          value={filters.show}
        />
        <SelectService
          addClass="select-css" 
          options={projectSortOptions} 
          onChange={onSortChange}
          value={filters.sortBy}
        />
        <span className="ranging-from"> ranging from: </span> 
        <DateRangePicker
          startDate={filters.startOfRangeDate} // momentPropTypes.momentObj or null,
          startDateId="startOfRangeDate" // PropTypes.string.isRequired,
          endDate={filters.endOfRangeDate} // momentPropTypes.momentObj or null,
          endDateId="endOfRangeDate" // PropTypes.string.isRequired,
          onDatesChange={onDatesChange}
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={onFocusChange} // PropTypes.func.isRequired,
          numberOfMonths={1}
          isOutsideRange={falseFunc}
          showClearDates={false}
        />
      </div>
    </section>

    <section className="sect projects-page">

      <PaginationService 
        listLength={filteredItems.length}
        onPageClicked={onPageClicked} 
        paginationSettings={paginationSettings}
      />

      <GridService 
        list={paginatedItems} 
        imgOverlay={true} 
        serviceType={"projectsThumb"} 
        staticOverlay={false}
      />
    </section>
    </>
  )
}

export default ProjectsPage
