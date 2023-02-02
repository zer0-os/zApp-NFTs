import { getDomainId } from '../../../lib/util';
import { useWeb3, useDomainData, useDomainMetadata } from '../../../lib/hooks';
import { truncateAddress } from '@zero-tech/zui/utils';

export const useDomainSettingsData = (zna: string) => {
	const domainId = getDomainId(zna);

	const { account } = useWeb3();
	const { data: domain } = useDomainData(domainId);
	const { data: metadata } = useDomainMetadata(domainId);

	const isMetadataLocked = domain?.isLocked;
	const truncatedLockedByAddress = truncateAddress(domain?.lockedBy) ?? '';
	const isLockedByOwner =
		domain?.isLocked &&
		domain?.lockedBy.toLowerCase() === account?.toLowerCase();

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';

	return {
		domainId,
		metadata,
		imageAlt,
		imageSrc,
		isLockedByOwner,
		isMetadataLocked,
		truncatedLockedByAddress,
	};
};
