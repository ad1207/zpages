'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Snackbar, Alert, Button, TextField } from "@mui/material"
import styles from "../../../styles/company.module.scss"
import axios from "axios"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { forceLogout } from "../../../components/auth/auth"

interface FormData {
	name: string;
	websiteUrl: string;
	logo: string;
	about: string;
}

export default function Page() {
    const router = useRouter();
    const [companies, setCompanies] = useState<any>({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            try{
                let resp = await axios.get(`/api/company/getById`);
                setCompanies(resp.data[0]);
                setIsLoading(false);
            }catch(error){
                console.log(error);
                setIsLoading(false);
            }
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

	let schema = yup.object().shape({
		name: yup.string().required().min(3).max(60),
		companyUrl: yup.string().notRequired(),
		websiteUrl: yup.string().notRequired(),
		about: yup.string().notRequired().max(300),
		logo: yup.string().notRequired(),
	});

	const preloadedValues = {
		name: companies.name,
		// companyUrl: companies.name === undefined ? '' : companies.name ,
		// websiteUrl: companies.website_url === null ? '' : companies.website_url ,
		// about: companies.about === null ? '' : companies.about ,
		// logo: companies.logo === null ? '' : companies.logo
	};

	const {
		setValue,
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: preloadedValues,
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	const [submitting, setSubmitting] = useState<boolean>(false);
	const [serverErrors, setServerErrors] = useState<Array<string>>([]);
	const [error, setError] = useState(false);

	const handleSnackOpen = (message) => {
		setSnack(true);
		setMessage(message);
	};

	useEffect(() => {
		setValue('name', companies.name);
		setValue('websiteUrl', companies.website_url === null ? '' : companies.website_url);
		setValue('logo', companies.logo === null ? '' : companies.logo);
		setValue('about', companies.about === null ? '' : companies.about);
	}, [companies.about, companies.logo, companies.name, companies.website_url, setValue]);

	const onSubmit = async (formData, event) => {
		console.log('test form data--->', formData);
		if (submitting) {
			return false;
		}

		const company = {
			id: companies.id,
			name: formData.name,
			logo: formData.logo,
			website_url: formData.websiteUrl,
			about: formData.about,
		};

		setSubmitting(true);
		setServerErrors([]);
		setError(false);

		await axios.put(`/api/company`, company)
        .then(response => {
            console.log(response);
			if (response.data?.errors) {
				setServerErrors(response.data.errors);
				setError(true);
			}

			setSubmitting(false);
			if (response.status === 200) {
				handleSnackOpen('Profile Successfully Updated');
			}
		});
	};
    if(isLoading){
        return <div>Loading...</div>
    }
    else{

	return (
		<>
			<div className={styles.com_wrap}>
				<div className={styles.left}></div>

				<div className={styles.right}>
					<div>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 100px' }}>
							<div
								style={{
									fontSize: '2rem',
									fontWeight: 'bold',
								}}
							>
								{' '}
								Profile
							</div>
							<div style={{ fontSize: '1.3rem', padding: '1rem' }}>
								<Button onClick={() => router.back()} type="button" variant="contained" color="primary">
									Back
								</Button>
							</div>
						</div>

						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.formGap}>
								<Controller
									name="name"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<TextField
											type="text"
											label="Name"
											margin="dense"
											variant="standard"
											size="small"
											fullWidth
											error={!!errors.name}
											helperText={errors?.name?.message}
											{...field}
										/>
									)}
								/>
							</div>
							<div className={styles.formGap}>
								<Controller
									name="websiteUrl"
									control={control}
									// rules={{ required: true }}
									render={({ field }) => (
										<TextField
											type="text"
											label="Web Site URL"
											margin="dense"
											variant="standard"
											size="small"
											fullWidth
											error={!!errors.websiteUrl}
											helperText={errors?.websiteUrl?.message}
											{...field}
										/>
									)}
								/>
							</div>
							<div className={styles.formGap}>
								<Controller
									name="logo"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<TextField
											type="text"
											label="Logo"
											margin="dense"
											variant="standard"
											size="small"
											fullWidth
											error={!!errors.logo}
											helperText={errors?.logo?.message}
											{...field}
										/>
									)}
								/>
							</div>
							{/* <div className={styles.formGap}>
                                    <Controller
                                        name='about'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextareaAutosize 
                                            aria-label="minimum height"
                                             minRows={3} 
                                             placeholder="Minimum 3 rows" 
                                              error={!!errors.about}
                                             helperText={errors?.about?.message}
                                             fullWidth
                                             />
                                        )}
                                    />
                                </div> */}
							<div className={styles.formGap}>
								<Controller
									name="about"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<TextField
											type="text"
											label="About"
											margin="dense"
											variant="standard"
											size="small"
											multiline
											minRows={1}
											maxRows={3}
											fullWidth
											error={!!errors.about}
											helperText={errors?.about?.message}
											{...field}
										/>
									)}
								/>
							</div>

							<div className={styles.textCenter}>
								<Button
									variant="contained"
									color="primary"
									style={{fontSize: '1rem', borderRadius: '5em', padding:'8px 50px', textTransform:'capitalize'}}
									type="submit"
								>
									Update
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)}>
				<Alert elevation={6} onClose={() => setSnack(false)} variant="filled">
					{message}
				</Alert>
			</Snackbar>
		</>
	);
    }
}
