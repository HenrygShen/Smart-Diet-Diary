import { uiStartLoading, uiStopLoading } from "./ui";
import { LOAD_IMAGE_RESULT, IMAGE_RESULT_FAILED, ADDRESS } from "../constants";

export const processImage = (image) => (dispatch) => {

    dispatch(uiStartLoading());
    fetch(`${ADDRESS}/processImage`, {
        method :'post',
        headers: {'Content-Type' : 'application/json'},
        
        body: JSON.stringify({
            image: image
        })
    })
    .then(res => res.json())
    .then((res) => {
        if (res.code === 0) {
            dispatch({
                type: LOAD_IMAGE_RESULT,
                payload: res['result']
            });
        }
        else {
            dispatch({
                type: IMAGE_RESULT_FAILED,
                payload: res.code
            })
        }
    })
    .catch((e) => {
        dispatch(uiStopLoading());
        dispatch({
            type: IMAGE_RESULT_FAILED,
            payload: -1
        })
    })
}