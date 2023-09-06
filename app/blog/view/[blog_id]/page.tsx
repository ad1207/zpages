import { getBlogByNanoId } from "../../../../service/blog.service"



export default async function Page({ params }){
    const { blog_id } = params;
    const blog = await getBlogByNanoId(blog_id);
    console.log('blog --->', blog);
    if(blog.publish_content == null){
        return <div>Blog not found</div>
    }
    else{
        var html = blog.publish_content;
        return (
            <div>
                <h1>Todos</h1>
    
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        )
    }
    
}