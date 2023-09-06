'use client'
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAddTag, useEditTag } from '../../../hooks/tag-hook'
import styles from '../../../styles/Tag.module.scss';
import { FormInputText } from '../../forms/FormInputText';

interface IFormData {
	name: string;
}

const EditTag = ({ editItem, onMode, chooseMode, handleSnackOpen, company_id, setSeverity }) => {
	let preloadedValues = {
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

	const {
		setValue,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = form;

	const { mutate: addMutate, isLoading: addLoading } = useAddTag();
	const { mutate: editMutate, isLoading: editLoading } = useEditTag();

	useEffect(() => {
		if (onMode === 'edit') {
			setValue('name', editItem.name);
		}
	}, [onMode, editItem, setValue]);

	const onSubmit = async (formData: IFormData) => {
		if (onMode === 'edit') {
			editTagSubmit(formData);
		} else {
			addTagSubmit(formData);
		}
	};

	const editTagSubmit = (formData: IFormData) => {
		// if (submitting) {
		// 	return false;
		// }

		const tag = {
			name: formData.name,
			tag_id: editItem.id,
			company_id: editItem.company_id,
		};

		// setSubmitting(true);
		// setServerErrors([]);
		// setError(false);

		/**
		 * Mutate Function For Edit
		 */
		editMutate(
			{ ...tag },
			{
				onSuccess: (response) => {
					setSeverity('success');
					handleSnackOpen('Tag Successfully Updated');
					chooseMode('add');
					reset({ name: '' });
					// setSubmitting(false);
				},
				onError: (err: any) => {
					setSeverity('error');
					handleSnackOpen('Oops... something went wrong');
				},
			}
		);
	};

	const addTagSubmit = async (formData: IFormData) => {
		const values = {
			name: formData.name,
			company_id: company_id,
		};

		addMutate(
			{ ...values },
			{
				onSuccess: (response) => {
					setSeverity('success');
					handleSnackOpen('Tag Successfully Added');
					reset({ name: '' });
					chooseMode('add');
					// setSubmitting(false);
				},
				onError: (err: any) => {
					setSeverity('error');
					handleSnackOpen('Oops... something went wrong');
				},
			}
		);
		// setSubmitting(false);
	};

	return (
		<div>
			<div className={styles.title}>{onMode === 'edit' ? 'Edit Tag' : 'Add Tag'}</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formGap}>
					<FormInputText name="name" control={control} label="Enter Tag Name" />
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

export default EditTag;
