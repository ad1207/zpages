"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Snackbar, Alert, Button, TextField, ButtonGroup } from "@mui/material";
import styles from "../../../../../styles/Category.module.scss";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { forceLogout } from "../../../../../components/auth/auth";
import ConfirmDialog from "../../../../../components/elements/ui/Dialog/ConfirmDialog";

interface FormData {
  name: string;
}

export default function Page({ params }) {
  const repo_nano = params.id;
  const [repo, setRepo] = useState<any>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [snack, setSnack] = useState(false);
  const [message, setMessage] = useState("");
  //let categorysList: Category[] = data;
  const router = useRouter();
  let schema = yup.object().shape({
    name: yup.string().required().min(3).max(60),
  });

  const fetchRepo = async () => {
    try {
      const response = await axios.get(`/api/repoByNano/${repo_nano}`);
      setRepo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRepo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [preloadedValues, setPreloadedValues] = useState({});

  useEffect(() => {
    setPreloadedValues({
      name: repo?.name,
    });
  }, [repo]);

  const {
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: preloadedValues,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<Array<string>>([]);
  const [error, setError] = useState(false);

  const handleSnackOpen = (message) => {
    setSnack(true);
    setMessage(message);
  };

  const deleteRepo = (id: string) => {
    setCurrentId(id);
    setOpenDialog(true);
  };

  useEffect(() => {
    setValue("name", repo?.name);
  }, [repo, setValue]);

  const handleConfirm = async () => {
    setOpenDialog(false);
    let response = await axios.delete(`/api/repository/repo/${currentId}`);

    if (response.status === 200) {
      handleSnackOpen("Repository deleted Added");
      router.push("/dashboard");
    }
  };

  const onSubmit = async (formData, event) => {
    console.log("test form data--->", formData);
    if (submitting) {
      return false;
    }
    const values = {
      id: repo.id,
      name: formData.name,

      status: "A",
    };
    setSubmitting(true);
    setServerErrors([]);
    setError(false);

    const response = await axios.put(`/api/repository`, values);

    if (response.data.errors) {
      setServerErrors(response.data.errors);
      setError(true);
    }

    setSubmitting(false);

    if (response.status === 200) {
      router.push("/dashboard");
      handleSnackOpen("Repository Updated Added");
      event.target.reset();
    }
  };

  return (
    <>
      <div className={styles.cat_wrap}>
        <div className={styles.left}></div>

        <div className={styles.right}>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 150px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Edit Repository
              </div>
              <div>
                <div style={{ fontSize: "1.3rem", marginRight: "10px" }}>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button onClick={() => router.back()}>Back</Button>
                    <Button onClick={() => deleteRepo(repo.id)}>Delete</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGap}>
                  {/* <TextField
                                        type='text'
                                        label='Repo Name'
                                        margin='dense'
                                        name='name'
                                        variant='standard'
                                        size='small'
                                        fullWidth
                                        InputProps={{
                                            className: classes.TextFieldProps,
                                        }}
                                        InputLabelProps={{
                                            style: { color: "#000000" },
                                        }}
                                        style={{ borderRadius: '50px' }}
                                        {...register('name')}
                                    /> */}
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        type="text"
                        label="Name"
                        margin="dense"
                        variant="standard"
                        size="small"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className={styles.textCenter}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                    style={{
                      fontSize: "1rem",
                      borderRadius: "5em",
                      padding: "8px 50px",
                      textTransform: "capitalize",
                    }}
                    type="submit"
                  >
                    Edit Repo
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={openDialog}
        handleClose={() => {
          setOpenDialog(false);
        }}
        handleConfirm={() => {
          handleConfirm();
        }}
        title="Warning Repo Deletion !"
      >
        You are about to delete Repository. Are you sure?
      </ConfirmDialog>

      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={() => setSnack(false)}
      >
        <Alert elevation={6} onClose={() => setSnack(false)} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
