'use client'
import { Button, TextField } from "@mui/material";
import { toJpeg } from "html-to-image";
import { useEffect, useRef, useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import InlineEdit from "./LeadPage/InlineEdit";
import styles from '../styles/poster.module.scss';

const CustomForm = ({ formConfig }) => {
	const [myArrayNew, setMyArrayNew] = useState(['Jack', 'Mary', 'John', 'Krish', 'Navin']);

	const [state, setState] = useState([]);

	const [menu, setMenu] = useState(['Home', 'About']);

	//image option
	const ref = useRef(null);

	const handleAddMenu = () => {
		setMenu([...menu, 'New Menu']);
	};

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return;
		}
		toJpeg(document.getElementById('poster'), { quality: 0.95 })
			.then(function (dataUrl) {
				var link = document.createElement('a');
				link.download = 'poster.jpeg';
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ref]);

	const [fields, setFields] = useState(formConfig.fields);

	const { initialValues } = formConfig;
	const {
		control,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const [uploadedFiles, setUploadedFiles] = useState([]);

	//cloudinary
	const onDrop = useCallback(
		async (acceptedFiles) => {
			let path = `C${53}/B${101}/`;
			const test = await deleteOldImg(path);
			// const test=await deleteImageByFolder(path);
			// console.log("test delete data",test);
			const { signature, timestamp } = await getSignature(path);
			const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

			acceptedFiles.forEach(async (acceptedFile) => {
				//login verification

				const formData = new FormData();
				formData.append('file', acceptedFile);
				formData.append('signature', signature);
				formData.append('timestamp', timestamp);
				formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
				formData.append('folder', path);

				const response = await fetch(url, {
					method: 'post',
					body: formData,
				});
				const data = await response.json();
				setValue(fields[3].name, data.secure_url);
				setUploadedFiles((old) => [...old, data]);
			});
		},
		[fields, setValue]
	);

	// //drop zone
	// const { getRootProps, getInputProps, isDragActive } = useDropzone({
	//     onDrop,
	//     accept: 'image/*',
	//     multiple: false,
	// });

	useEffect(() => {
		setState(myArrayNew);

		const draggables = document.querySelectorAll('.draggable');
		const containers = document.querySelectorAll('.container');

		draggables.forEach((draggable) => {
			draggable.addEventListener('dblclick', (e) => {
				e.stopImmediatePropagation();
				let value = e.target.innerText;
				let index = myArrayNew.indexOf(value);
				myArrayNew.splice(index, 1);
				setMyArrayNew([...myArrayNew]);
				setState([...myArrayNew]);
			});

			draggable.addEventListener('dragstart', (e) => {
				e.stopImmediatePropagation();
				draggable.classList.add('dragging');
			});

			draggable.addEventListener('dragend', (e) => {
				e.stopImmediatePropagation();
				draggable.classList.remove('dragging');

				let updatedNode = [...document.getElementsByClassName('draggable')];

				let temp = [];
				updatedNode.forEach((e, i) => {
					temp.push(e.innerText);
				});
				console.log('temp', temp);

				setState(temp);
			});
		});

		containers.forEach((container) => {
			container.addEventListener('dragover', (e) => {
				e.preventDefault();
				const afterElement = getDragAfterElement(container, e.clientY);
				const draggable = document.querySelector('.dragging');

				if (afterElement == null) {
					container.appendChild(draggable);
				} else {
					container.insertBefore(draggable, afterElement);
				}
			});
		});

		function getDragAfterElement(container, y) {
			const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

			return draggableElements.reduce(
				(closest, child) => {
					const box = child.getBoundingClientRect();
					const offset = y - box.top - box.height / 2;
					if (offset < 0 && offset > closest.offset) {
						return { offset: offset, element: child };
					} else {
						return closest;
					}
				},
				{ offset: Number.NEGATIVE_INFINITY }
			).element;
		}
	}, [myArrayNew]);

	return (
		<>
			<div className={styles.poster_wrap} id="poster">
				<div className={styles.left}>
					<div>{formConfig.label}</div>
					<form onSubmit={handleSubmit(formConfig.onSubmit)}>
						<div>
							{fields?.map((row, index) => {
								if (row.component === 'text') {
									return (
										<div className={styles.formGap} key={index}>
											<Controller
												name={row.name}
												key={index}
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<TextField
														type="text"
														label={row.label}
														margin="dense"
														variant="standard"
														size="small"
														fullWidth
														{...field}
													/>
												)}
											/>
										</div>
									);
								} else if (row.component === 'url') {
									return (
										<div key={row.label} className={styles.formGap}>
											<div>{row.label}</div>
											<div className={styles.formGap} key={index}>
												<Controller
													name={row.name}
													key={index}
													control={control}
													rules={{ required: true }}
													render={({ field }) => (
														<TextField
															type="text"
															label="Link"
															margin="dense"
															variant="standard"
															size="small"
															fullWidth
															{...field}
														/>
													)}
												/>
											</div>
										</div>
									);
								} else if (row.component === 'image') {
									return (
										<div key={row.label} className={styles.card}>
											<div>{row.label}</div>

											{/* <div className={styles.formGap} key={index}>
                                                <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}>
                                                    <input {...getInputProps()} />
                                                    Drop Zone
												</div>
                                            </div> */}
										</div>
									);
								}
							})}
						</div>
						<div className={styles.textCenter}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								id="save"
								style={{ marginRight: '10px' }}
							>
								Save
							</Button>
						</div>
					</form>

					<div className="container">
						{myArrayNew.map((name, index) => (
							<p className="draggable" key={index} draggable="true">
								{name}
							</p>
						))}
					</div>

					<br />
					<div>MENU</div>
					<br />
					<div>
						{menu.map((name, index) => (
							<span key={index} style={{ padding: '0 16px' }}>
								{name}
							</span>
						))}
						<span onClick={handleAddMenu}>+ Add</span>
					</div>
				</div>
				<div className={styles.right}>
					<div>Form Tag preview</div>
					<div>
						<div id="image">
							<div>
								<h2>
									<InlineEdit
										text={watch(fields[0].name)}
										onSetText={(text) => setValue(fields[0].name, text)}
									/>
								</h2>
							</div>

							<div>
								<h3>{watch(fields[1].name)}</h3>
							</div>

							<div>{watch(fields[2].name)}</div>
							<div>
								<Image
									src={watch(fields[3].name)}
									alt="Picture of the author"
									width={300}
									height={300}
								/>
							</div>

							<div>
								<a href={watch(fields[4].name)}>
									<button>more details</button>
								</a>
							</div>
						</div>
					</div>
					testing:: {watch(fields[0].name)}
					testing:: {watch(fields[1].name)}
					<div ref={ref}>{/* DOM nodes you want to convert to PNG */}</div>
					<button onClick={onButtonClick}>Click to download</button>
					<h1>Final Space Characters</h1>
					<div>
						{state.map((name, index) => (
							<p key={index}>{name}</p>
						))}
					</div>
					<br />
					<div>MENU</div>
					<br />
					<div>
						{menu.map((name, index) => (
							<span key={index} style={{ padding: '0 16px' }}>
								{name}
							</span>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default CustomForm;

async function getSignature(folderPath) {
	const response = await fetch(`/api/cloudinary/${folderPath}`);
	const data = await response.json();
	const { signature, timestamp } = data;
	return { signature, timestamp };
}

async function deleteOldImg(folderPath) {
	const requestOptions = {
		method: 'DELETE',
	};
	const response = await fetch(`/api/cloudinary/${folderPath}`, requestOptions);
	const data = await response.json();
	return data;
}