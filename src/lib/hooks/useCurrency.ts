import { useQuery } from 'react-query';
import { tokenToUsd } from './../util/tokenPrices';

export const useCurrency = (token: string) => {
	return useQuery(['currency', { token }], () => tokenToUsd(token), {
		retry: true,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
