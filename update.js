const dice = document.getElementById("updateDice");
const adviceTitle = document.getElementById("adviceTitle");
const adviceText = document.getElementById("adviceText");

dice.addEventListener("click", update);

let animateDuration = 1000;
dice.style.transition = `all ${animateDuration}ms`;
let titlePrefix = "advice #";

adviceTitle.innerHTML = `${titlePrefix}0`;
adviceText.innerHTML = "Loading...";

let btnEnabled = true; //can't request again while the animation didn't finish AND a new advice hasn't been displayed
let updateHappened = false;

async function update(evt) {
	if (!btnEnabled) {
		console.log("clicked but still not enabled");
		return;
	}
	console.log("clicked: updater started");
	btnEnabled = false;
	updateHappened = false;
	dice.style.transform = "translateY(-50%) rotate(300deg) scale(1.4)";
	let animBack = setInterval(() => {
		if (updateHappened) {
			clearInterval(animBack);
			dice.style.transform = "translateY(-50%)";
			setTimeout(() => {
				btnEnabled = true;
				console.log("reenabled");
			}, animateDuration);
		}
	}, animateDuration);

	await fetchAdvice();
	console.log(`succesful advice: `, { ...advice });

	adviceTitle.innerHTML = `${titlePrefix}${advice.slip.id}`;
	adviceText.innerHTML = advice.slip.advice;
	console.log("updated");
	updateHappened = true;
}

let tryCount = 0; //for logging only
//all of this is because the API actually refreshes to a new advice at a certain interval. Requesting again within the same interval returns the same advice, so I wait a little and try again until a new advice is received.
async function fetchAdvice() {
	tryCount++;
	console.log("fetching try " + tryCount);
	advice = await fetch(`https://api.adviceslip.com/advice`);
	advice = await advice.json();
	console.log(advice.slip.id);
	console.log(advice.slip.advice);
	if (parseInt(adviceTitle.innerHTML.substring(titlePrefix.length)) === advice.slip.id) {
		console.log(">>>>>>>GOT THE SAME AGAIN<<<<<<");
		console.log(`failed advice: `, { ...advice });
		await new Promise((r) => { //wait one animate duration before next attempt, wait next attempt to resolve before resolving the current one.
			setTimeout(async () => {
				await fetchAdvice();
				r();
			}, animateDuration);
		});
	} else tryCount = 0;
}

update();

let testerInterval = setInterval(() => update(), animateDuration / 4 + 1);
clearInterval(testerInterval);
