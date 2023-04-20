import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { InfiniteData, useQueryClient } from 'react-query';

import { Domain } from '@zero-tech/zns-sdk';

import {
	useBidData,
	useDomainMetadata,
	usePaymentToken,
	useWeb3,
} from '../../lib/hooks';
import { formatEthers, sortBidsByAmount } from '../../lib/util';
import { useZna } from '../../lib/hooks/useZna';
import { getInfiniteSubdomainQueryKey } from './SubdomainTable/useInfiniteSubdomains';

interface UseSubdomainTableItem {
	zna: string;
}

/**
 * This logic was extracted to a hook as it is shared between the Row and the
 * Card components.
 * @param zna The subdomain name
 */
export const useSubdomainTableItem = ({ zna }: UseSubdomainTableItem) => {
	const { account } = useWeb3();
	const { domainId, parentZna, parentDomainId } = useZna(zna);
	const queryClient = useQueryClient();
	const history = useHistory();

	/*
	 * Specifically not using useInfiniteQuery here
	 * as it was killing the query data reset logic
	 */
	const queryKey = getInfiniteSubdomainQueryKey(parentDomainId);
	const data = queryClient.getQueryData(queryKey) as InfiniteData<Domain[]>;
	const subdomain = data?.pages
		?.flat()
		.find((subdomain) => subdomain.id === domainId);

	const { data: bids, isLoading: isLoadingBidData } = useBidData(domainId);
	const { highestBid } = sortBidsByAmount(bids);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);

	const isOwnedByUser =
		account &&
		subdomain?.owner &&
		account.toLowerCase() === subdomain.owner.toLowerCase();
	const isLoading = isLoadingBidData || isLoadingMetadata;
	const image = metadata?.previewImage ?? metadata?.image;
	const alt = (metadata?.name ?? zna) + ' preview image';

	const highestBidAmount = highestBid?.amount
		? formatEthers(highestBid.amount)
		: undefined;

	const handleItemClick = useCallback((event: any, domainName?: string) => {
		const clickedButton = event?.target?.className?.indexOf('button') >= 0;
		if (!clickedButton) {
			history.push(`/${domainName}/nfts`);
		}
	}, []);

	return {
		highestBidAmount,
		image,
		alt,
		isLoading,
		isOwnedByUser,
		buyNowPrice: subdomain?.buyNow,
		metadata,
		paymentTokenLabel: paymentToken?.label ?? '',
		handleItemClick,
	};
};
