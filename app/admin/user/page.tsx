'use client'
import UserList from '../../../components/crud/User/UserList'
import UserEdit from '../../../components/crud/User/UserEdit'
//import UserCreate from '../../../components/crud/User/UserCreate'
import { useState } from 'react'
import { Button } from '@mui/material'
import SnackBar from '../../../components/elements/ui/Dialog/SnackBar'

export default function Page() {
    const [action, setAction] = useState('list');
	const [id, setId] = useState('');

	const [snack, setSnack] = useState(false);
	const [message, setMessage] = useState('');

	const handleChangeAction = (action, id) => {
		setAction(action);
		setId(id);
	};

	const handleSnack = (bool) => {
		setSnack(bool);
	};

	const handleMessage = (msg) => {
		setMessage(msg);
	};
	// useEffect(() => {
	// 	initCategories();
	// 	initTags();
	// }, []);

	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 200px' }}>
						<div>&nbsp;</div>
						{action && action === 'add' ? (
							<div style={{ fontSize: '1.3rem', padding: '1rem' }}>
								<Button onClick={() => handleChangeAction('list', '')} type='button' variant='contained' color='primary'>
									List User
								</Button>
							</div>
						) : (
							''
						)}
						{action && action === 'list' ? (
							<div style={{ fontSize: '1rem', padding: '1rem' }}>
								<Button onClick={() => handleChangeAction('add', '')} type='button' variant='contained' color='primary'>
									+ Create User
								</Button>
							</div>
						) : (
							''
						)}
						{(action && action === 'edit') || (action && action === 'view') ? (
							<div style={{ fontSize: '1rem', padding: '1rem' }}>
								<Button onClick={() => handleChangeAction('list', '')} type='button' variant='contained' color='primary'>
									List User
								</Button>
							</div>
						) : (
							''
						)}
					</div>
					{action && action === 'list' ? (
						<div className='col-md-12'>
							<UserList onAction={handleChangeAction} />
						</div>
					) : (
						''
					)}

					{action && action === 'add' ? <div className='col-md-12'>{/* <UserCreate /> */}</div> : ''}
					{action && action === 'edit' ? (
						<div className='col-md-12'>
							<UserEdit onAction={handleChangeAction} onSnack={handleSnack} onMessage={handleMessage} id={id} />
						</div>
					) : (
						''
					)}
				</div>
			</div>

			<SnackBar open={snack} handleClose={() => setSnack(false)} message={message}></SnackBar>
		</>
	);
};