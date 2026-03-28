# Bai 01 - Image Optimization + Image Save Data (Node.js)

## 1) Toi uu hoa image (4-stage -> 2-stage -> 1 container)

Muc tieu:
- So sanh cach build image qua 3 Dockerfile.
- Runtime cuoi cung deu la 1 container.
- Danh gia kich thuoc image va su don gian khi deploy.

### Build images

```bash
docker build -f Dockerfile.4stage -t bai01/node-app:4stage .
docker build -f Dockerfile.2stage -t bai01/node-app:2stage .
docker build -f Dockerfile.1stage -t bai01/node-app:1stage .
```

### So sanh size

```bash
docker image ls bai01/node-app
```

Nhan xet mong doi:
- `2stage` gon hon `1stage`.
- `4stage` huu ich khi tach buoc test/dependency ro rang.
- Runtime van la 1 container khi `docker run`.

### Run image de demo

```bash
docker run --rm --name bai01-node -p 8080:8080 bai01/node-app:2stage
```

Tab terminal moi:

```bash
curl http://localhost:8080/health
```

---

## 2) Image Postgres -> insert data -> container -> image -> run lai con data

## Cach A (tot hon, reproducible): build seeded image

```bash
docker build -f Dockerfile.postgres-seeded -t bai01/postgres:seeded .
docker run --name pg-seeded -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=fooddb -p 5432:5432 -d bai01/postgres:seeded
```

Kiem tra data:

```bash
docker exec -it pg-seeded psql -U postgres -d fooddb -c "select * from menu_item;"
```

## Cach B (dung dung bai tap): insert roi commit container thanh image

Luu y quan trong:
- Image `postgres` mac dinh luu data trong volume, `docker commit` se khong gom du lieu volume.
- De demo "commit xong van con data", dat `PGDATA=/tmp/pgdata` de data nam trong filesystem container.

1. Run Postgres goc:

```bash
docker run --name pg-raw -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=fooddb -e PGDATA=/tmp/pgdata -p 5433:5432 -d postgres:16-alpine
```

2. Tao bang va chen du lieu:

```powershell
# doi DB san sang truoc khi psql
for ($i=0; $i -lt 30; $i++) { docker exec pg-raw pg_isready -U postgres *> $null; if ($LASTEXITCODE -eq 0) { break }; Start-Sleep -Seconds 1 }

docker exec -it pg-raw psql -U postgres -d fooddb -c "create table if not exists menu_item(id serial primary key, name varchar(120), price numeric(10,2));"
docker exec -it pg-raw psql -U postgres -d fooddb -c "insert into menu_item(name, price) values ('Mi xao bo', 55000), ('Banh mi trung', 25000);"
```

3. Commit container thanh image moi:

```bash
docker commit pg-raw bai01/postgres:committed
```

4. Xoa container cu, run container moi tu image committed:

```bash
docker stop pg-raw
docker rm pg-raw
docker run --name pg-from-commit -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=fooddb -e PGDATA=/tmp/pgdata -p 5434:5432 -d bai01/postgres:committed
```

5. Kiem tra data co con hay khong:

```bash
docker exec -it pg-from-commit psql -U postgres -d fooddb -c "select * from menu_item;"
```

Neu query tra ve data da insert, phan "image save data" dat yeu cau.

---

## 3) Danh sach anh chup de dua vao Word

1. Build 3 image (`4stage`, `2stage`, `1stage`).
2. Ket qua `docker image ls bai01/node-app`.
3. Ket qua `curl /health` tu container app.
4. Query data voi image seeded.
5. Quy trinh commit + query data tu image committed.

---

## 4) Ket luan (da doi chieu theo ket qua chay thuc te)

### 4.1 Ket qua toi uu image

Tu output da chay:
- `bai01/node-app:1stage` ~ 208MB (content size ~ 50.7MB)
- `bai01/node-app:2stage` ~ 198MB (content size ~ 49MB)
- `bai01/node-app:4stage` ~ 198MB (content size ~ 49MB)

Nhan xet:
- `2stage` va `4stage` cho runtime gon hon `1stage`.
- `4stage` khong nho hon `2stage` trong case nay, nhung ro rang hon khi can tach bien test/deps/build.
- Runtime thuc te van la 1 container, endpoint `/health` tra ve `200 OK`.

### 4.2 Ket qua image save data voi Postgres

- Cach A (seeded image) thanh cong: run container moi va query `menu_item` ra data.
- Cach B (commit) can luu y volume:
	- Neu dung `PGDATA` mac dinh (thu muc volume), `docker commit` khong gom du lieu DB.
	- Khi dat `PGDATA=/tmp/pgdata` (filesystem container), commit xong run image moi van query ra data.

### 4.3 Ket luan thiet ke

- Chon `2-stage` la can bang tot cho Node.js (gon + don gian + de bao tri).
- Dung `4-stage` khi can policy CI/CD nghiem ngat (tach test/security/lint ro rang).
- `docker commit` phu hop demo hoc tap, khong phu hop production.
- Production nen dung migration/seed script + volume + backup/restore strategy.
