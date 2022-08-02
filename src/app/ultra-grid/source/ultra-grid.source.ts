import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UltraGridSource {

	private readonly source$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

	next(values: any): void {
		this.source$.next(values);
	}

	on(): Observable<any> {
		return this.source$.asObservable();
	}

}
