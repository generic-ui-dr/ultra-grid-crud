import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { GuiTheme } from '@generic-ui/ngx-grid';
import { UltraGridConfig } from './ultra-grid-config';
import { UltraAddService } from '../source/ultra-add.service';
import { UltraGridSource } from '../source/ultra-grid.source';
import { UltraGridSourceService } from '../source/ultra-grid-source.service';
import { UltraConfigService } from '../common/config/ultra-config.service';


@Component({
	selector: 'ultra-grid',
	template: `
		<ng-container *ngIf="gridConfig">

			<gui-grid [source]="source"
					  [rowSelection]="false"
					  [cellEditing]="true"
					  [theme]="isTheme()"
					  (sourceEdited)="edit($event)">

				<gui-grid-column *ngFor="let column of gridConfig.columns"
								 [header]="column.header"
								 [field]="column.field"
								 [cellEditing]="!column.readonly">

				</gui-grid-column>

				<gui-grid-column [cellEditing]="false">
					<ng-template let-item="item">
						<ultra-close-icon (click)="delete(item.id)"></ultra-close-icon>
					</ng-template>
				</gui-grid-column>

			</gui-grid>

			<button gui-button (click)="add()" class="ultra-grid-add-btn">Add</button>

		</ng-container>
	`,
	styleUrls: ['./ultra-grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UltraGridComponent implements OnInit {

	@Input()
	source: Array<any> = [];

	gridConfig?: UltraGridConfig;

	constructor(private readonly ultraConfigService: UltraConfigService,
				private readonly ultraSource: UltraGridSource,
				private readonly ultraSourceService: UltraGridSourceService,
				private readonly ultraDialog: UltraAddService,
				private readonly changeDetectorRef: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.ultraConfigService
			.on()
			.subscribe((gridConfig: UltraGridConfig) => {
				this.gridConfig = gridConfig;
				this.changeDetectorRef.detectChanges();
			});

		this.ultraSource
			.on()
			.subscribe((source: Array<any>) => {
				this.source = [...source];
				this.changeDetectorRef.detectChanges();
			});
	}

	isTheme(): GuiTheme {
		return this.gridConfig?.theme ? this.gridConfig.theme : GuiTheme.GENERIC;
	}

	delete(id: number): void {
		this.ultraSourceService.remove(id);
	}

	edit(item: any): void {
		this.ultraSourceService.edit(item.after);
	}

	add(): void {
		this.ultraDialog.open();
	}
}
