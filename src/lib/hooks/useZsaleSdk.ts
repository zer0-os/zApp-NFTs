import { useContext } from 'react';

import { DropInstance, ZsaleSdkContext } from '../providers/ZsaleSdkProvider';

interface UseZsaleSdkParams {
	dropInstance: DropInstance;
}

export function useZsaleSdk({ dropInstance }: UseZsaleSdkParams) {
	const { getSdk } = useContext(ZsaleSdkContext);

	return getSdk(dropInstance);
}
