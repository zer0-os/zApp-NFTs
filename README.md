# MarketPlace dApp

This is the Marketplace dApp, ported from zNS-dApp's "Market" app.

## Running Locally

This zApp is designed to run in the context of [zOS](https://github.com/zer0-os/zOS).

You will need to run `npm run watch`, and link the output folder (`dist`) to your local instance of [zOS](https://github.com/zer0-os/zOS).

1. `nvm use`
2. `npm i`
3. `npm run watch`

At this point, you should see a `dist` folder. This is the compiled version of your app. If you wish to import this into [zOS](https://github.com/zer0-os/zOS), you will need to do the following:

4. `npm run link [location of zOS, e.g. ../zOS]`

or, if the above script doesn't work for you:

4. `cd dist`
5. `npm link`
6. `cd [location of zOS]`
7. `npm link [package name of this zApp from package.json]`

Check `node_modules` in [zOS](https://github.com/zer0-os/zOS) - your package folder should be symlinked in there.

## Cypress End to End Testing Instructions

Create a `.env` file at the root of the project directory. Copy the environment variables from the `.env.example` file and paste into `.env`. The test setup will fail if these variables are not set in a `.env` file.

**Important** - The `goerli` network is set in the environment variables to ensure the e2e tests are run on a test network. To run the tests successfully, `DEFAULT_NETWORK` in the application code must be set to `goerli`. To do this, follow these steps:

1. Navigate to: `src/lib/constants/networks.ts`.
2. Update line `export const DEFAULT_NETWORK = Network.MAINNET;` to `export const DEFAULT_NETWORK = Network.GOERLI;`.

Next, you will need to follow the `Running Locally` instructions above in order to successfully run Cypress end to end specs.

Once the zApp is running locally open another terminal window and enter the following command.

- `npm run cypress:run`

The above command will run the script - `env-cmd cypress run --browser chrome --headed`. This script is setting the browser to `chrome` and adds flag `--headed` which is required to work with the `synpress` package.

#### Browser Configuration

To change the browser used when running Cypress, you will be required to run the following command, replacing `[broswer of choice]` with your chosen browser e.g. `firefox`:

- `npx env-cmd cypress run --browser [broswer of choice] --headed`

Please note, a metamask extension for your chosen browser will be required to run the tests successfully - the recommended browser is `chrome`.

#### Debugging Failing Tests

Once the specs have finished running, Cypress will exit and the Cypress window will close.

To assist with debugging and find where a test is failing using the Cypress window, you can run a script with the `--no-exit` flag. First, identify which spec file is failing and include the file in the below command, replacing `[spec file path]`:

`npx env-cmd cypress run --browser chrome --headed --spec "[spec file path]" --no-exit`

Example: `npx env-cmd cypress run --browser chrome --headed --spec "cypress/e2e/connect_wallet.cy.ts" --no-exit`.

#### Data Test ID Selectors

The `data-test-id={}` attribute has been added so we can create a more robust and predictable way to select elements for testing purposes, without relying on specific class names or other properties that may be subject to change. Additionally, defining constants for `data-test-id` values makes the test code more readable and maintainable.

Example file tree with `selectors.ts`:

```
├── Domains
    ├── selectors.ts
    ├── Domains.module.scss
    ├── Domains.tsx
    └── index.ts
```

Example usage of `data-test-id` attribute:

```
<main className={styles.Main} data-test-id={selectors.domainsContainer}>
```

Example usage of selectors in our test files:

```
import * as domainsPageSelectors from '../../src/pages/Domains/selectors';

cy.get(getByDataTestId(domainsPageSelectors.domainsContainer)).should(
			'be.visible',
		);
```

#### Custom Commands

Custom commands can be found in `cypress/support/commands.ts`.

The commands are configured and exported from `cypress/support/e2e.ts` which acts as an `index.ts` file. If new custom commands are added to the `commands.ts` file, you will need to update `e2e.ts` with the new command.

Resource references:
[Synpress](https://github.com/Synthetixio/synpress)
[Cypress](https://docs.cypress.io/guides/overview/why-cypress/)
