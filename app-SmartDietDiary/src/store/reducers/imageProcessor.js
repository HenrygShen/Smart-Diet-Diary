import { LOAD_IMAGE_RESULT, IMAGE_RESULT_FAILED, CLEAR_IMAGE_RESULT } from "../constants";

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
                response: action.payload
            }
        case CLEAR_IMAGE_RESULT:
            return {
                ...state,
                response: null
            }
        default:
            return state;
    }
}

export default reducer;
