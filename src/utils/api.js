import axios from 'axios';

const apiKey = "E0iMhA8rz9SlRIBIZKZMw"

//`https://cors-anywhere.herokuapp.com/` +
		
//let requestUri1 =  `https://www.goodreads.com/search/index.xml?`;

//let requestUri2 = `https://cors-anywhere.herokuapp.com/` + `https://www.goodreads.com/book/show/`;

export function getBooks(page, search) {
	let reqURL = ``
	if(page !== 0) {
		reqURL = `search/index.xml?page=${page}&key=${apiKey}&q=${search}`
	} else {
		reqURL = `search/index.xml?key=${apiKey}&q=${search}`
	}

	return axios.get(reqURL)
		.then(res => {
			let data = parseXMLResponse(res.data);
			return data
		})
		.catch(err =>{
			return err
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
	return axios.get(`book/show/${bookId}?key=${apiKey}`)
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