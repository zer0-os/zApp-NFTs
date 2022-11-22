import { useQuery } from 'react-query';
import { prominent } from 'color.js';
import { getHashFromIpfsUrl } from '@zero-tech/zapp-utils/utils/ipfs';
import { getCloudinaryUrls } from '@zero-tech/zapp-utils/utils/cloudinary';

export const useColorPallette = (src: string) => {
	const hash = getHashFromIpfsUrl(src);
	const urls = getCloudinaryUrls(hash);

	return useQuery(
		['prominent', 'color', { src }],
		async () => await prominent(urls?.image, { amount: 3 }),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(src),
		},
	);
};
