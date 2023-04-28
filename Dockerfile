#== CONFIGURE ==#

# Use a node
FROM node:16-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY yarn.lock ./
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile get installed)
RUN yarn install --frozen-lockfile

# Build the app
RUN npm run build-prod

# Set the env to "production"
ENV NODE_ENV production

# Expose the port on which the app will be running
EXPOSE 3000

# Start the app
CMD ["npx", "serve", "build"]