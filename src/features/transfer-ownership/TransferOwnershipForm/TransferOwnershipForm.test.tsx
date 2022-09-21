import React from 'react';

import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';

import { truncateAddress } from '../../../lib/util/domains/domains';

import { TransferOwnershipForm } from './TransferOwnershipForm';

import * as mock from './TransferOwnershipForm.mocks';

///////////
// Mocks //
///////////
var mockTranferDomainOwnership = jest.fn();
var mockTx = jest.fn();
var mockOnClose = jest.fn();

// web3 - provider & account
jest.mock('../../../lib/hooks/useWeb3', () => ({
	useWeb3: () => ({
		provider: {
			getSigner: () => ({ isSigner: true }),
		},
		account: mock.connectedAccount,
	}),
}));

// sdk
jest.mock('../../../lib/hooks/useZnsSdk', () => ({
	useZnsSdk: () => ({
		transferDomainOwnership: mockTranferDomainOwnership,
	}),
}));

///////////
// Setup //
///////////
const jestConsole = console;
const consoleError = console.error;

beforeEach(() => {
	global.console = require('console');
	console.error = jest.fn();
});

afterEach(() => {
	global.console = jestConsole;
	console.error = consoleError;
	jest.clearAllMocks();
});

const renderComponent = (mockOwner?: string) =>
	render(
		<TransferOwnershipForm
			domainId={mock.domain.id}
			domainName={mock.domain.name}
			domainTitle={mock.metadata.title}
			domainOwner={mockOwner ? mockOwner : mock.domain.owner}
			domainCreator={mock.domain.minter}
			onClose={mockOnClose}
		/>,
	);

/////////////
// Helpers //
/////////////
const confirmScreenText =
	'This transaction is about to be seared upon the blockchain. There’s no going back.';

const onSubmitValidDetails = async () => {
	const input = await screen.findByPlaceholderText('Ethereum Wallet');

	await act(async () => {
		fireEvent.input(input, { target: { value: mock.validInputAddress } });
	});

	fireEvent.click(
		await screen.findByRole('button', {
			name: /transfer/i,
		}),
	);
};

///////////
// Tests //
///////////
describe('TransferOwnershipForm', () => {
	// successful transfer ownership
	test('should handle successful transfer domain ownership request', async () => {
		mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
		mockTx.mockResolvedValue(undefined);
		const { getByText, findByRole, findByText, findByPlaceholderText } =
			renderComponent();

		// details step
		const onConfirmInputButton = await findByRole('button', {
			name: /transfer/i,
		});

		expect(onConfirmInputButton).toBeInTheDocument();
		expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');

		const input = await findByPlaceholderText('Ethereum Wallet');

		expect(input).toBeInTheDocument();

		await act(async () => {
			fireEvent.input(input, { target: { value: mock.validInputAddress } });
		});

		expect(onConfirmInputButton).not.toHaveAttribute('aria-disabled');

		fireEvent.click(onConfirmInputButton);

		// confirm step
		const onConfirmTransactionButton = await findByText(/confirm/i);

		expect(onConfirmTransactionButton).toBeInTheDocument();
		expect(onConfirmTransactionButton).not.toHaveAttribute('aria-disabled');

		fireEvent.click(onConfirmTransactionButton);

		// transaction approval step
		getByText('Please accept wallet transaction..');

		// transaction in progress step
		await findByText('Your transaction is being processed...');

		// assert successful request
		await waitFor(() => {
			expect(mockTranferDomainOwnership).toBeCalledTimes(1);
			expect(mockTx).toBeCalledTimes(1);
			expect(mockTranferDomainOwnership).toHaveBeenCalledWith(
				mock.validInputAddress,
				mock.domain.id,
				{ isSigner: true },
			);
		});
	});

	describe('Details Step', () => {
		test('should display correct domain data', async () => {
			const { findByText } = renderComponent();

			await findByText(`0://${mock.domain.name}`);
			await findByText(mock.metadata.title);
			await findByText(truncateAddress(mock.domain.minter));
		});

		test('primary button should be disabled if input value is an empty string', async () => {
			const { findByRole, findByPlaceholderText } = renderComponent();

			const onConfirmInputButton = await findByRole('button', {
				name: /transfer/i,
			});

			expect(onConfirmInputButton).toBeInTheDocument();
			expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');

			const input = await findByPlaceholderText('Ethereum Wallet');

			expect(input).toBeInTheDocument();

			await act(async () => {
				fireEvent.input(input, { target: { value: '' } });
			});

			expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');
		});

		test('should display error message when input value is not a valid eth address', async () => {
			const { findByRole, findByText, queryByText, findByPlaceholderText } =
				renderComponent();

			// input error message
			const errorMessage = 'Please enter a valid Ethereum wallet address';

			expect(queryByText(errorMessage)).not.toBeInTheDocument();

			const onConfirmInputButton = await findByRole('button', {
				name: /transfer/i,
			});

			expect(onConfirmInputButton).toBeInTheDocument();
			expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');

			const input = await findByPlaceholderText('Ethereum Wallet');

			expect(input).toBeInTheDocument();

			await act(async () => {
				fireEvent.input(input, {
					target: { value: mock.inValidInputAddress },
				});
			});

			expect(onConfirmInputButton).not.toHaveAttribute('aria-disabled');

			fireEvent.click(onConfirmInputButton);

			await findByText(errorMessage);
		});

		test('should display error message when input value is equal to connected account address', async () => {
			const { findByRole, findByText, queryByText, findByPlaceholderText } =
				renderComponent();

			// input error message
			const errorMessage = 'The address entered already owns this domain';

			expect(queryByText(errorMessage)).not.toBeInTheDocument();

			const onConfirmInputButton = await findByRole('button', {
				name: /transfer/i,
			});

			expect(onConfirmInputButton).toBeInTheDocument();
			expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');

			const input = await findByPlaceholderText('Ethereum Wallet');

			expect(input).toBeInTheDocument();

			await act(async () => {
				fireEvent.input(input, { target: { value: mock.connectedAccount } });
			});

			expect(onConfirmInputButton).not.toHaveAttribute('aria-disabled');

			fireEvent.click(onConfirmInputButton);

			await findByText(errorMessage);
		});

		test('should display error message when input value is equal to connected account address', async () => {
			const { findByRole, findByText, queryByText, findByPlaceholderText } =
				renderComponent();

			// input error message
			const errorMessage = 'The address entered already owns this domain';

			expect(queryByText(errorMessage)).not.toBeInTheDocument();

			const onConfirmInputButton = await findByRole('button', {
				name: /transfer/i,
			});

			expect(onConfirmInputButton).toBeInTheDocument();
			expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');

			const input = await findByPlaceholderText('Ethereum Wallet');

			expect(input).toBeInTheDocument();

			await act(async () => {
				fireEvent.input(input, { target: { value: mock.connectedAccount } });
			});

			expect(onConfirmInputButton).not.toHaveAttribute('aria-disabled');

			fireEvent.click(onConfirmInputButton);

			await findByText(errorMessage);
		});

		test('should display error message when connected account is not domain owner(0xxx)', async () => {
			// edit mock.domain.owner
			const mockOwner = '0xxx';

			const { findByRole, findByText, queryByText, findByPlaceholderText } =
				renderComponent(mockOwner);

			// input error message
			const errorMessage = 'You are not the owner of this domain';

			expect(queryByText(errorMessage)).not.toBeInTheDocument();

			const onConfirmInputButton = await findByRole('button', {
				name: /transfer/i,
			});

			expect(onConfirmInputButton).toBeInTheDocument();
			expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');

			const input = await findByPlaceholderText('Ethereum Wallet');

			expect(input).toBeInTheDocument();

			await act(async () => {
				fireEvent.input(input, { target: { value: mock.validInputAddress } });
			});

			expect(onConfirmInputButton).not.toHaveAttribute('aria-disabled');

			fireEvent.click(onConfirmInputButton);

			await findByText(errorMessage);
		});
	});

	describe('Confirm Step', () => {
		test('secondary button should call onClose when clicked', async () => {
			const { findByText } = renderComponent();
			onSubmitValidDetails();

			await findByText(confirmScreenText);

			const onCancelButton = await findByText(/cancel/i);

			expect(onCancelButton).toBeInTheDocument();

			fireEvent.click(onCancelButton);

			expect(mockOnClose).toBeCalled();
		});

		test('primary button should call transferDomainOwnership when clicked', async () => {
			const { findByText } = renderComponent();
			onSubmitValidDetails();

			await findByText(confirmScreenText);

			const onConfirmButton = await findByText(/confirm/i);

			expect(onConfirmButton).toBeInTheDocument();

			fireEvent.click(onConfirmButton);

			expect(mockTranferDomainOwnership).toBeCalledTimes(1);
		});
	});

	describe('Transaction Approval Step (signature)', () => {
		test('should navigate back to confirm step if signature is rejected', async () => {
			mockTranferDomainOwnership.mockRejectedValue(undefined);
			const { getByText, findByText } = renderComponent();
			onSubmitValidDetails();

			await findByText(confirmScreenText);

			const onConfirmTransactionButton = await findByText(/confirm/i);

			expect(onConfirmTransactionButton).toBeInTheDocument();

			fireEvent.click(onConfirmTransactionButton);

			expect(onConfirmTransactionButton).not.toBeInTheDocument();

			getByText('Please accept wallet transaction..');

			expect(mockTranferDomainOwnership).toBeCalledTimes(1);

			await findByText(/confirm/i);
		});

		test('should handle rejected signature', async () => {
			mockTranferDomainOwnership.mockRejectedValue(undefined);
			const { queryByText, getByText, findByText } = renderComponent();
			onSubmitValidDetails();

			const errorMessage = 'Failed to start transaction - please try again.';

			expect(queryByText(errorMessage)).not.toBeInTheDocument();

			findByText(confirmScreenText);

			const onConfirmTransactionButton = await findByText(/confirm/i);

			expect(onConfirmTransactionButton).toBeInTheDocument();

			fireEvent.click(onConfirmTransactionButton);

			expect(mockTranferDomainOwnership).toBeCalledTimes(1);
			expect(console.error).toHaveBeenCalled();

			await findByText(errorMessage);
		});
	});

	describe('Transaction In Progress Step (transaction)', () => {
		test('should navigate back to confirm step if transaction is rejected', async () => {
			mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
			mockTx.mockRejectedValue(undefined);
			const { getByText, findByText } = renderComponent();
			onSubmitValidDetails();

			await findByText(confirmScreenText);

			const onConfirmTransactionButton = await findByText(/confirm/i);

			expect(onConfirmTransactionButton).toBeInTheDocument();

			fireEvent.click(onConfirmTransactionButton);

			expect(onConfirmTransactionButton).not.toBeInTheDocument();

			getByText('Please accept wallet transaction..');

			await findByText('Your transaction is being processed...'),
				await waitFor(() => expect(mockTx).toBeCalledTimes(1));

			await findByText(/confirm/i);
		});

		test('should handle rejected transaction', async () => {
			mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
			mockTx.mockRejectedValue(undefined);
			const { queryByText, findByText } = renderComponent();
			onSubmitValidDetails();

			const errorMessage = 'Failed to process transaction - please try again.';

			expect(queryByText(errorMessage)).not.toBeInTheDocument();

			await findByText(confirmScreenText);

			const onConfirmTransactionButton = await findByText(/confirm/i);

			expect(onConfirmTransactionButton).toBeInTheDocument();

			fireEvent.click(onConfirmTransactionButton);

			await waitFor(() => expect(mockTx).toBeCalledTimes(1));
			expect(console.error).toHaveBeenCalled();

			await findByText(errorMessage);
		});
	});

	describe('Complete Step', () => {
		test('primary button should call onClose when clicked', async () => {
			mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
			mockTx.mockResolvedValue(undefined);
			const { getByText, findByText } = renderComponent();
			onSubmitValidDetails();

			// confirm step submit
			fireEvent.click(await findByText(/confirm/i));

			// transfer approval  step
			expect(mockTranferDomainOwnership).toBeCalledTimes(1);

			// transfer in progress step
			await waitFor(() => expect(mockTx).toBeCalledTimes(1));

			// complete step
			getByText('Transfer Successful');

			const onCompleteButton = await findByText(/finish/i);

			expect(onCompleteButton).toBeInTheDocument();

			fireEvent.click(onCompleteButton);

			await waitFor(() => {
				expect(mockOnClose).toHaveBeenCalled();
			});
		});
	});
});
