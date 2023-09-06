import styled from "@emotion/styled";
import Image from "next/image";
import { useRive, useStateMachineInput } from "rive-react";

const HeaderCom = (props) => {
	// const [data,setData]=useState(props.data)

	const { company, blocks, imageUrl, backgroundImage, key, index, style, mode } = props;
	let defaultUrl = 'https://res.cloudinary.com/sanjayaalam/image/upload/v1623824061/bei5qfeikwisuvmi4t3c.jpg';

	if (mode === "view")
		style["pointerEvents"] = "none"

	const handleEvent = (event, position) => {
		console.log('check value--->', event);
		if (mode === "edit") {
			event.preventDefault();

			const tags = document.querySelectorAll('.clicked');

			for (let i of tags) {
				i.classList.remove('clicked');
			}

			event.target.classList.add('clicked');
			props.onHandle(event.target.childNodes[0].data, position, index);
		}
	};

	const Header = styled.div`
	padding: 20px;
	color: ${(props) => props.color};
	font-size: 20px;
	text-align: ${(props) => props.alignment};
	${ mode === "edit" ? `&:hover {
		outline-style: solid;
		outline-color: #0000ff;
	}` : ''}
`;

	const Content = styled.div`
	margin-top: 40px;
	padding: 20px;
	color: black;
	font-size: 20px;
	${ mode === "edit" ? `&:hover {
		outline-style: solid;
		outline-color: #0000ff;
	}` : ''}
`;

	// const { rive, RiveComponent } = useRive({
	// 	src: 'https://cdn.rive.app/animations/vehicles.riv',
	// 	// src: "add-icon-demo.riv",
	// 	autoplay: false,
	// });

	// const { RiveComponent, rive } = useRive({
	// 	src: './../../../bike.riv',
	// 	autoplay: false,
	// 	layout: new Layout({
	// 		fit: Fit.ScaleDown,
	// 		alignment: Alignment.BottomCenter,
	// 	})
	// });

	const STATE_MACHINE_NAME = 'State Machine 1';
	const ON_HOVER_INPUT_NAME = 'Hover';
	const ON_PRESSED_INPUT_NAME = 'Pressed';

	const { RiveComponent, rive } = useRive({
		src: './../../../like.riv',
		stateMachines: STATE_MACHINE_NAME,
		artboard: 'New Artboard',
		autoplay: true,
	});

	const onHoverInput = useStateMachineInput(
		rive,
		STATE_MACHINE_NAME,
		ON_HOVER_INPUT_NAME
	);
	const onPressedInput = useStateMachineInput(
		rive,
		STATE_MACHINE_NAME,
		ON_PRESSED_INPUT_NAME
	);

	function onMouseEnter() {
		onHoverInput.value = true;
	}

	function onMouseLeave() {
		onHoverInput.value = false;
	}

	function onMouseDown() {
		onPressedInput.value = true;
	}

	function onMouseUp() {
		onPressedInput.value = false;
	}

	return (
		<div style={style}>
			<Header color='red' alignment='center' style={{ ...company.style }}>
				<span onClick={(event) => handleEvent(event, 0, "text")}>{company.value}</span>
			</Header>
			<div
				style={{
					backgroundImage: `url(${backgroundImage === undefined ? defaultUrl : backgroundImage})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					//   height: "100vh",
				}}
				key={key}>
				<Content style={{ ...blocks.style }}>
					<span onClick={(event) => handleEvent(event, 1, "text")}>{blocks.value}</span>
				</Content>
			</div>
			{/* <div style={{ padding: "3rem" }}>
				<SubscriptionForm company_id={5} lead_id={15} />
			</div> */}
			{/* <div style={{ width: "100%", minHeight: "100vh" }}>
				<RiveComponent
					onClick={() => rive && rive.readyForPlaying()}
				// onDoubleClick={() => rive && rive.pause()}
				/>
			</div> */}

			{/* <div style={{ height: '500px', width: '1000px' }}>
				<RiveComponent
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}
				/>
			</div> */}


			{/* <div style={{ height: '500px', width: '500px' }}>
				<RiveComponent />
				<button onClick={onButtonClick}>{buttonText}</button>
			</div> */}
			<div id='image'>
				<Image src={imageUrl === undefined ? defaultUrl : imageUrl} alt='Picture of the author' width={300} height={300} />
			</div>
			{/* <Template /> */}
		</div>
	);
};

export default HeaderCom;
