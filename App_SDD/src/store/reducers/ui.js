import { UI_START_LOADING ,UI_STOP_LOADING, RESET_APP_STATE } from '../constants';

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;