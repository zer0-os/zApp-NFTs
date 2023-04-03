import React from 'react';

import { SubdomainMetrics } from './SubdomainMetrics';
import { SubdomainTable } from './SubdomainTable';

import * as selectors from './selectors';

interface ViewSubdomainsProps {
	zna: string;
}

export const ViewSubdomains = ({ zna }: ViewSubdomainsProps) => {
	return (
		<section data-testid={selectors.viewSubdomainsSection}>
			<SubdomainMetrics zna={zna} />
			<SubdomainTable zna={zna} />
		</section>
	);
};
