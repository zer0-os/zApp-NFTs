// Set the new environment variable
// process.env.REACT_APP_DEFAULT_NETWORK = 'GOERLI';

// console.log('here', process.env.REACT_APP_DEFAULT_NETWORK);

describe('connect wallet spec', () => {
	beforeEach(() => {
		// Cypress.env(
		// 	'REACT_APP_INFURA_URL',
		// 	'https://goerli.infura.io/v3/YOUR_PROJECT_ID',
		// );

		cy.intercept('GET', '/api/users/current', {
			statusCode: 200,
			body: {},
		}).as('getCurrentUser');

		// if we want to isolate each test, (testIsolation: false) needs to be updated to true
		// afterEach(() => {
		// 	cy.disconnectMetamaskWalletFromAllDapps();
		// 	cy.resetMetamaskAccount();
		//   });

		// // Define replacement subgraph test network name (goerli) - this should override the default network set in constants/networks.ts
		// const newSubgraphUrl =
		// 	'https://api.thegraph.com/subgraphs/name/zer0-os/zns-goerli';

		// // Intercept all instances of the mainnet subgraph requests and modify the URL for testing purposes
		// cy.intercept(
		// 	'POST',
		// 	'https://api.thegraph.com/subgraphs/name/zer0-os/zns',
		// 	(req) => {
		// 		req.url = newSubgraphUrl;
		// 	},
		// ).as('switchSubgraphsNetwork');

		// const newInfuraIdUrl =
		// 	'https://goerli.infura.io/v3/77c3d733140f4c12a77699e24cb30c27';

		// // Intercept all instances of the mainnet subgraph requests and modify the URL for testing purposes
		// cy.intercept(
		// 	'POST',
		// 	'https://mainnet.infura.io/v3/77c3d733140f4c12a77699e24cb30c27',
		// 	(req) => {
		// 		req.url = newInfuraIdUrl;
		// 	},
		// ).as('switchInfuraIdUrl');
	});

	it('should connect wallet with success', () => {
		cy.visit('/');

		cy.get('.authentication__connect-wrapper').click();
		cy.get('.dialog__content').find('li').first().trigger('mouseover').click();
		cy.acceptMetamaskAccess();
		cy.request({
			method: 'GET',
			url: '/api/users/current',
		}).then((response) => {
			console.log(response);
		});
		// cy.reload();

		// // Define the Goerli chainId as a decimal string
		// const goerliChainId = '5';

		// // Convert the decimal string to a hexadecimal string with a 0x prefix
		// const hexChainId = '0x' + parseInt(goerliChainId).toString(16);

		// // Check if window.ethereum is available
		// if (cy.window().its('ethereum')) {
		// 	cy.window()
		// 		.its('ethereum')
		// 		.then((ethereum) => {
		// 			// Set the desired chainId
		// 			ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
		// 				if (chainId !== hexChainId) {
		// 					ethereum
		// 						.request({
		// 							method: 'wallet_switchEthereumChain',
		// 							params: [{ chainId: hexChainId }],
		// 						})
		// 						.then(() => {
		// 							// Reload the page to reflect the new chainId
		// 							cy.reload();
		// 						});
		// 				} else {
		// 					console.log('ALREADYSWITCHED');
		// 				}
		// 			});
		// 		});
		// }
	});

	// it('import private key and connect wallet using imported metamask account', () => {
	// 	cy.importMetamaskAccount(
	// 		'0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97',
	// 	);
	// 	cy.get('#connectButton').click();
	// 	cy.acceptMetamaskAccess();
	// 	cy.get('#accounts').should(
	// 		'have.text',
	// 		'0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f',
	// 	);
	// });
});
