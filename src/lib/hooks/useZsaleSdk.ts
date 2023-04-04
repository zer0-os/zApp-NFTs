import { useContext } from 'react';

import { ZsaleSdkContext } from '../providers/ZsaleSdkProvider';

export function useZsaleSdk() {
	return useContext(ZsaleSdkContext);
}
