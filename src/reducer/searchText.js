import { RECEIVE_SEARCH_TEXT } from "../action/books";

export default function searchText(state = "", action) {
    switch (action.type) {
        case RECEIVE_SEARCH_TEXT:
            return action.searchText
        default:
            return state
    }
}