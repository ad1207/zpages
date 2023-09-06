'use client'
import {Snackbar, Alert} from '@mui/material'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { forceLogout } from '../../../components/auth/auth'
import EditTag from '../../../components/crud/Tag/edit-tag'
import TagList from '../../../components/crud/Tag/list-tag'
import {ITag} from '../../../model/Tag'
import styles from '../../../styles/Tag.module.scss'
import {errorUtils} from '../../../utils/error-utils'

export default function Page() {
    const [company_id, setCompany_id] = useState<number>(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            await axios.get('/api/tag')
            .then((res) => {
                console.log(res.data);
                setCompany_id(res.data.company_id);
                setIsLoading(false);

            })
            .catch((err) => {
                let error = errorUtils.getError(err);
                console.log(error);
                setIsLoading(false);
            })
        }
        fetchData();
    }, []);

    useEffect(() => {
		if (isError) {
			forceLogout();
		}
	}, [isError]);

	const [snack, setSnack] = useState(false);
	const [message, setMessage] = useState('');
	const [mode, setMode] = useState('add');
	const [editRowItem, setEditRowItem] = useState<ITag>();

	const [severity, setSeverity] = useState<any>('info');

	const handleSnackOpen = (message) => {
		setSnack(true);
		setMessage(message);
	};

	const chooseMode = (mode: string) => {
		setMode(mode);
	};

	const editRow = (item: ITag) => {
		setEditRowItem(item);
		setMode('edit');
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	else{

	return (
		<>
			<div className={styles.tag_wrap}>
				<div className={styles.left}>
					<EditTag
						onMode={mode}
						chooseMode={chooseMode}
						editItem={editRowItem}
						handleSnackOpen={handleSnackOpen}
						setSeverity={setSeverity}
						company_id={company_id}
					></EditTag>
				</div>

				<div className={styles.right}>
					<TagList
						onMode={mode}
						chooseMode={chooseMode}
						onEditRow={editRow}
						handleSnackOpen={handleSnackOpen}
						company_id={company_id}
					/>
				</div>
			</div>

			<Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)}>
				<Alert severity={severity} elevation={6} onClose={() => setSnack(false)} variant="filled">
					{message}
				</Alert>
			</Snackbar>
		</>
	);
	}
}
