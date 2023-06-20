FROM node:18-alpine
#RUN npm i -g @nestjs/cli

WORKDIR /app

CMD npm install && npm run nodemon

#CMD npm install && npm run start:dev
