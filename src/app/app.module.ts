import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UltraGridModule } from './ultra-grid/feature/ultra-grid.module';
import { UltraConfigModule } from './ultra-grid/common/config/ultra-config.module';
import { UltraGridSourceModule } from './ultra-grid/source/ultra-grid-source.module';
import { ultraConfig } from './ultra-grid/common/config/ultra-config';
import { ultraGridDefaultConfig } from './ultra-grid/ultra-grid-default-config';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		UltraGridModule,
		UltraConfigModule.forRoot(),
		UltraGridSourceModule.forRoot()
	],
	providers: [
		ultraConfig(ultraGridDefaultConfig)
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
