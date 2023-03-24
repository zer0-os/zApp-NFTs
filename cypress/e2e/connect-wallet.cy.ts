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
			body: {
				createdAt: '2022-11-23T13:59:38.256Z',
				handle: '0x0777...7334',
				id: '17ce33c3-e270-446d-9ec3-a841b410e07e',
				isANetworkAdmin: false,
				isOnline: true,
				lastActiveAt: '2023-03-21T12:04:57.834Z',
				profileId: '90cbb4a1-128b-4f61-b625-6522a5519210',
				profileSummary: {
					firstName: '0xf39F...2266',
					guildId: null,
					id: '90cbb4a1-128b-4f61-b625-6522a5519210',
					lastName: '',
					profileImage:
						'https://res.cloudinary.com/fact0ry-dev/image/upload/v1623021590/zero-assets/avatars/pfp-15.jpg',
					ssbPublicKey: null,
				},
				role: '',
				updatedAt: '2023-03-21T12:04:57.834Z',
				wallets: [
					{
						0: {
							balance: null,
							balanceCheckedAt: null,
							createdAt: '2022-11-23T13:59:38.820Z',
							dailyLimit: null,
							data: null,
							id: '200a1446-578b-4e15-adc3-29b72cb992ae',
							isDefault: true,
							isMultiSig: false,
							name: null,
							networkId: null,
							publicAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
							requiredConfirmations: null,
							updatedAt: '2022-11-23T13:59:38.820Z',
							userId: '17ce33c3-e270-446d-9ec3-a841b410e07e',
						},
					},
				],
			},
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
