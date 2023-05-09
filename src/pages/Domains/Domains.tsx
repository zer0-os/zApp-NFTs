import React, { FC } from 'react';

import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import { ViewSubdomains } from '../../features/view-subdomains/ViewSubdomains';
import {
	DomainBannerContainer,
	DomainDetailsCard,
} from '../../features/view-subdomains';

import { DomainsPageSelector } from './selectors';

import styles from './Domains.module.scss';
import { RaffleContainer } from '../../features/nft-drop-raffle';

export const Domains: FC = () => {
	const { currentZna, isRootDomain } = useCurrentRoute();

	const enableBanner = true;

	return (
		<main
			className={styles.Main}
			data-testid={DomainsPageSelector.DOMAINS_PAGE_CONTAINER}
		>
			{enableBanner && <RaffleContainer />}
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
