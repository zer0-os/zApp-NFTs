import './commands';
import '@synthetixio/synpress/support';

export {};
declare global {
	namespace Cypress {
		interface Chainable {
			interceptCurrentUserRequest(): Chainable<void>;
			visitRootDomain(): Chainable<void>;
			connectWithMetamask(): Chainable<void>;
		}
	}
}
