function getRandomConjugation(conjugatedVerb) {
	const moods = Object.keys(conjugatedVerb);
	const randomMood = moods[Math.floor(Math.random() * moods.length)];

	const tenses = Object.keys(conjugatedVerb[randomMood]);
	const randomTense = tenses[Math.floor(Math.random() * tenses.length)];

	const pronounGroups = ['singular', 'plural'];
	const randomPronounGroup =
		pronounGroups[Math.floor(Math.random() * pronounGroups.length)];

	const persons = Object.keys(
		conjugatedVerb[randomMood][randomTense][randomPronounGroup]
	);
	const randomPerson = persons[Math.floor(Math.random() * persons.length)];

	const answer =
		conjugatedVerb[randomMood][randomTense][randomPronounGroup][
			randomPerson
		];

	const pronounMap = {
		singular: {
			first: 'yo',
			second: 'tú',
			third: 'él, ella, Ud.'
		},
		plural: {
			first: 'nosotros(as)',
			second: 'vosotros(as)',
			third: 'ellos, ellas, Uds.'
		}
	};

	const formattedPronoun = pronounMap[randomPronounGroup][randomPerson];

	return {
		mood: randomMood,
		tense: randomTense,
		pronoun: formattedPronoun,
		answer: answer
	};
}

module.exports = { getRandomConjugation };
