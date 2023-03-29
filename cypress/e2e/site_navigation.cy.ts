import * as domainsPageSelectors from '../../src/pages/Domains/selectors';
import * as viewSubdomainsSelectors from '../../src/features/view-subdomains/selectors';

describe('Site Navigation', () => {
	beforeEach(() => {
		cy.visitRootDomain();
	});

	const rootDomainZns = 'wilder';
	const subdomainZns = `${rootDomainZns}.snowflake`;

	it('successfully loads correct page for the root domain', () => {
		// assert url
		cy.assertUrl('contain', rootDomainZns);
		cy.assertUrl('not.contain', `${rootDomainZns}.`);

		const expectedHref = `/0.${rootDomainZns}/nfts`;
		const expectedText = 'wilder';

		// assert address bar anchor segment
		cy.get('.main__header')
			.find('a')
			.should('contain', `${rootDomainZns}`)
			.should('have.length', 1)
			.and('have.attr', 'href', expectedHref)
			.and('have.text', expectedText);

		// assert expected elements
		cy.assertElementIsVisible(domainsPageSelectors.domainsContainer);
		cy.assertElementIsVisible(viewSubdomainsSelectors.viewSubdomainsSection);
	});

	it('successfully loads directly to a given domain', () => {
		// assert subdomain exists
		cy.findByText(`0://${subdomainZns}`).should('exist');

		cy.visit(`//0.${subdomainZns}/nfts`);

		// assert url
		cy.assertUrl('contain', subdomainZns);
		cy.assertUrl('not.contain', rootDomainZns);

		// assert address bar anchor segments
		cy.get('.main__header')
			.find('a')
			.should('have.length', 2)
			.each((a, index) => {
				// assert href attribute and anchor text for each anchor
				const expectedHref =
					index === 0 ? `/0.${rootDomainZns}/nfts` : `/0.${subdomainZns}/nfts`;
				const expectedText = index === 0 ? 'wilder' : 'snowflake';

				cy.wrap(a)
					.should('have.attr', 'href', expectedHref)
					.should('have.text', expectedText);
			});

		// assert expected elements
		cy.assertElementIsVisible(viewSubdomainsSelectors.domainBannerContainer);
		cy.assertElementIsVisible(
			viewSubdomainsSelectors.domainDetailsCardContainer,
		).and('contain', 'Winter Time');
	});
});
