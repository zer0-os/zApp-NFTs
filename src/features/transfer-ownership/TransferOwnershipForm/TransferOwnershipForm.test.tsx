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

// domain data
let mockOwner: string;
jest.mock('../../../lib/hooks/useDomainData', () => ({
	useDomainData: () => ({
		data: {
			id: mock.domain.id,
			name: mock.domain.name,
			owner: mockOwner,
			minter: mock.domain.minter,
		},
	}),
}));

// domain metadata
jest.mock('../../../lib/hooks/useDomainMetadata', () => ({
	useDomainMetadata: () => ({
		data: mock.metadata,
	}),
}));

// execute transaction
jest.mock('@zero-tech/zapp-utils/hooks/useTransaction', () => ({
	useTransaction: () => ({
		executeTransaction: {
			transactionFunction: mockTranferDomainOwnership,
			parameters: ['', '', { getSigner: () => ({ isSigner: true }) }],
		},
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

const renderComponent = () => {
	render(
		<TransferOwnershipForm zna={mock.domain.name} onClose={mockOnClose} />,
	);
};

/////////////
// Helpers //
/////////////
const onSubmitValidDetails = async () => {
	const input = screen.getByPlaceholderText('Ethereum Wallet');

	await act(async () => {
		fireEvent.input(input, { target: { value: mock.validInputAddress } });
	});

	fireEvent.click(screen.getByRole('button', { name: /transfer/i }));
};

///////////
// Tests //
///////////
describe('TransferOwnershipForm', () => {
	// successful transfer ownership
	test('should handle successful transfer domain ownership request', async () => {
		mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
		mockTx.mockResolvedValue(undefined);
		mockOwner = mock.domain.owner;
		renderComponent();

		// details step
		const input = screen.getByPlaceholderText('Ethereum Wallet');

		await act(async () => {
			fireEvent.input(input, { target: { value: mock.validInputAddress } });
		});

		fireEvent.click(screen.getByRole('button', { name: /transfer/i }));

		// confirm step
		fireEvent.click(screen.getByText(/confirm/i));

		// transaction approval step
		screen.getByText('Please accept wallet transaction..');

		// transaction in progress step
		await screen.findByText('Your transaction is being processed...');

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

	// describe('Details Step', () => {
	// 	test('should display correct domain data', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();

	// 		expect(screen.getByText(`0://${mock.domain.name}`)).toBeInTheDocument();
	// 		expect(screen.getByText(mock.metadata.title)).toBeInTheDocument();
	// 		expect(
	// 			screen.getByText(truncateAddress(mock.domain.minter)),
	// 		).toBeInTheDocument();
	// 	});

	// 	test('primary button should be disabled if input value is an empty string', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();

	// 		const input = screen.getByPlaceholderText('Ethereum Wallet');

	// 		await act(async () => {
	// 			fireEvent.input(input, { target: { value: '' } });
	// 		});

	// 		// assert details step
	// 		expect(screen.getByRole('button', { name: /transfer/i })).toHaveAttribute(
	// 			'aria-disabled',
	// 			'true',
	// 		);
	// 	});

	// 	test('primary button should NOT be disabled if value exists', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();

	// 		const input = screen.getByPlaceholderText('Ethereum Wallet');

	// 		await act(async () => {
	// 			fireEvent.input(input, { target: { value: 'some-address' } });
	// 		});

	// 		// assert details step
	// 		expect(
	// 			screen.getByRole('button', { name: /transfer/i }),
	// 		).not.toHaveAttribute('aria-disabled');
	// 	});

	// 	test('should display error message when input value is not a valid eth address', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();

	// 		// input error message
	// 		const errorMessage = 'Please enter a valid Ethereum wallet address';

	// 		expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

	// 		const input = screen.getByPlaceholderText('Ethereum Wallet');

	// 		await act(async () => {
	// 			fireEvent.input(input, {
	// 				target: { value: mock.inValidInputAddress },
	// 			});
	// 		});

	// 		// assert details step
	// 		fireEvent.click(screen.getByRole('button', { name: /transfer/i }));

	// 		screen.getByText(errorMessage);
	// 	});

	// 	test('should display error message when input value is equal to connected account address', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();

	// 		// input error message
	// 		const errorMessage = 'The address entered already owns this domain';

	// 		expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

	// 		const input = screen.getByPlaceholderText('Ethereum Wallet');

	// 		await act(async () => {
	// 			fireEvent.input(input, { target: { value: mock.connectedAccount } });
	// 		});

	// 		// assert details step
	// 		fireEvent.click(screen.getByRole('button', { name: /transfer/i }));

	// 		screen.getByText(errorMessage);
	// 	});

	// 	test('should display error message when input value is equal to connected account address', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();

	// 		// input error message
	// 		const errorMessage = 'The address entered already owns this domain';

	// 		expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

	// 		const input = screen.getByPlaceholderText('Ethereum Wallet');

	// 		await act(async () => {
	// 			fireEvent.input(input, { target: { value: mock.connectedAccount } });
	// 		});

	// 		// assert details step
	// 		fireEvent.click(screen.getByRole('button', { name: /transfer/i }));

	// 		screen.getByText(errorMessage);
	// 	});

	// 	test('should display error message when connected account is not domain owner(0xxx)', async () => {
	// 		mockOwner = '0xxx';
	// 		renderComponent();

	// 		// input error message
	// 		const errorMessage = 'You are not the owner of this domain';

	// 		expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

	// 		const input = screen.getByPlaceholderText('Ethereum Wallet');

	// 		await act(async () => {
	// 			fireEvent.input(input, { target: { value: mock.validInputAddress } });
	// 		});

	// 		// assert details step
	// 		fireEvent.click(screen.getByRole('button', { name: /transfer/i }));

	// 		screen.getByText(errorMessage);
	// 	});
	// });

	// describe('Confirm Step', () => {
	// 	test('secondary button should call onClose when clicked', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();
	// 		onSubmitValidDetails();

	// 		fireEvent.click(await screen.findByText(/cancel/i));

	// 		expect(mockOnClose).toBeCalled();
	// 	});

	// 	test('primary button should call transferDomainOwnership when clicked', async () => {
	// 		renderComponent();
	// 		onSubmitValidDetails();

	// 		fireEvent.click(await screen.findByText(/confirm/i));

	// 		expect(mockTranferDomainOwnership).toBeCalledTimes(1);
	// 	});
	// });

	// describe('Transaction Approval Step (signature)', () => {
	// 	test('should navigate back to confirm step and handle error if signature rejected', async () => {
	// 		mockTranferDomainOwnership.mockRejectedValue(undefined);
	// 		mockOwner = mock.domain.owner;
	// 		renderComponent();
	// 		onSubmitValidDetails();

	// 		const errorMessage = 'Failed to start transaction - please try again.';

	// 		expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

	// 		// assert confirm step
	// 		fireEvent.click(await screen.findByText(/confirm/i));

	// 		// assert transaction approval step
	// 		expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
	// 		screen.getByText('Please accept wallet transaction..');

	// 		await waitFor(() => {
	// 			expect(console.error).toHaveBeenCalled();
	// 		});

	// 		// assert confirm step
	// 		screen.getByText(/confirm/i);
	// 		screen.getByText(errorMessage);
	// 	});
	// });

	// describe('Transaction In Progress Step (transaction)', () => {
	// 	test('should navigate back to confirm step and handle error if transaction rejected', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
	// 		mockTx.mockRejectedValue(undefined);
	// 		renderComponent();
	// 		onSubmitValidDetails();

	// 		const errorMessage = 'Failed to process transaction - please try again.';

	// 		expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

	// 		// assert confirm step
	// 		fireEvent.click(await screen.findByText(/confirm/i));

	// 		// assert transaction in progress step
	// 		expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
	// 		await screen.findByText('Your transaction is being processed...');

	// 		await waitFor(() => {
	// 			expect(console.error).toHaveBeenCalled();
	// 		});

	// 		// assert confirm step
	// 		screen.getByText(/confirm/i);
	// 		screen.getByText(errorMessage);
	// 	});
	// });

	// describe('Complete Step', () => {
	// 	test('primary button should call onClose when clicked', async () => {
	// 		mockOwner = mock.domain.owner;
	// 		mockTranferDomainOwnership.mockResolvedValue({ wait: mockTx });
	// 		mockTx.mockResolvedValue(undefined);
	// 		renderComponent();
	// 		onSubmitValidDetails();

	// 		// assert confirm step
	// 		fireEvent.click(await screen.findByText(/confirm/i));

	// 		// assert complete step
	// 		await screen.findByText('Transfer Successful');

	// 		fireEvent.click(screen.getByText(/finish/i));

	// 		await waitFor(() => {
	// 			expect(mockOnClose).toHaveBeenCalled();
	// 		});
	// 	});
	// });
});
