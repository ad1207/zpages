import {useRouter} from 'next/navigation'
import { useRef, useCallback } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import {useAddBlog, useAutoSaveBlog} from '../hooks/blog-hook'
import EDITOR_JS_TOOLS from './utils/constants'
import {content} from '../utils/content'

const ReactEditorJS = createReactEditorJS();

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		const context = this;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			func.apply(context, args);
		}, wait);
	};
}

function MyEditor({ data = null, blogId = null, repo = null, mode = 'edit', user_id = null, company_id = null }) {
	const editorCore = useRef(null);
    const router = useRouter()
	const handleInitialize = useCallback((instance) => {
		editorCore.current = instance;
	}, []);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	let requestData = {
		repo_id: repo,
		company_id: company_id,
		user_id: user_id,
	};

	const { mutate: addBlog, isLoading: blogAddLoading } = useAddBlog();
	const { mutate: autoSaveBlog, isLoading: blogAutoSaveLoading } = useAutoSaveBlog();

	const saveBlog = useCallback(async () => {
		const savedData = await editorCore.current.save();
		content.obj = savedData;
		if (blogId !== null) {
			autoSaveBlog({
				blog_id: blogId,
				req_data: {
					content: savedData,
				},
			});
		} else {
			if (savedData.blocks.length > 0)
				addBlog(
					{
						...requestData,
						req_data: {
							content: savedData,
						},
					},
					{
						onSuccess: (response, _variable) => {
							router.push(`/admin/blog-edit/${response?.blog_id}`);
						},
					}
				);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addBlog, autoSaveBlog, blogId, requestData]);

	const handleSave = async () => {
		const savedData = await editorCore.current.save();
		console.log('savedData', savedData);
		content.obj = savedData;
		let request = {
			id: blogId,
			content: savedData,
		};
		let resp = null;
		let blog = null;

		if (mode === 'add' && savedData.blocks.length > 0) {
			addBlog(
				{
					...requestData,
					req_data: {
						content: savedData,
					},
				},
				{
					onSuccess: (response, _variable) => {
						router.push(`/admin/blog-edit/${response?.blog_id}`);
					},
				}
			);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceOnChange = useCallback(debounce(saveBlog, 5000), []);

	return (
		<>
			<ReactEditorJS
				onChange={mode === 'add' ? handleSave : (e) => debounceOnChange()}
				onInitialize={handleInitialize}
				tools={EDITOR_JS_TOOLS}
				//  readOnly= {true}
				placeholder={'Let`s write an awesome story!'}
				data={data === undefined || data == null ? jsonData : data}
				// onReady={handleReady}
			/>
		</>
	);
}

export default MyEditor;

const jsonData = {
	time: 1633350325493,
	blocks: [],
	version: '2.22.2',
};
