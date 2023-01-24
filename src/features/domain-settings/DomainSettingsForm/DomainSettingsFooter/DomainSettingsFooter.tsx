import { FC } from 'react';

import { ButtonType, StatusTextType } from '../hooks';

import { ButtonGroup, FooterLabel } from './ui';

export interface DomainSettingsFooterProps {
	zna: string;
	buttonGroup: ButtonType;
	footerStatusText: StatusTextType;
}

export const DomainSettingsFooter: FC<DomainSettingsFooterProps> = ({
	zna,
	buttonGroup,
	footerStatusText,
}) => {
	return (
		<div>
			{footerStatusText?.text && (
				<FooterLabel footerStatusText={footerStatusText} />
			)}

			<ButtonGroup zna={zna} buttonGroup={buttonGroup} />
		</div>
	);
};
