import { ReactNode } from 'react';

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
	step: Step;
	error: string;
	statusText: string;
	onCancelBid: ConfirmProps['onConfirm'];
	onNext: DetailsProps['onNext'];
	onClose: CompleteProps['onClose'];
}

export const useFormSteps = ({
	zna,
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
			content = <Details zna={zna} errorText={error} onNext={onNext} />;
			break;

		case Step.CONFIRM:
			content = (
				<Confirm
					zna={zna}
					errorText={error}
					onClose={onClose}
					onConfirm={onCancelBid}
				/>
			);
			break;

		case Step.COMPLETE:
			content = <Complete zna={zna} step={step} onClose={onClose} />;
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={statusText} />;
			break;
	}

	return { content };
};
