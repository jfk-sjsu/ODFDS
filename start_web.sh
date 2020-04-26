#!/bin/bash
sudo docker build -t odfds_web .
sudo docker run -d -p 3000:3000 --name odfds_web odfds_web 
