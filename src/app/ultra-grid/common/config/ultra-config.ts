import { ULTRA_CONFIG } from './ultra-config.token';

export const ultraConfig = (config?: any) => {
	return {
		provide: ULTRA_CONFIG,
		useValue: config ? config : ULTRA_CONFIG
	};
};
