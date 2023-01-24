import { ReactNode } from 'react';

import { ButtonType, StatusTextType } from '../../hooks';

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
	buttonGroup: ButtonType;
	footerStatusText: StatusTextType;
	loadingStatusText: string;
	onBack: () => void;
	onChangeStep: () => void;
	onLockMetadataStatus: () => void;
}

export const useFormSteps = ({
	zna,
	step,
	buttonGroup,
	footerStatusText,
	loadingStatusText,
	onBack,
	onLockMetadataStatus,
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					zna={zna}
					buttonGroup={buttonGroup}
					footerStatusText={footerStatusText}
				/>
			);
			break;

		case Step.CONFIRM:
			content = (
				<Confirm zna={zna} onBack={onBack} onConfirm={onLockMetadataStatus} />
			);
			break;

		case Step.COMPLETE:
			content = (
				<Details
					zna={zna}
					buttonGroup={buttonGroup}
					footerStatusText={footerStatusText}
				/>
			);
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={loadingStatusText} />;
			break;
	}

	return { content };
};
