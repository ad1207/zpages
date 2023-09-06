'use client'
import { useState, useEffect } from "react"
import { TextField, Button, MenuItem } from "@mui/material"

var jsonData = [
	{
		id: 1,
		firstName: 'RR Guest',
		lastName: 'Y',
		email: 'msedwick@sed.com',
		status: 'Active',
		phoneNo: '9874563215',
		role: 'Admin',
	},
	{
		id: 2,
		firstName: 'RR Guest',
		lastName: 'K',
		email: 'jamie@denton.com',
		status: 'Active',
		phoneNo: '9865321478',
		role: 'Admin',
	},
	{
		id: 3,
		firstName: 'DC Law',
		lastName: 'h',
		email: 'daisy@texasjus.com',
		status: 'Active',
		phoneNo: '9632587411',
		role: 'Admin',
	},
	{
		id: 4,
		firstName: 'Morgan',
		lastName: 'B',
		email: 'nborrego@forth.com',
		status: 'Active',
		phoneNo: '8956231478',
		role: 'Admin',
	},
];

const UserEdit = (props) => {
	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNo: '',
		role: '',
		status: '',
	});
	const { firstName, lastName, email, phoneNo, role, status } = values;
	const handleChange = (name) => (e) => {
		setValues({ ...values, [name]: e.target.value });
	};

	useEffect(() => {
		var result = jsonData.filter((data) => {
			if (data.id == props.id) return data;
		});
		setValues(result[0]);
	}, [props.id]);

	const clickSubmit = (e) => {
		e.preventDefault();
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
					<h2>User Edit Page</h2>
				</div>
				<div>&nbsp;</div>
			</div>

			<form onSubmit={clickSubmit}>
				<div style={{ width: '100%', display: 'grid', margin: '0 10px', padding: '6px 6px', gridTemplateColumns: '1fr 1fr' }}>
					<div style={{ margin: '0 10px' }}>
						<TextField
							type='text'
							label='First 6ame'
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
					<div style={{ margin: '0 10px' }}>
						<TextField id='select' label='Role' name='status' value={status} onChange={handleChange('status')} select fullWidth>
							<MenuItem value='Active'>Active</MenuItem>
							<MenuItem value='InActive'>InActive</MenuItem>
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

export default UserEdit;
