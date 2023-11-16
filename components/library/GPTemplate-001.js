'use client'
import { ArrowForwardOutlined } from "@mui/icons-material";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./../../styles/components/Template1.module.scss"

const Template = () => {
	const left = useRef();
	const right = useRef();
	const rightCorner = useRef();
	const leftCorner = useRef();

	useEffect(() => {
		gsap.from(left.current, {
			duration: 1,
			ease: 'power1.out',
			y: -500,
		});
		gsap.from(right.current, {
			duration: 1,
			ease: 'power1.out',
			y: 500,
		});
		// gsap.to(leftCorner.current, {
		//     x: 180,
		//     delay: 1,
		//     duration: 1
		// });
		// gsap.to(rightCorner.current, {
		//     x: -180,
		//     delay: 2,
		//     duration: 1
		// });
	});

	return (
		<>
			<div className={styles.container}>
				<div className={styles.left} ref={left}>
					<div className={styles.content}>
						<div className={styles.title}>Robotics Experts & Our Automation Team</div>
						<div className={styles.description}>
							Vitae auctor eu augue ut. Vel pretium lectus quam id leo. Accumsanlacus vel facilisis
							volutpat.
						</div>
						<div style={{ paddingTop: '20px' }}>
							<Link href="/#" className={styles.link}>
								<span>
									Explore Now <ArrowForwardOutlined style={{ paddingTop: '10px' }} />
								</span>
							</Link>
						</div>
					</div>

					<div className={styles.left_corner} ref={rightCorner}>
						<Image
							src="https://res.cloudinary.com/sanjayaalam/image/upload/v1637326022/play-button_lqy4mb.png"
							alt=""
							className={styles.play_icon}
							width={50}
							height={50}
						/>
					</div>
				</div>
				<div className={styles.right} ref={right}>
					<Image
						src="https://images.unsplash.com/photo-1617777938240-9a1d8e51a47d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1031&q=80"
						alt=""
						className={styles.image}
						width={600}
						height={600}
					/>
					<div className={styles.right_corner} ref={rightCorner}>
						<div>Explore</div>
						<div className={styles.feature}>Our Feature</div>
						<a href="#">DownloadDoc</a>
					</div>
				</div>
			</div>
		</>
	);
};
export default Template;
