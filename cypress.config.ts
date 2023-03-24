import dotenv from 'dotenv';
import { defineConfig } from 'cypress';
import synpressPlugins from '@synthetixio/synpress/plugins';

dotenv.config();

module.exports = defineConfig({
	userAgent: 'synpress',
	chromeWebSecurity: true,
	defaultCommandTimeout: 100000,
	pageLoadTimeout: 100000,
	requestTimeout: 100000,
	env: {
		REACT_APP_DEFAULT_NETWORK: 'GOERLI',
	},
	e2e: {
		testIsolation: false,
		setupNodeEvents(on, config) {
			synpressPlugins(on, config);
		},
		baseUrl: 'http://localhost:3000',
		supportFile: 'cypress/support/e2e.ts',
	},
});
