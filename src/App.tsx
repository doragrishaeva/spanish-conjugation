import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Card, Filters } from '@/components';
import './App.scss';

export const App: React.FC = observer(() => {
	return (
		<>
			<div className='background'></div>
			<Routes>
				<Route path='/' element={<Navigate to='/settings' replace />} />
				<Route path='/start' element={<Card />} />
				<Route path='/settings' element={<Filters />} />
			</Routes>
		</>
	);
});
