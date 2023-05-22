import { useWeb3 } from './useWeb3';
import { useQuery } from 'react-query';

export const useBalanceEth = () => {
	const { account, provider, chainId } = useWeb3();

	return useQuery(
		['balance', { account, chainId }],
		async () => {
			if (!account || !provider) return;
			return await provider.getBalance(account);
		},
		{
			enabled: Boolean(account) && Boolean(provider),
			refetchInterval: 10000,
			refetchOnWindowFocus: true,
		},
	);
};
