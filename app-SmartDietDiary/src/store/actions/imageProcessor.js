import { uiStartLoading, uiStopLoading } from "./ui";
import { LOAD_IMAGE_RESULT, IMAGE_RESULT_FAILED } from "../constants";

export const processImage = (image) => (dispatch) => {

    dispatch(uiStartLoading());
    fetch('http://121.74.244.243:3001/processImage', {
        method :'post',
        headers: {'Content-Type' : 'application/json'},
        
        body: JSON.stringify({
            image: image
        })
    })
    .then(res => res.json())
    .then((res) => {
        dispatch({
            type: LOAD_IMAGE_RESULT,
            payload: res['answer']
        });
        // dispatch(uiStopLoading());
    })
    .catch((e) => {
        dispatch(uiStopLoading());
        return {
            type: IMAGE_RESULT_FAILED,
            payload: -1
        }
    })
}