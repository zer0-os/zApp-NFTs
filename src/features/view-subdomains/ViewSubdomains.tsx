import React from 'react';

import { SubdomainMetrics } from './SubdomainMetrics';
import { SubdomainTable } from './SubdomainTable';

interface ViewSubdomainsProps {
	zna: string;
}

export const ViewSubdomains = ({ zna }: ViewSubdomainsProps) => {
	return (
		<section>
			<SubdomainMetrics zna={zna} />
			<SubdomainTable zna={zna} />
		</section>
	);
};
