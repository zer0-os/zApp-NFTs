//- React Imports
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

//- Library Imports
import { Domain } from '@zero-tech/zns-sdk';

type UseBrowserNavigationReturn = {
	isNFTView: boolean;
};

export const useViewNavigation = (
	subdomainData: Domain[],
): UseBrowserNavigationReturn => {
	const location = useLocation();

	const nftView = useMemo(
		() => location.search.includes('view=true'),
		[location.search],
	);
	const isNFTView = nftView === true || subdomainData?.length === 0;

	return {
		isNFTView,
	};
};
