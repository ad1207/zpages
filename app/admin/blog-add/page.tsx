'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, FormControl, Input, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, InputLabel, Snackbar, TextField, Alert, Autocomplete, Checkbox, Switch } from "@mui/material";
import { Search, Adb, AdUnits, Delete } from "@mui/icons-material";
import axios from "axios";
import {Image} from 'cloudinary-react'
import { useState,useCallback,useEffect } from "react";
import { useRouter } from "next/navigation";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useDropzone } from "react-dropzone";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import * as yup from "yup";
import { format, parseISO } from 'date-fns';
import { useSnapshot } from "valtio";
import { forceLogout } from "../../../components/auth/auth";
import { FormInputText } from "../../../components/forms/FormInputText";
import { FormInputDropdown } from "../../../components/forms/FormInputDropdown";
import DeleteDialog from "../../../components/elements/ui/Dialog/DeleteDialog";
import { useAddBlog } from "../../../hooks/blog-hook";
import {getAllTags} from '../../../service/tag.service'
import styles from '../../../styles/Blog.module.scss'
import styles_drop_zone from '../../../styles/dropZone.module.css';
import { content } from "../../../utils/content";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation'
import MyEditor from '../../../components/Editor'

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

type ErrorSummaryProps<T> = {
	errors: FieldErrors<T>;
};

type ErrorMessageContainerProps = {
	children?: React.ReactNode;
};

const ErrorMessageContainer = ({ children }: ErrorMessageContainerProps) => <span className="error">{children}</span>;

export default function Index() {
	const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState(null);
    const [blog, setBlog] = useState(null);
    const [categories, setCategories] = useState(null);
    const [tags, setTags] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [images, setImages] = useState(null);
    const repo = searchParams.get('repo');
    const [user_id, setUserId] = useState(null);
    const [company_id, setCompanyId] = useState(null);
    const [selectedTag, setSelectedTag] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const [repo_nano, setRepoNano] = useState(null);
    const [accessRights, setAccessRights] = useState(null);

	const [anchorEl, setAnchorEl] = useState(null);
	const [imageFile, setImageFile] = useState<any>();
	const [currentBlog, setCurrentBlog] = useState<any>({});
	const [unsplashImage, setUnsplashImage] = useState(images);
	let maxCat = 3;
	let maxTag = 15;
	const handleClose = () => {
		setAnchorEl(null);
	};

    useEffect(() => {
		if (isError) {
			return forceLogout();
		}
	}, [isError]);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/auth/user');
                setUser(response.data);
                setUserId(response.data.user.id);
                
                setCompanyId(response.data.user.company_id);
                setAccessRights(response.data.user.access_rights);
                const response1 = await axios.get(`/api/author/company`);
                setAuthors(response1.data);
                const response2 = await axios.get(`/api/category`);
                setCategories(response2.data.categories);
                const response3 = await axios.get(`/api/tag/${company_id}`);
				console.log('test response3--->', response3.data)
                setTags(response3.data);
                let unsplash = await axios.get(
                    `https://api.unsplash.com/photos/?client_id=xEgxLpBbjc6QDigyUa6pNU7dWdaA2HoQTE8bIGVSnkI`
		        );
                setUnsplashImage(unsplash.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    const [baseRequest, setBaseRequest] = useState(null);

    useEffect(() => {
        let request = {
            company_id,
            user_id,
            repo_id: repo,
        };
        setBaseRequest(request);
    }, [company_id, user_id, repo]);

	
	const setThumbnail = async () => {
		let request = {
			id: currentBlog.id,
			thumbnail: imageFile.url,
		};

		let resp = await axios.put(`/api/blog/updateThumb`, request);
		console.log('test response thumbail 2--->', resp);
		if (resp.status === 200) {
			setCurrentBlog(resp.data);
			setAnchorEl(null);
		}
	};

	const [snack, setSnack] = useState(false);
	const [message, setMessage] = useState('');
	const uploadLimit = 10;

	const [uploadedFiles, setUploadedFiles] = useState([]);

	const [selectedTags, setSelectedTags] = useState([]);
	const [selectedCategorys, setSelectedCategorys] = useState([]);
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
	} = useForm<FormData>({ mode: 'onTouched', resolver: yupResolver(schema) });

	const [copy, setCopy] = useState(false);

	const [selectedDate, setSelectedDate] = useState(null);
	const [formattedDate, setFormattedDate] = useState(null);
	const { mutate: autoSaveBlog, isLoading: blogLoading } = useAddBlog();

	const handleDateChange = async (date) => {
		setSelectedDate(date);
		setFormattedDate(format(date, 'MMM dd, yyyy'));
		let request = {
			id: currentBlog.id,
			blogDate: parseISO(selectedDate),
		};
		let resp = await axios.put(`/api/blog/autoSaveBlogDate`, request);
	};

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

	//cloudinary delete image
	const removeImage = async (file) => {
		const data = { publicId: file.public_id, folder: file.folder, operation: 'DELETE' };

		const response = await axios.post(`/api/blog`, data);
		setUploadedFiles([...response.data]);
		// setAnchorEl(null);
	};

	//cloudinary
	const onDrop = async (acceptedFiles) => {
			// let path = `C${company_id}/B${blog.id}/`;
			let path = 'test/';
			acceptedFiles.forEach(async (acceptedFile) => {
				const formData = new FormData();
				formData.append('file', acceptedFile);
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
		}
	
	

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

	// initialGroup[blog.layout.toString().toLowerCase().replace('_', ' ')] = true;
	const [layoutGroup, setLayoutGroup] = useState(null);

	const handleLayout = async (event) => {
		setLayoutGroup({ ...group, [event.target.name]: true });
		await autoSaveBlog(
			{
				...baseRequest,
				req_data: {
					layout: event.target.name.toString().toLowerCase().replace(' ', '_'),
				},
			},
			{
				onSuccess: (response, _variable) => {
					setBaseRequest({ ...baseRequest });
					// setCurrentBlog(response.data);
					router.push(`/admin/blog-edit/${response?.blog_id}`);
				},
			}
		);
	};

	const handleAutoSaveTitle = async (event) => {
		setValue('title', event.target.value);
		if (event.target.value.length === 1)
			await autoSaveBlog(
				{
					...baseRequest,
					req_data: {
						title: event.target.value,
					},
				},
				{
					onSuccess: (response, _variable) => {
						setBaseRequest({ ...baseRequest });
						router.push(`/admin/blog-edit/${response?.blog_id}`);
					},
				}
			);
	};

	const handleAutoSaveSlug = async (event) => {
		setValue('slug', event.target.value);
		if (event.target.value.length === 1)
			autoSaveBlog(
				{
					...baseRequest,
					req_data: {
						slug: event.target.value,
					},
				},
				{
					onSuccess: (response, _variable) => {
						setBaseRequest({ ...baseRequest });
						router.push(`/admin/blog-edit/${response?.blog_id}`);
					},
				}
			);
	};
	const handleAutoSaveDescription = async (event) => {
		setValue('description', event.target.value);
		if (event.target.value.length === 1)
			autoSaveBlog(
				{
					...baseRequest,
					req_data: {
						description: event.target.value,
					},
				},
				{
					onSuccess: (response, _variable) => {
						setBaseRequest({ ...baseRequest });
						router.push(`/admin/blog-edit/${response?.blog_id}`);
					},
				}
			);
	};
	const handleAutoSaveDate = async (event) => {
		setValue('blogDate', selectedDate);
		autoSaveBlog(
			{
				...baseRequest,
				req_data: {
					blogDate: selectedDate,
				},
			},
			{
				onSuccess: (response, _variable) => {
					setBaseRequest({ ...baseRequest });
					router.push(`/admin/blog-edit/${response?.blog_id}`);
				},
			}
		);
	};

	const handleAutoSaveAuthor = async (event) => {
		setValue('author', event.target.value);
		autoSaveBlog(
			{
				...baseRequest,
				req_data: {
					author: event.target.value,
				},
			},
			{
				onSuccess: (response, _variable) => {
					setBaseRequest({ ...baseRequest });
					router.push(`/admin/blog-edit/${response?.blog_id}`);
				},
			}
		);
	};

	const handleAutoSaveCategory = async (value) => {
		setSelectedCategorys(value);
		let tempCatIds = value.map((o) => Number(o.id));
		let uniqCategorys = Array.from(new Set(tempCatIds));
		if (value.length <= maxCat)
			autoSaveBlog(
				{
					...baseRequest,
					req_data: {
						category: uniqCategorys,
					},
				},
				{
					onSuccess: (response, _variable) => {
						setBaseRequest({ ...baseRequest });
						router.push(`/admin/blog-edit/${response?.blog_id}`);
					},
				}
			);
	};

	const handleAutoSaveTag = async (value) => {
		setSelectedTags(value);
		let tempTagIds = value.map((o) => Number(o.id));
		let uniqTag = Array.from(new Set(tempTagIds));
		if (value.length <= maxTag)
			autoSaveBlog(
				{
					...baseRequest,
					req_data: {
						tag: uniqTag,
					},
				},
				{
					onSuccess: (response, _variable) => {
						setBaseRequest({ ...baseRequest });
						router.push(`/admin/blog-edit/${response?.blog_id}`);
					},
				}
			);
	};
	//layout option
	const chooseLayout = () => {
		return (
			<div className={styles.layout_list}>
				{Object.keys(layoutGroup).map((key, index) => (
					<div className={styles.layout_grid} key={index}>
						<Checkbox
							checked={layoutGroup[key]}
							onChange={handleLayout}
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
		let response = await axios.delete(`/api/blog/${currentBlog.id}`);
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
											height="100"
											alt=""
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
											height="100"
											alt=""
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
    if(loading){
        return <div>Loading...</div>
    }
	return (
		<>
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
					<form>
						<div>
							<div>
								
									<MyEditor repo={repo} mode="add" company_id={company_id} user_id={user_id} />
								
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
											<MenuItem onClick={() => setThumbnail()}>Set as thumbnail</MenuItem>
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
					<form>
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
								{/* <div className={styles.image}>
                                    <ImageNext src={currentBlog.thumbnail} width={'150px'} height={'150px'} />
                                </div> */}
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
							{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Article Date"
									views={['year', 'month', 'date']}
									value={selectedDate}
									format="yyyy-MM-dd"
									onChange={handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
									fullWidth
								/>
							</MuiPickersUtilsProvider> */}
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
								{authors?.map((author, index) => (
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
					{/* {chooseLayout()} */}
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
					title={currentBlog?.title}
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
				<MenuItem onClick={() => setThumbnail()}>Set as thumbnail</MenuItem>
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
		</>

	);
}

async function getSignature(folderPath) {
	const response = await fetch(`/api/cloudinary/${folderPath}`);
	const data = await response.json();
	const { signature, timestamp } = data;
	return { signature, timestamp };
}
