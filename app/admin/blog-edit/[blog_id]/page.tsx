'use client'
import { ErrorMessage } from "@hookform/error-message"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, FormControl, Input, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, InputLabel, Snackbar, TextField, Alert, Autocomplete, Checkbox, Switch } from "@mui/material";
import { Search, Adb, AdUnits, Delete } from "@mui/icons-material";
import axios from "axios";
import {Image} from 'cloudinary-react'
import { format, parseISO } from 'date-fns';
import ImageNext from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback} from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Controller, useForm, FieldErrors } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useSnapshot } from "valtio";
import * as yup from 'yup';
import { forceLogout } from "../../../../components/auth/auth";
import DeleteDialog from "../../../../components/elements/ui/Dialog/DeleteDialog";
import { FormInputDropdown } from "../../../../components/forms/FormInputDropdown";
import { FormInputText } from "../../../../components/forms/FormInputText";
import { useAutoSaveBlog, useBlogByNano } from "../../../../hooks/blog-hook";
import { getCategories } from "../../../../service/category.service";
import { getImages } from "../../../../service/cloudinary.service";
import { getRepo } from "../../../../service/repository.service";
import { getTags, getAllTags } from "../../../../service/tag.service";
import styles from '../../../../styles/Blog.module.scss';
import styles_drop_zone from '../../../../styles/dropZone.module.css';
import { content } from "../../../../utils/content";
import {DatePicker, LocalizationProvider} from '@mui/lab'
import DateFnsUtils from "@date-io/date-fns";
import MyEditor from "../../../../components/Editor";

interface FormData {
	title: string;
	description: string;
	author: string;
	blogDate: Date;
	blocks: string;
	categories: any[];
	tags: any[];
	thumbnail: string;
	is_author: boolean;
	is_publish_date: boolean;
	slug: string;
}

interface blogReq {
	id: string;
	key: string;
	value: any;
}

type ErrorSummaryProps<T> = {
	errors: FieldErrors<T>;
};
function ErrorSummary<T>({ errors }: ErrorSummaryProps<T>) {
	if (Object.keys(errors).length === 0) {
		return null;
	}
	return (
		<div className="error-summary">
			{Object.keys(errors).map((fieldName) => (
				<ErrorMessage errors={errors} name={fieldName as any} as="div" key={fieldName} />
			))}
		</div>
	);
}

type ErrorMessageContainerProps = {
	children?: React.ReactNode;
};
const ErrorMessageContainer = ({ children }: ErrorMessageContainerProps) => <span className="error">{children}</span>;

export default function Index({params}) {
	const blog_id = params.blog_id;
    const [user, setUser] = useState<any>();
    const [isError, setIsError] = useState(false);
    const [accessRights, setAccessRights] = useState<any>(null);
    const [blog, setBlog] = useState<any>(null);
    const [company_id, setCompany_id] = useState<any>(null);
    const [selectedCat, setSelectedCat] = useState<any>([]);
    const [selectedTag, setSelectedTag] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [tags, setTags] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [repo_nano, setRepo_nano] = useState<any>(null);
    const [authors, setAuthors] = useState<any>([]);
    const [authors_result, setAuthors_result] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
	const [anchorEl, setAnchorEl] = useState(null);
	const [imageFile, setImageFile] = useState<any>();
	const [unsplashImage, setUnsplashImage] = useState(images);

	const { data: blogData = {}, isLoading: fetchLoading } = useBlogByNano(blog_id);
	const { mutate: autoSaveBlog, isLoading: blogLoading } = useAutoSaveBlog();
	let maxCat = 3;
	let maxTag = 15;

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get('/api/auth/user');
                setUser(response.data);
                setAccessRights(response.data.access_rights);
                const response1 = await axios.get(`/api/author/company`);
                setAuthors(response1.data);
                const response2 = await axios.get(`/api/blog/blogByNano/${blog_id}`);
                setBlog(response2.data);
                if(response2.data.tag.length > 0){
                    const tagresp = await axios.get(`/api/getTags/${response2.data.tag}`);
					console.log("tagresp",tagresp);
					if(tagresp.statusText==="OK")
                    	setSelectedTag(tagresp.data);
                }
                if(response2.data.category.length > 0){
                    const catresp = await axios.get(`/api/getCategories/${response2.data.category}`);
					console.log("catresp",catresp);
					if(catresp.data)
                    	setSelectedCat(catresp.data);
                }
                const repo = await axios.get(`/api/getRepo/${response2.data.repo_id}`);
                setRepo_nano(repo.data.repo_id);
                
                // setSelectedTag(response2.data.tag); // Look into it
                // setSelectedCat(response2.data.category); // Look into it
                // setRepo_nano(response2.data.repo_id); // Look into it
                const response3 = await axios.get(`/api/category`);
                setCategories(response3.data.categories);
                setCompany_id(response3.data.company_id);
                const response4 = await axios.get(`/api/tag/${response3.data.company_id}`);
                setTags(response4.data);
                const path = `C${response3.data.company_id}/B${response2.data.id}/`;
                let unsplashRes = await axios.get(
                    `https://api.unsplash.com/photos/?client_id=xEgxLpBbjc6QDigyUa6pNU7dWdaA2HoQTE8bIGVSnkI`
                );
                setImages(unsplashRes.data);
                let cloudRes = await axios.get(`/api/getImages/${path}`);
                setSelectedImages(cloudRes.data);
                setIsLoading(false);
            }
            catch(error){
                console.log(error);
                setIsLoading(true);
            }
        }
        fetchData();
    }, [blog_id]);


	const handleClose = () => {
		setAnchorEl(null);
	};
    useEffect(() => {
		if (isError) {
			return forceLogout();
		}
	}, [isError]);

	const preloadedValues = {
		title: blogData?.title?.startsWith('Untitled') ? '' : blogData?.title,
		description: blogData?.description,
		author: blogData?.author,
		thumbnail: blogData?.thumbnail,
		layout: blogData?.layout,
		slug: blogData?.slug,
		is_author: blogData?.is_author,
		is_publish_date: blogData?.is_publish_date,
	};
	const [snack, setSnack] = useState(false);
	const [message, setMessage] = useState('');
	const uploadLimit = 10;

	const [uploadedFiles, setUploadedFiles] = useState(selectedImages?.length > 0 ? selectedImages : []);

	const [selectedTags, setSelectedTags] = useState([...selectedTag]);
	const [selectedCategorys, setSelectedCategorys] = useState([...selectedCat]);
	const [showAssets, setShowAssets] = useState(false);
	const [showApps, setShowApps] = useState(false);

	const [showMetaSection, setShowMetaSection] = useState(false);
	const [showLayout, setShowLayout] = useState(false);

	let schema = yup.object().shape({
		title: yup.string().required('Title is required').min(3).max(72),
		description: yup.string().required('Description is required').max(200),
		author: yup.string().required('Author is required').max(50),
		categories: yup.string().nullable().notRequired(),
		tags: yup.string().nullable().notRequired(),
		company_id: yup.string().nullable().notRequired(),
		slug: yup.string().nullable().notRequired(),
		layout: yup.string().nullable().notRequired(),
		thumbnail: yup.string().nullable().notRequired(),
		is_author: yup.boolean().nullable().notRequired(),
		is_publish_date: yup.boolean().nullable().notRequired(),
	});
	const {
		handleSubmit,
		watch,
		formState: { isValid, errors },
		setValue,
		setError,
		control,
		reset,
	} = useForm<FormData>({
		defaultValues: preloadedValues,
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	const [submitting, setSubmitting] = useState<boolean>(false);
	const [serverErrors, setServerErrors] = useState<Array<string>>([]);

	const [isError1, setIsError1] = useState(false);
	const [copy, setCopy] = useState(false);
	// const datetimeformat = "YYYY-MM-DDTHH:mm:ss";

	const [selectedDate, setSelectedDate] = useState(new Date(blog?.blog_date));
	const [formattedDate, setFormattedDate] = useState(new Date(blog?.blog_date));

	// const handleDateChange = async (date) => {
	// 	setSelectedDate(date);
	// 	setFormattedDate(format(date, 'MMM dd, yyyy'));
	// 	let request = {
	// 		id: currentBlog.id,
	// 		blogDate: parseISO(selectedDate),
	// 	};
	// 	let resp = await axios.put(`/api/blog/autoSaveBlogDate`, request);
	// };

	//error style
	let errorStyle = {
		color: 'red',
		content: '⚠ ',
	};

	//dialog box
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleShowAssets = () => {
		setShowAssets(!showAssets);
		setShowMetaSection(false);
		setShowApps(false);
		setShowLayout(false);
	};

	const handleShowApps = () => {
		setShowApps(!showApps);
		setShowAssets(false);
		setShowMetaSection(false);
		setShowLayout(false);
	};

	const handleShowMetaSection = () => {
		setShowMetaSection(!showMetaSection);
		setShowAssets(false);
		setShowLayout(false);
		setShowApps(false);
	};
	const handleShowLayout = () => {
		setShowMetaSection(false);
		setShowAssets(false);
		setShowApps(false);
		setShowLayout(!showLayout);
	};

	const handleCloseRightBar = () => {
		setShowMetaSection(false);
		setShowLayout(false);
	};

	const handleCloseLeftBar = () => {
		setShowAssets(false);
		setShowApps(false);
	};

	const handleClick = (event, item) => {
		setAnchorEl(event.currentTarget);
		setImageFile(item);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const snap = useSnapshot(content);

	const onSubmit = async (formData, event) => {
		if (submitting) {
			return false;
		}
		if (!selectedTags.length || !selectedCategorys.length) {
			setIsError1(true);
			return;
		}
		let status = event.nativeEvent.submitter.id === 'save' ? 'N' : 'Y';

		let tempCatIds = selectedCategorys.map((o) => o.id);
		let uniqCategorys = selectedCategorys.filter(({ id }, index) => !tempCatIds.includes(id, index + 1));

		let tempTagIds = selectedTags.map((o) => o.id);
		let uniqTags = selectedTags.filter(({ id }, index) => !tempTagIds.includes(id, index + 1));
		const values = {
			id: blogData?.id,
			title: formData.title,
			description: formData.description,
			author: formData.author,
			blogDate: selectedDate,
			categories: uniqCategorys,
			tag: uniqTags,
			company_id: company_id,
			status: status,
			createdAt: blogData?.published_on,
			thumbnail: formData.thumbnail,
			is_publish_date: formData.is_publish_date,
			is_author: formData.is_author,
		};
		if (snap.obj != null) values['content'] = snap.obj;
		setSubmitting(true);
		setServerErrors([]);

		const response = await axios.put(`/api/blog`, values);
		if (response.data.errors) {
			setServerErrors(response.data.errors);
		}
		if (response.status === 200) {
			setError('title', {
				type: 'server',
				message: 'Title already exists',
			});
		}
		setSubmitting(false);
		if (response.status === 201) {
			setSnack(true);
			setMessage('blog Updated successfully');

			event.target.reset();
			reset();
			router.push(`/dashboard`);
		}
	};

	//cloudinary delete image
	const removeImage = async (file) => {
		const data = {
			publicId: file.public_id,
			folder: file.folder,
			operation: 'DELETE',
		};

		const response = await axios.post(`/api/blog`, data);
		setUploadedFiles([...response.data]);
		// setAnchorEl(null);
	};

	//cloudinary
	const onDrop = useCallback(
		async (acceptedFiles) => {
			let path = `C${company_id}/B${blog.id}/`;
			acceptedFiles.forEach(async (acceptedFile) => {
				const formData = new FormData();
                console.log(acceptedFile);
				formData.append('file', acceptedFile);
                formData.append('filepath',acceptedFile.path)
				formData.append('folder', path);
				const config = {
					headers: { 'content-type': 'multipart/form-data' },
					onUploadProgress: (event) => {
						console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
					},
				};

				const response = await axios.post(`/api/cloudinary/upload`, formData, config);
				const data = response.data;
				setUploadedFiles((old) => [...old, data]);
			});
		},
		[blog?.id, company_id]
	);

	//drop zone
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		// accept: {
		// 	'image/png': ['.png'],
		// 	'image/jpeg': ['.jpg', '.jpeg'],
		// },
		multiple: true,
		disabled: uploadedFiles.length === uploadLimit ? true : false,
	});

	var layoutarray = [
		{
			label: 'classic',
			icon: AdUnits,
		},
		{
			label: 'classic pro',
			icon: Adb,
		},
		{
			label: 'layout3',
			icon: Adb,
		},
	];

	const initialArray = (data) => {
		var initialGroup = {};
		data.map((layout) => {
			initialGroup[layout.label] = false;
		});
		return initialGroup;
	};

	let group = initialArray(layoutarray);
	let initialGroup = { ...group };

	initialGroup[blog?.layout.toString().toLowerCase().replace('_', ' ')] = true;
	const [layoutGroup, setLayoutGroup] = useState(initialGroup);

	const handleAutoSaveTitle = async (event) => {
		setValue('title', event.target.value);
		autoSaveBlog({
			blog_id: blogData?.id,
			req_data: {
				title: event.target.value,
			},
		});
	};

	const handleAutoSaveSlug = async (event) => {
		setValue('slug', event.target.value);
		autoSaveBlog({
			blog_id: blogData?.id,
			req_data: {
				slug: event.target.value,
			},
		});
	};
	const handleAutoSaveDescription = async (event) => {
		setValue('description', event.target.value);
		autoSaveBlog({
			blog_id: blogData?.id,
			req_data: {
				description: event.target.value,
			},
		});
	};
	const handleAutoSaveDate = async (event) => {
		setValue('blogDate', selectedDate);
		autoSaveBlog({
			blog_id: blogData?.id,
			req_data: {
				blogDate: selectedDate,
			},
		});
	};

	const handleAutoSaveAuthor = async (event) => {
		setValue('author', event.target.value);
		autoSaveBlog({
			blog_id: blogData?.id,
			req_data: {
				author: event.target.value,
			},
		});
	};

	const handleAutoSaveCategory = async (value) => {
		setSelectedCategorys(value);
		let tempCatIds = value.map((o) => Number(o.id));
		let uniqCategorys = Array.from(new Set(tempCatIds));
		if (value.length <= maxCat)
			autoSaveBlog({
				blog_id: blogData?.id,
				req_data: {
					category: uniqCategorys,
				},
			});
	};

	const handleAutoSaveTag = async (value) => {
		setSelectedTags(value);
		let tempTagIds = value.map((o) => Number(o.id));
		let uniqTag = Array.from(new Set(tempTagIds));
		if (value.length <= maxTag)
			autoSaveBlog({
				blog_id: blogData?.id,
				req_data: {
					tag: uniqTag,
				},
			});
	};
	//layout option
	const chooseLayout = () => {
		return (
			<div className={styles.layout_list}>
				{Object.keys(layoutGroup).map((key, index) => (
					<div className={styles.layout_grid} key={index}>
						<Checkbox
							checked={layoutGroup[key]}
							onChange={(e) =>
								autoSaveBlog(
									{
										blog_id: blogData?.id,
										req_data: {
											layout: e.target.name.toString().toLowerCase().replace(' ', '_'),
										},
									},
									{
										onSuccess: (response) => {
											setLayoutGroup({ ...group, [e.target.name]: true });
										},
									}
								)
							}
							inputProps={{ 'aria-label': 'controlled' }}
							name={key}
							icon={<Adb />}
							checkedIcon={<Adb />}
							// label="test"
						/>
						<div className={styles.layout_title}>{key}</div>{' '}
					</div>
				))}
			</div>
		);
	};

	// delete option
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	};

	//soft  delete blog with id and load dashboard
	const confirmDelete = async () => {
		let response = await axios.delete(`/api/blog/${blogData?.id}`);
		if (response.status === 200) {
			router.push(`/dashboard`);
			handleCloseDeleteDialog();
		}
	};

	const [word, setWord] = useState('');
	const [dictionaryResult, setDictionaryResult] = useState({});

	//handle dictionary input box
	const handleChange = async (searchKey) => {
		setWord(searchKey);
	};

	// Dictionary api integration
	const search = async () => {
		let result = await axios.get(`/api/dictionary/${word}`);
		setDictionaryResult(result.data);
		setWord('');
	};

	const [imgGalleryType, setImgGalleryType] = useState('local');
	const handleImageGallery = (data) => {
		console.log('check the type---->', data);
		setImgGalleryType(data);
	};

	let page = 1;
	let accesskey = 'xEgxLpBbjc6QDigyUa6pNU7dWdaA2HoQTE8bIGVSnkI';
	let size = 30;

	//unsplash category(collection) based search
	const searchImage = async () => {
		let resp = await axios.get(
			`https://api.unsplash.com/collections?page=${page}&per_page=${size}&query=${word}&client_id=${accesskey}`
		);
		setUnsplashImage(resp.data);
		setWord('');
	};

	const unsplashGallery = () => {
		return (
			<div>
				<div style={{ padding: '1rem' }}>
					<FormControl fullWidth>
						<Input
							type="text"
							placeholder="Search Image"
							fullWidth
							margin="dense"
							name="search"
							onChange={(event) => {
								handleChange(event.target.value);
							}}
							endAdornment={
								<InputAdornment position="start">
									<IconButton onClick={() => searchImage()}>
										<Search />
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</div>
				<div className={styles.no_image}>
					{unsplashImage.length > 0 && (
						<>
							<div
								style={{
									display: 'grid',
									padding: '6px 6px',
									gridTemplateColumns: '1fr 1fr',
									margin: 'auto auto',
								}}
							>
								{unsplashImage.map((file, index) => (
									<div key={file.id} className={styles.image_item}>
										<div className={styles.item_dots} onClick={(event) => handleClick(event, file)}>
											<Image
												src="/static/images/down-arrow.svg"
												alt="edit"
												width="12px"
												height="12px"
											/>
										</div>

										<Image
											src={
												file?.urls?.small === undefined
													? file.preview_photos[0].urls.small
													: file.urls.small
											}
											width="100"
											alt=""
											height="100"
											crop="scale"
										/>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		);
	};

	const mediaGallery = () => {
		return (
			<div>
				<div className={styles.drop_zone}>
					<div
						{...getRootProps()}
						className={`${styles_drop_zone.drop_zone} ${isDragActive ? styles_drop_zone.active : null}`}
					>
						<input {...getInputProps()} />
						{`Drag'n'drop files, or click to select files`}
					</div>
				</div>
				<div className={styles.no_image}>
					{uploadedFiles.length === 0 && (
						<>
							<div>No Images</div>
						</>
					)}

					{uploadedFiles.length > 0 && (
						<>
							<div
								style={{
									display: 'grid',
									padding: '6px 6px',
									gridTemplateColumns: '1fr 1fr',
									margin: 'auto auto',
								}}
							>
								{uploadedFiles.map((file, index) => (
									<div key={file.public_id} className={styles.image_item}>
										<div className={styles.item_dots} onClick={(event) => handleClick(event, file)}>
											<Image
												src="/static/images/down-arrow.svg"
												alt="edit"
												width="12px"
												height="12px"
											/>
										</div>

										<Image
											cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
											publicId={file.public_id}
											width="100"
											alt=""
											height="100"
											crop="scale"
										/>
										<div>
											{`${
												file.original_filename === undefined
													? 'image ' + (index + 1)
													: file.original_filename
											}.${file.format} ${file.width}x${file.height}`}
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		);
	};
	return (
        <>
		{isLoading?<div>Loading...</div>
        :<>
			<div className={styles.main_menu}>
				<div
					onClick={handleShowAssets}
					className={showAssets ? `${styles.menu_item} ${styles.selected}` : `${styles.menu_item}`}
				>
					<div className={styles.menu_label}>
						<Image src="/static/images/gallery.svg" alt="gallery" width="32px" height="32px" />
						<div className={styles.menu_label_text}>Media</div>
					</div>
				</div>
				<div
					onClick={handleShowApps}
					className={showApps ? `${styles.menu_item} ${styles.selected}` : `${styles.menu_item}`}
				>
					<div className={styles.menu_label}>
						<Image src="/static/images/apps.svg" alt="apps" width="32px" height="32px" />
						<div className={styles.menu_label_text}>Apps</div>
					</div>
				</div>
				{(showAssets || showApps) && (
					<>
						<div onClick={handleCloseLeftBar} className={styles.menu_item} style={{ marginTop: 'auto' }}>
							<Image src="/static/images/left_arrow.svg" alt="edit" width="30px" height="30px" />
						</div>
					</>
				)}
			</div>
			<div className={styles.main_bg}>
				<div className={showAssets ? `${styles.assets} ${styles.show_assets}` : `${styles.assets}`}>
					<div className={styles.flex_center} style={{ padding: '5px' }}>
						<div>
							<Button color="primary" onClick={() => handleImageGallery('local')}>
								Local
							</Button>
						</div>
						<div>
							{' '}
							<Button color="primary" onClick={() => handleImageGallery('unsplash')}>
								Unsplash
							</Button>
						</div>
					</div>
					{imgGalleryType === 'local' ? mediaGallery() : unsplashGallery()}
				</div>
				<div className={showApps ? `${styles.apps} ${styles.show_apps}` : `${styles.apps}`}>
					<div>
						<div style={{ padding: '1rem' }}>
							<FormControl fullWidth>
								<Input
									type="text"
									placeholder="Search word"
									fullWidth
									margin="dense"
									name="search"
									onChange={(event) => {
										handleChange(event.target.value);
									}}
									endAdornment={
										<InputAdornment position="start">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => search()}
											>
												<Search />
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
							{dictionaryResult['title'] != null ? (
								<div style={errorStyle}>{dictionaryResult['title']}</div>
							) : (
								<div>
									{Object.keys(dictionaryResult).length > 0 && (
										<div>
											<div>
												<h4>{dictionaryResult[0].word}</h4>
											</div>
											<div>{dictionaryResult[0]?.meanings[0]?.definitions[0]?.definition}</div>
											<hr />
											<div>{dictionaryResult[0]?.meanings[0]?.definitions[0]?.example}</div>
											<hr />
											<div>{dictionaryResult[0].origin}</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles.blog_wrap}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div>
								{MyEditor && (
									<MyEditor
										data={blog.content === null ? undefined : blog.content}
										blogId={blog.id}
									/>
								)}
							</div>

							<div>
								<Dialog
									maxWidth="xl"
									open={openDialog}
									onClose={handleCloseDialog}
									aria-labelledby="max-width-dialog-title"
								>
									<DialogTitle id="customized-dialog-title">Media Gallery</DialogTitle>
									<DialogContent dividers>
										<div className={styles.no_image}>
											{uploadedFiles.length === 0 && (
												<>
													<div>No Images</div>
												</>
											)}

											{uploadedFiles.length > 0 && (
												<div
													style={{
														display: 'grid',
														padding: '6px 6px 6px',
														gridTemplateColumns: '1fr 1fr 1fr',
														margin: 'auto auto auto',
													}}
												>
													{uploadedFiles.map((file) => (
														<div key={file.public_id} className={styles.image_item}>
															<div
																className={styles.item_dots}
																onClick={(event) => handleClick(event, file)}
															>
																<Image
																	src="/static/images/down-arrow.svg"
																	alt="edit"
																	width="12px"
																	height="12px"
																/>
															</div>

															<Image
																cloudName={
																	process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
																}
																publicId={file.public_id}
																width="100"
																height="100"
																alt=""
																crop="scale"
															/>
														</div>
													))}
												</div>
											)}
										</div>
										<Menu
											id="simple-menu"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											elevation={2}
											onClose={handleClose}
										>
											{/* <MenuItem onClick={() => setThumbnail()}>Set as thumbnail</MenuItem> */}
											<MenuItem
												onClick={() =>
													autoSaveBlog(
														{
															blog_id: blogData?.id,
															req_data: {
																thumbnail: imageFile.url,
															},
														},
														{
															onSuccess: (response) => {
																setAnchorEl(null);
															},
														}
													)
												}
											>
												Set as thumbnail
											</MenuItem>
											<MenuItem onClick={handleClose}>
												<CopyToClipboard text={imageFile?.url} onCopy={() => setCopy(true)}>
													<Button>Copy url</Button>
												</CopyToClipboard>
											</MenuItem>
										</Menu>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleCloseDialog} color="primary">
											Back
										</Button>
									</DialogActions>
								</Dialog>
							</div>
						</div>
					</form>
				</div>
				<div className={showMetaSection ? `${styles.meta} ${styles.show_meta}` : `${styles.meta}`}>
					&nbsp;
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.rowGap}>
							<FormInputText
								name="title"
								control={control}
								onCustomChange={(e) => handleAutoSaveTitle(e)}
								label="SEO Blog Title"
								variant="standard"
							/>
						</div>
						<div className={styles.rowGap}>
							<FormInputText
								name="slug"
								control={control}
								onCustomChange={(e) => handleAutoSaveSlug(e)}
								label="Slug"
								variant="standard"
							/>
						</div>
						<div className={styles.rowGap}>
							<FormInputText
								name="description"
								control={control}
								onCustomChange={(e) => handleAutoSaveDescription(e)}
								label="SEO Blog Description"
								variant="standard"
							/>
						</div>
						<div className={styles.rowGap}>
							<InputLabel style={{ fontSize: '12px', marginBottom: '5px' }}>Feature Image</InputLabel>
							<div className={styles.article_thumbnail}>
								<div className={styles.image}>
									<ImageNext
										src={
											fetchLoading
												? 'https://res.cloudinary.com/sanjayaalam/image/upload/v1642773557/download_6_bx1wsa.png'
												: blogData.thumbnail
										}
                                        alt="thumbnail"
										width={150}
										height={150}
									/>
								</div>
							</div>
							<div className={styles.flex_end}>
								<Button onClick={handleOpenDialog} color="primary">
									On Change
								</Button>
							</div>
						</div>
						<div className={styles.rowGap}>
							<Autocomplete
								multiple
								id="tags-standard"
								freeSolo
								filterSelectedOptions
								fullWidth
								options={categories}
								onChange={(e, newValue) => handleAutoSaveCategory(newValue)}
								getOptionLabel={(option) => option.name}
								value={selectedCategorys}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="standard"
										placeholder="Select Categories"
										margin="normal"
										fullWidth
									/>
								)}
							/>
							{selectedCategorys.length > maxCat && (
								<div style={errorStyle}>Select maximum {maxCat} categories</div>
							)}
						</div>
						<div className={styles.rowGap}>
							<Autocomplete
								multiple
								id="tags-standard"
								freeSolo
								filterSelectedOptions
								fullWidth
								options={tags}
								onChange={(e, newValue) => handleAutoSaveTag(newValue)}
								getOptionLabel={(option) => option.name}
								value={selectedTags}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="standard"
										placeholder="Choose #Tags"
										margin="normal"
										fullWidth
									/>
								)}
							/>
							{selectedTags.length > maxTag && <p style={errorStyle}>Select maximum {maxTag} Tags</p>}
						</div>
						<div className={styles.rowGap}>
							<LocalizationProvider utils={DateFnsUtils}>
								<DatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Article Date"
									views={['year', 'month', 'date']}
									value={selectedDate}
									format="yyyy-MM-dd"
									onChange={handleAutoSaveDate}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
									fullWidth
								/>
							</LocalizationProvider>
						</div>
						<div className={styles.rowGap}>
							<FormInputDropdown
								name="author"
								control={control}
								width={'100%'}
								defaultValue={{ label: '', value: '' }}
								label="Select Author"
								onCustomChange={(e) => handleAutoSaveAuthor(e)}
							>
								{authors.map((author, index) => (
									<MenuItem key={index} value={author.first_name}>
										{author.first_name}
									</MenuItem>
								))}
							</FormInputDropdown>
						</div>
						<div className={styles.rowGap}>
							<div className={styles.blog_switch}>
								<div>
									<div className={styles.flex_center}>
										<div>
											<Controller
												name="is_author"
												control={control}
												render={({ field }) => <Switch {...field} />}
											/>
										</div>
										<div style={{ paddingTop: '5px' }}>Show author </div>
									</div>
								</div>
								<div>
									<div className={styles.flex_center}>
										<div>
											<Controller
												name="is_publish_date"
												control={control}
												render={({ field }) => <Switch {...field} />}
											/>
										</div>
										<div style={{ paddingTop: '5px' }}>Date published </div>
									</div>
								</div>
							</div>
						</div>
					</form>
					<div onClick={() => handleOpenDeleteDialog()} className={styles.blog_delete}>
						<Delete /> Delete Article
					</div>
				</div>
				<div className={showLayout ? `${styles.layout} ${styles.show_layout}` : `${styles.layout}`}>
					{chooseLayout()}
				</div>
			</div>
			<div
				className={
					showMetaSection || showLayout ? `${styles.right_side_menu_expand}` : `${styles.right_side_menu}`
				}
			>
				<div
					onClick={handleShowMetaSection}
					className={showMetaSection ? `${styles.menu_item} ${styles.selected}` : `${styles.menu_item}`}
				>
					<div className={styles.menu_label}>
						<Image src="/static/images/form.svg" alt="edit" width="30px" height="30px" />
						<div className={styles.menu_label_text}>SEO</div>
					</div>
				</div>
				<div
					onClick={handleShowLayout}
					className={showLayout ? `${styles.menu_item} ${styles.selected}` : `${styles.menu_item}`}
				>
					<div className={styles.menu_label}>
						<Image src="/static/images/layout.svg" alt="edit" width="30px" height="30px" />
						<div className={styles.menu_label_text}>Layout</div>
					</div>
				</div>
				{(showMetaSection || showLayout) && (
					<>
						<div onClick={handleCloseRightBar} className={styles.menu_item} style={{ marginTop: 'auto' }}>
							<Image src="/static/images/right_arrow.svg" alt="edit" width="30px" height="30px" />
						</div>
					</>
				)}
			</div>
			{openDeleteDialog && (
				<DeleteDialog
					open={openDeleteDialog}
					handleClose={handleCloseDeleteDialog}
					windowTitle="Delete this article?"
					deleteMessage="It will be un-published and deleted and wont be able to recover it."
					title={blogData?.title}
					confirmDelete={confirmDelete}
				/>
			)}
			<Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)}>
				<Alert elevation={6} onClose={() => setSnack(false)} variant="filled">
					{message}
				</Alert>
			</Snackbar>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				elevation={2}
				onClose={handleClose}
			>
				<MenuItem
					onClick={() =>
						autoSaveBlog(
							{
								blog_id: blogData?.id,
								req_data: {
									thumbnail: imageFile.url,
								},
							},
							{
								onSuccess: (response) => {
									setAnchorEl(null);
								},
							}
						)
					}
				>
					Set as thumbnail
				</MenuItem>

				<MenuItem onClick={handleClose}>
					<CopyToClipboard text={imageFile?.url} onCopy={() => setCopy(true)}>
						<Button>Copy url</Button>
					</CopyToClipboard>
				</MenuItem>

				<Divider />
				<MenuItem onClick={() => removeImage(imageFile)}>
					<span style={{ color: 'red', fontSize: '12px' }}>Delete</span>
				</MenuItem>
			</Menu>
		</>}
        </>
	);
}

async function getSignature(folderPath) {
	const response = await fetch(`/api/cloudinary/${folderPath}`);
	const data = await response.json();
	const { signature, timestamp } = data;
	return { signature, timestamp };
}
