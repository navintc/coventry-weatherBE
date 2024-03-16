### .env file should be added and the folowing values should be given

DB_HOST = *localhost
DB_USER = *admin
DB_PASSWORD = *sql_ps
DB_DATABASE= *sqldb-1

### SQL queries:
CREATE TABLE Weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(20),
    locID INT,
    humidity FLOAT,
    temperature FLOAT,
    airPressure FLOAT,
    content VARCHAR(20),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);