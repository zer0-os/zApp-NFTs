import { FC } from 'react';

import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import { ViewSubdomains } from '../../features/view-subdomains/ViewSubdomains';
import {
	DomainBannerContainer,
	DomainDetailsCard,
} from '../../features/view-subdomains';

export const Domains: FC = () => {
	const { currentZna, isRootDomain } = useCurrentRoute();

	return (
		<>
			{!isRootDomain && (
				<>
					<DomainBannerContainer zna={currentZna} />
					<DomainDetailsCard zna={currentZna} />
				</>
			)}
			<ViewSubdomains zna={currentZna} />
		</>
	);
};
