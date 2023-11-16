import ModelOne from '../../../components/modelOne'
import ModelTwo from '../../../components/modelTwo'
import ModelThree from '../../../components/modelThree'
import { getByNanoWithAssociation } from '../../../service/company.service';
import { getBlogsByCompany } from '../../../service/blog.service';
import { getCategoriesByCompany } from '../../../service/category.service';
import { getlatestCategoryWithBlog } from '../../../service/category.service';
export default async function Page({params}){
    const { company_id: company_nano } = params;
    const result = await getByNanoWithAssociation(company_nano);
    const company = result;
    const company_id = company.id;
    const blogs = await getBlogsByCompany(company_id);
    const categories = await getCategoriesByCompany(company_id);
    const data = await getlatestCategoryWithBlog(company_id);
    return (
        <>
            {company.blog_home_format === 'format-0' && <ModelOne blog_format={company.blog_home_format} blogs={blogs} />}
			{company.blog_home_format === 'format-1' && <ModelTwo blog_format={company.blog_home_format} blogs={blogs} />}
			{company.blog_home_format === 'format-2' && <ModelThree blog_format={company.blog_home_format} data={data} categories={categories} blogs={blogs} />}
        </>
    )
}