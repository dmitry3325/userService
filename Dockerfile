FROM node:16-alpine as base
WORKDIR /app
COPY [ "package.json", "package-lock.json", "./"]

# Development only image
FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . /app/
CMD ["npm", "run", "start:dev"]

# Production and Stage image
FROM base as production
ENV NODE_ENV=production
RUN npm ci --production=false
COPY . /app/
RUN npm run build:prod
RUN find . -maxdepth 1 \( -iname '*.yml' -o -iname 'src' -o -iname 'Dockerfile' -o -iname 'tsconfig.json' \) -exec rm -rf {} \;
CMD [ "node", "dist/src/index.js" ]



