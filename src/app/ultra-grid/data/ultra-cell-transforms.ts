import { PositionType } from './ultra-position-type';

export const getType = (value: any) => {

	if (value.price > value.stopLoss) {
		return PositionType.BUY;
	} else if (value.price < value.stopLoss) {
		return PositionType.SELL;
	} else {
		return PositionType.EVEN;
	}
};

export const calculateProfit = (value: any) => {
	return +(calculatePipsProfit(value) * value.size).toFixed(2);
};

export const calculateLoss = (value: any) => {
	return +(calculatePipsLoss(value) * value.size).toFixed(2);
};

export const calculatePipsProfit = (value: any) => {
	const decimal = 10000;

	switch (getType(value)) {
		case PositionType.BUY: {
			return Math.round((value.takeProfit - value.price) * decimal);
		}
		case PositionType.SELL: {
			return Math.round((value.price - value.takeProfit) * decimal);
		}
		case PositionType.EVEN: {
			return 0;
		}
	}

};

export const calculatePipsLoss = (value: any) => {
	const decimal = 10000;

	switch (getType(value)) {
		case PositionType.BUY: {
			return Math.round((value.price - value.stopLoss) * decimal);
		}
		case PositionType.SELL: {
			return Math.round((value.stopLoss - value.price) * decimal);
		}
		case PositionType.EVEN: {
			return 0;
		}
	}
};
