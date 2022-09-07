import { formatEthers, formatNumber } from './number';

import { mockMetricsData } from './mocks';

//////////////////////
// f:: formatNumber //
//////////////////////

describe('formatNumber', () => {
	it('should correctly format string with thousand separators', () => {
		expect(formatNumber('1000000')).toEqual('1,000,000');
		expect(formatNumber('10000')).toEqual('10,000');
		expect(formatNumber('1000')).toEqual('1,000');
	});

	it('should correctly format number with thousand separators', () => {
		expect(formatNumber(1000000)).toEqual('1,000,000');
		expect(formatNumber(10000)).toEqual('10,000');
		expect(formatNumber(1000)).toEqual('1,000');
	});
});

//////////////////////
// f:: formatEthers //
//////////////////////

describe('formatEthers', () => {
	it('should correctly format ether as number', () => {
		expect(formatEthers(mockMetricsData.highestBid)).toEqual('12,340');
		expect(formatEthers(mockMetricsData.highestSale)).toEqual('12,340');
	});
});
