import { getDomainId, getParentZna } from '../util';

interface UseZnaReturn {
	domainId: string;
	parentZna: string;
	parentDomainId: string;
}

/**
 * A helpful hook for grabbing regularly-used zNA values
 */
export const useZna = (zna: string): UseZnaReturn => {
	return {
		domainId: getDomainId(zna),
		parentZna: getParentZna(zna),
		parentDomainId: getDomainId(getParentZna(zna)),
	};
};
