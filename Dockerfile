FROM node:10
RUN npm install express
RUN npm install body-parser
RUN npm install cookie-parser
RUN npm install express-session
RUN npm install mysql
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
