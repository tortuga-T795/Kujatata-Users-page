const notesFilter  = (state  = {string: '', filter: 'all'}, action)  => {
    if(action.type === 'SEARCH-NOTES') {
        return {...state, string: action.value.toLowerCase()}
    }
    if(action.type === 'FILTER-NOTES') {
        return {...state, filter: action.value}
    }
    return state;
};

export default notesFilter;