import { Component, OnInit, Type } from '@angular/core';
import { UltraGridSourceService } from './ultra-grid-source.service';
import { FabricDialogService } from '@generic-ui/fabric';
import { GuiDataType } from '@generic-ui/ngx-grid';
import { AbstractFormArray } from '../common/form-array.abstract';
import { UltraConfigService } from '../common/config/ultra-config.service';

@Component({
	template: `
		<form [formGroup]="getForm()">

			<div *ngIf="getFormArray()"
				 [formArrayName]="'formArray'">
				<ng-container *ngFor="let item of getFormArray().controls; let i = index">
					<div *ngIf="!item.value.readonly"
						 [formGroupName]="i"
						 style="display: flex; flex-direction: column; min-width: 600px; margin-bottom: 24px">

						<ultra-input [formControlName]="'fieldValue'"
									 [inputInvalid]="isInputValid(i)"
									 [type]="getItemType(item.value)">
							{{getLabel(i)}}
						</ultra-input>

					</div>
				</ng-container>
			</div>

			<button (click)="add()">
				Add
			</button>

		</form>
	`
})
export class UltraAddModalComponent extends AbstractFormArray<any> implements OnInit {

	submitted: boolean = false;

	constructor(private readonly ultraConfig: UltraConfigService,
				private readonly ultraSourceService: UltraGridSourceService,
				private readonly dialogService: FabricDialogService) {
		super();
	}

	ngOnInit() {
		const columns = this.ultraConfig.getConfig().columns
							.map((entry: any) => {
								return {
									...entry,
									fieldValue: ''
								};
							});
		this.createFormArray(columns);
	}

	getType(): Type<any> {
		return this.ultraConfig.getConfig();
	}

	getLabel(i: number): string {
		return this.getFormArray().controls[i].value.header;
	}

	add(): void {
		this.submitted = true;
		if (this.getForm().valid) {

			const entry = this.getFormArray().value.reduce((entries: any, entry: any) => ({
				...entries, [entry.field]: entry.fieldValue
			}), {});

			this.ultraSourceService.add(entry);
			this.dialogService.close();
		}
	}

	isInputValid(formControlName: number): boolean {
		return this.submitted && !this.isValid(formControlName);
	}

	getItemType(item: any): string {
		switch (item.type) {
			case GuiDataType.NUMBER: {
				return 'number';
			}

			case GuiDataType.STRING: {
				return 'text';
			}

			default: {
				return 'text';
			}
		}
	}
}
