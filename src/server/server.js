const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const conjugateVerb = require('conjugator/lib/conjugateVerb.js');

const { getRandomConjugation } = require('./utils');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const verbs = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'verbs.json'), 'utf-8')
);

const tenses = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'tenses.json'), 'utf-8')
);

const userFilters = {};

app.get('/api/getTenses', (req, res) => {
	let userId = req.query.userId || uuidv4();

	if (!req.query.userId) {
		console.log(`Assigned new userId: ${userId}`);
	}

	res.json(tenses);
});

app.post('/api/saveFilters', (req, res) => {
	const userId = req.body.userId;

	if (!userId) {
		return res
			.status(400)
			.json({ error: 'User ID not found. Please refresh the page.' });
	}

	const { filters } = req.body;

	if (!Array.isArray(filters)) {
		return res.status(400).json({ error: 'Invalid filters format' });
	}

	userFilters[userId] = filters;
	res.json({ message: 'Filters saved successfully' });
});

app.get('/api/getConjugation', (req, res) => {
	const userId = req.query.userId;

	if (!userId) {
		return res
			.status(400)
			.json({ error: 'User ID not found. Please refresh the page.' });
	}

	const filters = userFilters[userId] || tenses;

	const randomIndex = Math.floor(Math.random() * verbs.length);
	const randomVerb = verbs[randomIndex];

	try {
		const conjugatedVerb = conjugateVerb(randomVerb);
		const result = getRandomConjugation(conjugatedVerb, filters);
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
