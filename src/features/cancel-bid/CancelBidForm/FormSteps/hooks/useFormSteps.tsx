import { ReactNode, useState } from 'react';

import { Bid } from '@zero-tech/zauction-sdk';

import {
	Complete,
	CompleteProps,
	Confirm,
	ConfirmProps,
	Details,
	DetailsProps,
} from '..';
import { Wizard } from '@zero-tech/zui/components';

export enum Step {
	DETAILS,
	CONFIRM,
	COMPLETE,
	LOADING,
}

interface UseFormStepsReturn {
	content: ReactNode;
}

export interface useFormStepsProps {
	zna: string;
	bid: Bid;
	step: Step;
	error: string;
	statusText: string;
	onCancelBid: ConfirmProps['onConfirm'];
	onNext: DetailsProps['onNext'];
	onClose: CompleteProps['onClose'];
}

export const useFormSteps = ({
	zna,
	bid,
	step,
	error,
	statusText,
	onCancelBid,
	onNext,
	onClose,
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details zna={zna} bid={bid} errorText={error} onNext={onNext} />
			);
			break;

		case Step.CONFIRM:
			content = (
				<Confirm
					zna={zna}
					bid={bid}
					errorText={error}
					onClose={onClose}
					onConfirm={onCancelBid}
				/>
			);
			break;

		case Step.COMPLETE:
			content = <Complete zna={zna} onClose={onClose} />;
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={statusText} />;
			break;
	}

	return { content };
};
