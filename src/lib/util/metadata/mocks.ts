export const MOCK_METADATA = {
	description: 'test description',
	image: 'image url',
	image_full: 'full image url',
	previewImage: 'preview image url',
	animation_url: 'animation url',
	stakingRequests: undefined,
};

export const MOCK_METADATA_WITH_NAME = {
	...MOCK_METADATA,
	name: 'the tester',
};

export const MOCK_METADATA_WITH_TITLE = {
	...MOCK_METADATA,
	title: 'the tester',
};

export const MOCK_METADATA_UNHANDLED_VALUE = {
	...MOCK_METADATA,
	unhandledValue: 'test',
};

export const MOCK_METADATA_FULL = {
	...MOCK_METADATA,
	...MOCK_METADATA_WITH_TITLE,
	attributes: ['test attribute'],
	isBiddable: true,
	isMintable: true,
	gridViewByDefault: true,
	customDomainHeader: true,
	customDomainHeaderValue: 'test domain header',
};

export const MOCK_METADATA_DEFAULT = {
	...MOCK_METADATA,
	...MOCK_METADATA_WITH_TITLE,
	attributes: undefined,
	isBiddable: true,
	isMintable: false,
	gridViewByDefault: true,
	customDomainHeader: false,
	customDomainHeaderValue: undefined,
};
