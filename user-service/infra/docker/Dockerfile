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