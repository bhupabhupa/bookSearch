import { getBooks } from '../utils/api'
import { receiveBooks,showLoading,hideLoading } from '../actions/books';

export function handleInitialData(search) {
    return (dispatch) => {
        dispatch(showLoading(true))
        return getBooks(search)
            .then(({bookList}) => {
                dispatch(receiveBooks(bookList))
                dispatch(hideLoading(false))
            })
    }
}
