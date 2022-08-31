/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC } from 'react';

//- Types Imports
import { AppProps } from './lib/types/app';

//- Page Imports
import ZNS from './pages/ZNS/ZNS';

//- Provider Imports
import { ZUIProvider } from '@zero-tech/zui/src/ZUIProvider';
import { ModalProvider } from './lib/providers/ModalProvider';

const App: FC<AppProps> = ({ provider, route, user }) => {
	console.log('prov (marketplace-dapp):', provider);
	console.log('route (marketplace-dapp):', route);

	return (
		<main>
			<ZUIProvider>
				<ModalProvider>
					<ZNS route={route} user={user} />
				</ModalProvider>
			</ZUIProvider>
		</main>
	);
};

export default App;
