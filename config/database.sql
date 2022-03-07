CREATE DATABASE taskapp;

CREATE TABLE tasktable(
    task_id SERIAL PRIMARY KEY,
   tasks VARCHAR(255)
);

INSERT INTO tasktable(tasks) VALUES('first-task');