import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Row, Col } from 'reactstrap'
import { Autocomplete } from 'devextreme-react/autocomplete';
import { handleGetBooks, handleSearchText } from '../action/books.js';
import { isEmpty } from '../utils/api.js';
import book from '../images/Books-3.jpg'

function ItemTemplate(data) {
    return <div>{data}</div>;
}

class Search extends Component {
    state = {
        names: []
    }
    handleStateChange = (e) => {
        this.setState({
            searchText: e.value
        })

    }

    componentDidUpdate() {
        console.log("PROPS : ", this.props.bookTitles)
    }

    handleKeyPress = (e) => {
        if(e.event.key === 'Enter') {
            //call the api
            this.props.dispatch(handleSearchText(this.state.searchText))
            this.props.dispatch(handleGetBooks(0,this.state.searchText))
        }
    }

    render() {
        let {bookTitles} = this.props
        return (
            <React.Fragment>
                <Row>
                    <Col>
                <Card className='mb-3 search'>
                    <Row>
                        <Col md={2} sm={2} xs={2}>
                        <img src={book} className="card-img-left card-img" style={{ width: 'auto', height: '46px',float:'left', marginLeft:'150px' }} alt="" />
                        </Col>
                        <Col md={10} sm={10} xs={10}>
                            <div className={'list-container'} style={{ margin: '10px' }}>
                                <Autocomplete
                                    dataSource={bookTitles}
                                    value={this.state.searchText}
                                    onValueChanged={this.handleStateChange}
                                    onKeyPress={this.handleKeyPress}
                                    placeholder={'Search'}
                                    itemRender={ItemTemplate}
                                />
                            </div>
                        </Col>
                    </Row>
                </Card>
                </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export function mapStateToProps ({bookListObj}) {
    let bookTitles = []
    if(isEmpty(bookListObj) && bookListObj.bookList !== undefined && bookListObj.bookList.length > 0) {
        //console.log("bookList 0: ",bookListObj.bookList[0])
        if(!isEmpty(bookListObj.bookList)){
            bookTitles = bookListObj.bookList.map((book) => book.best_book.title)
        }
    }
    return {
        bookListObj,
        bookTitles
    }
}

export default connect(mapStateToProps)(Search);
