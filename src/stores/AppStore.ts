import { makeAutoObservable } from 'mobx';

import { ITense, IVerb } from '@/models';
import API_URL from '../config';

class AppStore {
	verb: IVerb | null = null;
	filters: ITense[] = [];
	selectedFilters: string[] = [];
	userId: string | null = null;

	constructor() {
		makeAutoObservable(this);
		this.initUserId();
	}

	private initUserId() {
		let userId = localStorage.getItem('userId');
		if (!userId) {
			userId = this.generateUserId();
			localStorage.setItem('userId', userId);
		}
		this.userId = userId;
	}

	private generateUserId() {
		return crypto.randomUUID();
	}

	setVerb = (verb: IVerb) => {
		this.verb = verb;
	};

	setFilters = (filters: ITense[]) => {
		this.filters = filters;
	};

	setSelectedFilters = (selectedFilters: string[]) => {
		this.selectedFilters = selectedFilters;
	};

	toggleFilter = (id: string) => {
		if (this.selectedFilters.includes(id)) {
			this.selectedFilters = this.selectedFilters.filter(
				(filter) => filter !== id
			);
		} else {
			this.selectedFilters = [...this.selectedFilters, id];
		}
	};

	fetchTenses = async () => {
		try {
			const response = await fetch(`${API_URL}/api/getTenses`);
			const data = await response.json();
			this.setFilters(data);
		} catch (error) {
			console.error('Error fetching tenses:', error);
		}
	};

	saveFilters = async () => {
		try {
			const response = await fetch(`${API_URL}/api/saveFilters`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: this.userId,
					filters: this.selectedFilters
				})
			});
			const data = await response.json();
			console.log('Filters saved successfully:', data);
		} catch (error) {
			console.error('Error saving filters:', error);
		}
	};

	fetchVerb = async () => {
		try {
			const response = await fetch(
				`${API_URL}/api/getConjugation?userId=${this.userId}`
			);
			const data = await response.json();
			this.setVerb(data);
		} catch (error) {
			console.error('Error fetching verb:', error);
		}
	};
}

export const appStore = new AppStore();
