# Pagar.me's API Reference

> A API reference to help developers to build applications with payments

[![](https://farm2.staticflickr.com/1534/24963539843_e26a00b3e1_b.jpg)](https://circle-artifacts.com/gh/mapbox/docbox/38/artifacts/0/tmp/circle-artifacts.jMIoUkM/index.html#update-a-wobble)

**When you're ready to ship**, Docbox's `build` task minifies JavaScript and uses React's server rendering code to make documentation indexable for search engines and viewable without JavaScript.

## Writing Documentation

Documentation is written as Markdown files in the `content` directory, and is organized by the `custom/content.js` file - that file requires each documentation page and puts them in order.
## Customization

All custom code - code that relates to brands and specifics of APIs - is in the `./custom` directory. Content is [custom/content.js](custom/content.js) and brand names & tweaks are in [custom/index.js](custom/index.js), with inline documentation for both.

## Development

We care about the ease of writing documentation. This repo comes with batteries included: after you `npm install` the project, you can run `npm start` and its development server, [budo](https://github.com/mattdesl/budo), will serve the website locally and update automatically.

### Requirements

* Node v4 or higher
* NPM
* Git

To run the site locally:

1. Clone this repository
2. `git clone https://github.com/pagarme/api-reference.git`
2. `npm install`
3. `npm start`
4. Open http://localhost:9966/

## Tests

Tests cover both the source code of Docbox as well as the content in the `content/` directory.

To run tests:

1. Clone this repository
2. `git clone https://github.com/pagarme/api-reference.git`
2. `npm install`
3. `npm test`


## Deployment

The `npm run build` command builds a `bundle.js` file that contains all the JavaScript code and content needed to show the site, and creates an `index.html` file that already contains the site content. Note that this _replaces_ the existing `index.html` file, so it's best to run this only when deploying the site and to undo changes to `index.html` if you want to keep working on content.

1. Clone this repository
2. `git clone https://github.com/pagarme/api-reference.git`
2. `npm install`
3. `npm run build`

---

## License

Check [here](LICENSE).
