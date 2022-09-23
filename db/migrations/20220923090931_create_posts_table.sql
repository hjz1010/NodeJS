-- migrate:up
CREATE TABLE posts (
    id       INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title    VARCHAR(100),
    content  VARCHAR(200),
    user_id  INT
);

-- migrate:down
DROP TABLE posts;
