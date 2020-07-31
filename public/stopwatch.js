class Stopwatch {
	constructor() {
		this.startTime;
		this.interval;
	}

	// returns time as a string 06:30
	returnTime() {
		let t = new Date().getTime();
		let millisecondsPassed = t - this.startTime;

		let minutes = Math.floor(
			(millisecondsPassed % (1000 * 60 * 60)) / (1000 * 60)
		);

		let seconds = Math.floor((millisecondsPassed % (1000 * 60)) / 1000);

		if (minutes < 10) {
			minutes = `0${minutes.toString()}`;
		}

		if (seconds < 10) {
			seconds = `0${seconds.toString()}`;
		}

		minutes = minutes.toString();
		seconds = seconds.toString();

		return `${minutes}:${seconds}`;
	}

	start() {
		this.startTime = new Date().getTime();
		this.interval = setInterval(() => {
			this.updateDiv();
		}, 1000);
	}

	stop() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	updateDiv() {
		const timer = document.querySelector(".timer");

		const time = this.returnTime();
		timer.textContent = time;
	}
}
