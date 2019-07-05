import { ADDRESS, LOAD_LIST } from "../constants";

export const getList = () => (dispatch) => {
    fetch(`${ADDRESS}/getList`, {
        method: 'get',
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(res => {
        dispatch({ type: LOAD_LIST, payload: res });
    })
}