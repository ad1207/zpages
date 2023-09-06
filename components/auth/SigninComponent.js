"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Home.module.scss"
import { Button, TextField, Input, InputAdornment, IconButton, FormControl, InputLabel, makeStyles, Checkbox } from "@mui/material";
import { Visibility,VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { state } from "../../utils/state";
import Image from "next/image";
import clsx from 'clsx'
import Link from "next/link";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		display: 'flex',
// 		flexWrap: 'wrap',
// 	},

// 	withoutLabel: {
// 		marginTop: theme.spacing(3),
// 	},
// 	textField: {
// 		width: '100%',
// 	},
// }));

const SigninComponent = () => {

    const router = useRouter()
	useEffect(() => {
		localStorage.removeItem('islogged');
        state.islogged = false;
        state.user = null;
	}, []);

	// const classes = useStyles();
	//	const { formatMessage: f } = useIntl();

	const [isInvalidCredentialsError, setIsInvalidCredentialsError] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	let schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required().min(8).max(16),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	const { error, loading, message, showForm } = values;

	const onSubmit = async (data) => {
		setIsInvalidCredentialsError(false);
		setValues({ ...values, loading: true, error: false });
		const body = {
			username: data.email,
			password: data.password,
		};

		axios.post(`/api/auth/login`, body).then((response) => {
			if (!response.data.done) {
				setIsInvalidCredentialsError(true);
			} else {
				localStorage.setItem('islogged', true);

				router.push(`/dashboard`);
				state.islogged = true;
				state.user = response.data.user;
			}
		});
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const showError = () => (error ? <div className='alert alert-danger'>{error}</div> : '');
	const showMessage = () => (message ? <div className='alert alert-info'>{message}</div> : '');

	const signinForm = () => {
		return (

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.login_flex_container}>
					<div>
						<Image src='/static/images/webb.svg' alt='edit' width={180} height={180} />
					</div>
					<div>
						<h2 className={styles.login_caps}>
							<span style={{ borderBottom: '1px solid #bebebe', paddingBottom: '16px' }}>Sign Into Your # Webb Account</span>
						</h2>
						<div style={{ paddingTop: '16px', paddingBottom: '16px', fontSize: '14px' }}>
							<span style={{ color: 'grey' }}>Need a # Webb account?</span>&nbsp;
							<Link href='/signup'>
								
									<span className={styles.login_links}>Create an account</span>
								
							</Link>
						</div>
						{isInvalidCredentialsError ? <div className={styles.login_error_summary}>Invalid Credentials</div> : ''}
						<TextField
							type='text'
							label='Enter Email'
							fullWidth
							margin='dense'
							name='email'
							autoComplete='off'
							{...register('email')}
							error={!!errors.email}
							helperText={errors?.email?.message}
						/>
						<FormControl fullWidth style={{width:'100%', display:'flex',flexWrap:'wrap',marginTop:'10px'}}
						// className={clsx(classes.margin, classes.textField)}
						>
							<InputLabel htmlFor='standard-adornment-password'>Enter Password</InputLabel>
							<Input
								id='standard-adornment-password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								label='Enter Password'
								fullWidth
								autoComplete='off'
								margin='dense'
								{...register('password')}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								error={!!errors.password}
							/>
							<div className='global_errors'>{errors && errors?.password?.message}</div>
						</FormControl>
						<div className={styles.styl_center}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								fullWidth
								style={{
									textTransform: 'capitalize',
									backgroundColor: '#1a34f8',
									padding: '6px 36px',
									fontSize: '18px',
								}}>
								Log In
							</Button>
						</div>
						{/* <div style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>or</div> */}
						<div className={styles.styl_center}>
							<Link href='/api/glogin'>
								<Button
									type='button'
									variant='outlined'
									color='primary'
									fullWidth
									style={{
										textTransform: 'capitalize',

										padding: '6px 36px',
										fontSize: '16px',
									}}>
									<Image src='/static/images/google-icon.svg' alt='edit' width={20} height={20} />
									&nbsp;&nbsp;Sign In with Google
								</Button>
							</Link>
						</div>

						<div className={styles.fgt_pass}>
							<div className={styles.login_rememberme}>
								<Checkbox
									color='primary'
									style={{
										color: '#317C89',
									}}
								/>{' '}
								Keep me logged in
							</div>
							<div className={styles.login_forgotpass}>
								<Link href='/forgot-password'>
									
										<span className={styles.login_links}>Forgot Password</span>
									
								</Link>
							</div>
						</div>
					</div>
					<div style={{ fontSize: '11px', color: '#241c15a6', paddingTop: '32px', paddingBottom: '10px' }}>
						©2021 All Rights Reserved. # Webb is a registered trademark of Squapl Digital Media Technologies. Cookie Preferences, Privacy, and Terms.
					</div>
				</div>
			</form>
		);
	};

	return (
		<>
			{showError()}

			{showMessage()}
			{showForm && signinForm()}
		</>
	);
};

export default SigninComponent;

