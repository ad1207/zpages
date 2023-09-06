import { createEdgeRouter } from "next-connect";
import {getRepos, deleteRepo} from '../../../../service/repository.service'
import {getCountLeadPageByRepo} from '../../../../service/lead-page.service'
import {getCountBlogPageByRepo} from '../../../../service/blog.service'
import { auth } from '../../../../middleware/auth'
import { NextResponse } from "next/server";

// const router = createEdgeRouter();

// router
//     .get(async (req, res) => {
//         const slug = req.params.slug;
//         try {
//             let company_id = req.user.company_id;

//             if (slug[0] === 'fetch-repos-summary') {
//                 let repoList = null;
//                 let repoLeadPagesSummary = null;
//                 let repoBlogPagesSummary = null;
                
//                 // check if the company has any repos
//                 repoList = await getRepos(company_id);
//                 //console.log('repoList', repoList);
//                 repoLeadPagesSummary = await getCountLeadPageByRepo(company_id);
//                 //console.log('repoLeadPagesSummary', repoLeadPagesSummary);
//                 repoBlogPagesSummary = await getCountBlogPageByRepo(company_id);
//                 //console.log('repoBlogPagesSummary', repoBlogPagesSummary);
//                 if (repoList.length > 0) {
                    
//                     repoList.forEach((repo) => {
//                         repo.id = repo.id.toString();
//                         repo.company_id = repo.company_id.toString();
//                         repo.company.id = repo.company.id.toString();
//                         repo.created_by = repo.created_by.toString();
//                         repo.updated_by = repo.updated_by?.toString();
//                         let temp = repoLeadPagesSummary.find((leadPage) => leadPage.repo_id.toString() === repo.id);
//                         repo.lead_pages_count = temp ? temp.count : 0;
//                     });
                    

//                     repoList.forEach((repo) => {
//                         let temp = repoBlogPagesSummary.find((blogPage) => blogPage.repo_id.toString() === repo.id);
//                         repo.blog_pages_count = temp ? temp.count : 0;
//                     });

//                     // console.log('repoList',repoList);
//                     return NextResponse.json(repoList, {status: 200});
//                     return repoList;
//                     //res.status(200).json(repoList);
//                 } else {
//                     return NextResponse.json([], {status: 200});
//                     //res.status(200).json([]);
//                 }
//             }
//         } catch (error) {
//             console.log('fetch-repos-summary error :: ' + error);
//             return NextResponse.json([], {status: 401});
//         }
//     })
//     .delete(async (req, res) => {
//         const { slug } = ctx.params;
//         console.log('delete method call--->', slug);
//         if (slug[0] === 'repo') {
//             const result = await deleteRepo(slug[1]);
//             res.status(200).json(result);
//         } else if (slug[0] === 'company') {
//             const result = await deleteRepo(slug[1]); // check its wrong
//             res.status(200).json(result);
//         }
//     });


export async function GET(request, ctx){
    try {
    request.params = ctx.params;
    // return NextResponse.json("Hello World", {status: 200});
    // router.run(request, ctx).then((resp) => {
    //     console.log("resp ----> ",resp)
    //     return resp;
    // }).
    
    await auth(request);
   
    const slug = request.params.slug;
        
            let company_id = request.user.company_id;

            if (slug[0] === 'fetch-repos-summary') {
                let repoList = null;
                let repoLeadPagesSummary = null;
                let repoBlogPagesSummary = null;
                
                // check if the company has any repos
                repoList = await getRepos(company_id);
                //console.log('repoList', repoList);
                repoLeadPagesSummary = await getCountLeadPageByRepo(company_id);
                //console.log('repoLeadPagesSummary', repoLeadPagesSummary);
                repoBlogPagesSummary = await getCountBlogPageByRepo(company_id);
                //console.log('repoBlogPagesSummary', repoBlogPagesSummary);
                if (repoList.length > 0) {
                    
                    repoList.forEach((repo) => {
                        repo.id = repo.id.toString();
                        repo.company_id = repo.company_id.toString();
                        repo.company.id = repo.company.id.toString();
                        repo.created_by = repo.created_by.toString();
                        repo.updated_by = repo.updated_by?.toString();
                        let temp = repoLeadPagesSummary.find((leadPage) => leadPage.repo_id.toString() === repo.id);
                        repo.lead_pages_count = temp ? temp.count : 0;
                    });
                    

                    repoList.forEach((repo) => {
                        let temp = repoBlogPagesSummary.find((blogPage) => blogPage.repo_id.toString() === repo.id);
                        repo.blog_pages_count = temp ? temp.count : 0;
                    });

                    // console.log('repoList',repoList);
                    return NextResponse.json(repoList, {status: 200});
                    //res.status(200).json(repoList);
                } else {
                    return NextResponse.json([], {status: 200});
                    //res.status(200).json([]);
                }
            }
        } catch (error) {
            console.log('fetch-repos-summary error :: ' + error);
            return NextResponse.json([], {status: 401});
        }
    
}

export async function DELETE(request, ctx){
    request.params = ctx.params;
    const { slug } = ctx.params;
    try{
        console.log('delete method call--->', slug);
        if (slug[0] === 'repo') {
            const result = await deleteRepo(slug[1]);
            return NextResponse.json(result, {status: 200});
            //res.status(200).json(result);
        } else if (slug[0] === 'company') {
            const result = await deleteRepo(slug[1]); // check its wrong
            return NextResponse.json(result, {status: 200});
            //res.status(200).json(result);
        }
    }
    catch(error){
        console.log('delete-repo error :: ' + error);
        return NextResponse.json([], {status: 401});
    }
}

