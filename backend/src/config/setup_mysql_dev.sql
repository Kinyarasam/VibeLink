-- This script prepares a MySQL servr for the project
-- Create project testing database with the name : vibelink_dev_db
CREATE DATABASE IF NOT EXISTS vibelink_dev_db ;
-- Create a new user named : vibelink_dev with all priveledges on the db vibelink_dev_db
-- with the password : vibelink_dev_pwd if it doesn't exist
CREATE USER IF NOT EXISTS 'vibelink_dev'@'localhost' IDENTIFIED BY 'vibelink_dev_pwd';
-- Granting all priviledges to the new user
GRANT ALL PRIVILEGES ON vibelink_dev_db.* TO 'vibelink_dev'@'localhost';
FLUSH PRIVILEGES;
-- Granting the SELECT priviledge for the user vibelink_dev in the db performance_schema
GRANT SELECT ON performance_schema.* TO 'vibelink_dev'@'localhost';
FLUSH PRIVILEGES;
