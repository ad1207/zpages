alter table company add column sub_domain varchar(100);
alter table lead_page add column slug varchar(350);
UPDATE lead_page lp SET slug=lower(replace (trim(lp.lead_page_name),' ','-' ));

--http://localhost:3000/blog/test2
--http://localhost:3000/view/b/test/test2

--http://localhost:3000/leads/test-thumbnail
--http://localhost:3000/view/lp/test/test-thumbnail
