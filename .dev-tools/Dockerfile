#Build environment
FROM node:14-alpine3.10

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set node in path
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy over dependencies
COPY package.json /usr/src/app/package.json
RUN yarn install

# Copy all project files over
COPY . /usr/src/app

EXPOSE 3000
EXPOSE 49153
