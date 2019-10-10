import { LOAD_IMAGE_RESULT, IMAGE_RESULT_FAILED, CLEAR_IMAGE_RESULT, RESET_APP_STATE } from "../constants";

const initialState = {
    result: null,
    response: null
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case LOAD_IMAGE_RESULT:
            return {
                ...state,
                result: action.payload,
                response: 0
            }
        case IMAGE_RESULT_FAILED:
            return {
                ...state,
                result: null,
                response: action.payload
            }
        case CLEAR_IMAGE_RESULT:
            return {
                ...state,
                result: null,
                response: null
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
