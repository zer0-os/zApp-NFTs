import { providers } from 'ethers';
import { FC, createContext, ReactNode } from 'react';
import { USER_ADDRESS } from '../constants/addresses';

interface Web3ProviderProps {
	provider?: providers.Web3Provider;
	children?: ReactNode;
}

const INFURA_MAINNET =
	'https://mainnet.infura.io/v3/77c3d733140f4c12a77699e24cb30c27';

export const Web3Context = createContext({
	address: undefined as string | undefined,
	provider: undefined as providers.Web3Provider | undefined,
});

const Web3Provider: FC<Web3ProviderProps> = ({
	provider,
	children,
}: Web3ProviderProps) => {
	return (
		<Web3Context.Provider
			value={{
				provider:
					provider ??
					(new providers.JsonRpcProvider(
						INFURA_MAINNET,
						1,
					) as providers.Web3Provider),
				address: USER_ADDRESS,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export default Web3Provider;
