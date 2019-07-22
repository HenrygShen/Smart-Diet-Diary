import { LOAD_CALORIES } from "../constants";

export const loadCalories = (calories) => {
    return {
        type: LOAD_CALORIES,
        payload: calories
    }
}