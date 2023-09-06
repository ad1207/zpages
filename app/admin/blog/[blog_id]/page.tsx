'use client'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState, useEffect, use } from "react";
import { forceLogout } from "../../../../components/auth/auth";
import BlogView from "../../../../components/crud/Blog/blog-view";
import {jsonToHtml }from '../../../../components/utils/EditorJs/conversion'
import styles from '../../../../styles/Blog.module.scss'
import axios from "axios";
import { set } from "date-fns";
import { ca } from "date-fns/locale";

export default function Page({params}) {
    const blog_id = params.blog_id;
    const [blog, setBlog] = useState<any>({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [html, setHtml] = useState('');

    useEffect(() => {
        async function fetchData(){
            try{
                let resp = await axios.get(`/api/blog/blogByNano/${blog_id}`)
                setBlog(resp.data);
                if(resp.data.publish_content == null){
                    setIsEmpty(true);
                }else{
                    const resp2 = await jsonToHtml(resp.data.publish_content, resp.data.layout);
                    setHtml(resp2);
                }
                setIsLoading(false);
            }catch(error){
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [blog_id]);


    useEffect(() => {
		if (isError) {
			return forceLogout();
		}
	}, [isError]);

	const [value, setValue] = useState('desktop');

	const handleChange = (event) => {
		setValue(event.target.value);
	};
	return (
		<>
			<div className={styles.blog_view}>
				<div>
					<FormControl component="fieldset">
						<FormLabel component="legend">View</FormLabel>
						<RadioGroup
							aria-label="gender"
							name="controlled-radio-buttons-group"
							value={value}
							onChange={handleChange}
						>
							<FormControlLabel value="desktop" control={<Radio />} label="Desktop" />
							<FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
						</RadioGroup>
					</FormControl>
				</div>
				<BlogView blog={blog} html={html} isEmpty={isEmpty} view={value} />
			</div>
		</>
	);
}
