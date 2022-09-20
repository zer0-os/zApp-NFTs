import React from 'react';

import { render, waitFor } from '@testing-library/react';

import {
	useTransferOwnershipForm,
	UseTransferOwnershipFormReturn,
} from './useTransferOwnershipForm';

import { Step } from './TransferOwnership.constants';
import * as mock from './TransferOwnership.mocks';

// mock transferDomainOwnership()
var mockTranferOwnership = jest.fn();

// mock transferDomainOwnership() transaction
var mockTx = jest.fn();

// mock sdk
jest.mock('../../lib/hooks/useZnsSdk', () => ({
	useZnsSdk: () => ({
		transferDomainOwnership: mockTranferOwnership,
	}),
}));

// mock web3 - provider & account
jest.mock('../../lib/hooks/useWeb3', () => ({
	useWeb3: () => ({
		provider: {
			getSigner: () => ({ isSigner: true }),
		},
		account: mock.connectedAccount,
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

// setup hook
const setupHook = (domainId: string, domainOwner: string) => {
	const returnVal = {};
	const TestComponent = () => {
		Object.assign(returnVal, useTransferOwnershipForm(domainId, domainOwner));
		return null;
	};
	render(<TestComponent />);
	return returnVal as UseTransferOwnershipFormReturn;
};

describe('useTransferOwnershipForm', () => {
	test('successfully transfers ownership of domain', async () => {
		mockTranferOwnership.mockResolvedValue({ wait: mockTx });
		mockTx.mockResolvedValue(undefined);

		const hook = setupHook(mock.domain.id, mock.domain.owner);

		waitFor(() => hook.onConfirmInput(mock.validInputAddress));
		await waitFor(() => hook.onConfirmTransaction());

		expect(mockTranferOwnership).toBeCalledTimes(1);
		expect(mockTx).toBeCalledTimes(1);
		expect(mockTranferOwnership).toBeCalledWith(
			mock.validInputAddress,
			mock.domain.id,
			{
				isSigner: true,
			},
		);
	});

	describe('onConfirmInput', () => {
		// success
		test('should progress to CONFIRM step if input address is valid', async () => {
			const hook = setupHook(mock.domain.id, mock.domain.owner);

			expect(hook.step).toBe(Step.DETAILS);

			waitFor(() => hook.onConfirmInput(mock.validInputAddress));

			expect(hook.error).toBeUndefined();
			expect(hook.step).toBe(Step.CONFIRM);
		});

		// error
		test('throws error when input value is an empty string', async () => {
			const hook = setupHook(mock.domain.id, mock.domain.owner);

			expect(hook.error).toBeUndefined();

			waitFor(() => hook.onConfirmInput(''));

			expect(hook.error).toBeDefined();
			expect(hook.error).toBe('Please enter a valid Ethereum wallet address');
			expect(mockTranferOwnership).not.toBeCalled();
		});

		test('throws error when input value is not a valid eth address', async () => {
			const hook = setupHook(mock.domain.id, mock.domain.owner);

			expect(hook.error).toBeUndefined();

			waitFor(() => hook.onConfirmInput(mock.inValidInputAddress));

			expect(hook.error).toBeDefined();
			expect(hook.error).toBe('Please enter a valid Ethereum wallet address');
			expect(mockTranferOwnership).not.toBeCalled();
		});

		test('throws error when input value is equal to connected account address', async () => {
			const hook = setupHook(mock.domain.id, mock.domain.owner);

			expect(hook.error).toBeUndefined();

			waitFor(() => hook.onConfirmInput(mock.connectedAccount));

			expect(hook.error).toBeDefined();
			expect(hook.error).toBe('The address entered already owns this domain');
			expect(mockTranferOwnership).not.toBeCalled();
		});

		test('throws error when connected account is not domain owner(0xxx)', async () => {
			const hook = setupHook(mock.domain.id, '0xxx');

			expect(hook.error).not.toBeDefined();

			waitFor(() => hook.onConfirmInput(mock.validInputAddress));

			expect(hook.error).toBeDefined();
			expect(hook.error).toBe('You are not the owner of this domain');
			expect(mockTranferOwnership).not.toBeCalled();
		});
	});

	describe('onConfirmTransaction', () => {
		// success
		test('should progress to COMPLETE step if transaction is successful', async () => {
			mockTranferOwnership.mockResolvedValue({ wait: mockTx });
			mockTx.mockResolvedValue(undefined);

			const hook = setupHook(mock.domain.id, mock.domain.owner);

			expect(hook.step).toBe(Step.DETAILS);

			waitFor(() => hook.onConfirmInput(mock.validInputAddress));
			expect(hook.step).toBe(Step.CONFIRM);

			await waitFor(() => hook.onConfirmTransaction());
			waitFor(() => expect(hook.step).toBe(Step.TRANSACTION_APPROVAL));

			expect(mockTranferOwnership).toBeCalledTimes(1);
			expect(hook.step).toBe(Step.TRANSACTION_IN_PROGRESS);
			expect(mockTx).toBeCalledTimes(1);

			await waitFor(() => expect(hook.step).toBe(Step.COMPLETE));

			expect(hook.error).toBeUndefined();
		});

		// error
		describe('signature', () => {
			test('should navigate back to CONFIRM step if signature is rejected', async () => {
				mockTranferOwnership.mockRejectedValue(undefined);

				const hook = setupHook(mock.domain.id, mock.domain.owner);

				expect(hook.error).toBeUndefined();
				expect(hook.step).toBe(Step.DETAILS);

				waitFor(() => hook.onConfirmInput(mock.validInputAddress));
				expect(hook.step).toBe(Step.CONFIRM);

				await waitFor(() => hook.onConfirmTransaction());

				expect(mockTranferOwnership).toBeCalledTimes(1);

				expect(hook.error).toBeDefined();

				waitFor(() => expect(hook.step).toBe(Step.CONFIRM));
			});

			test('handles rejected signature', async () => {
				mockTranferOwnership.mockRejectedValue(undefined);

				const hook = setupHook(mock.domain.id, mock.domain.owner);

				expect(hook.error).toBeUndefined();

				waitFor(() => hook.onConfirmInput(mock.validInputAddress));
				await waitFor(() => hook.onConfirmTransaction());

				expect(mockTranferOwnership).toBeCalledTimes(1);

				expect(console.error).toHaveBeenCalled();
				expect(hook.error).toBeDefined();
				expect(hook.error).toBe(
					'Failed to start transaction - please try again.',
				);
			});
		});

		describe('transaction', () => {
			test('should navigate back to CONFIRM step if transaction is rejected', async () => {
				mockTranferOwnership.mockResolvedValue({ wait: mockTx });
				mockTx.mockRejectedValue(undefined);

				const hook = setupHook(mock.domain.id, mock.domain.owner);

				expect(hook.error).toBeUndefined();
				expect(hook.step).toBe(Step.DETAILS);

				waitFor(() => hook.onConfirmInput(mock.validInputAddress));
				expect(hook.step).toBe(Step.CONFIRM);

				await waitFor(() => hook.onConfirmTransaction());

				expect(mockTx).toBeCalledTimes(1);

				await waitFor(() => expect(hook.error).toBeDefined());

				waitFor(() => expect(hook.step).toBe(Step.CONFIRM));
			});

			test('handles rejected transaction', async () => {
				mockTranferOwnership.mockResolvedValue({ wait: mockTx });
				mockTx.mockRejectedValue(undefined);

				const hook = setupHook(mock.domain.id, mock.domain.owner);

				expect(hook.error).toBeUndefined();

				waitFor(() => hook.onConfirmInput(mock.validInputAddress));
				await waitFor(() => hook.onConfirmTransaction());

				expect(mockTx).toBeCalledTimes(1);

				expect(console.error).toHaveBeenCalled();
				await waitFor(() => expect(hook.error).toBeDefined());
				expect(hook.error).toBe(
					'Failed to process transaction - please try again.',
				);
			});
		});
	});
});
