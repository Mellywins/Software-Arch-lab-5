FROM node:14.16.1-alpine3.11 As development

LABEL maintainer="oussama.zouaghi@insat.ucar.tn"

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install 
ENV PORT=8080
COPY . .

RUN npm run build
CMD npm run start:dev
