import styles from "../../styles/blog-format/format0.module.scss";
import Image from "next/image";

const Format = ({ blog_format, blogs }) => {
	return (
		<div>
			<div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', backgroundColor: 'red' }}>
				<div>Menu</div>
				<div>blogs</div>
			</div>

			<div className={styles.container}>
				<div className={styles.list}>
					{!blogs.length && <div>No Blogs created</div>}
					{blogs.length > 0 &&
						blogs?.map((item, index) => {
							return (
								<div key={index} className={styles.list_blogs}>
									<div className={styles.thumbnail}>
										<Image src={item.thumbnail} height={155} width={180} alt="" />
										<div>{item.title}</div>
									</div>
									<div className={styles.footer}>
										<div>{item.name}</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Format;