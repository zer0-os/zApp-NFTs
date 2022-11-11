import { FC } from 'react';

import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import { Banner, DetailsCard } from '../../features/view-subdomains';
import { ViewSubdomains } from '../../features/view-subdomains/ViewSubdomains';

export const Domains: FC = () => {
	const { currentZna, isRootDomain } = useCurrentRoute();

	return (
		<>
			{!isRootDomain && (
				<>
					<Banner zna={currentZna} />
					<DetailsCard zna={currentZna} />
				</>
			)}
			<ViewSubdomains zna={currentZna} />
		</>
	);
};
