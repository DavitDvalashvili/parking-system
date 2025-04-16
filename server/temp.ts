const startTime = 9;
const endTime = 23;

const incomeTime = 2;
let incomeTimeInc = incomeTime;
const outcomeTime = incomeTime + 10;

const timesDay = [
	{
		t: 1,
		p: 2,
	},
	{
		t: 3,
		p: 1,
	},
];

let T = 10;

let price = 0;

if (incomeTime % 23 >= startTime) {
	for (let i = 0; i < timesDay.length; i++) {
		if (incomeTimeInc <= outcomeTime) {
			incomeTimeInc += timesDay[i].t;
			price += timesDay[i].p;
			if (incomeTimeInc > endTime) T -= incomeTimeInc - endTime;
		}
	}
	if (incomeTimeInc <= outcomeTime && outcomeTime % 24 <= endTime && incomeTimeInc < endTime) {
		incomeTimeInc += endTime - incomeTimeInc;
		price += 2;
	}
	if (outcomeTime >= endTime) {
		incomeTimeInc += T;
		price += 3;

		if (outcomeTime % 24 >= startTime && incomeTimeInc <= outcomeTime) {
			for (let i = 0; i < timesDay.length; i++) {
				if (incomeTimeInc <= outcomeTime) {
					incomeTimeInc += timesDay[i].t;
					price += timesDay[i].p;
				}
			}
			if (incomeTimeInc <= outcomeTime && outcomeTime % 24 <= endTime) {
				price += 2;
			}
		}
	}
}

if (incomeTime % 23 < startTime) {
	if (outcomeTime > startTime) {
		incomeTimeInc += startTime - incomeTime;

		for (let i = 0; i < timesDay.length; i++) {
			if (incomeTimeInc <= outcomeTime) {
				incomeTimeInc += timesDay[i].t;
				price += timesDay[i].p;
				if (incomeTimeInc > endTime) T -= incomeTimeInc - endTime;
			}
		}
		if (incomeTimeInc <= outcomeTime && outcomeTime % 24 <= endTime && incomeTimeInc < endTime) {
			incomeTimeInc += endTime - incomeTimeInc;
			price += 2;
		}
		if (outcomeTime >= endTime) {
			incomeTimeInc += T;
			price += 3;
		}
	} else {
		incomeTimeInc = outcomeTime;
	}
	price += 3;
}

logResult(incomeTimeInc, price, outcomeTime, T);

function logResult(time1: number, price1: number, outcome: number, T: number) {
	console.log(`time inc.: ${time1}\nprice Sum: ${price1}\noutcome: ${outcome}\noutcome Mod.: ${outcome % 24}\nNight Time Inc.: ${T}`);
}

let d: string[] = [...new Date().toLocaleTimeString('en-GB').split(':')];
const s: number = Number(d[0]) + Number(d[1]) / 60 + Number(d[2]) / 60 / 60;
console.log(s);
