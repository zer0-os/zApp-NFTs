import { ReactNode } from 'react';

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
	onClose: () => void;
}

export const useFormSteps = ({
	zna,
	step,
	error,
	statusText,
	onClose,
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = <>Details</>;
			break;

		case Step.CONFIRM:
			content = <>Confirm</>;
			break;

		case Step.COMPLETE:
			content = <>Complete</>;
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={statusText} />;
			break;
	}

	return { content };
};
