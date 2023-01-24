import { FC } from 'react';

import { ButtonType, StatusTextType } from '../../hooks';

import { DomainSettingsBody } from '../../DomainSettingsBody';
import { DomainSettingsFooter } from '../../DomainSettingsFooter';

export interface DetailsProps {
	zna: string;
	buttonGroup: ButtonType;
	footerStatusText: StatusTextType;
}

export const Details: FC<DetailsProps> = ({
	zna,
	buttonGroup,
	footerStatusText,
}) => {
	return (
		<>
			<DomainSettingsBody zna={zna} />

			<DomainSettingsFooter
				zna={zna}
				buttonGroup={buttonGroup}
				footerStatusText={footerStatusText}
			/>
		</>
	);
};
