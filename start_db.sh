#!/bin/bash
sudo docker rm odfds_db
sudo docker build -t odfds_db db
sudo docker run -d -p 3306:3306  -e MYSQL_ROOT_PASSWORD="example" --name odfds_db odfds_db
