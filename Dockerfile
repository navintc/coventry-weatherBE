FROM --platform=linux/amd64 node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

ENV DB_HOST="weatherapp-do-user-16235658-0.c.db.ondigitalocean.com"
ENV DB_USER="doadmin"
ENV DB_PASSWORD="AVNS_Mo6xkK3R53DWegZKs5v"
ENV DB_NAME="defaultdb"
ENV DB_DIALECT=mysql+
ENV DB_PORT=25060

ENV REDIS_HOST='redis-11234.c11.us-east-1-3.ec2.cloud.redislabs.com'
ENV REDIS_PORT=11234
ENV REDIS_PW='adxjqug5fIDbUlKVDdTZHVlxz72uDXmJ'

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "node", "index.js" ]