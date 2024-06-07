FROM node:21-alpine
WORKDIR /app

RUN echo "Creating .env file..."
RUN cat /var/www/shared/env/.env > .env
RUN echo "Environment variables copied."

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]