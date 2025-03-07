import { LOAD_LIST, LOAD_CALCULATED_CALORIES, CLEAR_CAL_RESULTS, RESET_APP_STATE } from "../constants";

const initialState = {
    list: [],
    calorieResults: null,
    resultsCleared: 1
}


const reducer = (state = initialState, action) => {

    switch(action.type) {
        case LOAD_LIST:
            return {
                ...state,
                list: action.payload
            }
        case LOAD_CALCULATED_CALORIES:
            return {
                ...state,
                calorieResults: action.payload,
                resultsCleared: 0
            }
        case CLEAR_CAL_RESULTS:
            return {
                ...state,
                calorieResults: null,
                resultsCleared: 1
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;