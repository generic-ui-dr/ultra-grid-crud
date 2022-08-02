import { UltraGridConfig } from './feature/ultra-grid-config';
import { GuiPagingDisplay, GuiTheme } from '@generic-ui/ngx-grid';
import { ultraColumnConfig } from './ultra-column-config';

export const ultraGridDefaultConfig: UltraGridConfig = {
	columns: ultraColumnConfig,
	theme: GuiTheme.LIGHT,
	searching: {
		enabled: true,
		highlighting: true
	},
	infoPanel: {
		enabled: true,
		infoDialog: false,
		columnsManager: false,
		schemaManager: false,
		sourceSize: true
	},
	paging: {
		enabled: false,
		pageSize: 10,
		pagerTop: true,
		pagerBottom: true,
		display: GuiPagingDisplay.ADVANCED
	}
};
