import React, { Component } from 'react';
import { connect } from 'react-redux'
import Book from './Book';
import { Card, Row, Col, CardHeader } from 'reactstrap';
import { isEmpty } from '../utils/api';
import ReactPaginate from 'react-paginate';
import { handleGetBooks } from '../action/books';

class BookList extends Component {
    handlePageClick = (data) => {
        debugger
        this.props.dispatch(handleGetBooks(data.selected, this.props.searchText))
    }

    componentDidUpdate() {
        console.log("UPDATED : ", this.props)
    }
    render() {
        let { bookList1, bookDetails, count, BookId } = this.props

        let bookObj = bookList1.find((obj) => obj.id === BookId)

        return (
            <Card className="mb-3">
                <CardHeader style={{ backgroundColor: 'white' }}>
                    <Row>
                        <Col xs='6'>
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={count / 20}
                                marginPagesDisplayed={3}
                                pageRangeDisplayed={3}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        </Col>
                        <Col xs='6'></Col>
                    </Row>
                    <Row>
                        <Col xs='6'>
                            <Row className='scrollBar'>
                                <Col>
                                    {
                                        bookList1.map((book) => {
                                            return (<Book book={book} />)
                                        })
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='6'>
                            {
                                bookDetails.length > 0 && bookObj &&
                                (

                                    <div className="flex-row card scrollBar">
                                        <div className="card-body">
                                            <img src={bookObj.best_book.image_url} className="card-img-left card-img" style={{ width: 'auto', height: '150px', float: 'left' }} alt="" />
                                            <div className="card-title uppercase colortiltle"><h6 className='nametitle'>{bookObj.best_book.title}</h6>
                                            </div>

                                            <p className='colordetails'>{bookDetails}</p>
                                        </div>
                                    </div>
                                )
                            }

                        </Col>
                    </Row>


                </CardHeader>
            </Card>

        )
    }
}


export function mapStateToProps({ bookListObj, bookDetails, searchText, BookId }) {
    let bookList1 = []
    let count = 0
    let description = ''
    if (!isEmpty(bookDetails)) {
        description = bookDetails
    }
    if (!isEmpty(bookListObj)) {
        bookList1 = bookListObj.bookList
        count = bookListObj.count
    }

    return {
        bookList1,
        count,
        bookDetails: description,
        searchText,
        BookId
    }
}

export default connect(mapStateToProps)(BookList);