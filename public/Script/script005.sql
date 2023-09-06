ALTER TABLE lead_page ALTER COLUMN company_id DROP NOT NULL;
ALTER TABLE lead_page ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE lead_page ALTER COLUMN updated_by DROP NOT NULL;

INSERT INTO "template" (template_name,status,template_id,is_delete,blocks,template_type,created_by,updated_by,"createdAt","updatedAt") VALUES 
('Classic','A','GnOiTVyZ_62','N','{"Footer": {"blocks": [{"value": "Copyrights Squapl digital media technologies1", "formDetail": {"name": "footer", "type": "text", "label": "Footer"}}], "status": "Active"}, "Header": {"blocks": [{"type": "Head", "style": {"color": "blue", "alignment": "center"}, "value": "Aalam Info Solution", "formDetail": {"name": "company", "type": "text", "label": "Company"}}, {"type": "Content", "value": "styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.", "formDetail": {"name": "content", "type": "text-area", "label": "Content"}}, {"type": "Content", "value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg", "formDetail": {"name": "image", "type": "image", "label": "Image"}}, {"type": "Content", "value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg", "formDetail": {"name": "background", "type": "image", "label": "BackGround"}}], "status": "Active", "section": "Header"}}',NULL,NULL,NULL,NULL,NULL)
;




update template  set blocks = '{"Footer":{"blocks":[{"value":"Copyrights Squapl digital media technologies1","formDetail":{"name":"footer","type":"text","label":"Footer"}}],"status":"Active"},"Header":{"blocks":[{"style":{"color":"blue","alignment":"center"},"value":"Aalam Info Solution","formDetail":{"name":"company","type":"text","label":"Company"}},{"value":"styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.","formDetail":{"name":"content","type":"text-area","label":"Content"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg","formDetail":{"name":"image","type":"image","label":"Image"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg","formDetail":{"name":"background","type":"image","label":"BackGround"}}],"status":"Active"}}';

alter table company rename column createddate to createdAt ;
alter table company rename column updateddate to updtaedAt
{
	"Footer": {
		"blocks": [
			{
				"value": "Copyrights Squapl digital media technologies1",
				"formDetail": {
					"name": "footer",
					"type": "text",
					"label": "Footer"
				}
			}
		],
		"status": "Active"
	},
	"Header": {
		"blocks": [
			{
				"style": {
					"color": "blue",
					"alignment": "center"
				},
				"value": "Aalam Info Solution",
				"formDetail": {
					"name": "company",
					"type": "text",
					"label": "Company"
				}
			},
			{
				"value": "styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.",
				"formDetail": {
					"name": "content",
					"type": "text-area",
					"label": "Content"
				}
			},
			{
				"value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg",
				"formDetail": {
					"name": "image",
					"type": "image",
					"label": "Image"
				}
			},
			{
				"value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg",
				"formDetail": {
					"name": "background",
					"type": "image",
					"label": "BackGround"
				}
			}
		],
		"status": "Active",
	}
}



update lead_page set blocks ='{"Hero":{"blocks":[{"value":"The company that can offer the whole package","formDetail":{"name":"title","type":"text","label":"Title"}},{"value":"The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.","formDetail":{"name":"content","type":"text","label":"Content"}},{"value":"https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350","formDetail":{"name":"background","type":"image","label":"BackGround"}}],"status":"Active"},"Footer":{"blocks":[{"value":"Copyrights Squapl digital media technologies1","formDetail":{"name":"footer","type":"text","label":"Footer"}}],"status":"Active"},"Header":{"blocks":[{"style":{"color":"blue","alignment":"center"},"value":"Hero page ghghgh","formDetail":{"name":"company","type":"text","label":"Company"}},{"value":"styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.","formDetail":{"name":"content","type":"text-area","label":"Content"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg","formDetail":{"name":"image","type":"image","label":"Image"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg","formDetail":{"name":"background","type":"image","label":"BackGround"}}],"status":"Active"},"Content":{"blocks":[{"value":"Aalam is a team of IT professionals who work together to offer the whole package.","formDetail":{"name":"title","type":"text","label":"Title"}},{"value":"The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.","formDetail":{"name":"content","type":"text","label":"Content"}}],"status":"Active"}}'


dinesh



update lead_page set blocks ='[{
		"Header": {
			"blocks": [{
				"style": {
					"color": "blue",
					"alignment": "center"
				},
				"value": "Hero page ghghgh",
				"formDetail": {
					"name": "company",
					"type": "text",
					"label": "Company"
				}
			}, {
				"value": "styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.",
				"formDetail": {
					"name": "content",
					"type": "text-area",
					"label": "Content"
				}
			}, {
				"value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg",
				"formDetail": {
					"name": "image",
					"type": "image",
					"label": "Image"
				}
			}, {
				"value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg",
				"formDetail": {
					"name": "background",
					"type": "image",
					"label": "BackGround"
				}
			}],
			"status": "Active"
		}
	},
	{
		"Hero": {
			"blocks": [{
				"value": "The company that can offer the whole package",
				"formDetail": {
					"name": "title",
					"type": "text",
					"label": "Title"
				}
			}, {
				"value": "The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.",
				"formDetail": {
					"name": "content",
					"type": "text",
					"label": "Content"
				}
			}, {
				"value": "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
				"formDetail": {
					"name": "background",
					"type": "image",
					"label": "BackGround"
				}
			}],
			"status": "Active"
		}
	},
	{

		"Content": {
			"blocks": [{
				"value": "Aalam is a team of IT professionals who work together to offer the whole package.",
				"formDetail": {
					"name": "title",
					"type": "text",
					"label": "Title"
				}
			}, {
				"value": "The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.",
				"formDetail": {
					"name": "content",
					"type": "text",
					"label": "Content"
				}
			}],
			"status": "Active"
		}
	},
	{
		"Footer": {
			"blocks": [{
				"value": "Copyrights Squapl digital media technologies1",
				"formDetail": {
					"name": "footer",
					"type": "text",
					"label": "Footer"
				}
			}],
			"status": "Active"
		}
	}
]'



---------------changes


update lead_page set blocks='[{"type":"Header","isDelete":false,"status":"Active","items":[{"style":{"color":"blue","alignment":"center"},"value":"Hero page ghghgh","formDetail":{"name":"company","type":"text","label":"Company"}},{"value":"styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.","formDetail":{"name":"content","type":"text-area","label":"Content"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg","formDetail":{"name":"image","type":"image","label":"Image"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg","formDetail":{"name":"background","type":"image","label":"BackGround"}}]},{"type":"Hero","isDelete":false,"status":"Active","items":[{"value":"The company that can offer the whole package","formDetail":{"name":"title","type":"text","label":"Title"}},{"value":"The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.","formDetail":{"name":"content","type":"text","label":"Content"}},{"value":"https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350","formDetail":{"name":"background","type":"image","label":"BackGround"}}]},{"type":"Content","isDelete":false,"status":"Active","items":[{"value":"Aalam is a team of IT professionals who work together to offer the whole package.","formDetail":{"name":"title","type":"text","label":"Title"}},{"value":"The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.","formDetail":{"name":"content","type":"text","label":"Content"}}]},{"type":"Footer","isDelete":false,"status":"Active","items":[{"value":"Copyrights Squapl digital media technologies1","formDetail":{"name":"footer","type":"text","label":"Footer"}}]}]'



---latest script 

update lead_page set blocks='[{"type":"Header","isDelete":false,"status":"Active","sectionStyle":{"backgroundColor":"#c8cabb","backgroundImage":null},"items":[{"value":"Hero page ghghgh","formDetail":{"name":"company","type":"text","label":"Company"},"style":{"color":"blue"}},{"value":"styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.","formDetail":{"name":"content","type":"text-area","label":"Content"},"style":{"color":"blue"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg","formDetail":{"name":"image","type":"image","label":"Image"},"style":{"color":"blue"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg","formDetail":{"name":"background","type":"image","label":"BackGround"},"style":{"color":"blue"}}]},{"type":"Hero","isDelete":false,"status":"Active","sectionStyle":{"backgroundColor":"#c8cabb","backgroundImage":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623819708/xyme8ab3uqkh4cqnqqd8.jpg"},"items":[{"value":"The company that can offer the whole package","formDetail":{"name":"title","type":"text","label":"Title"},"style":{"color":"blue"}},{"value":"The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.","formDetail":{"name":"content","type":"text","label":"Content"},"style":{"color":"blue"}},{"value":"https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350","formDetail":{"name":"background","type":"image","label":"BackGround"},"style":{"color":"blue"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg","formDetail":{"name":"button","type":"hyper-link","label":"view"},"style":{"color":"blue"}}]},{"type":"Content","isDelete":false,"status":"Active","sectionStyle":{"backgroundColor":"#c8cabb","backgroundImage":null},"items":[{"value":"Aalam is a team of IT professionals who work together to offer the whole package.","formDetail":{"name":"title","type":"text","label":"Title"},"style":{"color":"blue"}},{"value":"The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.","formDetail":{"name":"content","type":"text","label":"Content"},"style":{"color":"blue"}},{"value":"https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg","formDetail":{"name":"button","type":"hyper-link","label":"view"},"style":{"color":"blue"}}]},{"type":"Footer","isDelete":false,"status":"Active","sectionStyle":{"backgroundColor":"#c8cabb","backgroundImage":null},"items":[{"value":"Copyrights Squapl digital media technologies1","formDetail":{"name":"footer","type":"text","label":"Footer"},"style":{"color":"blue"}}]}]'



---latest script 2


update lead_page set blocks='[{"type":"Subscription","isDelete":false,"status":"Active","sectionStyle":{"backgroundColor":"#c8cabb","backgroundImage":null},"items":[{"value":"SPEAK LOUDLY \n SPEAK VISUALLY","formDetail":{"name":"title","type":"text","label":"Title"},"style":{"color":"black"}},{"value":"Receive practical tips on how to \n communicate visually, right in you \n inbox.","formDetail":{"name":"subTitle","type":"text","label":"SubTitle"},"style":{"color":"black"}}]}]' where id=10;


----thumbnail 
alter table lead_page add column thumbnail varchar(500);
update lead_page set thumbnail ='https://res.cloudinary.com/sanjayaalam/image/upload/v1633349662/C1/B1/gieglefcwr3iu1xzjkoo.png';

alter table template add column thumbnail varchar(500);
update template set thumbnail ='https://res.cloudinary.com/sanjayaalam/image/upload/v1633349662/C1/B1/gieglefcwr3iu1xzjkoo.png';

---template type 1
update "template" set blocks='[{"type": "Header", "items": [{"style": {"color": "blue"}, "value": "Hero page ghghgh", "formDetail": {"name": "company", "type": "text", "label": "Company"}}, {"style": {"color": "blue"}, "value": "styled-components utilises tagged template literals to style your components.It removes the mapping between components and styles. This means that when your defining your styles, your actually creating a normal React component, that has your styles attached to it.", "formDetail": {"name": "content", "type": "text-area", "label": "Content"}}, {"style": {"color": "blue"}, "value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg", "formDetail": {"name": "image", "type": "image", "label": "Image"}}, {"style": {"color": "blue"}, "value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623820202/ivlnvdazgtls0nimhxmp.jpg", "formDetail": {"name": "background", "type": "image", "label": "BackGround"}}], "status": "Active", "isDelete": false, "sectionStyle": {"backgroundColor": "#c8cabb", "backgroundImage": null}}, {"type": "Hero", "items": [{"style": {"color": "blue"}, "value": "The company that can offer the whole package", "formDetail": {"name": "title", "type": "text", "label": "Title"}}, {"style": {"color": "blue"}, "value": "The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.", "formDetail": {"name": "content", "type": "text", "label": "Content"}}, {"style": {"color": "blue"}, "value": "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350", "formDetail": {"name": "background", "type": "image", "label": "BackGround"}}, {"style": {"color": "blue"}, "value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg", "formDetail": {"name": "button", "type": "hyper-link", "label": "view"}}], "status": "Active", "isDelete": false, "sectionStyle": {"backgroundColor": "#c8cabb", "backgroundImage": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623819708/xyme8ab3uqkh4cqnqqd8.jpg"}}, {"type": "Content", "items": [{"style": {"color": "blue"}, "value": "Aalam is a team of IT professionals who work together to offer the whole package.", "formDetail": {"name": "title", "type": "text", "label": "Title"}}, {"style": {"color": "blue"}, "value": "The enterprise companies are looking for partner to design, develop and integrate systems to help them meet their business challenges with software. It is important for this company to be able to offer the whole package.", "formDetail": {"name": "content", "type": "text", "label": "Content"}}, {"style": {"color": "blue"}, "value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1623844291/u1jyrnzzcitxj1jynh33.jpg", "formDetail": {"name": "button", "type": "hyper-link", "label": "view"}}], "status": "Active", "isDelete": false, "sectionStyle": {"backgroundColor": "#c8cabb", "backgroundImage": null}}, {"type": "Footer", "items": [{"style": {"color": "blue"}, "value": "Copyrights Squapl digital media technologies1", "formDetail": {"name": "footer", "type": "text", "label": "Footer"}}], "status": "Active", "isDelete": false, "sectionStyle": {"backgroundColor": "#c8cabb", "backgroundImage": null}}]';

----template type 2
INSERT INTO "template" (template_name,status,template_id,is_delete,blocks,template_type,created_by,updated_by,"createdAt","updatedAt",thumbnail) VALUES 
('Classic Pro','A','GnOiTVyZ_=3','N','[{"type": "Subscription", "items": [{"style": {"color": "black"}, "value": "SPEAK LOUDLY \n SPEAK VISUALLY", "formDetail": {"name": "title", "type": "text", "label": "Title"}}, {"style": {"color": "black"}, "value": "Receive practical tips on how to \n communicate visually, right in you \n inbox.", "formDetail": {"name": "subTitle", "type": "text", "label": "SubTitle"}}, {"style": {"color": "blue"}, "value": "https://res.cloudinary.com/sanjayaalam/image/upload/v1635415879/hashtag_hrd9jj.png", "formDetail": {"name": "logo", "type": "image", "label": "Logo"}}], "status": "Active", "isDelete": false, "sectionStyle": {"backgroundColor": "#c8cabb", "backgroundImage": null}}]',NULL,NULL,NULL,NULL,NULL,'https://res.cloudinary.com/sanjayaalam/image/upload/v1635762670/thumbnail_gghnpy.png')
;


alter table lead_page add column published varchar(5);
update lead_page  set published ='N';