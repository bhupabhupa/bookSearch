import React from 'react';
import { connect } from 'react-redux'
import { handleGetBookDetails } from '../action/books.js';
import ReactStars from 'react-stars'

class Book extends React.PureComponent {
	getBookdetail = (bookObj) => {
		debugger
		this.props.dispatch(handleGetBookDetails(bookObj.id))
	}

	render() {
		const { book } = this.props
		return (
			<div>
				<div className="flex-row card list">
					<img src={book.best_book.small_image_url} className="card-img-left card-img" style={{ width: 'auto', height: '75px' }} alt="" />
					<div className="card-body">
						<div className="card-title uppercase color"><a className='pointer' onClick={() => this.getBookdetail(book)}>{book.best_book.title}</a>
							<p className="card-text color">{"by " + book.best_book.author.name}</p>
							<div className='row startrating'>
								<ReactStars
									count={5}
									size={24}
									value={book.average_rating}
									edit={false}
									color2={'#ffd700'}
									className='reactstarts'
								/>
								<span className='avgratings'>{book.average_rating} avg rating — 5,733 {book.ratings_count} — published {book.original_publication_year} — {book.books_count} editions</span>
							</div>
						</div>
					</div>
				</div>
				<br />
			</div>
		);
	}

	renderAgentDetails() {
		const agent = this.props.house.Agent;
		return (
			<div className={'agent-details'}>
				<img src={agent.Picture} alt=""/>
				<div>
					<div className={'name large-text'}>{agent.Name}</div>
					<div className={'phone'}>Tel: {agent.Phone}</div>
				</div>
			</div>
		);
	}

	show() {
		this.props.show(this.props.house);
	}
}

export default connect()(Book);