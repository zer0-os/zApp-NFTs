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

You will need to follow the `Running Locally` instructions above in order to successfully run Cypress end to end specs. Once the zApp is running locally open another terminal window and enter the following command.

- `npm run cypress:run`

The above command will run the script - `env-cmd cypress run --browser chrome --headed`. This script is setting the browser to `chrome` and adds flag `--headed` which is required to work with the `synpress` package.

#### Browser Configuration

To change the browser used when running Cypress, you will be required to run the following command, replacing `[broswer of choice]` with your chosen browser e.g. `firefox`:

- `npx env-cmd cypress run --browser [broswer of choice] --headed`

Please note, a metamask extension for your chosen browser will be required to run the tests successfully - the recommended browser is `chrome`.

#### Debugging Failing Tests

Once the specs have finished running, Cypress will exit and the Cypress window will close.

To assist with debugging and find where find where a test is failing using the Cypress window, you can run a script with the `--no-exit` flag. First, identify which spec file is failing and include the file in the below command, replacing `[spec file path]`:

`npx env-cmd cypress run --browser chrome --headed "[spec file path]" --no-exit`

Example: `npx env-cmd cypress run --browser chrome --headed "cypress/e2e/connect_wallet.cy.ts" --no-exit`.
