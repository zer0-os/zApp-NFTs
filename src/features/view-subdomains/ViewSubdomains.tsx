import React from 'react';

import { SubdomainTable } from './SubdomainTable';

import { SubdomainViewSelector } from './selectors';

import styles from './ViewSubdomains.module.scss';

interface ViewSubdomainsProps {
	zna: string;
}

export const ViewSubdomains = ({ zna }: ViewSubdomainsProps) => {
	return (
		<section
			className={styles.Container}
			data-testid={SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION}
		>
			<SubdomainTable zna={zna} />
		</section>
	);
};
