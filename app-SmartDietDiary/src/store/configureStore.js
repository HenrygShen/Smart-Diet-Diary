import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/ui';
import imageProcessorReducer from './reducers/imageProcessor';
import diaryReducer from './reducers/diary';

const rootReducer = combineReducers({
    ui: uiReducer,
    image: imageProcessorReducer,
    diary: diaryReducer
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;