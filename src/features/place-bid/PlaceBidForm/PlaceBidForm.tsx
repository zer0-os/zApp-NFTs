import { FC, ReactNode } from 'react';

import { Wizard } from '@zero-tech/zui/components';

interface PlaceBidFormProps {}

export const PlaceBidForm: FC<PlaceBidFormProps> = () => {
	return (
		<form>
			<Wizard.Container header="Place A Bid">Place A Bid</Wizard.Container>
		</form>
	);
};
