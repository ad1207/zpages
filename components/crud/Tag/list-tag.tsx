'use client'
import { Box, Skeleton, TablePagination } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import {useDeleteTag, useGetTagList} from '../../../hooks/tag-hook'
import {ITag} from '../../../model/Tag'
import styles from '../../../styles/Tag.module.scss'
import DeleteDialog from "../../elements/ui/Dialog/DeleteDialog";
import React from "react";

export default function TagList({
    chooseMode,
    onEditRow,
    onMode,
    company_id,
    handleSnackOpen,
  }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentId, setCurrentId] = useState<number>();
    const [currentTag, setCurrentTag] = useState("");
    const [, setSubmitting] = useState<boolean>(false);
    const [, setServerErrors] = useState<Array<string>>([]);
    const [, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
  
    const [tagListParams, setTagListParams] = useState({
      company_id: company_id,
      page: page,
      size: rowsPerPage,
      sort: "desc",
    });
  
    const {
      data: tagsList,
      refetch: refetchTagList,
      isLoading,
    } = useGetTagList(tagListParams);
  
    useEffect(() => {
      if (!tagsList) {
        return;
      }
      setTotalCount(tagsList?.totalCount);
    }, [tagsList]);
  
    const { mutate: deleteMutate, isLoading: deleteLoading } = useDeleteTag();
  
    const reloadTagList = async () => {
      refetchTagList();
    };
  
    const handleConfirm = async () => {
      setOpenDialog(false);
  
      deleteMutate(currentId, {
        onSuccess: (response) => {
          handleSnackOpen("Tag Successfully Deleted");
          //  reset({ name: "" });
          chooseMode("add");
          setSubmitting(false);
          reloadTagList();
        },
        onError: (err: any) => {
          setServerErrors([err?.message]);
          setError(true);
        },
      });
      setSubmitting(false);
    };
  
    const handleEdit = (item) => {
      onEditRow(item);
      chooseMode("edit");
    };
  
    const deleteRow = (item: ITag, event: any) => {
      event.stopPropagation();
      setCurrentId(item.id);
      setCurrentTag(item.name);
      setOpenDialog(true);
    };
  
    const handleClose = () => {
      setOpenDialog(false);
    };
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage);
      // when state changes, refetch handled in hooks
      setTagListParams({ ...tagListParams, page: newPage });
      reloadTagList();
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      setTagListParams({
        ...tagListParams,
        size: parseInt(event.target.value, 10),
      });
      reloadTagList();
    };
  
    return (
      <div>
        <div className={styles.tagListTitle}>
          Tags (<span>{totalCount}</span>)
        </div>
  
        {isLoading && (
          <>
            <Box sx={{ width: "80%" }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </>
        )}
        {tagsList &&
          tagsList?.content?.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <div className={styles.tagRow}>
                    <div
                      className={styles.tagList}
                      onClick={() => handleEdit(item)}
                    >
                      <div>
                        <div className={styles.tagName}>{item.name}</div>
                      </div>
                      <div
                        className={styles.tagDel}
                        onClick={(event) => deleteRow(item, event)}
                      >
                        <Image
                          src="/static/images/close.svg"
                          alt="close"
                          width={12}
                          height={12}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
  
        <TablePagination
          style={{ paddingRight: "20%" }}
          component="div"
          count={Number(tagsList?.totalCount || 0)}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  
        <DeleteDialog
          open={openDialog}
          handleClose={handleClose}
          windowTitle="Delete this tag?"
          deleteMessage="It will be deleted and wont be able to recover it."
          title={currentTag}
          confirmDelete={handleConfirm}
        />
      </div>
    );
  }
  