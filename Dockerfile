# Use an official Node.js image as the base
FROM node:23.7.0

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Run the command to start the app when the container launches
CMD ["npm", "run", "start"]
