import { UPDATE_DIARY, CLEAR_LOCK, SET_LOCK, RESET_APP_STATE } from "../constants";

const initialState = {
    count: 0,
    locked: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_DIARY: 
            let counter = state.count + 1;
            return {
                count : counter,
                locked: false
            }
        case CLEAR_LOCK:
            return {
                ...state,
                locked: false
            }
        case SET_LOCK:
            return {
                ...state,
                locked: true
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;