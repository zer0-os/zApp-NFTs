import React from 'react';

import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import { DetailsForm, DetailsFormProps } from './';
import { CreateTokenFormContext } from '../';

let onSubmit = jest.fn();

const DEFAULT_PROPS: DetailsFormProps = {
	onClose: jest.fn(),
};

const DEFAULT_PROVIDER_VALUES = {
	stepId: 'details',
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
	onDetailsSubmit: onSubmit,
	onTokenomicsSubmit: jest.fn(),
	onLaunchSubmit: jest.fn(),
};

describe('<DetailsForm />', () => {
	beforeEach(() => jest.resetAllMocks());

	test('should correctly validate required name field', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter name.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The name field is required.'),
			).toBeInTheDocument(),
		);
	});

	test('should correctly validate required symbol field', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter symbol.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The symbol field is required.'),
			).toBeInTheDocument(),
		);
	});

	test('should not fire onSubmit when next button clicked and field values are invalid', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole('button', { name: /Next/i }));

		await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
	});

	test('should fire onSubmit when next button clicked and field values are valid', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DetailsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();

		await user.type(screen.getByPlaceholderText(/Enter name.../i), 'Test');
		await user.type(screen.getByPlaceholderText(/Enter symbol.../i), 'TEST');

		await user.click(screen.getByRole('button', { name: /Next/i }));

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith({
				mediaType: undefined,
				previewUrl: '',
				name: 'Test',
				symbol: 'TEST',
			}),
		);
	});
});
