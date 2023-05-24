#== CONFIGURE ==#

# Use a node
FROM node:16-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY yarn.lock ./
COPY . .

# Install NGINX
RUN apt-get update && apt-get install -y nginx

# Install dependencies (npm ci makes sure the exact versions in the lockfile get installed)
RUN yarn install --frozen-lockfile

# Build the app
RUN npm run build-prod

# Set the env to "production"
ENV NODE_ENV production

# Use an official NGINX runtime as the base image
FROM nginx

# Copy the NGINX configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built React app to the NGINX web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which the app will be running
EXPOSE 80

# # Start the app
# CMD ["npx", "serve", "build"]

# Start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]