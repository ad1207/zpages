'use client'
import { Box, Skeleton, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDeleteCategory, useGetCategoryList } from "../../../hooks/category-hook";
import { ICategory } from "../../../model/Category";
import styles from '../../../styles/Category.module.scss'
import DeleteDialog from "../../elements/ui/Dialog/DeleteDialog";
import Image from "next/image";

export default function CategoryList({
    onMode,
    onEditRow,
    //   onReloadCategoryList,
    handleSnackOpen,
    company_id,
  }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentId, setCurrentId] = useState<number>();
    const [currentCategory, setCurrentCategory] = useState("");
    const [, setSubmitting] = useState<boolean>(false);
    const [, setServerErrors] = useState<Array<string>>([]);
    const [, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
  
    const [categoryListParams, setCategoryListParams] = useState({
      company_id: company_id,
      page: page,
      size: rowsPerPage,
      sort: "desc",
    });
  
    const {
      data: categoryList,
      refetch: refetchCategoryList,
      isLoading,
    } = useGetCategoryList(categoryListParams);
  
    /**
     * Use Delete Category is a hook which is imported from category hook file
     */
    const { mutate: deleteMutate, isLoading: deleteLoading } =
      useDeleteCategory();
  
    useEffect(() => {
      if (!categoryList) {
        return;
      }
      console.log(categoryList)
      setTotalCount(categoryList.totalCount);
    }, [categoryList]);
  
    const handleConfirm = async () => {
      setOpenDialog(false);
      /**
       * Mutate Function For Delete Category
       */
      deleteMutate(currentId, {
        onSuccess: (response) => {
          handleSnackOpen("Category Successfully Deleted");
          setSubmitting(false);
        },
        onError: (err: any) => {
          setServerErrors([err?.message]);
          setError(true);
        },
      });
      setSubmitting(false);
    };
  
    const reloadCategoryList = async () => {
      refetchCategoryList();
    };
  
    const handleEdit = (item) => {
      onMode("edit");
      onEditRow(item);
    };
  
    const deleteRow = (item: ICategory, event: any) => {
      event.stopPropagation();
      setCurrentId(item.id);
      setCurrentCategory(item.name);
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
      setCategoryListParams({ ...categoryListParams, page: newPage });
      reloadCategoryList();
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      setCategoryListParams({
        ...categoryListParams,
        size: parseInt(event.target.value, 10),
      });
      reloadCategoryList();
    };
  
    return (
      <div>
        <div className={styles.catListTitle}>
          Categories (<span>{totalCount}</span>)
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
        {categoryList &&
          categoryList?.content?.map((item: ICategory, index) => {
            return (
              <div key={index}>
                <div className={styles.catRow}>
                  <div
                    className={styles.catList}
                    onClick={() => handleEdit(item)}
                  >
                    <div className={styles.catName}>{item.name}</div>
  
                    <div
                      className={styles.catDel}
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
            );
          })}
        <TablePagination
          style={{ paddingRight: "20%" }}
          component="div"
          count={Number(categoryList?.totalCount || 0)}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  
        <DeleteDialog
          open={openDialog}
          handleClose={handleClose}
          windowTitle="Delete this category?"
          deleteMessage="It will be deleted and wont be able to recover it."
          title={currentCategory}
          confirmDelete={handleConfirm}
        />
      </div>
    );
  }
  