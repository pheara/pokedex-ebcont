# Pokedex

A coding challenge using the REST-based [pokeapi](https://pokeapi.co/). The app uses react and [material-ui](https://material-ui.com/), written in typescript and build with [parcel](parceljs.org/). The code is linted and styled via `eslint` and `prettier`. If you want to make contribute, it is highly recommended to install the respective plugins for your editor, as there's a commit-hook that checks for adherance to the styles.

Installation: `npm install` or `./node_modules/.bin/yarn` (after the first install)

Watch: `npm run watch` or `./node_modules/.bin/yarn watch` => Starts a server at <http://localhost:1234/>

Clean: `npm run clean` or `./node_modules/.bin/yarn clean`

Run unit tests: `npm run test` or `./node_modules/.bin/yarn test`

Build for production: `npm run build` or `./node_modules/.bin/yarn build`

The build also generates a treemap of the dependencies' impact on bundle size in `dist/report.html`

Open issues can be seen and submitted at <https://github.com/pheara/pokedex-ebcont/issues>.

![Screenshot of the pokemon-list view](https://i.imgur.com/3NmsqXJ.png)

![Screenshot of the detail view for Gardevoir](https://i.imgur.com/f2wOFxe.png)
