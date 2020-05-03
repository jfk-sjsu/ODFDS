FROM node:10
RUN npm install express
RUN npm install body-parser
RUN npm install cookie-parser
RUN npm install express-session
RUN npm install mysql
RUN npm install --save request
RUN npm install @googlemaps/google-maps-services-js
RUN export GOOGLE_MAPS_API_KEY=AIzaSyB4lvECgdIAPYiYvTioiZ360vp_TmsGPsk
EXPOSE 3000/tcp
CMD mkdir /website
CMD mkdir /website/media
CMD mkdir /node
CMD mkdir /db
ADD node/* /node/
ADD website/* /website/
ADD website/media/* /website/media/
ADD db/* /db/
ADD main.js /
CMD node main.js
