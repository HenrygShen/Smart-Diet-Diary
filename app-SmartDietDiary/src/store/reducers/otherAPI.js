import { LOAD_LIST, LOAD_CALCULATED_CALORIES } from "../constants";

const initialState = {
    list: [],
    calorieResults: null
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
                calorieResults: action.payload
            }
        default:
            return state;
    }
}

export default reducer;