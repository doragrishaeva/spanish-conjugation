import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { appStore } from '@/stores';
import './Filters.scss';

export const Filters: React.FC = observer(() => {
	const { filters, selectedFilters, fetchTenses, toggleFilter, saveFilters } =
		appStore;
	const navigate = useNavigate();

	useEffect(() => {
		fetchTenses();
	}, []);

	const onSave = async () => {
		try {
			await saveFilters();
			navigate('/start');
		} catch (error) {
			console.error('Failed to save filters:', error);
			alert('Failed to save filters. Please try again.');
		}
	};

	return (
		<div className='filters-page'>
			<div className='filters-grid'>
				{filters.map((el) => (
					<div
						key={el.id}
						className={`filter-card ${selectedFilters.includes(el.id) ? 'selected' : ''}`}
						onClick={() => toggleFilter(el.id)}
					>
						{el.name}
					</div>
				))}
			</div>
			<button className='confirm-button' onClick={onSave}>
				Confirm
			</button>
		</div>
	);
});
