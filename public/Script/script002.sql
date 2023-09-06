CREATE TABLE template_group (
	id SERIAL PRIMARY KEY,
	name varchar(100),
	description varchar(300),
	status varchar(10),
	is_delete varchar(5),
	created_date timestamp,
	updated_date timestamp	
);

CREATE TABLE template_maping (
	temp_id bigint,
	group_id bigint,
	CONSTRAINT fk_tmaping_template FOREIGN KEY(temp_id) REFERENCES templates (id),
	CONSTRAINT fk_tmaping_tgroup FOREIGN KEY(group_id) REFERENCES template_group (id)
);

alter table templates  drop column category_id;


---
alter table custom_template add column name varchar(150);

-----
UPDATE custom_template
 set content='{"Header":{"section":"Header","status":"Active","content":[{"formDetail":{"name":"company","label":"Company","type":"text"},"type":"Head","value":"Aalam Info Solution","style":{"color":"blue","alignment":"center"}},{"formDetail":{"name":"content","label":"Content","type":"text-area"},"type":"Content","value":"styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it."},{"formDetail":{"name":"image","label":"Image","type":"image"},"type":"Content","value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg"},{"formDetail":{"name":"background","label":"BackGround","type":"image"},"type":"Content","value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg"}]},"Footer":{"status":"Active","content":[{"formDetail":{"name":"footer","label":"Footer","type":"text"},"value":"Copyrights Squapl digital media technologies1"}]}}';

-----
alter table custom_template add column content_clone jsonb;
update custom_template set content_clone = content;

UPDATE templates
 set content='{"Header":{"section":"Header","status":"Active","content":[{"formDetail":{"name":"company","label":"Company","type":"text"},"type":"Head","value":"Aalam Info Solution","style":{"color":"blue","alignment":"center"}},{"formDetail":{"name":"content","label":"Content","type":"text"},"type":"Content","value":"styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it."}]},"Footer":{"status":"Active","content":[{"formDetail":{"name":"content","label":"Content","type":"text"}}]}}' where id=16;

