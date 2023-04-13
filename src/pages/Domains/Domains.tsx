import { FC } from 'react';

import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import { ViewSubdomains } from '../../features/view-subdomains/ViewSubdomains';
import {
	DomainBannerContainer,
	DomainDetailsCard,
} from '../../features/view-subdomains';

import { DomainsPageSelector } from './selectors';

import styles from './Domains.module.scss';

export const Domains: FC = () => {
	const { currentZna, isRootDomain } = useCurrentRoute();

	return (
		<main
			className={styles.Main}
			data-testid={DomainsPageSelector.DOMAINS_PAGE_CONTAINER}
		>
			<>THIS IS A TEST PREVIEW DEPLOYMENT</>
			{!isRootDomain && (
				<>
					<DomainBannerContainer zna={currentZna} />
					<DomainDetailsCard zna={currentZna} />
				</>
			)}
			<ViewSubdomains zna={currentZna} />
		</main>
	);
};
