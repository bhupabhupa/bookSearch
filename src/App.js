import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import BookList from './components/BookList';
import { Row, Col } from 'reactstrap';
import { isEmpty } from './utils/api';
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Loader from 'react-loader-spinner'

class App extends Component {
	render() {
		const { bookList, BlockUI } = this.props
		return (
			<div className="App">
				<Row>
					<Col>
						<Search />
					</Col>
				</Row>
				{
					bookList.length > 0 &&
					(
						<BlockUi tag="div" blocking={BlockUI} loader={<Loader type="Oval" color="#235f83" height="60" width="60" />}>
							<Row>
								<Col style={{ marginTop: '60px' }}>
									<BookList />
								</Col>
							</Row>
						</BlockUi>
					)
				}

			</div>
		);
	}
}

export function mapStateToProps({ bookListObj, BlockUI }) {
	let bookList = []
	if (!isEmpty(bookListObj)) {
		bookList = bookListObj.bookList
	}
	return {
		bookList,
		BlockUI
	}
}

export default connect(mapStateToProps)(App);
