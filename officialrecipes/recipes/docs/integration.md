# Ferdi Recipe Documentation / Overview

Recipes are responsible for providing the connection between the service itself (e.g. WhatsApp) and Ferdi, providing information like the number of current notifications or handling dark mode.

A Ferdi recipe is basically nothing else than a node module and is currently initialized on `dom-ready`. You access all of the [electron](http://electron.atom.io) modules as well.

> ℹ️ New to Ferdi recipes and Electron? Then we recommend you read Jake Lee's ["Super simple guide to adding a new Ferdi service recipe"](https://blog.jakelee.co.uk/super-simple-guide-to-adding-a-new-ferdi-service-recipe/) which gives you an easy step-by-step guide on how to create and publish your recipe!

> ℹ️ If you have any problems packaging your recipes, if you are inexperienced with the tools used or have any other problems, we are here to help! Just open a new issue at https://github.com/getferdi/recipes/issues/new and we can help you develop, test and publish your recipe and can package the recipe for you if you don't feel like you are able to.

> If you want to update an existing recipe, please refer to [updating.md](https://github.com/getferdi/recipes/blob/master/docs/updating.md) instead

## Table of Contents
- [Ferdi Recipe Documentation / Overview](#ferdi-recipe-documentation--overview)
  - [Table of Contents](#table-of-contents)
  - [Preparing](#preparing)
  - [Create a recipe](#create-a-recipe)
  - [Recipe structure](#recipe-structure)
    - [package.json](#packagejson)
    - [index.js](#indexjs)
    - [webview.js](#webviewjs)
  - [Icons](#icons)
  - [Dark Mode](#dark-mode)
  - [Debugging](#debugging)
  - [Publishing](#publishing)

## Preparing
Before you can begin, you should have [NodeJS](http://nodejs.org/) installed and should be familiar with using npm, specifically "npm install" and "npm run".

You should also have basic knowledge of JavaScript - don't worry, you'll really only need some basic commands as we've already prepared the complicated stuff for you.

## Create a recipe
1. Clone this repository. You can do this by running `git clone https://github.com/getferdi/recipes.git` in your terminal or by downloading the repository from <https://github.com/getferdi/recipes/archive/master.zip>.
2. Install its dependencies via the terminal:
```Bash
cd scripts/
npm install
```
3. You can now run our automatic recipe wizard that creates and opens the new recipe for you:
```Bash
# Make sure you are still in the scripts/ folder
npm run create "Service Name"
```
Replace `Service Name` with the name of your service, e.g. `npm run create "Google Hangouts"`.
This command will automatically create the development recipe in the correct folder, prepares it for your service and opens the new recipe in your file explorer or Finder.
4. Reload Ferdi (`CMD/CTRL + SHIFT + R`) in order for it to register the new recipe

## Recipe structure
Every recipe needs a specific file structure in order to work as a Ferdi recipe

* icon.svg - Icon for the service in SVG form
* icon.png - Icon for the service in PNG form (1024x1024px)
* index.js - Backend script, this script is NOT included in the service webview but only in Ferdi itself
* package.json - Information about the recipe
* webview.js - Frontend script, this script is injected into the service itself but still has access to all NodeJS APIs
* darkmode.css - CSS File that gets included when dark mode is activated

### package.json
The package.json is structured like any other node module and allows to completely configure the service.

```json
{
  "id": "tweetdeck",
  "name": "Tweetdeck",
  "version": "1.0.1",
  "description": "Tweetdeck",
  "main": "index.js",
  "author": "Stefan Malzner <stefan@adlk.io>",
  "license": "MIT",
  "repository": "https://github.com/meetfranz/recipe-tweetdeck",
  "config": {
    "serviceURL": "https://tweetdeck.twitter.com/"
  }
}
```

To get more information about all the provided configuration flags, check the [config docs](configuration.md).

Please note that the fields `id`, `name`, `version` and `config` and required.


### index.js
This is your "backend" code. Right now the options are very limited and most of the services don't need a custom handling here. If your service is relatively straight forward and has a static URL eg. _messenger.com_, _`[TEAMID]`.slack.com_ or _web.skype.com_ all you need to do to return the Ferdi Class:

```js
module.exports = Ferdi => Ferdi;
```

If your service can be hosted on custom servers, you can validate the given URL to detect if it's your server and not e.g. google.com. To enable validation you can override the function `validateServer`
```js
// RocketChat integration
module.exports = Ferdi => class RocketChat extends Ferdi {
  async validateUrl(url) {
    try {
      const resp = await window.fetch(`${url}/api/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();

      return Object.hasOwnProperty.call(data, 'version');
    } catch (err) {
      console.error(err);
    }

    return false;
  }
};
```

`validateServer` needs to return a [`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), otherwise validation will fail.



By default, Ferdi's user agent looks like this:
```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.141 Safari/537.36 Ferdi/5.4.4-beta.3 (Electron 8.1.1)
```

Some services may not be compatible with Ferdi adding it's signature to the user agent.

If you encounter such a service, you remove this signature with the following snippet of code

```
overrideUserAgent() {
  return window.navigator.userAgent.replace(
    /(Ferdi|Electron)\/\S+ \([^)]+\)/g,
    ""
  );
}
```

If you want to change the user agent to a different one, you can simply return the String for the new user agent:

```
overrideUserAgent() {
  return "Mozilla/2.02Gold (Win95; I)";
}
```

### webview.js
The webview.js is the actual script that will be loaded into the webview. Here you can do whatever you want to do in order perfectly integrate the service into Ferdi. For convenience, we have provided a very simple set of functions to set unread message badges (`Ferdi.setBadge()`) and inject CSS files (`Ferdi.injectCSS()`).


```js
// orat.io integration
module.exports = (Ferdi) => {
  function getMessages() {
    let direct = 0;
    let indirect = 0;
    const FerdiData = document.querySelector('#FerdiMessages').dataset;
    if (FerdiData) {
      direct = FerdiData.direct;
      indirect = FerdiData.indirect;
    }

    Ferdi.setBadge(direct, indirect);
  }

  Ferdi.loop(getMessages);
}
```

To get more information about the provided functions, check the [API docs](frontend_api.md).

## Icons
In order to show every service icon crystal clear within the Ferdi UI, we require a .svg and .png in 1024x1024px.

## Dark Mode
You can provide a custom Dark Mode Theme for your recipes just by putting the `darkmode.css` into your recipe folder. Once the `darkmode.css` exists, you can enable the Dark Mode in your service settings.

Recipe Dark Mode is only supported by Ferdi 5.0.0-beta.19+

## Debugging
In order to debug your service integration, open Ferdi and use the shortcut `Cmd/Ctrl+Alt+Shift+i` to open the recipes developer tools.

## Publishing
Ferdi uses its recipe repository at <https://github.com/getferdi/recipes> to publish recipes to all clients.

> Our scripts are designed to work best on Linux and macOS systems. If you want to use these scripts on Windows, you may need to use [WSL](https://docs.microsoft.com/en-US/windows/wsl/install-win10) in order for the scripts to function correctly. If you have problems with packaging, please open a new issue at https://github.com/getferdi/recipes/issues/new and we can package your recipe for you.

To add your own recipe to the repository:
- If you already uploaded the recipe to GitHub:
  1. Fork https://github.com/getferdi/recipes and clone it to your computer
  2. Open a terminal in the `scripts/` folder of that repository
  3. Run `npm install` to install all dependencies
  4. Run `npm run github [GitHub URL]`, e.g. `npm run github https://github.com/vantezzen/franz-recipe-standardnotes`, to add your new recipe
  5. Create a PR to <https://github.com/getferdi/recipes> with your new changes

- If you don't have it uploaded it GitHub:
  ℹ️ We recommend uploading your recipes to GitHub before adding them to provide a platform for users to report issues.
  1. Fork https://github.com/getferdi/recipes and clone it to your computer
  2. Copy your recipe files into `scripts/recipe_src`
  3. Open a terminal at `scripts/`
  4. Run `npm install` to install all dependencies
  5. Run `npm run package` to package your new recipe
  6. Create a PR to <https://github.com/getferdi/recipes> with your new changes
