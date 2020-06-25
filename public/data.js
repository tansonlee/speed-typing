const deleteAll_div = document.getElementById("delete");
let entries = [];

function removeFadeOut(el, speed) {
	const seconds = speed / 1000;
	el.style.transition = "opacity " + seconds + "s ease";

	el.style.opacity = 0;
	setTimeout(function() {
		el.remove();
	}, speed);
}

// shows the data as divs
async function showData() {
	const data = await getData();
	const dataArray = data.data;
	//console.log(dataArray);
	dataArray.forEach((element) => {
		const root = document.createElement("div");
		root.setAttribute("class", "data-pack");
		const distance_div = document.createElement("div");
		const time_div = document.createElement("div");
		const pace_div = document.createElement("div");
		const date_div = document.createElement("div");
		const delete_div = document.createElement("img");

		distance_div.textContent = `Total Distance: ${parseInt(element.distance)}m`;
		time_div.textContent = `Total Time: ${element.time}`;
		pace_div.textContent = `Average Pace: ${element.pace}`;
		date_div.textContent = `Date: ${element.date}`;
		delete_div.src = "/trash.png";
		delete_div.classList.add("trash");

		root.append(distance_div, time_div, pace_div, date_div, delete_div);
		document.body.append(root);
		entries.push(delete_div);
	});
}

// receive data from database
async function getData() {
	const response = await fetch("/data");
	const responseJSON = await response.json();
	return responseJSON;
}

async function main() {
	await showData();
	entries.forEach((entry) => {
		entry.addEventListener("touchend", () => {
			remove(entry);
			const parent = entry.parentNode;
			removeFadeOut(parent, 500);
		});
	});
}

// removes a single entry by date
async function remove(entry) {
	const dateContent = entry.parentNode.childNodes[3].textContent;
	const date = dateContent.slice(6);

	const data = { date };

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	};

	const response = await fetch("/deleteentry", options);
	const responseJSON = await response.json();
	console.log(responseJSON);
}

// sends a request to server to delete database
deleteAll_div.addEventListener("click", async () => {
	const data = { action: "delete" };

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	};

	const response = await fetch("/delete", options);
	const responseJSON = await response.json();
	console.log(responseJSON);

	entries.forEach((entry) => {
		const parent = entry.parentNode;
		removeFadeOut(parent, 500);
	});
});

main();
