import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { appStore } from '@/stores';
import { CardStatus } from '@/models';
import './Card.scss';

export const Card = observer(() => {
	const { verb, fetchVerb } = appStore;

	useEffect(() => {
		fetchVerb();
	}, []);

	const [inputValue, setInputValue] = useState('');
	const [status, setStatus] = useState<CardStatus>(CardStatus.Unset);

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (inputValue.trim().toLowerCase() === verb.answer.toLowerCase()) {
				setStatus(CardStatus.Correct);
				setTimeout(() => {
					fetchVerb();
					setStatus(CardStatus.Unset);
				}, 400);
			} else {
				setStatus(CardStatus.Incorrect);
				setTimeout(() => setStatus(CardStatus.Unset), 400);
			}
			setInputValue('');
		}
	};

	const handleReplace = () => {
		fetchVerb();
		setInputValue('');
	};

	return (
		<div
			className={`card ${status === 'correct' ? 'card--correct' : ''} ${
				status === 'incorrect' ? 'card--incorrect' : ''
			}`}
		>
			<div className='verb'>{verb?.verb}</div>
			<div className='tense'>
				Tense:{' '}
				<b>
					{verb?.mood} {verb?.tense}
				</b>
			</div>
			<div className='pronoun'>
				Pronouns: <b>{verb?.pronoun}</b>
			</div>
			<div className='input'>
				<input
					placeholder='Type in Spanish'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<div className='btn' onClick={handleReplace}>
					Don't know
				</div>
			</div>
		</div>
	);
});
