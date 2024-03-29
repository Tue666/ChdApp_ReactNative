import { createStore } from 'redux';

const initState = {
    userInfo: {}
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userInfo: action.userInfor
            }
        case 'LOGOUT':
            return {
                ...state,
                userInfo: {}
            }
        default:
            return state
    }
}

export default createStore(reducer);