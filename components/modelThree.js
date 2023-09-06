import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/blog-format/format3.module.scss';

const Format3 = ({ blog_format, blogs, categories, data }) => {
	console.log('check blog  data----->1', blogs[0]);

	console.log('check data filtered data----->', data[0]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.secondary_heading}>ATLASSIAN</div>
					<div className={styles.primary_heading}>WORK LIFE</div>
					<div>
						<Link href="#">{'Product & News ->'}</Link>
					</div>
				</div>
				<div className={styles.categories}>
					{data.map(({ category }, index) => {
						if (index < 6)
							return (
								<div key={index} className={styles.cat_head}>
									{category.name}
								</div>
							);
					})}
				</div>
				<div className={styles.blogs_view}>
					<div className={styles.border}>
						<div className={styles.main_blog}>
							<Image
								src="https://res.cloudinary.com/sanjayaalam/image/upload/v1636976325/flow1_awvs1s.png"
								width="785px"
								height="400px"
								alt=""
								className={styles.main_img}
							/>
							<div className={styles.main_content}>
								<div className={styles.main_title}>
									The new rules of building business relationships virtually
								</div>
								<div className={styles.main_desc}>
									To navigate the realities of building rapport in a virtual-first world, remember
									“the three Rs.”
								</div>
							</div>
						</div>
					</div>
					<div className={styles.sub_content}>
						{categories.map((cat, index) => {
							if (index < 4)
								return (
									<div className={styles.sub_category} key={index}>
										<Image
											src="https://res.cloudinary.com/sanjayaalam/image/upload/v1636980147/cat1_p4e4u9.jpg"
											width="100px"
											height="100px"
											alt=""
											className={styles.main_img}
										/>
										<div className={styles.sub_category_content}>
											<div className={styles.category_head}>{cat.name}</div>
											<div>5 employee engagement ideas that build authentic connections</div>
										</div>
									</div>
								);
						})}
					</div>
				</div>
				<div>
					<div className={styles.heading} style={{ paddingBottom: '20px' }}>
						LATEST STORIES
					</div>
					<div className={styles.blog_list}>
						{data.map((d, index) => {
							let { blog, category } = d;
							if (index < 6)
								return (
									<div className={styles._blog_view}>
										<Image
											src="https://res.cloudinary.com/sanjayaalam/image/upload/v1636981721/blog1_eepo2h.jpg"
											className={styles.main_img}
											width="425px"
											height="300px"
											alt=""
										></Image>
										<div className={styles.blog_heading}>
											{blog?.title === undefined
												? 'The new rules of building business relationships virtually'
												: blog?.title}
										</div>
										<div className={styles.blog_description}>
											BWork friends are great, but they&apos;re not always enough. Here&aops;s our
											prescription for getting targeted professional support.
										</div>

										<div className={styles.blog_footer}>
											<div> {`by ${blog?.author === undefined ? 'test' : blog?.author}`}</div>
											<div>
												in <span className={styles.category_head}> {category.name}</span>
											</div>
										</div>
									</div>
								);
						})}
					</div>
				</div>
				<div>
					<div className={styles.heading} style={{ padding: '20px 0' }}>
						FEATURED COLLECTIONS
					</div>
					<div className={styles.featured_collection}>
						<div style={{ padding: '1rem' }}>
							<div className={styles.main_title}>Bring Your Full Self to Work</div>
							<div style={{ padding: '20px 0', fontSize: '18px' }}>
								Teams are made up of individuals, and they function best when each member is happy,
								healthy, and productive. These stories will show you how to grow your skills, make your
								own path, and become the best version of yourself.
							</div>
							<div className={styles.last}>
								<div className={styles.link}> see all stories in this collection </div>
							</div>
						</div>
						<div className={styles.blog_feature}>
							{blogs
								.filter((d) => d?.is_feature)
								.map((blog, index) => {
									if (index < 4)
										return (
											<div className={styles.blog_feature_view}>
												<Image
													src="https://res.cloudinary.com/sanjayaalam/image/upload/v1637134502/feature1_d1wud8.jpg"
													// className={styles.main_img}
													width="400px"
													height="150px"
													alt=""
												></Image>
												<div
													className={styles.blog_heading}
													style={{ padding: '10px', textAlign: 'center' }}
												>
													{blog?.title === undefined
														? 'The new rules of building business relationships virtually'
														: blog?.title}
												</div>
											</div>
										);
								})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Format3;
