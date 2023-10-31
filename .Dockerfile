FROM node:18
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 
RUN npm install pm2 -g
COPY . /app
EXPOSE 4000

CMD ["pm2-runtime", "app.js"]