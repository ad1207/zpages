'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Format1 = ({ blog_format, blogs }) => {
	const [isClicked, setisClicked] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.blog_page2}>
				<div className={styles.header}>
					<div className={styles.wrapper}>
						<div className={styles.logo}>
							<div className={styles.logo_img}>
								<Image
									src="https://crazyegg.com/blog/wp-content/themes/daily-egg-genesis/images/crazyegg_logo_blog.svg"
									width="250px"
									alt=""
									height="65px"
								></Image>
							</div>
						</div>
						<div className={styles.menu_wrapper}>
							<div
								className={styles.menu_logo}
								onClick={(e) => {
									setisClicked(!isClicked);
									e.preventDefault();
								}}
							>
								<Link href="/">
									<Image
										src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png"
										alt=""
										width="36px"
										height="36px"
									/>
								</Link>
							</div>
							{isClicked == true && (
								<div className={styles.menu}>
									<div className={styles.menuCategory}>All</div>
									<div className={styles.menuCategory}>Reviews</div>
									<div className={styles.menuCategory}>Marketing</div>
									<div className={styles.menuCategory}>Design</div>
									<div className={styles.menuCategory}>Website</div>
									<div className={styles.menuCategory}>Analytics</div>
									<div className={styles.menuCategory}>Copywriting</div>
									<div className={styles.menuCategory}>Social Media</div>
								</div>
							)}
						</div>
					</div>
					<div className={styles.headerWrapper}>
						<div className={styles.categories}>
							<div className={styles.category}>All</div>
							<div className={styles.category}>Reviews</div>
							<div className={styles.category}>Marketing</div>
							<div className={styles.category}>Design</div>
							<div className={styles.category}>Website</div>
							<div className={styles.category}>Analytics</div>
							<div className={styles.category}>Copywriting</div>
							<div className={styles.category}>Social Media</div>
						</div>
						<div className={styles.trial}>Free 30-Day Trial</div>
					</div>
				</div>
				<div className={styles.main_blog}>
					<Image
						src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2018/10/16102810/content-marketing-strategy-1.jpg"
						width="625px"
						height="350px"
						alt=""
						className={styles.main_img}
					/>
					<div className={styles.main_content}>
						<div className={styles.main_category}>Content Marketing</div>
						<div className={styles.main_title}>
							A Step-by-Step Guide to Develop a Content Marketing Strategy That Converts
						</div>
						<div className={styles.main_desc}>
							Your content marketing strategy influences how you reach your audience. If you don’t have a
							content strategy, now’s the time to create one. Many businesses feel overwhelmed about where
							to…
						</div>
						<div className={styles.main_author}>
							<Image
								src="https://secure.gravatar.com/avatar/8395a7bf041405fcfd48014270d4005f?s=96&d=mm&r=g"
								width="45px"
								height="45px"
								alt=""
								className={styles.main_author_img}
							/>
							<span style={{ marginLeft: '1rem' }}>Rithvik Sivadinesh</span>
						</div>
					</div>
				</div>
				<div className={styles.popular}>
					<div className={styles.popular_title}>Popular</div>
					<div className={styles.popular_blogs}>
						{blogs.length > 0 &&
							blogs?.map((item, index) => {
								return (
									<div key={index} className={styles.popular_blog}>
										<div className={styles.thumbnail}>
											<Image
												src={item.thumbnail}
												className={styles.popular_img}
												alt=""
												width="240px"
												height="125px"
											/>
											<div className={styles.popular_category}>Design</div>
											<div className={styles.popular_blog_title}>{item.title}</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
				<div className={styles.featuredWrapper}>
					<div className={styles.featured}>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
					</div>
					<div className={styles.featured}>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
					</div>
					<div className={styles.featured}>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
						<div className={styles.promotion_wrapper}>
							<div className={styles.promotion}>
								<div className={styles.promotion_title}>Make your website better. Instantly.</div>
								<div className={styles.promotion_desc}>
									Over <span className={styles.promotion_span}>300,000 websites use #webb</span> to
									create their own landing pages and blogs. And you should too.
								</div>
								<div className={styles.promotion_trial}>Free 30-Day Trial</div>
							</div>
						</div>
						<div className={styles.featured_blog}>
							<Image
								src="https://ceblog.s3.amazonaws.com/wp-content/uploads/2020/12/01094323/image3-1536x740.png"
								className={styles.featured_img}
								width="450px"
								alt=""
								height="200px"
							></Image>
							<div className={styles.featured_category}>Reviews</div>
							<div className={styles.featured_title}>Best Digital Marketing Services</div>
							<div className={styles.featured_desc}>
								Want to come in under budget and still crush your marketing goals for this quarter? You
								can easily do that starting today. How? By using…
							</div>
							<div className={styles.featured_featured}>Featured</div>
						</div>
					</div>
				</div>
				<div className={styles.category_grid}>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Featured</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Popular</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> IT</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Website</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Design</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Reviews</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Marketing</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Analytics</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
					<div className={styles.category_cell}>
						<div className={styles.cell_title}> Commerce</div>
						<div className={styles.cell_articles}>100 articles</div>
					</div>
				</div>
			</div>

			{/* <div className={styles.list}>
                {!blogs.length && <div>No Blogs created</div>}
                {blogs.length > 0 &&
                    blogs?.map((item, index) => {
                        return (
                            <div key={index} className={styles.list_blogs}>
                                <div className={styles.thumbnail}>
                                    <Image src={item.thumbnail} height='155px' width='180px' />
                                    <div>{item.title}</div>
                                </div>
                                <div className={styles.footer}>
                                    <div>{item.name}</div>
                                </div>
                            </div>
                        );
                    })}
            </div> */}
		</div>
	);
};

export default Format1;
