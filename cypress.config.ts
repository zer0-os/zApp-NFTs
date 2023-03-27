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
	video: false,
	screenshotOnRunFailure: false,
	e2e: {
		testIsolation: true,
		setupNodeEvents(on, config) {
			synpressPlugins(on, config);
		},
		baseUrl: 'http://localhost:3000',
		supportFile: 'cypress/support/e2e.ts',
	},
});
