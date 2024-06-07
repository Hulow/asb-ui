FROM node:21-alpine
WORKDIR /app
RUN ls -la /var/www/shared/env/
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]