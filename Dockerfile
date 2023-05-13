FROM node:19.3.0-alpine
WORKDIR /opt/app
COPY package*.json ./
RUN npm install --only=production
ADD . .
RUN npm run build
CMD ["node", "./dist/main"]