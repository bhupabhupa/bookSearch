import { RECEIVE_BOOKS } from "../action/books";

export default function bookListObj(state = {}, action) {
    switch (action.type) {
        case RECEIVE_BOOKS:
            return action.bookList
        default:
            return state
    }
}