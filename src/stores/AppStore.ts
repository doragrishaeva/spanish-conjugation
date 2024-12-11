import { makeAutoObservable } from 'mobx';

import { IVerb } from '@/models';

class AppStore {
	verb: IVerb | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setVerb = (verb: IVerb) => {
		this.verb = verb;
	};

	fetchVerb = async () => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/getConjugation'
			);
			const data = await response.json();
			this.setVerb(data);
		} catch (error) {
			console.error('Error fetching verb:', error);
		}
	};
}

export const appStore = new AppStore();
