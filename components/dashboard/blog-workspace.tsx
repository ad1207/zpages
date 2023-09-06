'use client'
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../styles/dashboard.module.scss"

import { Divider, Menu, MenuItem, TablePagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {ViewList, ViewModule} from "@mui/icons-material"
import { formatDistance } from "date-fns"
import { useGetBlogList } from "../../hooks/blog-hook";
import DeleteDialog from "../elements/ui/Dialog/DeleteDialog"

const BlogWorkspace = ({ company_id, selectedRepo }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const router = useRouter();
    const [blogListParams, setBlogListParams] = useState({
      company_id: company_id,
      repo_id: selectedRepo?.id,
      page: page,
      size: rowsPerPage,
      sort: "desc",
    });
    const { data: blogsList = [], refetch: refetchBlogList } =
      useGetBlogList(blogListParams);
  
    const [blogItem, setBlogItem] = useState<any>();
    const [openDialog, setOpenDialog] = useState(false);
  
    const [view, setView] = useState("list");
  
    const handleChange = (event, nextView) => {
      setView(nextView);
    };
  
    const reloadBlogList = async () => {
      refetchBlogList();
    };
  
    const handleNewArticle = async (event) => {
      event.stopPropagation();
      // console.log("check repo value--->", selectedRepo)
      // const blog = await axios.get(`/api/blog/new/${selectedRepo.id}`);
      // Router.push(`/admin/blog-edit/${blog?.data?.blog_id}`);
      router.push(`/admin/blog-add/?repo=${selectedRepo.id}`);
      //   Router.push(`/admin/blog-add/add`);
    };
  
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleBlogDelete = async () => {
      setAnchorEl(null);
      handleOpenDialog();
    };
  
    const confirmDelete = async () => {
      let response = await axios.delete(`/api/blog/${blogItem.id}`);
      //	reload();
      handleCloseDialog();
      //mutate();
    };
  
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleClick = (event, item) => {
      setAnchorEl(event.currentTarget);
      setBlogItem(item);
    };
  
    const editBlog = (item) => {
      router.push(`/admin/blog-edit/${item.blog_id}`);
    };
  
    const handleBlogView = () => {
      setAnchorEl(null);
      router.push(`/blog-preview/${blogItem.blog_id}`);
    };
  
    const dateAgo = (date) => {
      return formatDistance(new Date(date), new Date(), { addSuffix: true });
    };
  
    const toggleFeature = async (item) => {
      let blogRequest = {
        id: item.id,
        is_feature: !item.is_feature,
      };
      await axios.put(`/api/blog/updateFeature`, blogRequest);
      //reload();
    };
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage);
      // when state changes, refetch handled in hooks
      setBlogListParams({ ...blogListParams, page: newPage });
      reloadBlogList();
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      setBlogListParams({
        ...blogListParams,
        size: parseInt(event.target.value, 10),
      });
      reloadBlogList();
    };
  
    return (
      <>
        <div className={styles.page_header}>
          <div className={styles.title_header}>{selectedRepo?.repo_name}</div>
  
          <div className={styles.page_header_right}>
            <div>
              <ToggleButtonGroup
                orientation="horizontal"
                value={view}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton value="list" aria-label="list">
                  <ViewList />
                </ToggleButton>
                <ToggleButton value="module" aria-label="module">
                  <ViewModule />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div onClick={(event) => handleNewArticle(event)}>
              <span className={styles.plus}>+ New Blog</span>
            </div>
          </div>
        </div>
  
        {view === "module" ? (
          <div className={styles.repo_list}>
            {blogsList &&
              blogsList?.content?.map((item, index) => {
                return (
                  <div key={index} className={styles.list_blogs}>
                    <div
                      className={styles.thumbnail}
                      onClick={() => editBlog(item)}
                    >
                      <Image
                        key={index}
                        src={item.thumbnail}
                        height={176}
                        width={280}
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="top center"
                      />
                    </div>
                    <div className={styles.footer}>
                      <div>
                        <div className={styles.footer_header}>{item.title}</div>
                        <div className={styles.footer_subheader}>
                          {item.author}
                        </div>
  
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "11px",
                          }}
                        >
                          <div className={styles.footer_subheader}>
                            {dateAgo(item.blog_date)}
                          </div>
                          <div className={styles.footer_subheader}>
                            {item.status === "D" && (
                              <div className={styles.draft}>
                                <span style={{ padding: "0.5rem" }}>Draft</span>
                              </div>
                            )}
                            {item.status === "P" && (
                              <div className={styles.published}>
                                <span style={{ padding: "0.5rem" }}>
                                  Published
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div onClick={(event) => handleClick(event, item)}>
                        <Image
                          src="/static/images/vertical-three-dots.svg"
                          alt="edit"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={styles.table}>
            <div className={styles.table_header}>
              <div>#</div>
              <div>Title</div>
              <div>Feature</div>
              <div>Author</div>
              <div>Created Date</div>
              <div>Status</div>
              <div>&nbsp;</div>
            </div>
  
            {blogsList &&
              blogsList?.content?.map((item, index) => {
                return (
                  <div key={index} className={styles.table_row}>
                    <div onClick={() => editBlog(item)}>
                      {page * 10 + index + 1}
                    </div>
                    <div
                      onClick={() => editBlog(item)}
                      className={styles.blog_title_block}
                    >
                      <div className={styles.blog_title}>{item.title}</div>
                      <div>
                        {item.categories?.map((cat, index) => {
                          return (
                            <span key={index}>
                              <span>{cat}</span>
                              {item.categories.length != index + 1 && (
                                <span>{", "}</span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div onClick={() => toggleFeature(item)}>
                      {item.is_feature ? (
                        <Image
                          src="/static/images/star.svg"
                          alt="edit"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          src="/static/images/black-star.svg"
                          alt="edit"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                    <div onClick={() => editBlog(item)}>{item.author}</div>
  
                    <div onClick={() => editBlog(item)}>
                      {dateAgo(item.blog_date)}
                    </div>
  
                    {item.status === "D" && (
                      <div
                        className={styles.draft}
                        onClick={() => editBlog(item)}
                      >
                        Draft
                      </div>
                    )}
                    {item.status === "P" && (
                      <div
                        className={styles.published}
                        onClick={() => editBlog(item)}
                      >
                        Published
                      </div>
                    )}
                    <div
                      className={styles.actions}
                      onClick={(event) => handleClick(event, item)}
                    >
                      <Image
                        src="/static/images/vertical-three-dots.svg"
                        alt="edit"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                );
              })}
  
            <TablePagination
              component="div"
              count={Number(blogsList?.totalCount || 0)}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
  
        {openDialog && (
          <DeleteDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            windowTitle="Delete this article?"
            deleteMessage="It will be un-published and deleted and wont be able to recover it."
            title={blogItem?.title}
            confirmDelete={confirmDelete}
          />
        )}
  
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          elevation={2}
          onClose={handleClose}
        >
          <MenuItem onClick={handleBlogView}>View</MenuItem>
          <Divider />
          <MenuItem onClick={handleBlogDelete}>
            <span style={{ color: "red", fontSize: "12px" }}>Delete</span>
          </MenuItem>
        </Menu>
      </>
    );
  };
  
  export default BlogWorkspace;
  