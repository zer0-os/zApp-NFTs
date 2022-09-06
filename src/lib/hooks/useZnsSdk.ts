//- React Imports
import { useContext } from 'react';

//- Library Imports
import { ZnsSdkContext } from '../providers/ZnsSdkProvider';

export function useZnsSdk() {
	return useContext(ZnsSdkContext);
}
