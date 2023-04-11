import './commands';
import '@synthetixio/synpress/support';

export {};
declare global {
	namespace Cypress {
		interface Chainable {
			assertElementIsVisible(selector: string): Chainable<void>;
			assertUrl(
				assertionType: 'contain' | 'not.contain',
				zna: string,
				query?: string,
			): Chainable<void>;
			connectWithMetamask(): Chainable<void>;
			interceptCurrentUserRequest(): Chainable<void>;
			visitRootDomain(): Chainable<void>;
		}
	}
}
