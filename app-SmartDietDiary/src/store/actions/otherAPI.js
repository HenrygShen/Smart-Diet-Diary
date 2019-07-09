import { ADDRESS, LOAD_LIST } from "../constants";

export const getList = () => (dispatch) => {
    fetch(`${ADDRESS}/getList`, {
        method: 'get',
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(res => {
        dispatch({ type: LOAD_LIST, payload: res['list'] });
    })
}

export const calculateCalories = (list) => (dispatch) => {
    fetch(`${ADDRESS}/calculateCalories`, {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            list: list
        })
    })
    .then(res => res.json())
    .then(res => {
        dispatch({ type: LOAD_LIST, payload: res });
    })
}