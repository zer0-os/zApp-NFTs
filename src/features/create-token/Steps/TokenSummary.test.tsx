import React from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import { TokenSummary, TokenSummaryProps } from './';
import { CreateTokenFormContext } from '../CreateTokenFormContext';

const onSubmit = jest.fn();

const DEFAULT_PROPS: TokenSummaryProps = {
	onClose: jest.fn(),
};

const DEFAULT_PROVIDER_VALUES = {
	stepId: 'launch',
	title: 'Create Token',
	details: {
		mediaType: undefined,
		previewUrl: '',
		name: '',
		symbol: '',
	},
	tokenomics: {
		tokenCount: '',
		initialTokenSupplyWalletAddress: '',
		adminWalletAddress: '',
	},
	onStepUpdate: jest.fn(),
	onTitleUpdate: jest.fn(),
	onDetailsChange: jest.fn(),
	onDetailsSubmit: jest.fn(),
	onTokenomicsSubmit: jest.fn(),
	onLaunchSubmit: onSubmit,
};

describe('<TokenSummary />', () => {
	beforeEach(() => jest.resetAllMocks());

	test('should fire onSubmit on click of confirm button', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<TokenSummary {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole('button', { name: /Confirm/i }));

		expect(onSubmit).toHaveBeenCalled();
	});
});
