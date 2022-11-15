import React from 'react';

import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import { GovernanceForm, GovernanceFormProps } from './';
import { CreateDAOFormContext } from '../';

let onSubmit = jest.fn();

const DEFAULT_PROPS: GovernanceFormProps = {
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
		votingProcess: 'absolute',
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
	onGovernanceSubmit: onSubmit,
	onTreasurySubmit: jest.fn(),
	onLaunchSubmit: jest.fn(),
};

describe('<GovernanceForm />', () => {
	beforeEach(() => jest.resetAllMocks());

	test('should correctly validate required voting period field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<GovernanceForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Select voting period.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The voting period field is required.'),
			).not.toBeInTheDocument(),
		);
	});

	test('should correctly validate required voting system field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<GovernanceForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Select voting system.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The voting system field is required.'),
			).not.toBeInTheDocument(),
		);
	});

	test('should correctly validate required DAO token address field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<GovernanceForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter DAO token address.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The DAO token address field is required.'),
			).not.toBeInTheDocument(),
		);
	});

	test('should correctly validate required voting threshold field', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<GovernanceForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter voting threshold.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The voting threshold field is required.'),
			).not.toBeInTheDocument(),
		);
	});

	test('should not fire onSubmit when next button clicked and field values are invalid', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<GovernanceForm {...DEFAULT_PROPS} />
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
					<GovernanceForm {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();

		await user.click(screen.getByText(/MAJORITY/i));

		await user.click(screen.getByPlaceholderText(/Select voting period.../i));
		await user.click(screen.getByText('1 Day'));

		await user.click(screen.getByPlaceholderText(/Select voting system.../i));
		await user.click(screen.getByText('Polygon'));

		await user.type(
			screen.getByPlaceholderText(/Enter DAO token address.../i),
			'0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
		);
		await user.type(
			screen.getByPlaceholderText(/Enter voting threshold.../i),
			'5',
		);

		await user.click(screen.getByRole('button', { name: /Next/i }));

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith({
				votingProcess: 'majority',
				votingPeriod: '1 Day',
				votingSystem: 'Polygon',
				daoTokenAddress: '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
				votingThreshold: '5',
			}),
		);
	});
});
