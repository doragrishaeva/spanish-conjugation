function getRandomConjugation(conjugatedVerb, filters = []) {
	const filterSet = new Set(filters);

	const filteredOptions = [];

	Object.keys(conjugatedVerb).forEach((mood) => {
		Object.keys(conjugatedVerb[mood]).forEach((tense) => {
			const filterKey = `${mood}_${tense}`;
			if (filters.length === 0 || filterSet.has(filterKey)) {
				filteredOptions.push({ mood, tense });
			}
		});
	});

	if (filteredOptions.length === 0) {
		console.error(
			'Available moods and tenses:',
			Object.keys(conjugatedVerb)
		);
		throw new Error(
			'No matching moods and tenses found based on the filters'
		);
	}

	const randomOption =
		filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
	const { mood: randomMood, tense: randomTense } = randomOption;

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
