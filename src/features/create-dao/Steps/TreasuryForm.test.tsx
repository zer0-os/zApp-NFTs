import React from 'react';

import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import { TreasuryForm, TreasuryFormProps } from './';
import { CreateDAOFormContext } from '../';

let onSubmit = jest.fn();

const DEFAULT_PROPS: TreasuryFormProps = {
	onClose: jest.fn(),
};

const DEFAULT_PROVIDER_VALUES = {
	stepId: 'treasury',
	title: 'Create DAO',
	details: {
		mediaType: undefined,
		previewUrl: '',
		name: '',
		znaAddress: '',
		description: '',
	},
	governance: {
		votingProcess: '',
		votingPeriod: '',
		votingSystem: '',
		daoTokenAddress: '',
		votingThreshold: '',
	},
	treasury: {
		gnosisSafe: '',
	},
	onStepUpdate: jest.fn(),
	onTitleUpdate: jest.fn(),
	onDetailsChange: jest.fn(),
	onDetailsSubmit: jest.fn(),
	onGovernanceSubmit: jest.fn(),
	onTreasurySubmit: onSubmit,
	onLaunchSubmit: jest.fn(),
};

describe('<TreasuryForm />', () => {
	beforeEach(() => jest.resetAllMocks());

	test('should correctly validate required Gnosis Safe field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<TreasuryForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(
			screen.getByPlaceholderText(/Enter gnosis safe address.../i),
		);
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The gnosis safe field is required.'),
			).toBeVisible(),
		);
	});

	test('should fire onSubmit with expected params when next button clicked and field values are valid', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<TreasuryForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();

		await user.type(
			screen.getByPlaceholderText(/Enter gnosis safe address.../i),
			'0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
		);

		await user.click(screen.getByRole('button', { name: /Next/i }));

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith({
				gnosisSafe: '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
			}),
		);
	});
});
