import { FC } from 'react';

import { useDomainData } from '../../lib/hooks/useDomainData';

import {
	SubdomainMetrics,
	SubdomainTable,
} from '../../features/view-subdomains';
import { DomainPreview } from '../../features/domain-preview';

type DomainsContainerProps = {
	isRoot: boolean;
	domainId: string;
};

export const Domains: FC<DomainsContainerProps> = ({ isRoot, domainId }) => {
	return (
		<>
			{!isRoot && <DomainPreview domainId={domainId} />}

			<SubdomainMetrics domainId={domainId} />

			<SubdomainTable domainId={domainId} />
		</>
	);
};
