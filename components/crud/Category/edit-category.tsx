'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, makeStyles } from "@mui/material";
import { useEffect } from "react";
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { useAddCategory, useEditCategory } from "../../../hooks/category-hook";
import styles from '../../../styles/Category.module.scss';
import { FormInputText } from '../../forms/FormInputText';

interface IFormData {
	name: string;
}

// const useStyles = makeStyles((theme) => ({
// 	margin: {
// 		margin: theme.spacing(1),
// 	},
// 	TextFieldProps: {
// 		color: '#fff',
// 		borderBottom: '1px solid #fff',
// 	},
// 	buttonProps: {
// 		fontSize: '1rem',
// 		borderRadius: '5em',
// 		padding: '8px 50px',
// 		textTransform: 'capitalize',
// 	},
// }));

const EditCategory = ({ editItem, onMode, handleSnackOpen, chooseMode, company_id, setSeverity }) => {
	const preloadedValues = {
		name: '',
	};

	let schema = yup.object().shape({
		name: yup.string().required().min(3).max(60),
	});

	const form = useForm<IFormData>({
		defaultValues: preloadedValues,
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	const { mutate: addMutate, isLoading: addLoading } = useAddCategory();
	const { mutate: editMutate, isLoading: editLoading } = useEditCategory();

	const {
		setValue,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = form;

	useEffect(() => {
		if (onMode === 'edit') {
			setValue('name', editItem.name);
		}
	}, [onMode, editItem, setValue]);

	const onSubmit = async (formData: IFormData) => {
		if (onMode === 'edit') {
			editCategory(formData);
		} else {
			addCategory(formData);
		}
	};

	const editCategory = (formData) => {
		const category = {
			name: formData.name,
			categoryid: editItem.id,
			company_id: editItem.company_id,
		};

		editMutate(
			{ ...category },
			{
				onSuccess: (response) => {
					setSeverity('success');
					handleSnackOpen('Category Successfully Updated');
					chooseMode('add');
					reset({ name: '' });
				},
				onError: (err: any) => {
					setSeverity('error');
					handleSnackOpen('Oops... something went wrong');
				},
			}
		);
	};

	const addCategory = async (formData) => {
		const values = {
			name: formData.name,
			company_id: company_id,
		};

		/**
		 * Mutate Function For Add
		 */
		addMutate(
			{ ...values },
			{
				onSuccess: (response) => {
					setSeverity('success');
					handleSnackOpen('Category Successfully Added');
					reset({ name: '' });
					chooseMode('add');
					// snackbar
				},
				onError: (err: any) => {
					// snackbar
					setSeverity('error');
					handleSnackOpen('Oops... something went wrong');
				},
			}
		);
	};

	return (
		<div>
			<div className={styles.title}>{onMode === 'edit' ? 'Edit Category' : 'Add Category'}</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formGap}>
					<FormInputText name="name" control={control} label="Enter Category Name" />
				</div>
				<div className={styles.textCenter}>
					<Button variant="contained" color="primary" type="submit">
						{onMode === 'edit' ? 'Update' : 'Create'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditCategory;
