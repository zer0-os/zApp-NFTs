/**
 * This file:
 * - Wraps out App in necessary context providers
 * - Exports the root component
 */

//- React Imports
import { QueryClient, QueryClientProvider } from 'react-query';

//- Type Imports
import { AppProps } from './lib/types/app';

//- Utils Imports
import ChainGate from './lib/util/ChainGate';

//- Provider Imports
import Web3Provider from './lib/providers/Web3Provider';
import ZnsSdkProvider from './lib/providers/ZnsSdkProvider';

//- Container Imports
import App from './App';

const queryClient = new QueryClient();

const Index = ({ provider, route, web3 }: AppProps) => (
	<QueryClientProvider client={queryClient}>
		<Web3Provider
			provider={provider}
			account={web3.address}
			chainId={web3.chainId}
			connectWallet={web3.connectWallet}
		>
			<ChainGate chainId={provider?._network?.chainId ?? 1}>
				<ZnsSdkProvider provider={provider}>
					<App provider={provider} route={route} web3={web3} />
				</ZnsSdkProvider>
			</ChainGate>
		</Web3Provider>
	</QueryClientProvider>
);

export default Index;
