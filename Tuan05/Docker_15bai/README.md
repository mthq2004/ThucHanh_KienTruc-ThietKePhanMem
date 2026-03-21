# Docker Compose 15 Bai

## Cach chay chung
1. Di chuyen vao thu muc bai:
   - `cd BaiXX_*`
2. Chay docker compose:
   - `docker compose up -d --build`
3. Dung:
   - `docker compose down`

## Danh sach bai
- Bai01_Nginx_Compose: Nginx map host 8080 -> container 80
- Bai02_MySQL_Compose: MySQL 8.0, db=mydb, user=user, password=password
- Bai03_MySQL_PHPMyAdmin: MySQL + PHPMyAdmin (host 8081)
- Bai04_Node_Express: Node.js Express app (host 3000)
- Bai05_Redis: Redis (host 6379)
- Bai06_WordPress_MySQL: WordPress + MySQL (host 8082)
- Bai07_Mongo_MongoExpress: MongoDB + Mongo Express (host 8084)
- Bai08_Node_MySQL: Node.js ket noi MySQL (host 3001)
- Bai09_Python_Flask: Flask app (host 5000)
- Bai10_MySQL_Volume: MySQL + volume luu du lieu
- Bai11_Postgres_Adminer: PostgreSQL + Adminer (host 8083)
- Bai12_Prometheus_Grafana: Prometheus + Grafana + Node Exporter
- Bai13_React_Nginx: React app build voi Vite, serve boi Nginx (host 8085)
- Bai14_Private_Network: 2 container trong private network
- Bai15_Redis_Resource_Limits: Redis gioi han CPU/RAM

## Port summary
- 8080: Bai01 Nginx
- 8081: Bai03 PHPMyAdmin
- 8082: Bai06 WordPress
- 8083: Bai11 Adminer
- 8084: Bai07 Mongo Express
- 8085: Bai13 React/Nginx
- 3000: Bai04 Node Express
- 3001: Bai08 Node + MySQL
- 3002: Bai12 Grafana
- 5000: Bai09 Flask
- 6379: Bai05 Redis
- 6380: Bai15 Redis
- 9090: Bai12 Prometheus
- 9100: Bai12 Node Exporter
