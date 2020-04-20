import React, { useContext, useState, useEffect } from 'react';

// Third Party Components/Packages
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

// User Components
import ArticlesContext  from '../context/ArticlesContext';
import { getVisibleItems } from '../selectors/selectors';
import GridService from '../services/GridService/GridService';
import PaginationService  from '../services/PaginationService/PaginationService';
import SelectService from '../services/SelectService/SelectService';



const ArticlesPage = () => {

  const { articles }  = useContext(ArticlesContext);
  // filtered items will hold an array of the remaining articles,  once they've been passed through the filters. 
  // the state before filtering starts off as just a copy of articles
  const [ filteredArticles, setfilteredArticles ] = useState([...articles]);

  const [ filters, setFilters ] = useState({
    show: 'all',
    sortBy: 'desc',
    startOfRangeDate: moment().subtract(180, 'days'),
    endOfRangeDate: moment()
  });

    // paginatedItems takes the filtered items and tracks the current page of projects
    const [ paginatedItems, setPaginatedItems ] = useState(filteredArticles)


    const [ paginationSettings, setPaginationSettings ] = useState({
      onPage: 1,
      itemsPerPage: 4
    });

  // For react-dates date-picker
  const [ focusedInput, setFocusedInput ] = useState(null) 

  const onDatesChange = ({startDate, endDate}) => { 
    // reset the list prior to carrying out filtering
    setfilteredArticles([...articles])
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

  const getArticlesByTag = (show) => {
    // As done in other functions first need to reset the subset back to all articles (clean slate), then set the new filters, which in turn will cause useEffect to run  which will pass the articles through the filters using getVissibleItems selector function.
    setfilteredArticles([...articles])
    setFilters({
      ...filters,
      show
    })
  }

  const articlesFilterOptions = [{
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

  const articlesSortOptions = [{
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
    setfilteredArticles([...articles])
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
    const paginated = [...filteredArticles].splice(skip, paginationSettings.itemsPerPage);
    setPaginatedItems(paginated)
  }

  useEffect(() => {
    
    setfilteredArticles(getVisibleItems('articles', filteredArticles, filters));
    setPaginationSettings({
      ...paginationSettings,
      onPage: 1
    })
  }, [filters])

  useEffect(() => {
    getPageItems()
 }, [filteredArticles, paginationSettings])


 console.log(filteredArticles)
  return (
    <>
    <section className="sect articles-page">
    <h1>Articles</h1>
      <div className="select-filters articles-filters">
        <SelectService 
          addClass="select-css" 
          options={articlesFilterOptions} 
          onChange={onFilterChange}
          value={filters.show}
        />
        <SelectService 
          addClass="select-css"
          options={articlesSortOptions}
          onChange={onSortChange}
        />
      <span className="created-between">created between </span>
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
      </div>
    </section>
    {console.log(filteredArticles)}
    <section className="sect articles-page">
      <PaginationService 
        listLength={filteredArticles.length}
        onPageClicked={onPageClicked}
        paginationSettings={paginationSettings}
      />
      <GridService 
        list={paginatedItems} 
        imgOverlay={true} 
        serviceType={"articlesThumb"} 
        staticOverlay={true}
        getArticlesByTag={getArticlesByTag}
      />
    </section>
  </>
)
}

export default ArticlesPage
