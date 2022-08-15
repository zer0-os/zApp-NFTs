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

const App: FC<AppProps> = ({ provider, route, user }) => {
	console.log('prov (marketplace-dapp):', provider);
	console.log('route (marketplace-dapp):', route);

	return (
		<main>
			<ZNS route={route} user={user} />
		</main>
	);
};

export default App;
