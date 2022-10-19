import { QueryClient, QueryClientProvider } from 'react-query';

import { AppProps } from './lib/types/app';
import { ChainGate } from './lib/util/ChainGate';
import { Web3Provider } from './lib/providers/Web3Provider';
import { ZnsSdkProvider } from './lib/providers/ZnsSdkProvider';

import { ZUIProvider } from '@zero-tech/zui/ZUIProvider';

import { App } from './App';

const queryClient = new QueryClient();

export const NFTsZApp = ({ provider, route, web3 }: AppProps) => (
	<QueryClientProvider client={queryClient} contextSharing={true}>
		<Web3Provider
			provider={provider}
			account={web3.address}
			chainId={web3.chainId}
			connectWallet={web3.connectWallet}
		>
			<ChainGate chainId={provider?._network?.chainId ?? 1}>
				<ZnsSdkProvider>
					<ZUIProvider>
						<App provider={provider} route={route} web3={web3} />
					</ZUIProvider>
				</ZnsSdkProvider>
			</ChainGate>
		</Web3Provider>
	</QueryClientProvider>
);
