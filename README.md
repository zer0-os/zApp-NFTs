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
