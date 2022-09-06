//- Utils Imports
import { parseDomainMetadata } from './metadata';

//- Mocks Imports
import * as mocks from './mocks';

/////////////////////////////
// f:: parseDomainMetadata //
/////////////////////////////

describe('parseDomainMetadata', () => {
	it('should parse full metadata correctly', () => {
		expect(parseDomainMetadata(mocks.MOCK_METADATA_FULL as any)).toEqual(
			mocks.MOCK_METADATA_FULL,
		);
	});

	it('should parse partial metadata correctly', () => {
		expect(parseDomainMetadata(mocks.MOCK_METADATA_WITH_TITLE as any)).toEqual(
			mocks.MOCK_METADATA_DEFAULT,
		);
	});

	it('should handle "name" correctly', () => {
		expect(parseDomainMetadata(mocks.MOCK_METADATA_WITH_NAME as any)).toEqual(
			mocks.MOCK_METADATA_DEFAULT,
		);
	});

	it('should splice out unhandled key-value pairs', () => {
		const unhandled = parseDomainMetadata(
			mocks.MOCK_METADATA_UNHANDLED_VALUE as any,
		);
		expect((unhandled as any).unhandledValue).toBeUndefined();
	});
});
