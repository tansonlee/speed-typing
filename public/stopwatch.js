class Stopwatch {
	constructor() {
		this.startTime;
		this.interval;
	}

	// returns an object { hours, minutes, seconds }
	returnTime() {
		let t = new Date().getTime();
		let millisecondsPassed = t - this.startTime;
		let hours = Math.floor((millisecondsPassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((millisecondsPassed % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((millisecondsPassed % (1000 * 60)) / 1000);

		if (hours < 10) {
			hours = `0${hours.toString()}`;
		}

		if (minutes < 10) {
			minutes = `0${minutes.toString()}`;
		}

		if (seconds < 10) {
			seconds = `0${seconds.toString()}`;
		}

		hours = hours.toString();
		minutes = minutes.toString();
		seconds = seconds.toString();

		return { hours, minutes, seconds };
	}

	// returns an object { minutes, seconds }
	returnPace() {
		const time = this.returnTime();
		const totalSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
		let paceSeconds;

		if (totalDistance != 0) {
			paceSeconds = totalSeconds / (totalDistance / 1000);
		} else {
			paceSeconds = 0;
		}

		let minutes = Math.floor((paceSeconds % 3600) / 60);
		let seconds = Math.floor((paceSeconds % 3600) % 60);

		if (minutes < 10) {
			minutes = `0${minutes.toString()}`;
		}

		if (seconds < 10) {
			seconds = `0${seconds.toString()}`;
		}

		minutes = minutes.toString();
		seconds = seconds.toString();

		return { minutes, seconds };
	}

	start() {
		this.reset();
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

	reset() {
		this.startTime = null;
		if (this.interval) {
			clearInterval(this.interval);
		}
		const hour = document.getElementById("hour");
		const minute = document.getElementById("minute");
		const second = document.getElementById("second");

		hour.textContent = "00";
		minute.textContent = "00";
		second.textContent = "00";

		const paceMinute = document.getElementById("pace-minute");
		const paceSecond = document.getElementById("pace-second");

		const pace = this.returnPace();
		paceMinute.textContent = "00";
		paceSecond.textContent = "00";
	}

	updateDiv() {
		const hour = document.getElementById("hour");
		const minute = document.getElementById("minute");
		const second = document.getElementById("second");

		const time = this.returnTime();
		hour.textContent = time.hours;
		minute.textContent = time.minutes;
		second.textContent = time.seconds;

		const paceMinute = document.getElementById("pace-minute");
		const paceSecond = document.getElementById("pace-second");

		const pace = this.returnPace();
		paceMinute.textContent = pace.minutes;
		paceSecond.textContent = pace.seconds;
	}
}
