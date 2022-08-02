import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { combineLatest, map, Observable } from 'rxjs';
import { UltraConfigService } from '../common/config/ultra-config.service';
import { UltraGridSource } from './ultra-grid.source';

@Injectable()
export class UltraGridSourceService {

	constructor(private readonly ultraGridSource: UltraGridSource,
				private readonly ultraConfig: UltraConfigService) {
	}

	add(item: any): void {
		this.onSourceWithConfig(item)
			.subscribe((result: any) => {
				let values = result.values;

				if (values) {
					values.push(result._item);
				} else {
					values = [result._item];
				}

				this.ultraGridSource.next(values);
			});

	}

	edit(item: any): void {
		this.onSourceWithConfig(item, true)
			.subscribe((result: any) => {
				let values = result.values;
				if (values) {
					values = values.map(((value: any) => {
						return value.id === item.id
							? result._item
							: value;
					}));
					this.ultraGridSource.next(values);
				}
			});
	}

	remove(id: number): void {
		this.ultraGridSource
			.on()
			.pipe(
				take(1)
			)
			.subscribe((values: any) => {
				if (values) {
					values = values.filter(((value: any) => {
						return value.id !== id;
					}));

					this.ultraGridSource.next(values);
				}
			});
	}

	private onSourceWithConfig(item: any, isEdit?: boolean): Observable<any> {
		return combineLatest([
			this.ultraGridSource.on(),
			this.ultraConfig.on()
		])
			.pipe(
				map(([values, config]: any) => {
					const _item = Object.keys(item).reduce((entries: any, key: string, i: number) => ({
						...entries, [key]: this.transform(config.columns, key, item, values, i, isEdit)
					}), {});
					return {
						_item,
						values
					};
				}),
				take(1)
			);
	}

	private transform(columns: any, key: string, value: any, values: Array<any>, i: number, isEdit?: boolean) {
		let _value;
		columns.forEach((column: any) => {
			if (column.field === key) {
				if (!!column.transform && (isEdit ? !column.noUpdate : true)) {
					_value = column.transform({ value, values });
				}
			}
		});

		return !!_value ? _value : Object.values(value)[i];
	}
}
