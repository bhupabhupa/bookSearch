import { RECEIVE_BOOK_ID } from "../action/books";

export default function bookId(state = 0, action) {
    switch (action.type) {
        case RECEIVE_BOOK_ID:
            return action.bookId
        default:
            return state
    }
}