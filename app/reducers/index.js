import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const client = (state = '', action) => {
    switch (action.type) {
        case types.CLIENT_LOAD:
            return { ...state, data: action.data};
        default:
            return state;
    }
};

const trade = (state = '', action) => {
    switch (action.type) {
        case types.TRADE_LOAD:
            return { ...state, data: action.data};
        default:
            return state;
    }
};

const notes = (state = '', action) => {
    switch (action.type) {
        case types.NOTES_LOAD:
            return { ...state, data: action.data};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    routing,
    trade,
    notes,
    client
});

export default rootReducer;
