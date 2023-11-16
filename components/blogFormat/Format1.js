import Image from "next/image";
import styles from "../../styles/blog-format/format1.module.scss"


const Format1 = ({ blog_format, blogs }) => {
	return (
		<div className={styles.container}>
			<div>
				<h1>Test render...</h1>
			</div>
			<div>{blog_format}</div>

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
	);
};

export default Format1;