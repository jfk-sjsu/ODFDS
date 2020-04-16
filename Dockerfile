FROM node:10
RUN npm install express
RUN npm install mysql
EXPOSE 3000/tcp 
CMD mkdir /media
ADD node/* /
ADD website/* /
ADD website/media/* /media/
ADD db/* /
ADD main.js /
CMD node main.js
