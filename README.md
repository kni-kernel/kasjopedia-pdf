# kasjopeja-pdf

Cześć projektu tworząca pliki PDF zawierające SPZ. Napisane w Node.js oraz Vue.js.

# Wymagania

Node.js w wersji LTS, można również skorzystać z Docker'a.

# Environmental variables

Variable                                | Description
-----                                   | -----------
`APP_KOA_PORT`                          | Koa port
`APP_GRPC_PORT`                         | gRPC port

# Tasks

Variable            | Description
-----               | -----------
`build`             | Builds app to the `dist` folder
`prettier`          | Runs prettier and prettifies all files
`prettier-check`    | Check code style correctness by prettier
`servce`            | Runs `node dist/server.js`
`start`             | Run `npm run watch-server` with `local` NODE_ENV
`test`              | Runs tests
`watch-server`      | Runs server with `ts-node` and `nodemon` in watch mode

