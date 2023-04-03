/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { getByDataTestId } from './helpers';
import { ContainAssertionChainType } from './types';

import '@testing-library/cypress/add-commands';
import { configure } from '@testing-library/cypress';

/**
 * Configuration for use of data-testid attribute
 */
configure({ testIdAttribute: 'data-testid' });

/**
 * Intercept current user request on page load to skip signature request
 * @example
 * cy.interceptCurrentUserRequest();
 */
Cypress.Commands.add('interceptCurrentUserRequest', () => {
	cy.intercept('GET', '/api/users/current', {
		statusCode: 200,
		body: {},
	}).as('interceptCurrentUser');
});

/**
 * Visit root domain - root domain set to 'http://localhost:3000' defined in cypress config.
 * @example
 * cy.visitRootDomain();
 */
Cypress.Commands.add('visitRootDomain', () => {
	cy.visit('/');
});

/**
 * Connect user wallet with metamask
 * @example
 * cy.connectWithMetamask();
 */
Cypress.Commands.add('connectWithMetamask', () => {
	cy.get('.authentication__connect-wrapper').click();
	cy.findByText('Metamask').trigger('mouseover').click();
	cy.acceptMetamaskAccess().then((connected) => {
		expect(connected).to.be.true;
	});
});

/**
 * Helper command to assert url that takes an assertion type - to contain or not to contain
 * @example
 * cy.assertUrl('contain', exampleUrl);
 * cy.assertUrl('not.contain', exampleUrl);
 */
Cypress.Commands.add(
	'assertUrl',
	(assertionType: ContainAssertionChainType, zna: string, query?: string) => {
		cy.url().should(assertionType, `/0.${zna}/nfts${query ? `?${query}` : ''}`);
	},
);

/**
 * Helper command to assert element is visible in the DOM that takes a selector
 * @example
 * cy.assertElement(selectors.exampleSelector);
 */
Cypress.Commands.add('assertElementIsVisible', (selector: string) => {
	cy.get(getByDataTestId(selector)).should('be.visible');
});
