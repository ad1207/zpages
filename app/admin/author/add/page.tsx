'use client'
import {useState, useEffect, use} from 'react'
import {useRouter} from 'next/navigation'
import { Snackbar, Alert } from '@mui/material'
import styles from '../../../../styles/company.module.scss'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, MenuItem } from '@mui/material'
import { forceLogout } from '../../../../components/auth/auth'
import ReactHookFormSelect from '../../../../components/ReactHookFormSelect'

interface FormData {
    name: string;
    email: string;
}

export default function Page() {
    const router = useRouter();
    const [snack, setSnack] = useState(false);
    const [message, setMessage] = useState('');

    let schema = yup.object().shape({
        name: yup.string().required().min(3).max(60),
        email: yup.string().required(),
        role: yup.string().notRequired(),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
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

    const onSubmit = async (formData, event) => {
        console.log('test form data--->', formData);
        if (submitting) {
            return false;
        }

        const subUser = {
            name: formData.name,
            email: formData.email,

            accessRights: formData.role,
        };

        setSubmitting(true);
        setServerErrors([]);
        setError(false);

        axios.post(`/api/author`, subUser).then(function (response) {
            if (response.data.errors) {
                setServerErrors(response.data.errors);
                setError(true);
            }

            setSubmitting(false);
            if (response.status === 201) {
                handleSnackOpen('Author Successfully Created');
            }
        });
    };

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
                                }}>
                                {' '}
                                Author
							</div>
                            <div style={{ fontSize: '1.3rem', padding: '1rem' }}>
                                <Button onClick={() => router.back()} type='button' variant='contained' color='primary'>
                                    Back
								</Button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formGap}>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            type='text'
                                            label='Name'
                                            margin='dense'
                                            variant='standard'
                                            size='small'
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
                                    name='email'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            type='email'
                                            label='Email'
                                            margin='dense'
                                            variant='standard'
                                            size='small'
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={errors?.email?.message}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className={styles.formGap}>
                                <ReactHookFormSelect id='role' name='role' label='Role' style={{width: '100%'}} control={control} defaultValue={'W'}>
                                    <MenuItem value=''>Select role...</MenuItem>
                                    <MenuItem value='A'>Author Only</MenuItem>
                                    <MenuItem value='P'>Author/Publish</MenuItem>
                                    <MenuItem value='W'>Write Only</MenuItem>
                                </ReactHookFormSelect>
                            </div>

                            <div className={styles.textCenter}>
                                <Button variant='contained' color='primary' style={{fontSize:'1rem',borderRadius:'5em',padding:'8px 50px',textTransform:'capitalize'}} type='submit'>
                                    submit
								</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)}>
                <Alert elevation={6} onClose={() => setSnack(false)} variant='filled'>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}