describe('NFTs Home Page', () => {
	it('successfully visits the root domain', function () {
		cy.visitRootDomain();

		cy.url().should('include', '/0.wilder/nfts');
		cy.get('.main__header').find('a').should('contain', 'wilder');
	});
});
