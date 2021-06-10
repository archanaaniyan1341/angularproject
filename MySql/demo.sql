create database demo1;
use demo1;
create table student(ID int primary key ,Name varchar(20) ,Stream varchar(20) ,Gender varchar(20) , Marks int);
insert into student values
(1,'Aranya','Science','F',100),
(2,'Ananya','Science','F',80),
(3,'Nandu','Commerce','M',100),
(4,'Varun','Science','M',90);
select * from student LIMIT 5;
select * from student ;

