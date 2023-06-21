#== CONFIGURE ==#

# Use a node
FROM node:16-alpine as builder

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY yarn.lock ./
COPY . .

# Install NGINX
# RUN apt-get update && apt-get install -y nginx
RUN apk update && apk add nginx

# Install dependencies (npm ci makes sure the exact versions in the lockfile get installed)
RUN yarn install --frozen-lockfile

# Build the app
RUN npm run build-prod

# Use an official NGINX runtime as the base image
FROM nginx:1.21.0-alpine as production

# Set the env to "production"
ENV NODE_ENV production

# Copy the built React app to the NGINX web root directory from 'builder'
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the NGINX configuration file to the container
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Set the correct file permissions for the files in the /usr/share/nginx/html directory
RUN chmod -R 755 /usr/share/nginx/html

# Expose the port on which the app will be running
EXPOSE 3000

# # Start the app
# CMD ["npx", "serve", "build"]

# Start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]