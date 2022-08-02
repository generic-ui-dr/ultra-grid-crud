import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'ultra-close-icon',
	template: `
		<span class="ultra-close-icon"></span>
	`,
	styleUrls: ['./ultra-close-icon.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.ultra-close-icon-wrapper]': 'true'
	}
})
export class UltraCloseIconComponent {
}
