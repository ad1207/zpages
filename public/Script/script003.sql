alter table blog add column publish_content jsonb;
	update blog set publish_content = body where published ='Y';
alter table blog add column content jsonb;


alter table blog rename column body to layout;
alter table blog alter column layout TYPE varchar(50);
 update blog set layout='classic';


 alter table blog add column is_author boolean;
alter table blog add column is_publish_date boolean;
alter table blog add column word_count varchar(10);
alter table blog add column read_time varchar(15);
update blog set is_author=false,is_publish_date=false;
