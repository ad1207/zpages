'use client'
import { PhoneAndroid, TabletAndroid, DesktopWindows } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import styles from '../../../../styles/Blog.module.scss'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({params}){
    const { lead_page_id } = params;
    const [value, setValue] = useState('laptop');
	const router = useRouter();
	const handleButton = (data) => {
		console.log('check value --->');
		setValue(data);
	};

	return (
		<div className={styles.preview_wrap}>
			<div style={{ paddingLeft: '1rem', cursor: 'pointer' }} onClick={() => router.back()}>
				<span>
					<Image src="/static/images/back.svg" alt="edit" width={24} height={24} />
				</span>
				<span style={{ top: '-5px', position: 'relative' }}>Back</span>
			</div>
			<div className={styles.flex_center}>
				<div style={{ padding: '0 0.3rem' }}>
					<IconButton color="primary" id="mobile" onClick={(event) => handleButton('smartphone')}>
						<PhoneAndroid />
					</IconButton>
				</div>
				<div style={{ padding: '0 0.3rem' }}>
					<IconButton color="primary" id="tablet" onClick={(event) => handleButton('tablet')}>
						<TabletAndroid />
					</IconButton>
				</div>
				<div style={{ padding: '0 0.3rem' }}>
					<IconButton color="primary" id="laptop" onClick={(event) => handleButton('laptop')}>
						<DesktopWindows />
					</IconButton>
				</div>
			</div>

			<div className={value}>
				<div className="content">
					<iframe
						src={`${process.env.CLIENT_URL}/lead-page/view/${lead_page_id}`}
						style={{ width: '100%', border: 'none', height: '100%' }}
					/>
				</div>
			</div>
		</div>
	);
};