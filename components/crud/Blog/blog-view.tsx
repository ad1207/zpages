import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import edjsHTML from '../../../components/editor-convertion'
import styles from '../../../styles/Blog.module.scss'
import { useRouter } from "next/navigation";
// import EditorView from '../../EditorView';
// import content from '*.jpg';
let EditorView = dynamic(() => import('../../EditorView'));

export default function BlogView({ blog, html, isEmpty, view }) {
	const router = useRouter();
	const edjsParser = edjsHTML();
	//manual convertion using switch
	// console.log("blog data---->", html)

	// let crosscheck: string[] = edjsParser.parse(blog.publish_content);

	// const stringData: string = crosscheck.reduce((result, item) => {
	// 	return `${result}${item}`
	// }, "")

	return (
		<div>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 100px' }}>
				<div
					style={{
						fontSize: '2rem',
						fontWeight: 'bold',
					}}>
					{' '}
					Blog PreView
				</div>
				<div style={{ fontSize: '1.3rem', padding: '1rem' }}>
					<Button onClick={() => router.back()} type='button' variant='contained' color='primary'>
						Back
					</Button>
				</div>
			</div>

			<br />
			<div className={view === 'mobile' ? styles.mobile : styles.desktop}>
				<div className={styles.blog_view_wrap}>
					<div>{blog.title}</div>
					<br />
					{html}
					{isEmpty && <div>still Not publish the Blog</div>}
				</div>
			</div>
			{/* <div>
				{EditorView && blog.publish_content && <EditorView content={blog.publish_content} />}
				{blog.publish_content == null && <div>still Not publish the Blog</div>}
			</div> */}
		</div>
	);
}
