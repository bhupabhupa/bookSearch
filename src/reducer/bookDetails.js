import { RECEIVE_BOOK_DETAILS } from "../action/books";

export default function bookDetail(state = {}, action) {
    switch (action.type) {
        case RECEIVE_BOOK_DETAILS:
            return action.bookDetail
        default:
            return state
    }
}