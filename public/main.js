console.log("hello world :o");
const stopwatch = new Stopwatch();

// cache the DOM
const text_div = document.querySelector(".text");
const typing_field = document.querySelector(".typing");
let quote;

async function setText(length) {
	// get text from API
	const url = `http://api.quotable.io/random?minLength=${length}`;
	const response = await fetch(url);
	const data = await response.json();

	quote = data.content;

	text_div.textContent = "";
	quote.split("").forEach(character => {
		const character_span = document.createElement("span");
		character_span.textContent = character;
		text_div.appendChild(character_span);
	});
	text_div.value = null;
}

setText(100);

typing_field.addEventListener("input", () => {
	const inputArray = typing_field.value.split("");
	const quoteArray = quote.split("");
	const quote_spans = document.querySelectorAll("span");
	let allCorrect = true;

	// clear all classes from the spans
	for (let i = 0; i < quoteArray.length; i++) {
		quote_spans[i].removeAttribute("class");
	}

	for (let i = 0; i < inputArray.length; i++) {
		if (inputArray[i] === quoteArray[i]) {
			quote_spans[i].classList.add("correct");
		} else if (inputArray[i] !== quoteArray[i]) {
			quote_spans[i].classList.add("incorrect");
			allCorrect = false;
		}
	}

	if (inputArray.length !== quoteArray.length) {
		allCorrect = false;
	}

	if (allCorrect) {
		console.log("U WIN");
		console.log(stopwatch.returnTime());
	}
});

stopwatch.start();

// async function logDistance(distance, time, pace) {
// 	const date = getCurrentDate();
// 	const data = { distance, date, time, pace };
// 	console.log(data);

// 	const options = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	};

// 	const response = await fetch("/distance", options);
// 	const responseJSON = await response.json();
// 	console.log(responseJSON);
// }
