import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UltraConfigService } from './ultra-config.service';
import { ULTRA_CONFIG } from './ultra-config.token';
import { ultraConfig } from './ultra-config';

@NgModule({
	imports: [CommonModule]
})
export class UltraConfigModule {
	static forRoot(): ModuleWithProviders<UltraConfigModule> {
		return {
			ngModule: UltraConfigModule,
			providers: [
				ultraConfig(),
				{
					provide: UltraConfigService,
					deps: [ULTRA_CONFIG]
				}
			]
		};
	}
}
