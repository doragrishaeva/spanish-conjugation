import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Card } from '@/components';
import { appStore } from '@/stores';
import './App.scss';

export const App: React.FC = observer(() => {
	const { verb, fetchVerb } = appStore;

	useEffect(() => {
		fetchVerb();
	}, []);

	return (
		<>
			<div className='background'></div>
			<Card verb={verb} fetchNewVerb={fetchVerb}></Card>
		</>
	);
});
