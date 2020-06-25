// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const Datastore = require("nedb");
const db = new Datastore({ filename: "database.db", autoload: true });
db.loadDatabase();

// listen for requests :)
const port = process.env.PORT || 8000;
const listener = app.listen(port, () => {
	console.log("Your app is listening on port " + listener.address().port);
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/public/index.html");
});

// send all the data from the database to webpage -- received at data.html
app.get("/data", (request, response) => {
	db.find({}, (err, data) => {
		if (err) {
			response.end();
			return;
		}
		response.json({ data });
	});
});

// receive the distance from webpage and insert to database
app.post("/distance", function(request, response) {
	const data = request.body;
	const reply = {
		status: "success",
		action: "recieve log",
		distance: data.distance,
		time: data.time,
		pace: data.pace
	};
	response.json(reply);
	db.insert({ distance: data.distance, time: data.time, pace: data.pace, date: data.date });
	console.log(reply);
});

// receive the request to delete the database and deletes it
app.post("/delete", function(request, response) {
	const data = { status: "success", action: "delete all" };
	response.json(data);
	deleteDatabase();

	console.log("deleted");
});

// receive the request to delete an entry
app.post("/deleteentry", function(request, response) {
	const data = request.body;
	console.log(data);
	const reply = { status: "success", action: "delete", date: data.date };
	response.json(reply);
	console.log(reply);

	deleteEntry(data.date);
});

// deletes all data in the database
function deleteDatabase() {
	db.remove({}, { multi: true }, function(err, numRemoved) {
		db.loadDatabase(function(err) {
			// done
		});
	});
}

function deleteEntry(date) {
	db.remove({ date: date }, {}, function(err, numRemoved) {
		// numRemoved = 1
		// done
	});
}
