# --- Installing stage
FROM node:12.16.2 AS installer

WORKDIR /usr/src/app

COPY package*.json ./
COPY frontend/package*.json ./frontend/
RUN npm install --unsafe-perm --quiet

# ---

# Building stage
FROM installer AS builder

## Workdir is shared between the stage so let's reuse it as we neeed the packages
WORKDIR /usr/src/app

COPY ./frontend frontend
COPY ./src src
COPY tsconfig.json .
RUN npm run build

# ---

# Running code under slim image (production part mostly)
FROM node:12.16.2-slim

## Clean new directory
WORKDIR /app

## Setup production ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

## Copy config files
COPY config ./config
COPY tsconfig.json ./
COPY tsconfig-paths-bootstrap.js ./

## Copy package jsons from installer
COPY --from=installer /usr/src/app/package*.json ./

## Copy built files from builder
COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/frontend/dist frontend/dist

RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     # We install Chrome to get all the OS level dependencies, but Chrome itself
     # is not actually used as it's packaged in the node puppeteer library.
     # Alternatively, we could could include the entire dep list ourselves
     # (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
     # but that seems too easy to get out of date.
     && apt-get install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

## Install only production dependencies
RUN npm install --quiet

EXPOSE 5500
CMD [ "npm", "run", "serve" ]
