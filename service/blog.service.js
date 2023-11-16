import { getDB } from "../db-config/db";
import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";
import { getUserById } from "./auth/auth.service";
import slugify from "slugify";
import { nanoid } from "nanoid";

const { db } = getDB();

export const getAllBlogs = async () => {
  let result = null;
  try {
    result = await prisma.blog.findMany({});
  } catch (error) {
    console.log("getAllBlogs error::" + error.message);
  }
  return bigIntToString(result);
};

export const getAllPublishedBlog = async () => {
  let result = null;
  try {
    result = await prisma.blog.findMany({
      where: {
        status: "P",
        published: "Y",
      },
    });
  } catch (error) {
    console.log("getAllBlogs error::" + error.message);
  }
  console.log("check the result--->", result);
  return bigIntToString(result);
};

export const getPublishedBlogByCompany = async (id) => {
  let result = null;
  try {
    result = await prisma.blog.findMany({
      where: {
        status: "P",
        published: "Y",
        company_id: Number(id),
      },
    });
  } catch (error) {
    console.log("getPublishedBlogByCompany error::" + error.message);
  }
  return bigIntToString(result);
};

/**
 * Method for Blog Pagination API
 * @param {JSON} body
 * @returns
 */
export const createPublishedBlogByCompany = async (body) => {
  let result = null;
  let count = null;
  let tempData = null;
  try {
    const { company_id, repo_id, page = 0, size = 10, sort = "desc" } = body;
    let offset = page > 0 ? page * size : 0;

    if (company_id && repo_id) {
      result = await prisma.blog.findMany({
        skip: offset,
        take: size,
        where: {
          // status: "P",
          // published: "Y",
          company_id: Number(company_id),
          repo_id: Number(repo_id),
        },
        orderBy: {
          createdAt: sort,
        },
      });

      count = await prisma.blog.count({
        where: {
          // status: "P",
          // published: "Y",
          company_id: Number(company_id),
          repo_id: Number(repo_id),
        },
      });

      let length = count;
      let totalPages = length < size ? 1 : Math.ceil(length / size);
      tempData = {
        totalCount: length,
        totalPage: totalPages,
        size: size,
        content: result,
      };
    } else if (repo_id) {
      return (result = { message: "company_id is required" });
    } else {
      return (result = { message: "repo_id is required" });
    }
  } catch (error) {
    console.log("createPublishedBlogByCompany error::" + error.message);
  }

  return bigIntToString(tempData);
};

export const getBlogsByCompany = async (company_id) => {
  let result = null;
  try {
    result = await prisma.blog.findMany({
      where: {
        AND: [
          { company_id: { equals: Number(company_id) || undefined } },
          { is_delete: { equals: "N" || undefined } },
        ],
      },
    });
  } catch (error) {
    console.log("getBlogsByCompany error::" + error.message);
  }
  return bigIntToString(result);
};

export const getBlogsByRepoId = async (repo_id) => {
  let query = `SELECT b.id,b.blog_id ,b.title,b.description ,b.slug , b.excerpt,b.layout ,b.category , array_agg(distinct(c.name)) as categories, b.tag ,
          array_agg(distinct(t.name)) as tags,b.company_id ,b.repo_id ,b.author ,b.is_delete ,b.blog_date ,b.status,b.published ,b.published_on ,b.created_by ,
          b."createdAt" ,b.updated_by ,b."updatedAt" , b.thumbnail ,b.publish_content ,b."content" ,b.is_author ,b.is_publish_date ,b.word_count ,
          b.read_time ,b.view_count ,b.is_feature ,b.hero_image
          FROM blog b
          LEFT outer JOIN category as c ON c.id = SOME(b.category)
          LEFT  JOIN tag as t ON t.id = SOME(b.tag)
          where b.repo_id =${repo_id}
          GROUP BY title, b.id ORDER BY b."updatedAt" desc `;

  return new Promise(function (resolve, reject) {
    db.any(query, []).then((data) => {
      if (data.length > 0) resolve(data);
      else reject({ message: "something went wrong" });
    });
  });
};

export const getBlogsByRepo = async (repo_id) => {
  let result = [];
  try {
    // result = await prisma.blog.findMany({
    // 	where: {
    // 		AND: [{ repo_id: { equals: Number(repo_id) || undefined } }, { is_delete: { equals: 'N' || undefined } }],
    // 	},
    // 	orderBy: {
    // 		updatedAt: 'desc',
    // 	}
    // });

    let response = await getBlogsByRepoId(repo_id);
    console.log("check blog data in data format", response);
    result = [...response];
  } catch (error) {
    console.log("getBlogsByRepo error::" + error.message);
  }
  // return bigIntToString(result);
  return result;
};

export const getBlogById = async (blogId) => {
  let result = null;
  try {
    result = await prisma.blog.findUnique({
      where: {
        id: Number(blogId),
      },
    });
  } catch (error) {
    console.log("getBlogById error::" + error.message);
  }
  return bigIntToString(result);
};

export const getBlogByNanoId = async (blogId) => {
  let result = null;
  try {
    result = await prisma.blog.findUnique({
      where: {
        blog_id: blogId,
      },
    });
  } catch (error) {
    console.log("getBlogByNanoId error::" + error.message);
  }
  return bigIntToString(result);
};

export const getBlogBySlug = async (slug) => {
  let result = null;
  try {
    result = await prisma.blog.findMany({
      where: {
        slug: slug,
      },
    });
  } catch (error) {
    console.log("getBlogBySlug error::" + error.message);
  }
  return bigIntToString(result[0]);
};
export const getRepoBlogSummary = async (company_id) => {
  let result = null;
  let returnArr = null;

  try {
    result = await prisma.blog.groupBy({
      by: ["repo_id"],
      _count: {
        id: true,
      },

      where: {
        company_id: Number(company_id),
      },
    });

    let tempArr = bigIntToString(result);

    if (tempArr.length > 0) {
      returnArr = [];
    } else {
      returnArr = tempArr.map((e) => {
        return { repo_id: e.repo_id, count: e._count.id };
      });
    }
  } catch (error) {
    console.log("getRepoSummary error::" + error.message);
  }

  return returnArr;
};

export const checkDuplicateTitle = async (title, company_id) => {
  let result = null;
  try {
    result = await prisma.blog.count({
      where: {
        title: title,
        company_id: Number(company_id),
      },
    });
  } catch (error) {
    console.log("checkDuplicateTitle error::" + error.message);
  }
  return result;
};

export const createBlogEntry = async (company_id, repo_id, user_id) => {
  let user = null;
  let result = null;
  try {
    user = await getUserById(user_id);
    let currentDate = new Date();
    let thumbnail =
      "https://res.cloudinary.com/sanjayaalam/image/upload/v1633349662/C1/B1/gieglefcwr3iu1xzjkoo.png";
    result = await prisma.blog.create({
      data: {
        title: `Untitled`,
        slug: "",
        layout: "Classic",
        excerpt: "",

        author: user.first_name,
        company_id: Number(company_id),
        is_delete: "N",
        blog_date: new Date(),
        status: "D",
        published: "N",
        description: "",
        created_by: Number(company_id),
        createdAt: currentDate,
        blog_id: nanoid(11),
        repo_id: Number(repo_id),
        thumbnail: thumbnail,
        view_count: 0,
        is_feature: false,
        hero_image:
          "https://res.cloudinary.com/sanjayaalam/image/upload/v1636976325/flow1_awvs1s.png",
      },
    });
  } catch (error) {
    console.log("createBlogEntry error::" + error.message);
  }
  return bigIntToString(result);
};

export const addBlog = async (body) => {
  let user = null;
  let result = null;
  const { company_id, repo_id, user_id, req_data } = body;
  console.log("check the req_data--->", body);
  try {
    user = await getUserById(user_id);
    let currentDate = new Date();
    let thumbnail =
      "https://res.cloudinary.com/sanjayaalam/image/upload/v1633349662/C1/B1/gieglefcwr3iu1xzjkoo.png";
    let baseRequest = {
      title: `Untitled`,
      slug: "",
      layout: "Classic",
      excerpt: "",
      author: user.first_name,
      company_id: Number(company_id),
      is_delete: "N",
      blog_date: currentDate,
      status: "D",
      published: "N",
      description: "",
      created_by: Number(company_id),
      createdAt: currentDate,
      blog_id: nanoid(11),
      repo_id: Number(repo_id),
      thumbnail: thumbnail,
      view_count: 0,
      is_feature: false,
      hero_image:
        "https://res.cloudinary.com/sanjayaalam/image/upload/v1636976325/flow1_awvs1s.png",
      ...req_data,
    };

    result = await prisma.blog.create({
      data: {
        ...baseRequest,
        ...req_data,
      },
    });
  } catch (error) {
    console.log("createBlogEntry error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateBlog = async (
  id,
  title,
  description,
  author,
  blogDate,
  categories,
  tag,
  company_id,
  status,
  createdAt,
  thumbnail,
  content,
  is_author,
  is_publish_date
) => {
  let arrayOfCategories = categories;
  //&& categories.split(',');
  let arrayOfTags = tag;
  // && tags.split(',');

  let slug = slugify(title).toLowerCase();
  // let mtitle = `${title} | ${process.env.APP_NAME}`;

  // let mdesc = stripHtml(body).result.substring(0, 160);

  // let excerpt = smartTrim(body, 320, '', ' ...');

  if (typeof company_id === "string") {
    company_id = Number(company_id);
  }

  let newCatArr = arrayOfCategories.map((e) => {
    return parseInt(e.id);
  });

  let newTagArr = arrayOfTags.map((e) => {
    return parseInt(e.id);
  });

  let currentDate = new Date();
  // both works do not delete
  // let status= 'D';
  //   let	published= 'N';
  //   let is_delete='N';

  // db.one(
  // 	'INSERT INTO blog(title, slug, body, excerpt, mtitle, mdesc, categories, tags, company_id,is_delete, description, author,blog_date,status,published) VALUES($1, $2, $3, $4, $5, $6, $7::integer[], $8::integer[], $9,$10,$11,$12,$13,$14,$15) RETURNING id',
  // 	[title, slug, body, excerpt, mtitle, mdesc, newCatArr, newTagArr, company_id,is_delete, description, author, articleDate,status,published],
  // ).then((data) => {

  // 	// res.json({ title: title, message: 'success' });
  // 	res.status(201).send({ title: title, message: 'success' });
  // });

  let result = null;
  try {
    let request = {
      title: title,
      slug: slug,
      category: newCatArr,
      tag: newTagArr,
      company_id: company_id,
      is_delete: "N",
      description: description,
      author: author,
      blog_date: blogDate,
      status: status === "N" ? "D" : "P",
      published: status,
      updated_by: company_id,
      updatedAt: currentDate,
      published_on: status === "N" ? createdAt : currentDate,
      thumbnail: thumbnail,
      is_author: is_author,
      is_publish_date: is_publish_date,
    };

    //dynamically set the valtio content
    if (content != undefined) {
      request["content"] = content;
      if (status === "Y") request["publish_content"] = content;
    }

    result = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: request,
    });
  } catch (error) {
    console.log("updateBlog error::" + error.message);
  }
  return bigIntToString(result);
};

//return count of templates/repo for given company_id
export const getCountBlogPageByRepo = async (company_id) => {
  let result = null;
  try {
    result = await prisma.blog.groupBy({
      by: ["repo_id"],
      _count: {
        id: true,
      },

      where: {
        company_id: Number(company_id),
        is_delete: "N",
      },
    });
  } catch (error) {
    console.log("getCountBlogPageByRepo error::" + error.message);
  }
  let tempArr = bigIntToString(result);

  let returnArr = tempArr.map((e) => {
    return { repo_id: e.repo_id, count: e._count.id };
  });

  return returnArr;
};

export const updateThumbnail = async (id, thumbnail) => {
  let result = null;
  try {
    let request = {
      thumbnail: thumbnail,
    };

    result = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: request,
    });
  } catch (error) {
    console.log("thumbnail update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateContent = async (id, content) => {
  let result = null;
  try {
    let request = {
      content: content,
    };

    result = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: request,
    });
  } catch (error) {
    console.log("content update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateLayout = async (id, layout) => {
  let result = null;
  try {
    let request = {
      layout: layout,
    };

    result = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: request,
    });
  } catch (error) {
    console.log("layout update error::" + error.message);
  }
  return bigIntToString(result);
};

export const publishBlog = async (body) => {
  console.log("check the body--->", body);
  let result = null;
  try {
    const { status, published_status, blog_id } = body;
    const blog = await getBlogByNanoId(blog_id);
    const content = blog.content;
    let currentDate = new Date();
    let request = {
      status: status,
      published: published_status,
      published_on: currentDate,
    };

    if (content != undefined) {
      request["content"] = content;
      request["publish_content"] = content;
    }
    console.log("check the request--->", request);
    result = await prisma.blog.update({
      where: {
        blog_id: blog_id,
      },
      data: request,
    });
    console.log("check the result--->", result);
  } catch (error) {
    console.log("blog publish error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateTitle = async (id, title) => {
  let result = null;
  try {
    let request = {
      title: title,
    };
    result = await update(id, request);
  } catch (error) {
    console.log("title update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateSlug = async (id, slug) => {
  let result = null;
  try {
    let request = {
      slug: slug,
    };
    result = await update(id, request);
  } catch (error) {
    console.log("title update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateDescription = async (id, description) => {
  let result = null;
  try {
    let request = {
      description: description,
    };
    result = await update(id, request);
  } catch (error) {
    console.log("description update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateBlogDate = async (id, blogDate) => {
  let result = null;
  try {
    let request = {
      blog_date: blogDate,
    };
    result = await update(id, request);
    console.log("blog date update response::", result);
  } catch (error) {
    console.log("blog date update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateAuthor = async (id, author) => {
  let result = null;
  try {
    let request = {
      author: author,
    };
    result = await update(id, request);
  } catch (error) {
    console.log("author update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateCategory = async (id, category) => {
  let result = null;
  try {
    let request = {
      category: category,
    };
    result = await update(id, request);
  } catch (error) {
    console.log("category update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateTag = async (id, tag) => {
  let result = null;
  try {
    let request = {
      tag: tag,
    };
    result = await update(id, request);
  } catch (error) {
    console.log("category update error::" + error.message);
  }
  return bigIntToString(result);
};

const update = async (id, request) => {
  let result = null;
  result = await prisma.blog.update({
    where: {
      id: Number(id),
    },
    data: request,
  });
  return result;
};

export const validation = async (blog_id) => {
  let blog = await getBlogByNanoId(blog_id);
  let obj = {};
  let error = [];

  if (blog.title === null || blog.title.match("Untitled -"))
    error.push("title");
  if (
    blog.description === undefined ||
    blog.description === "" ||
    blog.description === " "
  )
    error.push("description");
  if (blog.author === undefined || blog.author === "" || blog.author === " ")
    error.push("author");
  if (!blog.category.length) error.push("category");
  if (!blog.tag.length) error.push("tag");

  if (error.length > 0) {
    obj["error"] = error;
    obj["isError"] = true;
  } else {
    obj["isError"] = false;
  }
  return obj;
};

export const getBlogsByCategory = async (categoryId) => {
  let response = null;
  try {
    const result = await prisma.blog.findMany({
      where: {
        category: {
          has: Number(categoryId),
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    response = bigIntToString(result);
  } catch (error) {
    console.log(
      "Error occurred in blog service getBlogsByCategory method ",
      error
    );
  }
  return response;
};

export const getBlogsByCompnay = async (company_id) => {
  let response = null;
  try {
    const result = await prisma.blog.findMany({
      where: {
        company_id: Number(company_id),
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    response = bigIntToString(result);
  } catch (error) {
    console.log(
      "Error occurred in blog service getBlogsByCategory method ",
      error
    );
  }
  return response;
};

export const deleteBlogById = async (id) => {
  let result = null;
  try {
    let blogId = Number(id);
    result = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
  } catch (error) {
    console.log("content update error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateViewCount = async (id) => {
  let result = null;
  try {
    result = await prisma.blog.update({
      where: { id: BigInt(id) },
      data: {
        view_count: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.log("updateViewCount error::" + error.message);
  }
  return bigIntToString(result);
};

export const updateFeature = async (id, flag) => {
  let result = null;

  try {
    result = await prisma.blog.update({
      where: { id: BigInt(id) },
      data: {
        is_feature: flag,
      },
    });
  } catch (error) {
    console.log("updateFeature error::" + error.message);
  }
  return bigIntToString(result);
};

//auto save blog

export const autoSave = async (id, body) => {
  let result = null;

  try {
    console.log("check request data id:", id);
    console.log("check request data req:", body);
    // console.log("check request data key:",key)

    result = await prisma.blog.update({
      where: { id: BigInt(id) },
      data: { ...body },
    });
  } catch (error) {
    console.log("Error occured in auto save " + error.message);
  }
  return bigIntToString(result);
};
