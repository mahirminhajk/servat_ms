# Stage 1: Development
FROM node:alpine AS dev

# set working directory
WORKDIR /app

# copy package.json and install dependencies
COPY package.json ./
COPY tsconfig.json ./

RUN npm install --only=production

# copy the entire project
COPY src ./src

# create a dist folder and an empty index.js file
# This is because i am using 'tsc --watch & node -watch dist/index.js' to run the project in the local environment
# this cause a error, were tsc is not able build the project before node run the dist/index.js file,
# which cause a error because the file does not exist, so i am creating a empty file to avoid this error
RUN mkdir -p dist && touch dist/index.js

# start the application in development mode
CMD ["npm", "run", "dev"]

# Stage 2: Production
FROM node:alpine AS prod

# set working directory
WORKDIR /app

# copy package.json and install dependencies
COPY package.json ./
COPY tsconfig.json ./

RUN npm install --only=production

# copy the entire project
COPY src ./src

# build the application
RUN npm run build

# start the application in production mode
CMD ["npm", "start"]