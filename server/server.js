const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const conjugateVerb = require('conjugator/lib/conjugateVerb.js');

const { getRandomConjugation } = require('./utils');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const verbs = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'verbs.json'), 'utf-8')
);

app.get('/api/getConjugation', (req, res) => {
	const randomIndex = Math.floor(Math.random() * verbs.length);
	const randomVerb = verbs[randomIndex];

	try {
		const conjugatedVerb = conjugateVerb(randomVerb);
		const result = getRandomConjugation(conjugatedVerb);
		res.json({
			verb: randomVerb,
			...result
		});
	} catch (error) {
		console.error(`Error conjugating verb: ${error.message}`);
		res.status(500).json({ error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Proxy server running at http://localhost:${PORT}`);
});
