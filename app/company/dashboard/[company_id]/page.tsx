import { getBlogsByCompany } from "../../../../service/blog.service";
import {getList, getByNanoWithAssociation} from '../../../../service/company.service'
import styles from '../../../../styles/blog-format/format0.module.scss'
import Format from '../../../../components/blogFormat/Format'
import Format1 from '../../../../components/blogFormat/Format1'

export default async function Page({params}){
    const { company_id: company_nano } = params;
    const result = await getByNanoWithAssociation(company_nano);
    const company = result;
    const company_id = company.id;
    const blogs = await getBlogsByCompany(company_id);
    return (
        <>
            {company.blog_home_format === 'format-0' && <Format blog_format={company.blog_home_format} blogs={blogs} />}
            {company.blog_home_format === 'format-1' && <Format1 blog_format={company.blog_home_format} blogs={blogs} />}
        </>
    )
}