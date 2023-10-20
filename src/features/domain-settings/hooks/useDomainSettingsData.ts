import {
	useWeb3,
	useDomainData,
	useDomainMetadata,
	useIsDomainMetadataLocked,
} from '../../../lib/hooks';
import { getDomainId } from '../../../lib/util';
import { truncateAddress } from '@zero-tech/zui';

export const useDomainSettingsData = (zna: string) => {
	const domainId = getDomainId(zna);

	const { account } = useWeb3();

	const { data: domain, isLoading: isLoadingDomainData } =
		useDomainData(domainId);

	const {
		data: metadata,
		isLoading: isLoadingMetadata,
		queryKey,
	} = useDomainMetadata(domainId);

	const { data: isMetadataLocked, isLoading: isLoadingLockedStatus } =
		useIsDomainMetadataLocked(domainId);

	const truncatedLockedByAddress = truncateAddress(domain?.lockedBy) ?? '';
	const isLockedByOwner =
		domain?.lockedBy.toLowerCase() === account?.toLowerCase();

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc =
		metadata?.animation_url ?? metadata?.image_full ?? metadata?.image ?? '';

	const isLoadingSettingsData =
		isLoadingMetadata || isLoadingDomainData || isLoadingLockedStatus;

	return {
		domainId,
		metadata,
		imageAlt,
		imageSrc,
		isLockedByOwner,
		isLoadingSettingsData,
		isMetadataLocked,
		truncatedLockedByAddress,
		queryKey,
	};
};
