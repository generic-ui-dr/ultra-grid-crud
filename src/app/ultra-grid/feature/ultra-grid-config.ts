import { GuiColumn, GuiInfoPanel, GuiPaging, GuiSearching, GuiTheme } from '@generic-ui/ngx-grid';

export interface UltraColumnTransform {
	value?: any,
	values?: Array<any>,
	noUpdate?: boolean
}

export interface UltraGuiColumn extends GuiColumn {
	readonly?: boolean,
	transform?: (ultraTransform: UltraColumnTransform) => any,
	noUpdate?: boolean
}

export interface UltraGridConfig {
	columns: Array<UltraGuiColumn>,
	theme?: GuiTheme,
	searching?: GuiSearching,
	infoPanel?: GuiInfoPanel,
	paging?: GuiPaging
}
