describe('Connect Wallet', () => {
	beforeEach(() => {
		cy.visitRootDomain();
	});

	afterEach(() => {
		// reset connection for following test
		cy.disconnectMetamaskWalletFromDapp().then((disconnected) => {
			expect(disconnected).to.be.true;
		});
	});

	it('successfully opens the connect wallet modal', () => {
		cy.get('.authentication__connect-wrapper').click();
		cy.get('div').should('have.class', 'wallet-select__header');
		cy.contains('connect to a wallet', { matchCase: false }).should(
			'be.visible',
		);
		cy.get('.dialog__content')
			.should('contain', 'Metamask')
			.and('contain', 'Wallet Connect')
			.and('contain', 'Coinbase Wallet')
			.and('contain', 'Fortmatic')
			.and('contain', 'Portis');
	});

	it('displays connecting indicator when list item is clicked', () => {
		cy.get('.authentication__connect-wrapper').click();
		cy.findByText('Metamask').trigger('mouseover').click();
		cy.wait(2000);
		cy.get('.dialog__content').contains('connecting...', {
			matchCase: false,
		});
		// accept access required to close extension window
		cy.acceptMetamaskAccess();
	});

	it('closes the connect wallet modal when clicking outside of it', () => {
		cy.get('.authentication__connect-wrapper').click();
		cy.get('body').click(10, 10);
		cy.get('.wallet-select__header').should('not.exist');
	});

	it('should open connect wallet modal and successfully connect to Metamask', () => {
		cy.connectWithMetamask();
		cy.get('.eth-address').should('exist');
	});

	it('should successfully disconnect wallet via site ui', () => {
		cy.connectWithMetamask();
		cy.get('.authentication__connect-wrapper').should('not.exist');
		cy.get('.eth-address').should('exist');
		cy.get('.button__connect-button').click({ force: true });
		cy.get('.authentication__connect-wrapper').should('exist');
	});
});
