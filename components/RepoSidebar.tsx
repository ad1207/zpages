'use client'
import {yupResolver} from '@hookform/resolvers/yup';
import { MenuItem, Dialog, DialogContent, Snackbar, Alert, Button } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInputText } from '../components/forms/FormInputText';
import { FormInputDropdown } from '../components/forms/FormInputDropdown';
import { useAddRepo } from '../hooks/repo-hook';
import styles from '../styles/RepoSidebar.module.scss';
import {IRepo} from '../model/Repo'

interface IFormData {
	name: string;
	repo_type: string;
}

const RepoSidebar = ({ repos, reloadRepos, company_id, company_nano }) => {
    const router = useRouter();
	const [currentRepo, setCurrentRepo] = useState(repos[0]);
	const defaultValues = {
		name: '',
		repo_type: '',
		// blog_home_format: "format-0"
	};
	let schema = yup.object().shape({
		name: yup.string().required().max(70),
		repo_type: yup.string().required(),
	});

	const {
		control,
		register,
		watch,
		getValues,
		setValue,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid },
	} = useForm<IFormData>({
		mode: 'onChange',
		defaultValues: defaultValues,
		resolver: yupResolver(schema),
	});

	const [openDialog, setOpenDialog] = useState(false);
	const { mutate: addMutate, isLoading: addLoading } = useAddRepo();
	const [, setSubmitting] = useState<boolean>(false);
	const [, setServerErrors] = useState<Array<string>>([]);
	const [, setError] = useState(false);

	const [blogFormat, setBlogFormat] = useState('');

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		reset();
		setOpenDialog(false);
	};

	const handleBlogHomeFormat = () => {
		// Router.push(`/company/dashboard/${company_id}`)
		router.push(`/blogs/${company_nano}`);
	};

	const onSubmit = async (formData: IFormData) => {
		const values = {
			name: formData.name,
			repo_type: formData.repo_type,
			status: 'A',
		};

		addMutate(
			{ ...values },
			{
				onSuccess: () => {
					handleSnackOpen('Repositary Successfully Added');
					reset({ name: '' });
					setOpenDialog(false);
					setSubmitting(false);
				},
				onError: (err: any) => {
					setServerErrors([err?.message]);
					setError(true);
				},
			}
		);
	};

	const handleRepoSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: IRepo) => {
		event.preventDefault();

		setCurrentRepo(item);
		reloadRepos(item);
		//	reloadBlogs(item);
	};

	const options = [
		{ label: 'Blog', value: 'B' },
		{ label: 'Lead Capture Templates', value: 'T' },
	];

	const [snack, setSnack] = useState(false);
	const [message, setMessage] = useState('');

	// useEffect(() => {
	// 	setValue('blog_home_format', '');
	// }, [setValue]);

	const handleSnackOpen = (message) => {
		setSnack(true);
		setMessage(message);
	};
	let blog_formats = [
		{
			label: 'Format-0',
			value: 'format-0',
		},
		{
			label: 'Format-1',
			value: 'format-1',
		},
		{
			label: 'Format-2',
			value: 'format-2',
		},
	];
	const handleBlogFormat = async (event) => {
		setBlogFormat(event.target.value);

		const request = {
			id: company_id,
			blogFormat: event.target.value,
		};

		await axios.put(`/api/company/updateBlogFormat`, request);
	};

	return (
		<>
			<nav className={styles.main_menu}>
				<div className={styles.workspace}>
					<div className={styles.label}>Workspaces</div>
					<div className={styles.workspace_right}>
						<div className={styles.plus} onClick={() => handleOpenDialog()}>
							<Image src="/static/images/plus.svg" alt="edit" width={14} height={14} />
						</div>
					</div>
				</div>

				{repos.length === 0 && <div className={styles.no_workspace}>Create your first workspace</div>}

				{repos.length > 0 && (
					<>
						{repos &&
							repos?.map((item: IRepo, index: number) => {
								return (
									<div
										key={index}
										className={`${styles.repo_list} ${
											currentRepo?.id === item?.id ? styles.highlight_repo : ''
										} `}
										onClick={(e) => handleRepoSelect(e, item)}
									>
										<div className={styles.repo_info}>
											<div className={styles.repo_type}>
												{item.repo_type === 'T' ? 'Landing Pages' : 'Blogs'}
											</div>
											<div className={styles.repo_stats}>
												{item.repo_type === 'T' ? item.lead_pages_count : item.blog_pages_count}
											</div>
										</div>

										<div className={styles.repo_name}>{item.repo_name}</div>
									</div>
								);
							})}
					</>
				)}
				{/* <a className={styles.a} href='http://startific.com'>
							<Image src='/static/images/edit.svg' alt='edit' width='24px' height='24px' />
							<span className={styles.nav_text}>Settings</span>
						</a> */}
				<div className={styles.last}>
					{/* <li className={styles.ul}>
						<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
							<InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
							<Select
								labelId="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								value={blogFormat}
								onChange={(e) => handleBlogFormat(e)}
								label="Select Blog Format"
							>
								<MenuItem value="">
									<em>Select Blog Format</em>
								</MenuItem>
								{blog_formats.map((format, index) => (
									<MenuItem key={index} value={format.value}>
										{format.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</li> */}
					<li className={styles.ul}>
						<a className={styles.a} onClick={() => handleBlogHomeFormat()}>
							<span className={styles.nav_text}>View Blog Home</span>
						</a>
					</li>
					<li className={styles.ul}>
						<a className={styles.a} href="http://startific.com">
							<Image src="/static/images/edit.svg" alt="edit" width={24} height={24} />
							<span className={styles.nav_text}>Settings</span>
						</a>
					</li>
				</div>

				<Dialog open={openDialog} onClose={handleCloseDialog}>
					<DialogContent style={{ width: '500px' }}>
						<div className={styles.dialog_pop}>
							<div style={{ fontSize: '20px' }}>Create new workspace</div>
							<div style={{ cursor: 'pointer' }}>
								<Image
									src="/static/images/close.svg"
									alt="edit"
									width={16}
									height={16}
									onClick={handleCloseDialog}
								/>
							</div>
						</div>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.text_wc_wrap}>
								<FormInputText name="name" control={control} label="Name your new Workspace" />
								<div className={styles.text_wc}>{watch('name', '0')?.length || '0'}/70</div>
							</div>

							<FormInputDropdown
								name="repo_type"
								control={control}
								width={'50%'}
								defaultValue={{ label: '', value: '' }}
								label="Select"
							>
								{options.map((option: any) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</FormInputDropdown>

							<div className={styles.action_btns}>
								<Button
									onClick={handleCloseDialog}
									disableFocusRipple
									disableElevation
									className={styles.cancel_button}
									style={{ margin: '6px 10px' }}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									style={{ margin: '6px 10px' }}
									disabled={!isDirty || !isValid}
									type="submit"
									className={styles.submit_button}
									disableFocusRipple
									disableElevation
								>
									Create workspace
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</nav>

			<Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)}>
				<Alert elevation={6} onClose={() => setSnack(false)} variant="filled">
					{message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default RepoSidebar;
