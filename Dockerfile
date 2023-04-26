#== CONFIGURE ==#

#Use a node

FROM node:16-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY yarn.lock ./
COPY . .
# === BUILD =====
#Install dependencies (npm ci makes sure he exact versions in the lockfile gets installed)
RUN yarn install --frozen-lockfile

#Build the app
RUN npm run build

# Set the env to "production"
ENV NODE_ENV production
# ENV REACT_APP_API_URL=https://project-consulting-backend.gentlebush-e24163a8.germanywestcentral.azurecontainerapps.io

# Expose the port on which the app will be runnong (3000 is the default that `serve` uses)
EXPOSE 3000

# Start the app 

CMD ["npx", "serve", "build"]
