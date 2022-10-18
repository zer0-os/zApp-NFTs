import React from 'react';

import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import { DetailsForm, DetailsFormProps } from './';
import { CreateDAOFormContext } from '../';

let onSubmit = jest.fn();

const DEFAULT_PROPS: DetailsFormProps = {
	onClose: jest.fn(),
};

const DEFAULT_PROVIDER_VALUES = {
	stepId: 'details',
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
	onDetailsSubmit: onSubmit,
	onGovernanceSubmit: jest.fn(),
	onTreasurySubmit: jest.fn(),
	onLaunchSubmit: jest.fn(),
};

describe('<DetailsForm />', () => {
	beforeEach(() => jest.resetAllMocks());

	test('should correctly validate required name field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter name.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(screen.getByText('The name field is required.')).not.toBe(null),
		);
	});

	test('should correctly validate required zNA address field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter zNA address.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(screen.getByText('The zNA address field is required.')).not.toBe(
				null,
			),
		);
	});

	test('should correctly validate required description field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter description.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(screen.getByText('The description field is required.')).not.toBe(
				null,
			),
		);
	});

	test('should not fire onSubmit when next button clicked and field values are invalid', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole('button', { name: /Next/i }));

		await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
	});

	test('should fire onSubmit with expected params when next button clicked and field values are valid', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();

		await user.type(screen.getByPlaceholderText(/Enter name.../i), 'Test');
		await user.type(
			screen.getByPlaceholderText(/Enter zNA address.../i),
			'0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
		);
		await user.type(
			screen.getByPlaceholderText(/Enter description.../i),
			'Testing testing 123.',
		);

		await user.click(screen.getByRole('button', { name: /Next/i }));

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith({
				mediaType: undefined,
				previewUrl: '',
				name: 'Test',
				znaAddress: '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
				description: 'Testing testing 123.',
			}),
		);
	});
});
