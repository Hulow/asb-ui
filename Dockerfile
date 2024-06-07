FROM node:21-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY /var/www/shared/env/.env ./.env
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]