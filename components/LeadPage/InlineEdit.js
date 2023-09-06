'use client'
import { useCallback, useEffect, useRef, useState } from 'react';

function InlineEdit(props) {
	const [isInputActive, setIsInputActive] = useState(false);
	const [inputValue, setInputValue] = useState(props.text);

	const wrapperRef = useRef(null);

	const inputRef = useRef(null);

	const { onSetText } = props;

	useEffect(() => {
		setInputValue(props.text);
		onSetText(props.text);
	}, [onSetText, props.text]);

	// focus the cursor in the input field on edit start
	useEffect(() => {
		if (isInputActive) {
			inputRef.current.focus();
		}
	}, [isInputActive]);

	const handleInputChange = useCallback(
		(event) => {
			// sanitize the input a little
			//   setInputValue(DOMPurify.sanitize(event.target.value));
			setInputValue(event.target.value);
			onSetText(event.target.value);
		},
		[onSetText]
	);

	const handleSpanClick = useCallback(() => setIsInputActive(true), [setIsInputActive]);

	return (
		<span className="inline-text" ref={wrapperRef}>
			<input
				ref={inputRef}
				// set the width to the input length multiplied by the x height
				// it's not quite right but gets it close
				style={{ minWidth: Math.ceil(inputValue.length) + 'ch' }}
				value={inputValue}
				onChange={handleInputChange}
				className={`inline-text_input inline-text_input--${isInputActive ? 'active' : 'hidden'}`}
			/>
		</span>
	);
}

export default InlineEdit;
