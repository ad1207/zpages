'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {forceLogout} from '../../components/auth/auth'
import LeadPageWorkspace from '../../components/dashboard/lead-page-workspace'
import BlogWorkspace from '../../components/dashboard/blog-workspace'
import NoWorkspace from '../../components/dashboard/no-workspace'
import RepoSidebar from '../../components/RepoSidebar'
import { useGetLeadPage } from '../../hooks/lead-page-hook';
import { useGetRepo } from '../../hooks/repo-hook';
import styles from "../../styles/dashboard.module.scss"


// export const getServerSideProps = async (context) => {
//     let isError = false;
//   let cookie = null;
//   let repos = null;
//   let blogs_data = [];
//   let company_id = null;
//   let repo_id = null;
//   let lead_pages_data = [];
//   let company_nano = null;

//   try {
//     console.log(`dashboard::getServerSideProps`, context);
//     cookie = context?.req?.headers.cookie;

//     /* 1. fetch repo summary */
//     let result = await axios.get(
//       `/api/repository/fetch-repos-summary`,
//       // {
//       //   headers: {
//       //     cookie: cookie,
//       //   },
//       // }
//     ).then((res) => {
//         console.log('res', res);
//         return res;
//     }).catch((err) => {

//         console.log('err', err);  
//     });

//     repos = result.data;
//     repo_id = repos[0].id;
//     company_id = repos[0].company_id;
//     company_nano = repos[0].company.company_id;

//     if (repos.length === 0) {
//     } else {
//       // repo_id = repos[0].id;
//       // company_id = repos[0].company_id;
//       // company_nano = repos[0].company.company_id;
//       // /* fetch blogs */
//       // let result1 = await axios.get(`/blog/repo/${repo_id}`);

//       // blogs_data = result1.data;

//       /* fetch lead pages */
//       // let result2 = await axios.get(
//       //   `${process.env.API_URL}/lead-page/repo/${repo_id}`,
//       //   {
//       //     headers: {
//       //       cookie: cookie,
//       //     },
//       //   }
//       // );
//       // lead_pages_data = result2.data;
//     }
//   } catch (error) {
//     console.log(`error in dashboard@! ${error.message}`);
//     isError = true;
//     return {
//       redirect: { destination: "/", permanent: false },
//     };
//   }

//   return {
//     props: {
//       repos,
//       company_id,
//       blogs_data,
//       repo_id,
//       isError,
//       lead_pages_data,
//       company_nano,
//     },
//   };
// };

const Dashboard = () => {
    const [isError, setIsError] = useState(false);
    const [repos, setRepos] = useState([]);
    const [company_id, setCompany_id] = useState(null);
    const [company_nano, setCompany_nano] = useState(null);
    const [blogs_data, setBlogs_data] = useState([]);
    const [repo_id, setRepo_id] = useState(null);
    const [lead_pages_data, setLead_pages_data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
 


    useEffect(() => {
      async function fetchData() {
        try{
        let result = await axios.get(`/api/repository/fetch-repos-summary`); 
        setRepos(result.data);
        setRepo_id(result.data[0].id);
        setCompany_id(result.data[0].company_id);
        setCompany_nano(result.data[0].company.company_id);
        if(result.data.length === 0){
          setIsLoading(false);
        }
        else{
          // let result1 = await axios.get(`/api/blog/repo/${result.data[0].id}`);
          // setBlogs_data(result1.data);
          let result2 = await axios.get(`/api/lead-page/repo/${result.data[0].id}`);
          setLead_pages_data(result2.data);
          setIsLoading(false);
        }
        }
        catch(error){
          console.log(`error in dashboard@! ${error.message}`);
          setIsLoading(true);
        }
      }
      fetchData();
    }, []);

    
    useEffect(() => {
      if (isError) {
        return forceLogout();
      }
    }, [isError]);
    const [selectedRepo, setSelectedRepo] = useState(repos ? repos[0] : null);
    const { data: repoData = [], refetch: refetchRepo } = useGetRepo();
    const { data: leadPageData = [], refetch: refetchLeadPage } = useGetLeadPage(
      selectedRepo?.id
    );

    useEffect(() => {
      setSelectedRepo(repos ? repos[0] : null);
    }, [repos]);
  
    // const { data: blogs, mutate: mutateBlogs } = useSWR(`/api/blog/repo/${selectedRepo?.id}`, {
    // 	fallbackData: blogs_data,
    // });
  
    // const [submitting, setSubmitting] = useState(false);
  
    // const reloadBlogs = async () => {
    // 	refetchBlogList();
    // };
  
    const reloadLeads = async () => {
      //  mutateLeadPages();
      refetchLeadPage();
    };
    const reloadRepos = async (repo) => {
      setSelectedRepo(repo);
      refetchRepo();
    };
  
    return (
      <>
      {(isLoading)?
      (<div>Loading...</div>)
      :
      (<>
        <RepoSidebar
          repos={repoData}
          reloadRepos={reloadRepos}
          company_id={company_id}
          company_nano={company_nano}
        />
  
        <div className={styles.wrapper}>
          {repoData && <NoWorkspace />}
          {repoData && selectedRepo?.repo_type === "T" ? (
            <LeadPageWorkspace
              selectedRepo={selectedRepo}
              lead_pages={leadPageData}
              reload={reloadLeads}
              company_id={company_id}
            />
          ) : null}
  
          {selectedRepo?.repo_type !== "T" ? (
            <BlogWorkspace selectedRepo={selectedRepo} company_id={company_id} />
          ) : null}
        </div>
      </>)
      }
      </>
    );
  };
  
  export default Dashboard;
  const plus = {
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    borderRadius: "5px",
    padding: "10px",
  };
  


