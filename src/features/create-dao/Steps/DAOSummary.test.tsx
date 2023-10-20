import React from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';
import { DAOSummary, DAOSummaryProps } from './';
import { CreateDAOFormContext } from '../CreateDAOFormContext';

const onSubmit = jest.fn();

const DEFAULT_PROPS: DAOSummaryProps = {
	onClose: jest.fn(),
};

const DEFAULT_PROVIDER_VALUES = {
	stepId: 'launch',
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
	onDetailsSubmit: jest.fn(),
	onDetailsChange: jest.fn(),
	onGovernanceSubmit: jest.fn(),
	onTreasurySubmit: jest.fn(),
	onLaunchSubmit: onSubmit,
};

describe('<DAOSummary />', () => {
	beforeEach(() => jest.resetAllMocks());

	test('should fire onSubmit on click of confirm button', async () => {
		render(
			<ZUIProvider>
				<CreateDAOFormContext.Provider value={DEFAULT_PROVIDER_VALUES}>
					<DAOSummary {...DEFAULT_PROPS} />
				</CreateDAOFormContext.Provider>
			</ZUIProvider>,
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole('button', { name: /Confirm/i }));

		expect(onSubmit).toHaveBeenCalled();
	});
});
