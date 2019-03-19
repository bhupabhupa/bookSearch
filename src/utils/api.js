import axios from 'axios';

const apiKey = "E0iMhA8rz9SlRIBIZKZMw"

let requestUri1 = `https://cors-anywhere.herokuapp.com/` +
	`https://www.goodreads.com/search/index.xml?`;


let requestUri2 = `https://cors-anywhere.herokuapp.com/` +
	`https://www.goodreads.com/book/show/`;


export function getBooks(page, search) {
	if(page !== 0) {
		requestUri1 += `page=${page}&`
	}
	return axios.get(requestUri1 + `key=${apiKey}&q=${search}`)
		.then(res => {
			let data = parseXMLResponse(res.data);
			return data
		})
}


function parseXMLResponse(response) {
	const parser = new DOMParser();
	const XMLResponse = parser.parseFromString(response, "application/xml");
	const parseError = XMLResponse.getElementsByTagName("parsererror");

	if (parseError.length) {
		return { "bookList": [], "count": 0 }
	} else {
		const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
		const XMLresultPages = new Array(...XMLResponse.getElementsByTagName("total-results"));
		const searchResultPages = XMLresultPages[0].innerHTML;
		
		const searchResults = XMLresults.map(result => XMLToJson(result));
		return { "bookList": searchResults, "count": parseInt(searchResultPages) }
	}
};


function XMLToJson(XML) {
	const allNodes = new Array(...XML.children);
	const jsonResult = {};
	allNodes.forEach(node => {
		if (node.children.length) {
			jsonResult[node.nodeName] = XMLToJson(node);
		} else {
			jsonResult[node.nodeName] = node.innerHTML;
		}
	});
	return jsonResult;
};


export function getBookDetail(bookId) {
	return axios.get(requestUri2 + `${bookId}?key=${apiKey}`)
		.then(res => {
			let data = parseXMLResponseDetails(res.data);
			return data
		})
}


function parseXMLResponseDetails(response) {
	const parser = new DOMParser();
	const XMLResponse = parser.parseFromString(response, "application/xml");

	const parseError = XMLResponse.getElementsByTagName("parsererror");
	let description

	if (parseError.length) {
		description = "No description found."
	} else {
		description = XMLResponse.getElementsByTagName("description")[0].innerHTML;
		description = description.replace("<![CDATA[", "").replace("]]>", "");
		if (!description) {
			description = "No description found.";
		}
	}
	return description
}



export function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false;
	}
	return true;
}