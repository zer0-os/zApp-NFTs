describe('Connect Wallet', () => {
	beforeEach(() => {
		cy.interceptCurrentUserRequest();
		cy.visitRootDomain();
	});

	afterEach(() => {
		// disconnect wallet for following test
		cy.disconnectMetamaskWalletFromDapp().then((disconnected) => {
			expect(disconnected).to.be.true;
		});
	});

	after(() => {
		// reset account after test suite
		cy.resetMetamaskAccount().then((reset) => {
			expect(reset).to.be.true;
		});
	});

	// fire click event on connect button
	const clickConnectBtn = () =>
		cy.get('.authentication__connect-wrapper').click();

	it('successfully opens the connect wallet modal', () => {
		clickConnectBtn();

		// assert find connect wallet modal
		cy.findByText('Connect To A Wallet').should('be.visible');

		// assert connect wallet provider options
		cy.findByText('Metamask').should('be.visible');
		cy.findByText('Wallet Connect').should('be.visible');
		cy.findByText('Coinbase Wallet').should('be.visible');
		cy.findByText('Fortmatic').should('be.visible');
		cy.findByText('Portis').should('be.visible');
	});

	it('displays connecting indicator when list item is clicked', () => {
		clickConnectBtn();

		// assert and click metamask wallet provider option
		cy.findByText('Metamask').trigger('mouseover').click();

		cy.wait(2000);

		cy.get('.dialog__content').contains('connecting...', {
			matchCase: false,
		});

		// accept access required to close extension window
		cy.acceptMetamaskAccess();
	});

	it('closes the connect wallet modal when clicking outside of it', () => {
		clickConnectBtn();

		// click outside of modal
		cy.get('body').click(10, 10);

		// assert modal does not exist
		cy.get('.wallet-select__header').should('not.exist');
	});

	it('should open connect wallet modal and successfully connect to Metamask', () => {
		cy.connectWithMetamask();

		// assert ui change when wallet is connected
		cy.get('.eth-address').should('exist');
	});

	it('should successfully disconnect wallet via site ui', () => {
		cy.connectWithMetamask();

		// assert modal does not exist
		cy.get('.authentication__connect-wrapper').should('not.exist');

		// assert ui change when wallet is connected
		cy.get('.eth-address').should('exist');

		// force click hidden disconnect button
		cy.get('.button__connect-button').click({ force: true });

		// assert ui change when wallet is disconnected
		cy.get('.authentication__connect-wrapper').should('exist');
	});
});
