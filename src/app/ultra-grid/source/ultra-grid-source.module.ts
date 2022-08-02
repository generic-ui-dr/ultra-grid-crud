import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UltraGridSource } from './ultra-grid.source';
import { UltraGridSourceService } from './ultra-grid-source.service';
import { UltraAddModalComponent } from './ultra-add-modal.component';
import { UltraAddService } from './ultra-add.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UltraInputModule } from '../common/input/ultra-input.module';
import { UltraConfigService } from '../common/config/ultra-config.service';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UltraInputModule
	],
	declarations: [
		UltraAddModalComponent
	]
})
export class UltraGridSourceModule {
	static forRoot(): ModuleWithProviders<UltraGridSourceModule> {
		return {
			ngModule: UltraGridSourceModule,
			providers: [
				UltraGridSource,
				UltraGridSourceService,
				UltraAddService,
				UltraConfigService
			]
		};
	}
}
