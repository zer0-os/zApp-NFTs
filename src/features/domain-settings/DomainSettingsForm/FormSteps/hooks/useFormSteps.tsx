import { ReactNode } from 'react';

import { Details, Confirm } from '..';
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
	onBack: () => void;
	onChangeStep: () => void;
	onLockMetadata: () => void;
	onClose: () => void;
}

export const useFormSteps = ({
	zna,
	step,
	error,
	statusText,
	onBack,
	onChangeStep,
	onLockMetadata,
	onClose,
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = <Details zna={zna} errorText={error} onNext={onChangeStep} />;
			break;

		case Step.CONFIRM:
			content = (
				<Confirm
					zna={zna}
					errorText={error}
					onBack={onBack}
					onConfirm={onLockMetadata}
				/>
			);
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
