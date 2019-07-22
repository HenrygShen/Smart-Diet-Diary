import { LOAD_CALORIES } from "../constants";

const initialState = {
    recommendedCalories: -1
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_CALORIES: 
            return {
                recommendedCalories: action.payload
            }
        default:
            return state;
    }
}

export default reducer;