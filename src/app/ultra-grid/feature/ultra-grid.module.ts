import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UltraGridComponent } from './ultra-grid.component';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { FabricModule } from '@generic-ui/fabric';
import { UltraConfigModule } from '../common/config/ultra-config.module';
import { UltraGridSourceModule } from '../source/ultra-grid-source.module';
import { UltraCloseIconModule } from '../common/close-icon/ultra-close-icon.module';
import { ultraConfig } from '../common/config/ultra-config';
import { ultraGridDefaultConfig } from '../ultra-grid-default-config';


@NgModule({
	imports: [
		CommonModule,
		GuiGridModule,
		FabricModule,
		UltraConfigModule,
		UltraGridSourceModule,
		UltraCloseIconModule
	],
	declarations: [UltraGridComponent],
	exports: [UltraGridComponent],
	providers: [
		ultraConfig(ultraGridDefaultConfig)
	]
})
export class UltraGridModule {

}
