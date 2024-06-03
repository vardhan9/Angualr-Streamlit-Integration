FROM node:12.13.0 as build

WORKDIR /angularFrontend

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install



COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/aftas-angular /usr/share/nginx/html

EXPOSE 80