import { GuiDataType } from '@generic-ui/ngx-grid';
import { UltraColumnTransform } from './feature/ultra-grid-config';
import { calculateLoss, calculatePipsLoss, calculatePipsProfit, calculateProfit, getType } from './data/ultra-cell-transforms';

export const ultraColumnConfig = [
	{
		header: '#',
		field: 'id',
		readonly: true,
		noUpdate: true,
		type: GuiDataType.NUMBER,
		transform: ({ value, values, noUpdate }: UltraColumnTransform) => {
			if (noUpdate) {
				return value.id;
			}
			return !!values && values.length ? +values[values.length - 1].id + 1 : 1;
		}
	},
	{
		header: 'Name',
		field: 'name',
		type: GuiDataType.STRING
	},
	{
		header: 'Type',
		field: 'type',
		readonly: true,
		type: GuiDataType.STRING,
		transform: ({ value }: UltraColumnTransform) => getType(value)
	},
	{
		header: 'Size',
		field: 'size',
		type: GuiDataType.NUMBER
	},
	{
		header: 'Price',
		field: 'price',
		type: GuiDataType.NUMBER
	},
	{
		header: 'S/L',
		field: 'stopLoss',
		type: GuiDataType.NUMBER
	},
	{
		header: 'T/P',
		field: 'takeProfit',
		type: GuiDataType.NUMBER
	},
	{
		header: 'Pips(-)',
		field: 'pipsLoss',
		readonly: true,
		type: GuiDataType.NUMBER,
		transform: ({ value }: UltraColumnTransform) => calculatePipsLoss(value)
	},
	{
		header: 'Pips(+)',
		field: 'pipsGain',
		readonly: true,
		type: GuiDataType.NUMBER,
		transform: ({ value }: UltraColumnTransform) => calculatePipsProfit(value)
	},
	{
		header: 'Loss$',
		field: 'loss',
		readonly: true,
		type: GuiDataType.NUMBER,
		transform: ({ value }: UltraColumnTransform) => calculateLoss(value)
	},
	{
		header: 'Profit$',
		field: 'profit',
		readonly: true,
		type: GuiDataType.NUMBER,
		transform: ({ value }: UltraColumnTransform) => calculateProfit(value)
	}
];
