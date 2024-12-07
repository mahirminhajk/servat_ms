# User Service - Servat

## PgSQL

- run the pg in docker
```bash
docker run --name postgres-server -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
```

- connect to the pg
```bash
docker exec -it postgres-server psql -U admin -d mydb
```

- basic game in pg
```bash
\c mydb # connect to the db
\l # list all db
\dt # list all tables in current db
\d customers # describe the table
\q # quit

SELECT * FROM customers; # select all from customers
SELECT * FROM customers WHERE name='John Doe'; # select a row

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(100)
); # create a table

INSERT INTO customers (name, email, phone) VALUES ('John Doe', 'example@example.com', '123-456-7890'); # insert a row

UPDATE customers SET name='Jane Doe1' WHERE id = 1; # update a row

DELETE FROM customers WHERE id = 1; # delete a row

DROP TABLE customers; # delete a table

```