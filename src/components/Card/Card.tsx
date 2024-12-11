import { useState } from 'react';

import { CardStatus, IVerb } from '@/models';
import './Card.scss';

interface CardProps {
	verb: IVerb;
	fetchNewVerb: () => void;
}

export const Card = ({ verb, fetchNewVerb }: CardProps) => {
	const [inputValue, setInputValue] = useState('');
	const [status, setStatus] = useState<CardStatus>(CardStatus.Unset);

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (inputValue.trim().toLowerCase() === verb.answer.toLowerCase()) {
				setStatus(CardStatus.Correct);
				setTimeout(() => {
					fetchNewVerb();
					setStatus(CardStatus.Unset);
				}, 400);
			} else {
				setStatus(CardStatus.Incorrect);
				setTimeout(() => setStatus(CardStatus.Unset), 400);
			}
			setInputValue('');
		}
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
			<input
				placeholder='Type answer here'
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyPress={handleKeyPress}
			/>
		</div>
	);
};