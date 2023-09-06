import Link from "next/link";
import styles from "../styles/blog-format/format0.module.scss";

const Model = ({ blog_format, blogs }) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.links_categories}>
					<div className={styles.categories}>
						<div className={styles.title}>Blogs</div>
						<ul className={styles.list}>
							<li className={styles.list_items}>
								<div className={styles.list_links}>
									<Link href='/' >
										New
											</Link>
								</div>
							</li>
							<li className={styles.list_items}>
								<div className={styles.list_links}>
									<Link href='/' >
										Popular
									</Link>
								</div>
							</li>
							<li className={styles.list_items}>
								<div className={styles.list_links}>
									<Link href='/'>
										Ebooks
									</Link>
								</div>
							</li>
							<li className={styles.list_items}>
								<div className={styles.list_links}>
									<Link href='/'>
										Reading Lists
										</Link>
								</div>
							</li>
							<li className={styles.list_items}>
								<div className={styles.list_links}>
									<Link href='/' >
										Topics
										</Link>
								</div>
							</li>
							<li className={styles.list_items}>
								<div className={styles.list_links}>
									<Link href='/' >
										Featured
									</Link>
								</div>
							</li>
						</ul>
						<div className={styles.search}>
							<div className={styles.search_title}>Search</div>
							<input type='text' className={styles.search_input} placeholder="Try 'freelance'" />
						</div>
					</div>
					<div className={styles.links}>
						<div className={styles.btn}>
							<div style={{ color: 'white' }}>
								<Link href='/'>
									Get started now
								</Link>
							</div>
						</div>
						<div className={styles.links_icons}>
							<div className={styles.twitter_link}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 203.18' fill='currentColor'>
									<g>
										<g>
											<path d='M78.62,203.18C173,203.18,224.56,125,224.56,57.24q0-3.33-.15-6.63A104.24,104.24,0,0,0,250,24.05a102.11,102.11,0,0,1-29.46,8.08A51.52,51.52,0,0,0,243.1,3.76a103.15,103.15,0,0,1-32.57,12.45A51.34,51.34,0,0,0,123.12,63,145.59,145.59,0,0,1,17.4,9.39,51.33,51.33,0,0,0,33.28,77.87a50.87,50.87,0,0,1-23.23-6.42c0,.22,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.29,51.42,51.42,0,0,1-23.17.88,51.34,51.34,0,0,0,47.92,35.62,102.91,102.91,0,0,1-63.7,22A105.19,105.19,0,0,1,0,180.14a145.17,145.17,0,0,0,78.62,23'></path>
										</g>
									</g>
								</svg>
							</div>
							<div className={styles.linkedin_link}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
									<g>
										<g>
											<path
												className={styles.cls_1}
												d='M19,0H5A5,5,0,0,0,0,5V19a5,5,0,0,0,5,5H19a5,5,0,0,0,5-5V5A5,5,0,0,0,19,0ZM8,19H5V8H8ZM6.5,6.73A1.77,1.77,0,1,1,8.25,5,1.75,1.75,0,0,1,6.5,6.73ZM20,19H17V13.4c0-3.37-4-3.12-4,0V19H10V8h3V9.77c1.4-2.59,7-2.78,7,2.47Z'></path>
										</g>
									</g>
								</svg>
							</div>
							<div className={styles.instagram_link}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
									<path d='M20.947,8.305c-0.011-0.757-0.151-1.508-0.419-2.216c-0.469-1.209-1.424-2.165-2.633-2.633 c-0.699-0.263-1.438-0.404-2.186-0.42C14.747,2.993,14.442,2.981,12,2.981s-2.755,0-3.71,0.055 c-0.747,0.016-1.486,0.157-2.185,0.42C4.896,3.924,3.94,4.88,3.472,6.089C3.209,6.788,3.067,7.527,3.053,8.274 c-0.043,0.963-0.056,1.268-0.056,3.71s0,2.754,0.056,3.71c0.015,0.748,0.156,1.486,0.419,2.187 c0.469,1.208,1.424,2.164,2.634,2.632c0.696,0.272,1.435,0.426,2.185,0.45c0.963,0.043,1.268,0.056,3.71,0.056s2.755,0,3.71-0.056 c0.747-0.015,1.486-0.156,2.186-0.419c1.209-0.469,2.164-1.425,2.633-2.633c0.263-0.7,0.404-1.438,0.419-2.187 c0.043-0.962,0.056-1.267,0.056-3.71C21.003,9.572,21.003,9.262,20.947,8.305z M11.994,16.602c-2.554,0-4.623-2.069-4.623-4.623 s2.069-4.623,4.623-4.623c2.552,0,4.623,2.069,4.623,4.623S14.546,16.602,11.994,16.602z M16.801,8.263 c-0.597,0-1.078-0.482-1.078-1.078s0.481-1.078,1.078-1.078c0.595,0,1.077,0.482,1.077,1.078S17.396,8.263,16.801,8.263z'></path>
									<circle cx='11.994' cy='11.979' r='3.003'></circle>
								</svg>
							</div>
							<div className={styles.fb_link}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1017.78' fill='currentColor'>
									<g>
										<g>
											<path
												className={styles.cls_1}
												d='M1024,512C1024,229.23,794.77,0,512,0S0,229.23,0,512c0,255.55,187.23,467.37,432,505.78V660H302V512H432V399.2C432,270.88,508.44,200,625.39,200c56,0,114.61,10,114.61,10V336H675.44c-63.6,0-83.44,39.47-83.44,80v96H734L711.3,660H592v357.78C836.77,979.37,1024,767.55,1024,512Z'></path>
										</g>
									</g>
								</svg>
							</div>
							<div className={styles.tiktok_link}>
								<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
									<path d='M10.2646 8.93775V13.0627C9.76749 12.9259 9.24728 12.9072 8.74232 13.0081C8.23736 13.109 7.76053 13.327 7.34696 13.6459C6.93339 13.9648 6.59362 14.3765 6.35269 14.8508C6.11177 15.325 5.97583 15.8496 5.95489 16.386C5.9266 16.8478 5.99331 17.3106 6.15052 17.7433C6.30774 18.176 6.55182 18.5686 6.86637 18.8946C7.18092 19.2206 7.55865 19.4726 7.97419 19.6335C8.38973 19.7945 8.83345 19.8607 9.27553 19.8278C11.7292 19.8278 12.5962 18.0277 12.5962 16.3395V0H16.5022C17.1666 4.31475 19.2317 5.316 22 5.77875V9.91275C22 9.91275 18.716 9.669 16.6128 8.013V16.1797C16.6107 19.875 14.5126 24 9.30498 24C4.47235 24 2 19.725 2 16.1415C2.03081 15.0798 2.27683 14.037 2.72184 13.0818C3.16684 12.1266 3.80071 11.2808 4.58166 10.6001C5.3626 9.91936 6.27288 9.41925 7.25245 9.13272C8.23203 8.84618 9.25865 8.77973 10.2646 8.93775V8.93775Z'></path>
								</svg>
							</div>
						</div>
					</div>
					<div className={styles.hashtag}>#MadeWith#Webb</div>
				</div>

				<div className={styles.main_content}>
					<div className={styles.getStarted_wrapper}>
						<div className={styles.get_started}>
							<div className={styles.getStarted_btn}>
								<span style={{ fontWeight: 400 }}>Get started</span>{`- it's free`}
							</div>
						</div>
					</div>
					<div className={styles.blog_section}>
						<div className={styles.new_blogs}>
							<div className={styles.new_text}>
								<div className={styles.new_title}>New</div>
								<div className={styles.all_new}>ALL NEW</div>
							</div>
							<div className={styles.new_cards}>
								<div className={styles.new_cards_left}>
									<div className={styles.new_card1}>
										<div className={`${styles.new_card1_img} ${styles.img} `}></div>
										<div className={styles.card_title}></div>
										<div className={styles.category}></div>
									</div>
								</div>
								<div className={styles.new_cards_right}>
									<div className={`${styles.new_card_right1} ${styles.card}`}>
										<div className={styles.img}></div>
										<div className={styles.card_title}></div>
										<div className={styles.category}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Model;