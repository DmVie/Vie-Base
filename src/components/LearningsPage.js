import React, { useContext, useState, useEffect } from 'react';

// Third Party Components/Packages
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

// User Components
import LearningsContext from '../context/LearningsContext';
import { getVisibleItems } from '../selectors/selectors';
import GridService from '../services/GridService/GridService';
import PaginationService from '../services/PaginationService/PaginationService';
import SelectService from '../services/SelectService/SelectService';

const LearningsPage = () => {

  // USING CONTEXT:
  const { learnings }  = useContext(LearningsContext);

  // STATE:
  const [ filteredLearnings, setfilteredLearnings ] = useState([...learnings]);

  const [ filters, setFilters ] = useState({
    show: 'all',
    sortBy: 'desc',
    startOfRangeDate: moment().subtract(180, 'days'),
    endOfRangeDate: moment()
  });

  // paginatedItems takes the filtered items and tracks the current page of projects
  const [ paginatedItems, setPaginatedItems ] = useState(filteredLearnings)

  const [ paginationSettings, setPaginationSettings ] = useState({
    onPage: 1,
    itemsPerPage: 4
  });

  // For react-dates date-picker
  const [ focusedInput, setFocusedInput ] = useState(null) 

  const onDatesChange = ({startDate, endDate}) => { 
    // reset the list prior to carrying out filtering
    setfilteredLearnings([...learnings])
    // carry out filtering!
    setFilters({
      ...filters,
      startOfRangeDate: startDate,
      endOfRangeDate: endDate
    })
  }

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput)
  }
  const falseFunc = () => false;

  const getLearningsByTag = (show) => {
    setfilteredLearnings([...learnings])
    setFilters({
      ...filters,
      show
    })
  }

  const learningsFilterOptions = [{
    optionValue: 'all',
    textContent: 'All',
  },{
    optionValue: 'the web',
    textContent: 'The Web'
  },{
    optionValue: 'javascript',
    textContent: 'Javascript'
  },{
    optionValue: 'nodeJS',
    textContent: 'NodeJS'
  },{
    optionValue: 'css',
    textContent: 'CSS'
  },{
    optionValue: 'reactJS',
    textContent: 'ReactJS'
  },{
    optionValue: 'angular',
    textContent: 'Angular'
  },{
    optionValue: 'web components',
    textContent: 'Web Components'
  },{
    optionValue: 'expressJS',
    textContent: 'ExpressJS'
  }];

  const learningsSortOptions = [{
    optionValue: 'desc',
    textContent: 'Latest Top',
  },{
    optionValue: 'asc',
    textContent: 'Oldest Top',
  }];

  const onSortChange = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.value
    })
  }

  const onFilterChange = (e) => {
    // reset the data
    setfilteredLearnings([...learnings])
    setFilters({
      ...filters,
      show: e.target.value
    })
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
    const paginated = [...filteredLearnings].splice(skip, paginationSettings.itemsPerPage);
    setPaginatedItems(paginated)
  }

  useEffect(() => {    
    setfilteredLearnings(getVisibleItems('learnings', filteredLearnings, filters));
    setPaginationSettings({
      ...paginationSettings,
      onPage: 1
    })
  }, [filters])

  useEffect(() => {
    getPageItems()
 }, [filteredLearnings, paginationSettings])

  return (
    <>
    <section className="sect learnings-page">
    <h1>All Learnings</h1>
    <p>Here are a list of some of the things I've been learning, and in most cases forgetting I've learned..</p>
      <div className="select-filters learnings-filters">
        Showing 
        <SelectService 
          addClass="select-css" 
          options={learningsFilterOptions} 
          onChange={onFilterChange}
          value={filters.show}
        />
        related entries with the 
        <SelectService 
          addClass="select-css"
          options={learningsSortOptions}
          onChange={onSortChange}
        />
      </div>
      <span className="ranging-from">that were created between </span>
      <DateRangePicker
        startDate={filters.startOfRangeDate} // momentPropTypes.momentObj or null,
        startDateId="startDateRange" // PropTypes.string.isRequired,
        endDate={filters.endOfRangeDate} // momentPropTypes.momentObj or null,`
        endDateId="endDateRange" // PropTypes.string.isRequired,
        onDatesChange={onDatesChange}
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={onFocusChange} // PropTypes.func.isRequired,
        numberOfMonths={1}
        isOutsideRange={falseFunc}
        showClearDates={false}
      />
    </section>

    <section className="sect learnings-page">
      <PaginationService 
        listLength={filteredLearnings.length}
        onPageClicked={onPageClicked}
        paginationSettings={paginationSettings}
      />
      
      <GridService 
        list={paginatedItems} 
        imgOverlay={true} 
        serviceType={"learningsThumb"}  
        staticOverlay={false}
        getLearningsByTag={getLearningsByTag}
      />
    </section>
  </>
)
}

export default LearningsPage
