import { FC } from 'react';

import { ViewSubdomains } from '../../features/view-subdomains/ViewSubdomains';
import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';
import { DomainPreview } from '../../features/domain-preview';

export const Domains: FC = () => {
	const { currentZna, isRootDomain } = useCurrentRoute();

	return (
		<>
			{!isRootDomain && <DomainPreview zna={currentZna} variant={'minimal'} />}
			<ViewSubdomains zna={currentZna} />
		</>
	);
};
