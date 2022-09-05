import { useContext } from 'react';
import { Web3Context } from '../providers/Web3Provider';

export function useWeb3() {
	return useContext(Web3Context);
}
export default useWeb3;
