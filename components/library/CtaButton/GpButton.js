import styled from 'styled-components'


const GpButton = (props) => {

    const { label, type, variant, color, width, style } = props
    // background-color: black;
    console.log("check style data ---->", style)

    const Button = styled.button`
            font-size: 20px;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0px;
            cursor: pointer;
            `;
    if (type === undefined) {
        return (
            <>
                <Button
                    style={{
                        ...style,
                        width: width === undefined ? '100%' : width
                    }}
                >{label}</Button>
            </>
        )
    } else if (type === 'submit') {
        return (
            <>
                <Button
                    style={{
                        ...style,
                        width: width === undefined ? '100%' : width
                    }}
                    type="submit"
                >{label}</Button>
            </>

        )
    }



}

export default GpButton;