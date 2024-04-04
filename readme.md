# Navin Thamindu Chandrasiri
## NIBM Index: COBSCCOMP4Y222-050
### CU Index: 13865911


### .env file should be added and the folowing values should be given

DB_HOST = *localhost
DB_USER = *admin
DB_PASSWORD = *sql_ps
DB_DATABASE= *sqldb-1

### SQL queries:
CREATE TABLE Weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(20),
    locid INT,
    lat FLOAT,
    lon FLOAT,
    humidity FLOAT,
    temperature FLOAT,
    airpressure FLOAT,
    content VARCHAR(20),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);


### sample post
{
    "location": "Colombo",
    "locid": 69,
    "lat": 6.9271,
    "lon": 79.8612,
    "humidity": 36,
    "temperature": 34.4,
    "airpressure": 68,
    "content": "Sunny"
}