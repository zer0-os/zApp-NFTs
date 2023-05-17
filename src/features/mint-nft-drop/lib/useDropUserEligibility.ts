import { DropInstance } from '../../../lib/providers/ZsaleSdkProvider';
import { useWeb3, useZsaleSdk } from '../../../lib/hooks';
import { useQuery } from 'react-query';

export const useDropUserEligibility = (dropInstance: DropInstance) => {
	const { account } = useWeb3();
	const drop = useZsaleSdk({ dropInstance });

	return useQuery(
		[
			'account',
			'sale',
			'eligibility',
			{ contractAddress: dropInstance.contractAddress, account },
		],
		async () => {
			return await drop.isUserOnMintlist(account);
		},
		{
			enabled: Boolean(account) && Boolean(drop),
		},
	);
};
