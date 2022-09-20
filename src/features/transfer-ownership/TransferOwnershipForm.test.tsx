import React from 'react';

import { truncateAddress } from '../../lib/util/domains/domains';
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';

import { TransferOwnershipForm } from './TransferOwnershipForm';

import * as mock from './TransferOwnership.mocks';

// mocks
var mockGetDomainById = jest.fn();
var mockGetMetadataFromUri = jest.fn();
var mockTranferDomainOwnership = jest.fn();
var mockTx = jest.fn();
var mockOnClose = jest.fn();

// mock web3 - provider & account
jest.mock('../../lib/hooks/useWeb3', () => ({
	useWeb3: () => ({
		provider: {
			getSigner: () => ({ isSigner: true }),
		},
		account: mock.connectedAccount,
	}),
}));

// mock sdk
jest.mock('../../lib/hooks/useZnsSdk', () => ({
	useZnsSdk: () => ({
		getDomainById: mockGetDomainById,
		getMetadataFromUri: mockGetMetadataFromUri,
		transferDomainOwnership: mockTranferDomainOwnership,
	}),
}));

// setup testing
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

const renderComponent = () =>
	render(
		<TransferOwnershipForm
			domainId={mock.domain.id}
			domainName={mock.domain.name}
			domainTitle={mock.metadata.title}
			domainOwner={mock.domain.owner}
			domainCreator={mock.domain.minter}
			onClose={mockOnClose}
		/>,
	);

const testSetup = () => {
	mockGetDomainById.mockResolvedValue(mock.domain);
	mockGetMetadataFromUri.mockResolvedValue(mock.metadata);
	return renderComponent();
};

describe('TransferOwnershipForm', () => {
	// success
	test('should handle successful transfer domain ownership request', async () => {
		mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
		mockTx.mockResolvedValue(undefined);
		testSetup();

		// details step
		const onConfirmInputButton = await screen.findByRole('button', {
			name: /transfer/i,
		});

		expect(onConfirmInputButton).toHaveAttribute('aria-disabled', 'true');

		const input = await screen.findByPlaceholderText('Ethereum Wallet');

		expect(input).toBeInTheDocument();

		await act(async () => {
			fireEvent.input(input, { target: { value: mock.validInputAddress } });
		});

		expect(onConfirmInputButton).not.toHaveAttribute('aria-disabled');

		fireEvent.click(onConfirmInputButton);

		// confirm step
		const onConfirmTransactionButton = await screen.findByRole('button', {
			name: /confirm/i,
		});

		expect(onConfirmTransactionButton).toBeInTheDocument();

		expect(onConfirmTransactionButton).not.toHaveAttribute('aria-disabled');

		fireEvent.click(onConfirmTransactionButton);

		// transaction approval step
		screen.getByText('Please accept wallet transaction..');

		// transaction in progress step
		await screen.findByText('Your transaction is being processed...');

		await waitFor(() => {
			expect(mockTranferDomainOwnership).toBeCalledTimes(1);
			expect(mockTx).toBeCalledTimes(1);
			expect(mockTranferDomainOwnership).toHaveBeenCalledWith(
				mock.validInputAddress,
				mock.domain.id,
				{ isSigner: true },
			);
		});

		// complete step
		const onCompleteButton = await screen.findByRole('button', {
			name: /finish/i,
		});

		expect(onCompleteButton).toBeInTheDocument();

		fireEvent.click(onCompleteButton);

		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalled();
		});
	});
});
