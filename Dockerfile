# Use the official Node.js image with Alpine Linux as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Install the Nest CLI globally
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
