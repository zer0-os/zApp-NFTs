import { useLocation } from 'react-router-dom';
import { getDomainId } from '../util/domains/domains';

export const useCurrentRoute = () => {
	const { pathname, search } = useLocation();

	const params = new URLSearchParams(search);
	const zna = pathname?.split('/')[1]?.replace(/^0\./, '');

	return {
		currentZna: zna,
		currentDomainId: Boolean(zna) ? getDomainId(zna) : undefined,
		isRootDomain: Boolean(zna) && zna.split('.').length === 1,
		isNftView: Boolean(params.get('view')),
	};
};
