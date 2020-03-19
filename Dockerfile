FROM node:10
RUN npm install express
EXPOSE 3000/tcp 
ADD hello.js /
CMD node hello.js
