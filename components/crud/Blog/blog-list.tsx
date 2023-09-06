'use client'
import { useState } from "react"
import styles from "../../../styles/Blog.module.scss"
import axios from "axios"
import ConfirmDialog from '../../elements/ui/Dialog/ConfirmDialog'
import {mutate} from 'swr'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BlogList({ blogs, onReloadBlogList, handleSnackOpen, onMode, company_id,repo_id,company_nano }) {
	const [openDialog, setOpenDialog] = useState(false);
	const [currentId, setCurrentId] = useState('');
	const router = useRouter();

	const handleConfirm = async () => {
		setOpenDialog(false);
		// mutate(
		// 	`/api/blog/company/${company_id}`,
		// 	blogs.filter((c) => c.id !== currentId),
		// 	false,
		// );
		mutate(
			`/api/blog/repo/${repo_id}`,
			blogs.filter((c) => c.id !== currentId),
			false,
		);

		let response = await axios.delete(`/api/blog/${currentId}`);

		if (response.status === 200) {
			handleSnackOpen('blog Successfully Deleted');
			onReloadBlogList();
		}
	};

	const deleteRow = (id: string, event: any) => {
		event.stopPropagation();

		setCurrentId(id);
		setOpenDialog(true);
	};

	const editRow = (nanoId: string, event: any) => {
		event.stopPropagation();
		router.push(`/admin/blog-edit/${company_nano}/${nanoId}`);
	};

	const viewRow = (nanoId: string, event: any) => {
		event.stopPropagation();
		router.push(`/admin/blog/${nanoId}`);
	};

	// `/admin/blog-edit/${item.id}

	const handleAdd = () => {
		onMode('add');
	};

	return (
		<div>
			<div className={styles.blogListTitle}>
				<div>
					Blogs (<span>{blogs.length}</span>)
				</div>
				<div onClick={(event) => editRow('25', event)}>EDIT</div>
			</div>
			{blogs &&
				blogs?.map((item, index) => {
					return (
						<div key={index}>
							<div className={styles.blogRow}>
								<div className={styles.blogList}>
									<div>
										<div className={styles.blogName}>
											<div>{item.title}</div>
										</div>
									</div>
									<div className={styles.blogDel}>
										<div className={styles.btnGroup} onClick={(event) => editRow(item.blog_id, event)}>
											<Image src='/static/images/edit.svg' alt='edit' width={15} height={15} />
										</div>
										<div className={styles.btnGroup} onClick={(event) => viewRow(item.blog_id, event)}>
											<Image src='/static/images/preview.svg' alt='preview' width={15} height={15} />
										</div>
										<div className={styles.btnGroup} onClick={(event) => deleteRow(item.id, event)}>
											<Image src='/static/images/close.svg' alt='close' width={10} height={10} />
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}

			<ConfirmDialog
				open={openDialog}
				handleClose={() => {
					setOpenDialog(false);
				}}
				handleConfirm={() => {
					handleConfirm();
				}}
				title='Warning Blog Deletion !'>
				You are about to delete blog. Are you sure?
			</ConfirmDialog>
		</div>
	);
}
