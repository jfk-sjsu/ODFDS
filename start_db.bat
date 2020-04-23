docker build -t odfds_db db
docker run -p 3306:3306  -e MYSQL_ROOT_PASSWORD="example" odfds_db