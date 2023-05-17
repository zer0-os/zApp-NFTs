import { DropInstance } from '../../../lib/providers/ZsaleSdkProvider';
import { useWeb3, useZsaleSdk } from '../../../lib/hooks';
import { useQuery } from 'react-query';

export const useDropUserPurchases = (dropInstance: DropInstance) => {
	const { account } = useWeb3();
	const drop = useZsaleSdk({ dropInstance });

	return useQuery(
		[
			'account',
			'sale',
			'purchases',
			{ contractAddress: dropInstance.contractAddress, account },
		],
		async () => {
			const [max, minted] = await Promise.all([
				drop.numberPurchasableByAccount(account),
				drop.getDomainsPurchasedByAccount(account),
			]);

			return {
				max,
				minted,
			};
		},
		{
			enabled: Boolean(account) && Boolean(drop),
			refetchOnWindowFocus: false,
		},
	);
};
