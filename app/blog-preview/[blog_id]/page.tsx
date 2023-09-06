'use client'
import { getAllBlogs, getBlogByNanoId, getAllPublishedBlog } from "../../../service/blog.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { PhoneAndroid, TabletAndroid, DesktopWindows } from "@mui/icons-material";
import Image from "next/image";
import styles from '../../../styles/Blog.module.scss'

export const dynamicParams = false;

// export async function getStaticPaths() {
// 	let blogs = await getAllPublishedBlog();

// 	const paths = blogs.map((blog) => ({
// 		params: { blog_id: blog.blog_id.toString() },
// 	}));
// 	return { paths, fallback: false };
// }

// export async function generateStaticParams(){
//     let blogs = await getAllPublishedBlog();
//     const paths = blogs.map((blog) => (
//         { blog_id: blog.blog_id.toString() }
//     ));
//     console.log('paths --->', paths);
//     return paths;
// }

 export default function Page({ params }){
	const router = useRouter();
	const { blog_id } = params;
	const [value, setValue] = useState('laptop');
    // const value = 'laptop'
	const handleButton = (data) => {
		setValue(data);
	};

	return (
		<div className={styles.preview_wrap}>
			<div style={{ paddingLeft: '1rem', cursor: 'pointer' }}
             onClick={() => router.back()}
             >
				<span>
					<Image src='/static/images/back.svg' alt='edit' width={24} height={24} />
				</span>
				<span style={{ top: '-5px', position: 'relative' }}>Back</span>
			</div>
			<div className={styles.flex_center}>
				<div style={{ padding: '0 0.3rem' }}>
					<IconButton color='primary' id='mobile' 
                    onClick={(event) => handleButton('smartphone')}
                    >
						<PhoneAndroid />
					</IconButton>
				</div>
				<div style={{ padding: '0 0.3rem' }}>
					<IconButton color='primary' id='tablet'
                     onClick={(event) => handleButton('tablet')}
                     >
						<TabletAndroid />
					</IconButton>
				</div>
				<div style={{ padding: '0 0.3rem' }}>
					<IconButton color='primary' id='laptop' 
                    onClick={(event) => handleButton('laptop')}
                    >
						<DesktopWindows />
					</IconButton>
				</div>
			</div>

			<div className={value}>
				<div className='content'>
					<iframe src={`/blog/view/${blog_id}`} style={{ width: '100%', border: 'none', height: '100%' }} />
				</div>
			</div>
		</div>
	);
};

