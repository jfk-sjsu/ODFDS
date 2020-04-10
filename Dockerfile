FROM node:10
RUN npm install express
RUN npm install mysql
EXPOSE 3000/tcp 
ADD node/* /
ADD hello.js /
CMD node hello.js
