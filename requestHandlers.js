let fs = require("fs"),
		querystring = require("querystring"),
		formidable = require("formidable");

let body = fs.readFileSync(__dirname + '/index.html', 'utf-8');

function start(res) {
	console.log("Request handler 'start' was called.");

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
}

function upload(res, req) {
	console.log("Request handler 'upload' was called.");

	let form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(req, (err, fields, files) => {
		console.log("parsing done");

	fs.rename(files.upload.path, __dirname + "tmp/test.png", (err) => {
		if(err) {
			fs.unlink(__dirname + "/tmp/test.png");
			fs.rename(files.upload.path, __dirname + "/tmp/test.png");
		}
	});

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("received image: <br>");
	res.write("<img src='/show'>");
	res.end();
	});
}

function show(res) {
	console.log("Request handler 'show ' was called.");
	fs.readFile(__dirname + "/tmp/test.png", "binary", (err,file) => {
		if(err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(err + "\n");
			res.end();
		} else {
			res.writeHead(200, {"Content-Type": "image/png"});
			res.write(file, "binary");
			res.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
