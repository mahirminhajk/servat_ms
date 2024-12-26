# Stage 1: DEV
FROM node:alpine AS dev

# set working directory
WORKDIR /app

# copy package.json and install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./

# install pnpm
RUN npm install -g pnpm

# install dependencies
RUN pnpm install

# copy the entire project
COPY . .

# Expose the port the app runs in
EXPOSE 5173

# start the application in development mode
CMD ["npm", "run", "dev"]


# Stage 2: PROD
