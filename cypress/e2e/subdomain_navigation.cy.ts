import * as domainsPageSelectors from '../../src/pages/Domains/selectors';
import * as viewSubdomainsSelectors from '../../src/features/view-subdomains/selectors';

describe('Subdomain Navigation', () => {
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

	it.only('can view grid view and go to corret domain', () => {
		// assert expected section element
		cy.assertElementIsVisible(viewSubdomainsSelectors.viewSubdomainsSection);

		// find toggle view radio group
		cy.findByRole('group').should('be.visible');

		// find toggle view radio buttons and assert attributes
		cy.findAllByRole('radio')
			.should('be.visible')
			.should('have.length', 2)
			.each(($radio, index) => {
				if (index === 0) {
					cy.wrap($radio)
						.should('have.attr', 'data-state', 'off')
						.should('have.attr', 'aria-checked', 'false');
				} else if (index === 1) {
					cy.wrap($radio)
						.should('have.attr', 'data-state', 'on')
						.should('have.attr', 'aria-checked', 'true');
				}
			});

		// assert grid view
		cy.get('[class*="Grid"]').should('be.visible');

		// find and click sudomain grid card
		cy.findByText(`0://${subdomainZns}`).should('exist').click();

		// assert url
		cy.assertUrl('contain', subdomainZns);
	});

	it('can view list view and go to corret domain', () => {
		// assert expected section element
		cy.assertElementIsVisible(viewSubdomainsSelectors.viewSubdomainsSection);

		// find toggle view radio group
		cy.findByRole('group').should('be.visible');

		// find list view radio button and click
		cy.findAllByRole('radio').first().click();

		// find toggle view radio buttons and assert attributes
		cy.findAllByRole('radio')
			.should('have.length', 2)
			.each(($radio, index) => {
				if (index === 0) {
					cy.wrap($radio)
						.should('have.attr', 'data-state', 'on')
						.should('have.attr', 'aria-checked', 'true');
				} else if (index === 1) {
					cy.wrap($radio)
						.should('have.attr', 'data-state', 'off')
						.should('have.attr', 'aria-checked', 'false');
				}
			});

		// assert list view
		cy.assertElementIsVisible('table');

		// find and click sudomain grid card
		cy.findByText(`0://${subdomainZns}`).should('exist').click();

		// assert url
		cy.assertUrl('contain', subdomainZns);
	});

	it('can type in search bar to search by exact zNA (Grid)', () => {
		// assert expected section element
		cy.assertElementIsVisible(viewSubdomainsSelectors.viewSubdomainsSection);

		// find search bar input and enter zna
		cy.findByPlaceholderText('Search by exact zNA')
			.should('be.visible')
			.type('snowflake');

		// assert subdomain is visible and click
		cy.findByText(`0://${subdomainZns}`).should('be.visible').click();

		// assert url
		cy.assertUrl('contain', subdomainZns);
	});

	it('can type in search bar to search by exact zNA (List)', () => {
		// assert expected section element
		cy.assertElementIsVisible(viewSubdomainsSelectors.viewSubdomainsSection);

		// find list view radio button and click
		cy.findAllByRole('radio').first().click();

		// find search bar input and enter zna
		cy.findByPlaceholderText('Search by exact zNA')
			.should('be.visible')
			.type('snowflake');

		// assert subdomain is visible and click
		cy.findByText(`0://${subdomainZns}`).should('be.visible').click();

		// assert url
		cy.assertUrl('contain', subdomainZns);
	});
});
