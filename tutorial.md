
```bash
[workshop]$ npx create-nx-workspace --preset=angular
Need to install the following packages:
create-nx-workspace
Ok to proceed? (y) y
✔ Workspace name (e.g., org name)     · kramerlabs
✔ Application name                    · cognito-app
✔ Default stylesheet format           · scss
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No
```

Add Screenshots, create notes around structure and what we are doing

Now, we are going to jump right into aws, do instruction on aws accounts setup
Put some instructions on aws setup

Now, setup amplify

Docs for Angular Amplify UI Components
https://docs.amplify.aws/ui/q/framework/angular

First we need to install aws-amplify and @aws-amplify/ui-components

aws-amplify is a JavaScript library for Frontend and mobile developers building cloud-enabled applications.
@aws-amplify/ui-components is an Angular specific wrapper for @aws-amplify/ui-components

yarn add aws-amplify @aws-amplify/ui-angular

Now next in the UI docs

https://docs.amplify.aws/ui/auth/authenticator/q/framework/angular#installation

Copy the module, the component, and the template

not sure yet about password manager wrap????

We see it says to copy this:

```angular2html
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";

import {AmplifyUIAngularModule} from "@aws-amplify/ui-angular";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

@NgModule({
declarations: [AppComponent],
imports: [AmplifyUIAngularModule, BrowserModule],
providers: [],
bootstrap: [AppComponent],
})
export class AppModule {}
```

The above should all show up now BUT we you will notice here there is no import for `../aws-exports`
This is all because AWS is kinda forcing us to use all their stuff.. .which we don't want to do
After a lot of searching and reading up I found this


```angular2html
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);
```

https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource

replace the config with the file above substituting your credentials

Next I tried to run this `nx serve cognito-app` but there are a few problems we need to address.

First if you look in your console you'll see some error having to do with global.

First we need to add the following to `src/pollyfills.ts` to support `global` or `process` shims.
I like to put in comments as to where I found the info and why I made the changes so feel free to read up on the link in the comment below and/or to add it to your comments.


```angular2html
/**
* Added the following per
* https://docs.amplify.aws/start/getting-started/setup/q/integration/angular#create-a-new-angular-app
**/

(window as any).global = window;
(window as any).process = {
env: { DEBUG: undefined },
};

import 'core-js/es/typed-array';
import 'core-js/es/object';
```

add `"strictPropertyInitialization": false` under compilerOptions in tsconfig.base.json file

```angular2html
{
  "compileOnSave": false,
  "compilerOptions": {
    ...
    "strictPropertyInitialization": false
  },
  "exclude": ["node_modules", "tmp"]
}
```

In your console you may also see this error

```bash
./node_modules/crypto-js/core.js:43:22-39 - Warning: Module not found: Error: Can't resolve 'crypto' in '/Users/kramerkeller/Developer/workshop/kramerlabs/node_modules/crypto-js'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
- add a fallback 'resolve.fallback: { "crypto": require.resolve("crypto-browserify") }'
- install 'crypto-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
resolve.fallback: { "crypto": false }
```

Reference for fix: https://github.com/ChainSafe/web3.js/issues/4070

`npm install crypto-browserify`
`npm install stream-browserify`

add the following to tsconfig.json

```json
"compilerOptions": {
  ...
  "paths": {
    "crypto": ["./node_modules/crypto-browserify"],
    "stream": ["./node_modules/readable-stream"]
  }
},
```

You may see a bunch of warnings too, like this:

```bash
Warning: /Users/kramerkeller/Developer/workshop/kramerlabs/node_modules/amazon-cognito-identity-js/es/CognitoUser.js depends on 'crypto-js/core'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/kramerkeller/Developer/workshop/kramerlabs/node_modules/amazon-cognito-identity-js/es/CognitoUser.js depends on 'crypto-js/hmac-sha256'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/kramerkeller/Developer/workshop/kramerlabs/node_modules/amazon-cognito-identity-js/es/CognitoUser.js depends on 'crypto-js/lib-typedarrays'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

```

You can just supress them one by one in angular.json

```json
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "outputs": ["{options.outputPath}"],
          "options": {
            "allowedCommonJsDependencies": [
              "uuid",
              "lodash",
              "@aws-crypto/sha256-js",
              "buffer",
              "ulid",
              "@aws-crypto/sha256-browser",
              "fast-xml-parser",
              "@aws-crypto/crc32",
              "isomorphic-unfetch",
              "crypto-js/core",
              "crypto-js/hmac-sha256",
              "crypto-js/lib-typedarrays"
            ],
```
