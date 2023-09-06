import {
    getRepoBlogSummary,
    getBlogsByCompany,
    validation,
    createBlogEntry,
    getBlogById,
    getBlogsByRepo,
    getBlogByNanoId,
    updateThumbnail,
    updateContent,
    updateLayout,
    getAllBlogs,
    publishBlog,
    updateTitle,
    updateAuthor,
    updateBlogDate,
    updateDescription,
    updateSlug,
    updateCategory,
    updateTag,
    getBlogsByCategory,
    deleteBlogById,
    updateViewCount,
    updateFeature,
    autoSave,
    createPublishedBlogByCompany,
    addBlog
  } from '../../../../service/blog.service';

import { auth } from '../../../../middleware/auth';
import { NextResponse } from 'next/server';
import { as } from 'pg-promise';


export async function GET(request, ctx) {
    try{
    request.params = ctx.params;
    await auth(request);
    let company_id = request.user.company_id;
    let user_id = request.user.id;
    let slug = request.params.slug;
    if (slug[0] === "company") {
        const result = await getBlogsByCompany(slug[1]);
        //res.status(200).json(result);
        return NextResponse.json(result, {status: 200});
      } else if (slug[0] === "blogid") {
        const result = await getBlogById(slug[1]);
        //res.status(200).json(result);
        return NextResponse.json(result, {status: 200});
      } else if (slug[0] === "blogByNano") {
        const result = await getBlogByNanoId(slug[1]);
        //res.status(200).json(result);
        return NextResponse.json(result, {status: 200});
      } else if (slug[0] === "new") {
        const result = await createBlogEntry(company_id, slug[1], user_id);
        //res.status(200).json(result);
        return NextResponse.json(result, {status: 200});
      } else if (slug[0] === "repo") {
        const result = await getBlogsByRepo(slug[1]);
        //res.status(200).json(result);
        return NextResponse.json(result, {status: 200});
      } else if (slug[0] === "category") {
        const result = await getBlogsByCategory(slug[1]);
        //res.status(200).json(result);
        return NextResponse.json(result, {status: 200});
      }
      else{
        return NextResponse.json([], {status: 401});
      }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json([], {status: 401});
    }
}


export async function POST(request, ctx) {
    try{
        request.params = ctx.params;
        await auth(request);
        const slug = request.params.slug;
        const body = await request.json();
        if(slug[0] === "add"){
            const result = await addBlog(body);
            return NextResponse.json(result, {status: 200});
        }
        else if (slug[0] === "page") {
            const result = await createPublishedBlogByCompany(body);
            return NextResponse.json(result, {status: 200});
        } 
        else {
            return NextResponse.json([], {status: 401});
        }
    }
    catch(err){
        console.log("error ----> ",err)
        return NextResponse.json([], {status: 401});
    }
}

export async function PUT(request, ctx) {
  try{
    request.params = ctx.params;
    await auth(request);
    const { slug } = ctx.params;
    const body = await request.json();
    if (slug[0] === "updateThumb") {
      const { id, thumbnail } = body;
      const result = await updateThumbnail(id, thumbnail);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "updateContent") {
      const { id, content } = body;
      const result = await updateContent(id, content);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "updateLayout") {
      const { id, layout } = body;
      const result = await updateLayout(id, layout);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "publish") {
      let resp = await validation(body.blog_id);
      if (resp.isError) {
        // res.status(200).json(resp);
        return NextResponse.json(resp, {status: 200});
      } else {
        const result = await publishBlog(body);
        result["isError"] = false;
        // res.status(200).json(result);
        return NextResponse.json(result, {status: 200});
      }
    } else if (slug[0] === "autoSaveTitle") {
      const { id, title } = body;
      const result = await updateTitle(id, title);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "autoSaveDescription") {
      const { id, description } = body;
      const result = await updateDescription(id, description);
      // res.status(200).json(result);
    } else if (slug[0] === "autoSaveAuthor") {
      const { id, author } = body;
      const result = await updateAuthor(id, author);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
      
    } else if (slug[0] === "autoSaveBlogDate") {
      const { id, blogDate } = body;
      console.log("check server side data--->", req.body);
      const result = await updateBlogDate(id, blogDate);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "autoSaveSlug") {
      const { id, slug } = body;
      const result = await updateSlug(id, slug);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "autoSaveCategory") {
      const { id, category } = body;
      console.log("check vale in catarray", category);
      const result = await updateCategory(id, category);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "autoSaveTag") {
      const { id, tag } = body;
      const result = await updateTag(id, tag);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "updateViewCount") {
      let result = await updateViewCount(slug[1]);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "updateFeature") {
      const { id, is_feature } = body;
      let result = await updateFeature(id, is_feature);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    } else if (slug[0] === "auto-save") {
      const { id, req_data } = body;
      let result = await autoSave(id, req_data);
      // res.status(200).json(result);
      return NextResponse.json(result, {status: 200});
    }
    else{
      return NextResponse.json([], {status: 401});
    }
  }
  catch(err){
    console.log("error ----> ",err)
    return NextResponse.json([], {status: 500});
  }

}

export async function DELETE(request, ctx) {
  try{
    request.params = ctx.params;
    await auth(request);
    const { slug } = ctx.params;
    console.log("check slug--->", slug);
    const result = await deleteBlogById(slug);
    console.log("check result--->", result);
    // res.status(200).json(result);
    return NextResponse.json(result, {status: 200});
  }
  catch(err){
    console.log("error ----> ",err)
    return NextResponse.json([], {status: 500});
  }
}
