const LearningsReducer = (state, action) => {
  switch(action.type) {
    case 'SET_LEARNINGS':
      return [...action.learnings];
    default: 
      return state;
  }
}

export default LearningsReducer;