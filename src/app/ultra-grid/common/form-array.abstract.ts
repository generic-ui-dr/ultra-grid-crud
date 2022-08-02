import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Type } from '@angular/core';
import { GuiDataType } from '@generic-ui/ngx-grid';


// TODO
export interface UltraFormArrayItem {
	readonly: boolean,
	type: GuiDataType
}

export abstract class AbstractFormArray<T extends UltraFormArrayItem> {

	private formArray = new UntypedFormArray([]);

	private readonly form: UntypedFormGroup;

	protected constructor() {
		this.form = new UntypedFormGroup({
			formArray: this.formArray
		});
	}

	abstract getType(): Type<T>;

	getForm(): UntypedFormGroup {
		return this.form;
	}

	getFormArray(): UntypedFormArray {
		return <UntypedFormArray>this.form.controls['formArray'];
	}

	selected(i: number, value: any): void {
		const item = this.getFormArray().controls[i];
		item.patchValue(value);
	}

	protected createFormArray(itemsArray: Array<T>): UntypedFormArray {

		itemsArray.forEach((arrayItem: T) => {
			this.addToFormArray(arrayItem);
		});
		return this.getFormArray();
	}

	protected addToFormArray(arrayItem: T): void {
		const keys = Object.keys(arrayItem),
			itemControls = {};

		keys.forEach((key: string, i: number) => {
			const validator = this.getValidator(arrayItem);
			const obj = { [key]: new UntypedFormControl(Object.values(arrayItem)[i], validator) };
			Object.assign(itemControls, obj);
		});

		const formItem = new UntypedFormGroup({
			...itemControls
		});

		this.formArray.push(formItem);
	}

	protected clearFormArray(): void {
		if (this.getFormArray()) {
			this.getFormArray().clear();
		}
	}

	isValid(formControlValue: number): boolean {
		return this.getFormArray().controls[formControlValue].valid;
	}

	private getValidator(arrayItem: T) {
		if (!arrayItem.readonly) {
			return [Validators.required];
		} else {
			return [];
		}
	}
}
