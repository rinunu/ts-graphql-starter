create database main_db;

create database main_db_test;

create user 'pmm'@'%' identified by 'pass';

grant all
  on *.* to 'user'@'%';

grant all
  on *.* to 'pmm'@'%';
