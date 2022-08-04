/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC } from 'react';

//- Types Imports
import { AppProps } from './lib/types/app';

const App: FC<AppProps> = ({ provider, route }) => {
	console.log('prov (marketplace-dapp):', provider);
	console.log('route (marketplace-dapp):', route);

	return <main>Marketplace dApp</main>;
};

export default App;
