FROM node:lts-alpine
LABEL maintainer="Mrityunjay.Mukherjee@gmail.com"
# Timezone
#RUN apk add --no-cache tzdata util-linux
#ENV TZ=Asia/Kolkata
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# update npm
RUN npm install npm@latest -g
RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
COPY . .
EXPOSE 5000
ENV PORT 5000
CMD [ "npm","start" ]
