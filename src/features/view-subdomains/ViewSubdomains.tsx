import React from 'react';

import { SubdomainTable } from './SubdomainTable';

import { SubdomainViewSelector } from './selectors';

interface ViewSubdomainsProps {
	zna: string;
}

export const ViewSubdomains = ({ zna }: ViewSubdomainsProps) => {
	return (
		<section data-testid={SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION}>
			<SubdomainTable zna={zna} />
		</section>
	);
};
