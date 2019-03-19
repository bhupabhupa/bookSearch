import { getBooks,getBookDetail } from "../utils/api";

export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const RECEIVE_BOOK_DETAILS = 'RECEIVE_BOOK_DETAILS'
export const RECEIVE_SEARCH_TEXT = 'RECEIVE_SEARCH_TEXT'
export const RECEIVE_BOOK_ID = 'RECEIVE_BOOK_ID'
export const START_PROCESS = 'START_PROCESS'
export const END_PROCESS = 'END_PROCESS'

export function receiveBooks(bookList) {
    return {
        type: RECEIVE_BOOKS,
        bookList
    }
}

export function showLoading(flag) {
    return {
        type: START_PROCESS,
        flag
    }
}


export function hideLoading(flag) {
    return {
        type: END_PROCESS,
        flag
    }
}

export function receiveBookDetails(bookDetail) {
    return {
        type: RECEIVE_BOOK_DETAILS,
        bookDetail
    }
}

export function receiveSearchText(searchText) {
    return {
        type: RECEIVE_SEARCH_TEXT,
        searchText
    }
}

export function reciveBookId(bookId) {
    return {
        type: RECEIVE_BOOK_ID,
        bookId
    }
}

export function handleGetBooks(page, search) {
    return (dispatch) => {
        dispatch(showLoading(true))
        return getBooks(page, search)
            .then((bookList) => {
                dispatch(receiveBooks(bookList))  
                dispatch(hideLoading(false))  
            }
        )
            
    }
}

export function handleGetBookDetails(id) {
    return (dispatch) => {
        dispatch(showLoading(true))
        return getBookDetail(id)
            .then((bookDetail) => {
                dispatch(receiveBookDetails(bookDetail))
                dispatch(reciveBookId(id))    
                dispatch(hideLoading(false))
            }
        )
            
    }
}


export function handleSearchText(searchText) {
    return (dispatch) => {
        dispatch(receiveSearchText(searchText))
    }
}