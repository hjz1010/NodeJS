-- migrate:up
CREATE TABLE users (
    id       INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(20),
    email    VARCHAR(20),
    password VARCHAR(256)
)

-- migrate:down
DROP TABLE users
