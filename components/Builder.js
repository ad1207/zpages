'use client'
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { motion, useCycle } from "framer-motion";
import Image from "next/image";
import { useRive, useStateMachineInput } from "rive-react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import GpButton from "./library/CtaButton/GpButton";
import styles from "../styles/Subscription.module.scss";

const Subscription = (props) => {
	let section = 'Subscription';
	let company_id = 1;
	let lead_id = 4;
	const { title, subTitle, key, index, style, mode, logo, buttonLabel } = props;
	console.log('check style data 2---->', style);
	const [animation, cycleAnimation] = useCycle('animationOne', 'animationTwo');

	const handleEvent = (event, position, type) => {
		if (mode === 'edit') {
			event.preventDefault();

			const tags = document.querySelectorAll('.clicked');

			for (let i of tags) {
				i.classList.remove('clicked');
			}

			event.target.classList.add('clicked');
			props.onHandle(
				type === 'image' ? event.target.currentSrc : event.target.childNodes[0].data,
				position,
				index,
				type
			);
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	// const onSubmit = async (data) => {
	//     console.log("test form data----->", data)
	// };

	const onSubmit = async (data) => {
		console.log('test form data----->', data);
		let requestObj = { ...data, company_id, lead_id };
		let response = await axios.post('/api/subscription', requestObj);
		console.log('response data test--->', response);
		if (response.status === 201) {
			reset();
			showMessage(true, 'Subscription added successfully');
		} else if (response.status === 200) {
			reset();
			showMessage(true, response.data.errors[0]);
		}
	};

	const [isSuccess, setIsSuccess] = useState(false);
	const [message, setMessage] = useState('');

	const showMessage = (flag, data) => {
		setMessage(data);
		setIsSuccess(flag);
		setTimeout(() => {
			setIsSuccess(false);
		}, 5000);
	};

	let successStyle = {
		color: 'red',
		content: '⚠ ',
	};

	const GPTitle = styled.div`
		font-size: large;
		font-weight: bold;
		padding-bottom: 1rem;
		white-space: pre-line;

		${mode === 'edit'
			? `&:hover {
                outline-style: solid;
                outline-color: #0000ff;
            }`
			: ''}
	`;

	const GPSubTitle = styled.div`
		font-size: medium;
		padding-bottom: 1rem;
		white-space: pre-line;

		${mode === 'edit'
			? `&:hover {
            outline-style: solid;
            outline-color: #0000ff;
            }`
			: ''}
	`;

	const GPBox = styled.div`
		position: relative;
		padding-top: 150px;
		padding-right: 200px;
	`;

	const BannerVariants = {
		animationOne: { x: -250, opacity: 1, transition: { duration: 0.5 } },
		animationTwo: {
			y: [0, -20],
			opacity: 1,
			transition: { yoyo: Infinity, ease: 'easeIn' },
		},
	};

	const STATE_MACHINE_NAME = 'State Machine 1';

	const { RiveComponent, rive } = useRive({
		src: './../../../logistic_box.riv',
		stateMachines: STATE_MACHINE_NAME,
		artboard: 'New Artboard',
		autoplay: true,
	});

	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		reset();
		setOpenDialog(false);
	};

	return (
		<div className={styles.imageStack}>
			<div className={styles.subcontainer}>
				<div style={{ paddingLeft: '15px', paddingTop: '20px' }}>
					<div onClick={(event) => handleEvent(event, 2, 'image')}>
						<Image src={logo} alt="logo" height={50} width={50} />
					</div>
				</div>
				<div className={styles.rive}>
					<RiveComponent />
				</div>
			</div>
			<GPBox>&nbsp;</GPBox>
			<GPBox>
				<form onSubmit={handleSubmit(onSubmit)}>
					<motion.h1
						initial={mode === 'view' ? { y: -1000 } : false}
						animate={{ y: 0 }}
						transition={{
							type: 'tween',
							duration: '1',
							delay: '1',
						}}
					>
						<GPTitle style={title.style}>
							<span onClick={(event) => handleEvent(event, 0, 'text')}>{title.value}</span>
						</GPTitle>
					</motion.h1>

					<GPSubTitle style={subTitle.style}>
						<span onClick={(event) => handleEvent(event, 1, 'text')}>{subTitle.value}</span>{' '}
					</GPSubTitle>

					<div className={styles.form_gap}>
						<TextField
							type="email"
							label="Email Address"
							variant="outlined"
							margin="dense"
							name="email"
							style={{ width: '100%' }}
							autoComplete="off"
							{...register('email')}
						/>
					</div>
					{isSuccess && <p style={successStyle}>{message}</p>}
					<div className={styles.form_gap}>
						<div onClick={(event) => handleEvent(event, 3, 'ctaButton')}>
							<GpButton type="submit" label={buttonLabel} style={style} />
						</div>
					</div>
					<div styles={{ paddingTop: '10px' }}>
						<Button
							variant="contained"
							onClick={handleOpenDialog}
							color="primary"
							style={{ width: '100%' }}
						>
							Schedule Meeting
						</Button>
					</div>
					<div className={styles.helper_text}>{`We don't share email with anyone`}</div>
				</form>
			</GPBox>

			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogContent style={{ width: '500px' }}>
					<div className={styles.dialog_pop}>
						<div style={{ fontSize: '20px' }}>Schedule Meeting</div>
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
					<div>
						<iframe src="http://localhost:3002/sanjay" frameBorder="0" allowFullScreen></iframe>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Subscription;
