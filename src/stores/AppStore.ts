import { makeAutoObservable } from 'mobx';

import { IVerb } from '@/models';
import API_URL from '../config';

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
			const response = await fetch(`${API_URL}/api/getConjugation`);
			const data = await response.json();
			this.setVerb(data);
		} catch (error) {
			console.error('Error fetching verb:', error);
		}
	};
}

export const appStore = new AppStore();
