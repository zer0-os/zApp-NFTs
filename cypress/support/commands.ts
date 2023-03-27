/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

/**
 * Configuration for use of data-test-id attribute
 */
import '@testing-library/cypress/add-commands';
import { configure } from '@testing-library/cypress';
configure({ testIdAttribute: 'data-test-id' });

/**
 * Intercept current user request on page load to skip signature request
 * @example
 * cy.interceptCurrentUserRequest();
 */
Cypress.Commands.add('interceptCurrentUserRequest', () => {
	cy.intercept('GET', '/api/users/current', {
		statusCode: 200,
		body: {},
	}).as('getCurrentUser');
});

/**
 * Visit root domain and intercept current user request
 * @example
 * cy.visitRootDomain();
 */
Cypress.Commands.add('visitRootDomain', () => {
	cy.interceptCurrentUserRequest();
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
