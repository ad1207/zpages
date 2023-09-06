import { getDB } from "../db-config/db";
import prisma from "../db-config/prisma";
import { bigIntToString } from "../db-config/utils";
import { nanoid } from "nanoid";

export const create = async (body) => {
    const { template_id, repo_id, blocks, name, company_id, thumbnail, slug } =
      body;
    let status = `A`;
    let is_delete = `N`;
    let date = new Date();
    let type = "B";
  
    let result = null;
    try {
      result = await prisma.lead_page.create({
        data: {
          template_id: template_id,
          status: status,
          lead_page_id: nanoid(11),
          blocks: blocks,
          is_delete: is_delete,
          repo_id: repo_id,
          company_id: company_id,
          createdAt: date,
          template_type: type,
          lead_page_name: name,
          thumbnail: thumbnail,
          slug: slug,
          view_count: 0,
        },
      });
    } catch (error) {
      console.log("lead-page create error::" + error.message);
    }
  
    return bigIntToString(result);
  };
  
  export const updateLeadPageById = async (updateBody) => {
    const { id, template_id, blocks, status, name } = updateBody;
    let date = new Date();
  
    let result = null;
    try {
      result = await prisma.lead_page.update({
        where: { id: id },
        data: {
          template_id: template_id,
          status: status,
          blocks: blocks,
          updatedAt: date,
          lead_page_name: name,
        },
        include: {
          repo: true,
        },
      });
    } catch (error) {
      console.log("updateLeadPageById error::" + error.message);
    }
    return bigIntToString(result);
  };
  
  export const getCollection = async (id) => {
    let result = null;
    try {
      result = await prisma.lead_page.findMany({
        where: {
          AND: [
            {
              id: {
                equals: BigInt(id),
              },
              is_delete: {
                equals: "N",
              },
            },
          ],
        },
      });
    } catch (error) {
      console.log("getCollection error::" + error.message);
    }
    return bigIntToString(result.length > 0 ? result[0] : []);
  };
  
  export const getAllLeadPages = async () => {
    let result = null;
    try {
      result = await prisma.lead_page.findMany({
        where: {
          AND: [
            {
              is_delete: {
                equals: "N",
              },
            },
          ],
        },
      });
    } catch (error) {
      console.log("getAllLeadPages error::" + error.message);
    }
    return bigIntToString(result);
  };
  
  export const getAllPublishedLeadPages = async () => {
    let result = null;
    try {
      result = await prisma.lead_page.findMany({
        where: {
          status: "P",
          published: "Y",
        },
      });
    } catch (error) {
      console.log("getAllPublishedLeadPages error::" + error.message);
    }
    return bigIntToString(result);
  };
  
  export const getPublishedLeadPagesByCompany = async (id) => {
    let result = null;
    try {
      result = await prisma.lead_page.findMany({
        where: {
          status: "P",
          published: "Y",
          company_id: Number(id),
        },
      });
    } catch (error) {
      console.log("getAllPublishedLeadPages error::" + error.message);
    }
    return bigIntToString(result);
  };
  
  export const deleteById = async (id) => {
    let status = "Y";
    let result = null;
    try {
      result = await prisma.lead_page.update({
        where: { id: BigInt(id) },
        data: {
          is_delete: status,
        },
      });
    } catch (error) {
      console.log("deleteById error::" + error.message);
    }
    return bigIntToString(result);
  };
  
  export const getLeadPageByNano = async (nanoid) => {
    var response = null;
    try {
      const result = await prisma.lead_page.findMany({
        where: {
          lead_page_id: nanoid,
          is_delete: "N",
        },
        include: {
          repo: true,
        },
      });
      response = bigIntToString(result.length > 0 ? result[0] : []);
    } catch (error) {
      console.log("getLeadPageByNano :: ", error.message);
    }
    return response;
  };
  
  export const getLeadPageBySlug = async (slug) => {
    var response = null;
    try {
      const result = await prisma.lead_page.findMany({
        where: {
          slug: slug,
          is_delete: "N",
        },
        include: {
          repo: true,
        },
      });
      console.log("check data validation --->", result.length);
      response = bigIntToString(result.length > 0 ? result[0] : []);
    } catch (error) {
      console.log("getLeadPage By Slug  :: ", error.message);
    }
    return response;
  };
  
  export const checkDuplicate = async (slug) => {
    var response = null;
    try {
      const result = await prisma.lead_page.count({
        where: {
          slug: slug,
          is_delete: "N",
        },
      });
      response = result;
    } catch (error) {
      console.log("checkDuplicate  :: ", error.message);
    }
    return response;
  };
  
  export const getLeadPageByRepo = async (id) => {
    var response = [];
    try {
      const result = await prisma.lead_page.findMany({
        where: {
          repo_id: BigInt(id),
          is_delete: "N",
        },
        orderBy: {
          id: "desc",
        },
      });
      response = bigIntToString(result);
    } catch (error) {
      console.log("getLeadPageByRepo ::", error.message);
    }
    return response;
  };
  
  //return count of templates/repo for given company_id
  export const getCountLeadPageByRepo = async (company_id) => {
    

    try {
      let result = await prisma.lead_page.groupBy({
        by: ["repo_id"],
        _count: {
          id: true,
        },
  
        where: {
          company_id: Number(company_id),
          is_delete: "N",
        },
      });

      let tempArr = bigIntToString(result);

      let returnArr = tempArr.map((e) => {
        return { repo_id: e.repo_id, count: e._count.id };
      });

      return returnArr;
    } catch (error) {
      console.log("getCountLeadPageByRepo error::" + error.message);
      return [];
    }
    
  };
  
  export const updateBlock = async (id, block) => {
    let result = null;
    try {
      result = await prisma.lead_page.update({
        where: { id: BigInt(id) },
        data: {
          blocks: block,
        },
      });
    } catch (error) {
      console.log("update block error::" + error.message);
    }
    return bigIntToString(result);
  };
  
  export const publishLead = async (id) => {
    let result = null;
    let status = "Y";
    try {
      result = await prisma.lead_page.update({
        where: {
          lead_page_id: id,
          // id: BigInt(id)
        },
        data: {
          status: "P",
          published: status,
        },
      });
    } catch (error) {
      console.log("publishLead error::" + error.message);
    }
    return bigIntToString(result);
  };
  
  export const updateViewCount = async (id) => {
    let result = null;
    try {
      result = await prisma.lead_page.update({
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
  
  /**
   * Method for LeadPage Pagination API
   * @param {JSON} body
   * @returns
   */
  export const createPublishedLeadsByCompany = async (body) => {
    let result = null;
    let count = null;
    let tempData = null;
    try {
      const { company_id, repo_id, page = 0, size = 10, sort = "desc" } = body;
      let offset = page > 0 ? page * size : 0;
  
      if (company_id && repo_id) {
        result = await prisma.lead_page.findMany({
          skip: offset,
          take: size,
          where: {
            company_id: Number(company_id),
            repo_id: Number(repo_id),
          },
          orderBy: {
            createdAt: sort,
          },
        });
  
        count = await prisma.lead_page.count({
          where: {
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
      console.log("createPublishedLeadsByCompany error::" + error.message);
    }
  
    return bigIntToString(tempData);
  };
  