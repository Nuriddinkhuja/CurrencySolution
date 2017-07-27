import * as types from './types';
import client from './data/client.json';
import trade from './data/trade.json';
import notes from './data/notes.json';

export function loadClient() {
    return {
        type: types.CLIENT_LOAD,
        data: client
    };
}

export function loadTrade() {
    return {
        type: types.TRADE_LOAD,
        data: trade
    };
}

export function loadNotes() {
    return {
        type: types.NOTES_LOAD,
        data: notes
    };
}
