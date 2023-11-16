import { getBlogByNanoId } from "../../../../service/blog.service"
import { jsonToHtml } from "../../../../components/utils/EditorJs/conversion";


export default async function Page({ params }){
    const { blog_id } = params;
    const blog = await getBlogByNanoId(blog_id);
    console.log('blog --->', blog);
    if(blog.published !== 'Y' ){
        return <div>Blog not found</div>
    }
    else{
        var html = await jsonToHtml(blog.publish_content, blog.layout);
        return (
            <div>
                <h1>Todos</h1>
    
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        )
    }
    
}