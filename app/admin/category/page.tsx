'use client'
import {Snackbar, Alert} from '@mui/material'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { forceLogout } from '../../../components/auth/auth'
import EditCategory from '../../../components/crud/Category/edit-category'
import CategoryList from '../../../components/crud/Category/list-category'
import { ICategory } from '../../../model/Category'
import styles from '../../../styles/Category.module.scss'

export default function Page(){

    const [company_id, setCompany_id] = useState<number>(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/category')
            .then(res => {
                console.log(res.data);
                setCompany_id(res.data.company_id);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
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
	const [editRowItem, setEditRowItem] = useState<ICategory>();
	const [severity, setSeverity] = useState<any>('info');

	const handleSnackOpen = (message) => {
		setSnack(true);
		setMessage(message);
	};

	const chooseMode = (mode: string) => {
		setMode(mode);
	};

	const editRow = (item: ICategory) => {
		setEditRowItem(item);
	};
    if(isLoading){
        return <div>Loading...</div>
    }
    else{
	return (
		<>
			<div className={styles.cat_wrap}>
				<div className={styles.left}>
					<EditCategory
						onMode={mode}
						chooseMode={chooseMode}
						editItem={editRowItem}
						handleSnackOpen={handleSnackOpen}
						company_id={company_id}
						setSeverity={setSeverity}
					></EditCategory>
				</div>

				<div className={styles.right}>
					<CategoryList
						onMode={chooseMode}
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