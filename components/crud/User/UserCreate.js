'use client'
import { useState } from "react"
import { TextField, MenuItem, Button } from "@mui/material"
import {getCookie} from '../../auth/auth'
//import {createUser} from '../../../actions/layout'

const UserCreate = () => {
	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNo: '',
		role: '',
		status: '',
	});
	const token = getCookie('token');
	const { firstName, lastName, email, phoneNo, role } = values;
	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();

		// createUser(values, token).then((res) => {
		// 	if (res.status !== 200) {
		// 		setValues({ ...values, error: 'Something went wrong' });
		// 	} else if (res.status === 200) {
		// 		setValues({
		// 			...values,
		// 			title: '',
		// 			error: '',
		// 			success: `A new blog titled "${res.data.title}" is created`,
		// 		});
		// 	}
		// });
		setValues({
			firstName: '',
			lastName: '',
			email: '',
			phoneNo: '',
			role: '',
		});
	};

	return (
		<div>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 200px' }}>
				<div>
					<h2>User Add Page</h2>
				</div>
				<div>&nbsp;</div>
			</div>

			<form onSubmit={clickSubmit}>
				<div style={{ width: '100%', display: 'grid', margin: '0 10px', padding: '6px 6px', gridTemplateColumns: '1fr 1fr' }}>
					<div style={{ margin: '0 10px' }}>
						<TextField
							type='text'
							label='First Name'
							margin='dense'
							name='firstName'
							value={firstName}
							onChange={handleChange('firstName')}
							fullWidth
						/>
					</div>
					<div style={{ margin: '0 10px' }}>
						<TextField type='text' label='Last Name' margin='dense' name='lastName' value={lastName} onChange={handleChange('lastName')} fullWidth />
					</div>
					<div style={{ margin: '0 10px' }}>
						<TextField type='text' label='Email' margin='dense' name='email' value={email} onChange={handleChange('email')} fullWidth />
					</div>
					<div style={{ margin: '0 10px' }}>
						<TextField type='text' label='Phone No' margin='dense' name='phoneNo' value={phoneNo} onChange={handleChange('phoneNo')} fullWidth />
					</div>
					<div style={{ margin: '0 10px' }}>
						<TextField id='select' label='Role' name='role' value={role} onChange={handleChange('role')} select fullWidth>
							<MenuItem value='User'>User</MenuItem>
							<MenuItem value='Admin'>Admin</MenuItem>
						</TextField>
					</div>
				</div>
				<div style={{ textAlign: 'left', padding: '16px' }}>
					<Button type='submit' variant='contained' color='primary'>
						Create
					</Button>
				</div>
			</form>
		</div>
	);
};

export default UserCreate;