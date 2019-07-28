import { LOAD_CALORIES, RESET_APP_STATE } from "../constants";

const initialState = {
    recommendedCalories: -1
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_CALORIES: 
            return {
                recommendedCalories: action.payload
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;