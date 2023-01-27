import { FC } from 'react';

import {
	DomainSettingsBody,
	DomainSettingsHeader,
	DomainSettingsFormContextProvider,
} from '.';
import { Wizard } from '@zero-tech/zui/components';

export type DomainSettingsFormProps = {
	zna: string;
	onClose: () => void;
};

export const DomainSettingsForm: FC<DomainSettingsFormProps> = ({
	zna,
	onClose,
}) => {
	return (
		<DomainSettingsFormContextProvider zna={zna}>
			<Wizard.Container>
				<DomainSettingsHeader subtitle={zna} onClose={onClose} />
				<DomainSettingsBody zna={zna} onClose={onClose} />
			</Wizard.Container>
		</DomainSettingsFormContextProvider>
	);
};
