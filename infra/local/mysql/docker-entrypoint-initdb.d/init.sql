create database main_db;

create database main_test_1;

create
  user 'pmm'@'%' identified by 'pass';

grant all
  on *.* to 'user'@'%';

grant all
  on *.* to 'pmm'@'%';
