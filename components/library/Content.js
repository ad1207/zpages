import { useState } from "react";
import styled from "@emotion/styled";
import Option from "./option";

const ContentPage = (props) => {
    let section = "Content";
    const { content, title, key, index, style, mode, cta_button } = props
    const [mouseOver, setMouseOver] = useState(false)
    const handleMouseOver = (flag) => {
        setMouseOver(flag);
    }

    if (mode === "view")
        style["pointerEvents"] = "none"

    const handleEvent = (event, position, type) => {
        if (mode === "edit") {
            event.preventDefault();
            const tags = document.querySelectorAll('.clicked');

            for (let i of tags) {
                i.classList.remove('clicked');
            }

            event.target.classList.add('clicked');
            props.onHandle(event.target.childNodes[0].data, position, index, type)
        }
    }

    const Content = styled.div`
	margin-top: 40px;
	padding: 20px;
	color: black;
	font-size: 20px;
    ${ mode === "edit" ? `&:hover {
		outline-style: solid;
		outline-color: #0000ff;
	}

	&:focus {
		outline-style: solid;
		outline-color: #0000ff;
	}` : ''}
`;

    const Header = styled.div`
padding:10px;
font-size: 35px;
font-weight:bold;
font-family: 'Layout', sans-serif;
color: black;

${ mode === "edit" ? `&:hover {
    outline-style: solid;
    outline-color: #0000ff;
}` : ''}
  `;

    // display: inline-block;
    const Button = styled.a`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ;
  border-radius: 3px;
  
  ${ mode === "edit" ? `&:hover {
    outline-style: solid;
    outline-color: #0000ff;
}` : ''}
  `;

    const Container = styled.div`
padding:2rem;
display:grid;
grid-template-columns: 1fr 3fr;
text-align:center;`;
    return (
        <>
            < div onMouseOver={() => handleMouseOver(true)} onMouseOut={() => handleMouseOver(false)}>
                {/* {mouseOver && <Option section={section} />} */}
                {mode === "edit" && <Option sectionName={section} index={index} />}

                < Container style={style}>

                    <Header style={title.style}>
                        <span onClick={(event) => handleEvent(event, 0, "text")}>{title.value}</span>
                    </Header>
                    <div>
                        <Content key={key} style={content.style}>
                            <span onClick={(event) => handleEvent(event, 1, "text")}>{content.value}</span>
                        </Content>
                        <div onClick={(event) => handleEvent(event, 2, 'hyper-link')}>
                            <Button href={cta_button.value} style={cta_button.style}>{cta_button.label}</Button>
                        </div>
                    </div>

                </Container>
            </div>
        </>
    );
};

export default ContentPage;