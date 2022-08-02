import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => UltraInputComponent),
	multi: true
};

@Component({
	selector: 'ultra-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [INPUT_VALUE_ACCESSOR],
	host: {
		'[class.ultra-input]': 'true'
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UltraInputComponent implements ControlValueAccessor {

	@Input()
	type: string = 'text';

	@Input()
	placeholder: string = '';

	@Input()
	disabled: boolean = false;

	@Input()
	inputInvalid: boolean = false;

	@Input()
	clearButton: boolean = false;

	@Input()
	invalidMessage: string = 'This field is required';

	inputValue: string | number | null = null;

	onValueChange = (_: any) => {
	};

	onTouch: any = () => {
	};

	registerOnChange(fn: any): void {
		this.onValueChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	writeValue(value: any): void {
		this.inputValue = value;
	}

	onChange(event: any) {
		this.inputValue = event.target.value;
		this.onValueChange(this.inputValue);
	}
}
