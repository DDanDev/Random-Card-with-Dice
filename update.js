var advices = [
	["advice #901", "lorem ipsum e o paragrafo"],
	["advice #002", "bla bla bla bla bla"],
	["advice #103", "Eligendi sapiente quidem minima vitae blanditiis perferendis iste. Magni eligendi, sunt at error dolor aut quia rem aperiam harum illo, facilis id."],
	["advice #104", "blanditiis perferendis iste. Magni eligendi, sunt at error dolor aut quia rem aperiam harum illo, facilis id."],
	["advice #105", "Lorem ipsum dolor, sit amet consectetur adipisicing elit.  iste. Magni eligendi, sunt at error dolor aut quia rem aperiam harum illo, facilis id."],
	["advice #106", " blanditiis perferendis iste. Magni eligendi, sunt at error dolor aut quia rem aperiam harum illo, facilis id."],
	["advice #107", " error dolor aut quia rem aperiam harum illo, facilis id."],
	["advice #108", " Magni eligendi, sunt at error dolor aut quia rem aperiam harum illo, facilis id."],
];

const dice = document.getElementById("updateDice");
const adviceTitle = document.getElementById("adviceTitle");
const adviceText = document.getElementById("adviceText");

dice.addEventListener("click", function () {
	update();
});

var update = () => {
	let newAdviceIndex = Math.floor(Math.random() * advices.length);
	let newAdviceTitle = advices[newAdviceIndex][0];
	let newAdviceText = advices[newAdviceIndex][1];
	adviceTitle.innerHTML = newAdviceTitle;
	adviceText.innerHTML = newAdviceText;
};

update();
