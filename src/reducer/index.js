import { combineReducers } from 'redux'
import bookListObj from './books'
import bookDetails from './bookDetails'
import searchText from './searchText'
import BookId from './bookId'
import BlockUI from './blockUi'

export default combineReducers({
    bookListObj,
    bookDetails,
    searchText,
    BookId,
    BlockUI
})