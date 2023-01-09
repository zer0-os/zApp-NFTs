import React from 'react';

import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import { TokenomicsForm, TokenomicsFormProps } from './';
import { CreateTokenFormContext } from '../';

let onSubmit = jest.fn();

const DEFAULT_PROPS: TokenomicsFormProps = {
	onClose: jest.fn(),
};

const DEFAULT_PROVIDER_VALUES = {
	stepId: 'tokenomics',
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
	onTokenomicsSubmit: onSubmit,
	onLaunchSubmit: jest.fn(),
};

describe('<TokenomicsForm />', () => {
	beforeEach(() => jest.resetAllMocks());

	test('should correctly validate required token count field', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<TokenomicsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(screen.getByPlaceholderText(/Enter total supply.../i));
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(screen.getByText('The token count field is required.')).not.toBe(
				null,
			),
		);
	});

	test('should correctly validate required initial wallet address field', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<TokenomicsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(
			screen.getByPlaceholderText(/Enter initial wallet address.../i),
		);
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The initial wallet address field is required.'),
			).toBeInTheDocument(),
		);
	});

	test('should correctly validate required admin wallet address field', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<TokenomicsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		fireEvent.blur(
			screen.getByPlaceholderText(/Enter admin wallet address.../i),
		);
		fireEvent.click(
			screen.getByRole('button', {
				name: 'Next',
			}),
		);

		await waitFor(() =>
			expect(
				screen.getByText('The admin wallet address field is required.'),
			).toBeInTheDocument(),
		);
	});

	test('should not fire onSubmit when next button clicked and field values are invalid', async () => {
		render(
			<ZUIProvider>
				<CreateTokenFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<TokenomicsForm {...DEFAULT_PROPS} />
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
					<TokenomicsForm {...DEFAULT_PROPS} />
				</CreateTokenFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();

		await user.type(
			screen.getByPlaceholderText(/Enter total supply.../i),
			'123',
		);

		await user.type(
			screen.getByPlaceholderText(/Enter initial wallet address.../i),
			'0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
		);

		await user.type(
			screen.getByPlaceholderText(/Enter admin wallet address.../i),
			'0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
		);

		await user.click(screen.getByRole('button', { name: /Next/i }));

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith({
				tokenCount: '123',
				initialTokenSupplyWalletAddress:
					'0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
				adminWalletAddress: '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B',
			}),
		);
	});
});
