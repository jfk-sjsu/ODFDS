FROM node:10
RUN npm install express
RUN npm install mysql
EXPOSE 3000/tcp 
CMD mkdir /node
CMD mkdir /html
CMD mkdir /DB
ADD node/* /node/
ADD html/* /html/
ADD db/* /db/
ADD hello.js /
CMD node hello.js
