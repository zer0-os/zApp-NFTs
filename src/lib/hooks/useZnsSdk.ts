import { useContext } from 'react';

import { ZnsSdkContext } from '../providers/ZnsSdkProvider';

export function useZnsSdk() {
	return useContext(ZnsSdkContext);
}
