import { ReactNode } from 'react';

import { Complete, Confirm, Details } from '..';
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
	onConfirmInput: (walletAddress: string) => void;
	onConfirmTransfer: () => void;
	onClose: () => void;
}

export const useFormSteps = ({
	zna,
	step,
	error,
	statusText,
	onConfirmInput,
	onConfirmTransfer,
	onClose,
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details zna={zna} errorText={error} onConfirm={onConfirmInput} />
			);
			break;

		case Step.CONFIRM:
			content = (
				<Confirm
					errorText={error}
					onConfirm={onConfirmTransfer}
					onClose={onClose}
				/>
			);
			break;

		case Step.COMPLETE:
			content = <Complete onClose={onClose} />;
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={statusText} />;
			break;
	}

	return { content };
};
