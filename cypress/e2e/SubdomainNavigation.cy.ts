import { NFTPageSelector } from '../../src/pages/NFT/selectors';
import { DomainsPageSelector } from '../../src/pages/Domains/selectors';
import { SubdomainViewSelector } from '../../src/features/view-subdomains/selectors';

describe('Subdomain Navigation', () => {
	const rootDomainZna = 'wilder';
	const subdomainZna = `${rootDomainZna}.snowflake`;

	it('successfully loads correct page for the root domain', () => {
		cy.visitRootDomain();

		// assert url
		cy.assertUrl('contain', rootDomainZna);
		cy.assertUrl('not.contain', `${rootDomainZna}.`);

		const expectedHref = `/0.${rootDomainZna}/nfts`;
		const expectedText = 'wilder';

		// assert address bar anchor segment
		cy.get('.main__header')
			.find('a')
			.should('contain', `${rootDomainZna}`)
			.should('have.length', 1)
			.and('have.attr', 'href', expectedHref)
			.and('have.text', expectedText);

		// assert expected elements
		cy.assertElementIsVisible(DomainsPageSelector.DOMAINS_PAGE_CONTAINER);
		cy.assertElementIsVisible(SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION);
	});

	it('successfully loads directly to a given domain', () => {
		cy.visit(`/0.${subdomainZna}/nfts`);

		// assert url
		cy.assertUrl('contain', subdomainZna);

		// assert address bar anchor segment
		cy.get('.main__header')
			.find('a')
			.should('have.length', 2)
			.each((a, index) => {
				// assert anchor text for each anchor
				const expectedText = index === 0 ? 'wilder' : 'snowflake';

				cy.wrap(a).should('have.text', expectedText);
			});
	});

	it('successfully loads to a given domain from root domain', () => {
		cy.visitRootDomain();

		// assert subdomain exists
		cy.findByText(`0://${subdomainZna}`).should('exist');

		cy.visit(`//0.${subdomainZna}/nfts`);

		// assert url
		cy.assertUrl('contain', subdomainZna);
		cy.assertUrl('not.contain', rootDomainZna);

		// assert address bar anchor segments
		cy.get('.main__header')
			.find('a')
			.should('have.length', 2)
			.each((a, index) => {
				// assert href attribute and anchor text for each anchor
				const expectedHref =
					index === 0 ? `/0.${rootDomainZna}/nfts` : `/0.${subdomainZna}/nfts`;
				const expectedText = index === 0 ? 'wilder' : 'snowflake';

				cy.wrap(a)
					.should('have.attr', 'href', expectedHref)
					.should('have.text', expectedText);
			});

		// assert expected elements
		cy.assertElementIsVisible(
			SubdomainViewSelector.VIEW_SUBDOMAINS_BANNER_CONTAINER,
		);
		cy.assertElementIsVisible(
			SubdomainViewSelector.VIEW_SUBDOMAINS_DETAILS_CARD_CONTAINER,
		).and('contain', 'Winter Time');
	});

	it('can view grid view and go to corret domain', () => {
		cy.visitRootDomain();

		// assert expected section element
		cy.assertElementIsVisible(SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION);

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
		cy.findByText(`0://${subdomainZna}`).should('exist').click();

		// assert url
		cy.assertUrl('contain', subdomainZna);
	});

	it('can view list view and go to corret domain', () => {
		cy.visitRootDomain();

		// assert expected section element
		cy.assertElementIsVisible(SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION);

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
		cy.findByText(`0://${subdomainZna}`).should('exist').click();

		// assert url
		cy.assertUrl('contain', subdomainZna);
	});

	it('can type in search bar to search by exact zNA (Grid)', () => {
		cy.visitRootDomain();

		// assert expected section element
		cy.assertElementIsVisible(SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION);

		// find search bar input and enter zna
		cy.findByPlaceholderText('Search by exact zNA')
			.should('be.visible')
			.type('snowflake');

		// assert subdomain is visible and click
		cy.findByText(`0://${subdomainZna}`).should('be.visible').click();

		// assert url
		cy.assertUrl('contain', subdomainZna);
	});

	it('can type in search bar to search by exact zNA (List)', () => {
		cy.visitRootDomain();

		// assert expected section element
		cy.assertElementIsVisible(SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION);

		// find list view radio button and click
		cy.findAllByRole('radio').first().click();

		// find search bar input and enter zna
		cy.findByPlaceholderText('Search by exact zNA')
			.should('be.visible')
			.type('snowflake');

		// assert subdomain is visible and click
		cy.findByText(`0://${subdomainZna}`).should('be.visible').click();

		// assert url
		cy.assertUrl('contain', subdomainZna);
	});

	it('successfully navigates to view nft page when clicking link "View Domain NFT"', () => {
		cy.visit(`/0.${subdomainZna}/nfts`);

		cy.findByText('View Domain NFT').should('be.visible').click();

		// assert expected element
		cy.assertElementIsVisible(NFTPageSelector.NFT_MAIN_CONTAINER);

		// assert url
		cy.assertUrl('contain', subdomainZna, 'view=true');
	});

	it('successfully navigates back to domains page when clicking zNA address bar segment', () => {
		cy.visit(`/0.${subdomainZna}/nfts?view=true`);

		// zNA address bar click second segment
		cy.get('.main__header').find('a').eq(1).click();

		// assert expected section element
		cy.assertElementIsVisible(SubdomainViewSelector.VIEW_SUBDOMAINS_SECTION);

		// assert url
		cy.assertUrl('contain', subdomainZna);
	});
});
