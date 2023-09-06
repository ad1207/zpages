alter table templates add column category_id bigint;
ALTER TABLE templates 
ADD FOREIGN KEY (category_id) REFERENCES categories (id);
