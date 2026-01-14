FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run pgen

# Build the NestJS application
RUN npm run build

# Command to run the application
CMD ["sh", "-c", "npm run db:deploy && node dist/src/main"]
