let http = require("http"),
		url = require("url");

function start(route, handle) {
	function onRequest(req, res) {
		let pathname = url.parse(req.url).pathname;
		if(pathname == "/favicon.ico") {
			return;
		}
		console.log("Request for " + pathname + " recieved.");

		route(handle, pathname, res, req);
	}

	http.createServer(onRequest).listen(8000);
	console.log("Server has started");
}


exports.start = start;
