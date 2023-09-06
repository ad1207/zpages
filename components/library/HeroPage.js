import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import styles from '../../styles/components/HeroPage.module.scss';
import Option from './option';

const Container = styled.div`
	padding: 2rem;
	text-align: center;
`;

const Hero = (props) => {
	let section = 'Hero';
	const { title, content, index, key, style, backgroundImage, mode, cta_button } = props;
	console.log('check index value ----->', index);
	const [mouseOver, setMouseOver] = useState(false);
	const handleMouseOver = (flag) => {
		setMouseOver(flag);
	};

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

	const Content = styled.div`
		margin-top: 40px;
		padding: 20px;
		color: black;
		font-size: 20px;
		${mode === 'edit'
			? `&:hover {
		outline-style: solid;
		outline-color: #0000ff;
	}

	&:focus {
		outline-style: solid;
		outline-color: #0000ff;
	}`
			: ''}
	`;

	const Header = styled.div`
		padding: 10px;
		font-size: 35px;
		font-family: 'Layout', sans-serif;
		color: black;

		${mode === 'edit'
			? `&:hover {
		outline-style: solid;
		outline-color: #0000ff;
	}`
			: ''}
	`;

	// display: inline-block;
	const Button = styled.a`
		color: palevioletred;
		font-size: 1em;
		margin: 1em;
		padding: 0.25em 1em;
		border: 2px solid;
		border-radius: 3px;

		${mode === 'edit'
			? `&:hover {
		outline-style: solid;
		outline-color: #0000ff;
	}`
			: ''}
	`;

	const Image = styled.div`
		padding: 10px;

		${mode === 'edit'
			? `&:hover {
		outline-style: solid;
		outline-color: #0000ff;
	}`
			: ''}
	`;

	return (
		<div className={styles.imageStack}>
			<div className={styles.box}>
				{/* <p style={{ position: 'absolute', display: 'grid', zIndex: '99' }}>THIS IS A TEST</p> */}
				<Container
					style={{ position: 'absolute', display: 'grid', zIndex: '99' }}
					onMouseOver={() => handleMouseOver(true)}
					onMouseOut={() => handleMouseOver(false)}
				>
					{mode === 'edit' && <Option section={section} index={index} />}
					<Header style={title.style}>
						<span onClick={(event) => handleEvent(event, 0, 'text')}>{title.value}</span>
					</Header>
					<Content key={key} style={content.style}>
						<span onClick={(event) => handleEvent(event, 1, 'text')}>{content.value}</span>
					</Content>

					<Image onClick={(event) => handleEvent(event, 2, 'image')} alt="">
						<Image src={backgroundImage} alt="bg" width={300} height={400} />
					</Image>

					<div onClick={(event) => handleEvent(event, 3, 'hyper-link')}>
						<Button href={cta_button.value} style={cta_button.style}>
							{cta_button.label}
						</Button>
					</div>
				</Container>
				{style.backgroundImage !== null && (
					<div onClick={(event) => handleEvent(event, 111, 'image')}>
						<Image
							alt="Mountains"
							src={style.backgroundImage}
							layout="responsive"
							width={700}
							height={550}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Hero;
