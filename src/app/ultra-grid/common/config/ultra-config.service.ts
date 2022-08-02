import { Inject, Injectable } from '@angular/core';
import { ULTRA_CONFIG } from './ultra-config.token';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UltraConfigService {

	private config: any;

	private readonly config$: BehaviorSubject<any>;

	constructor(@Inject(ULTRA_CONFIG) config: any) {
		this.config = config;
		this.config$ = new BehaviorSubject<any>(this.config);
	}

	getConfig() {
		return this.config;
	}

	next(config: any): void {
		this.config = config;
		this.config$.next(config);
	}

	on() {
		return this.config$.asObservable();
	}
}
