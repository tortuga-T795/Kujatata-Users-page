const initialState = {
    maxID: 0,
    users: [],
    selectedUser: 0
};

const usersChanger = (state = initialState, action) => {
    switch (action.type) {
        case 'FILL-DATA': {
            if(action.value.users !== undefined)
                return action.value;
            return state;
        }
        case 'ADD-USER': {
            return {...state, users: [...state.users, action.value], maxID: state.maxID + 1};
        }
        case 'CHANGE-USER': {
            return {...state, selectedUser: +action.value}
        }
        case 'CHANGE-USERS': {
            return {...state, users: action.value};
        }
        case 'DELETE-USER': {
            if(state.selectedUser > -1)
                return {...state, users: action.value, selectedUser: 0};
            return state
        }
        default:
            return state
    }
};

export default usersChanger;