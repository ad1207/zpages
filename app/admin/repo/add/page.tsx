"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Snackbar, Alert, Button, TextField } from "@mui/material";
import styles from "../../../../styles/Category.module.scss";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
}

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
//   TextFieldProps: {
//     color: "#000000",
//     borderBottom: "1px solid #fff",
//   },
//   buttonProps: {
//     fontSize: "1rem",
//     borderRadius: "5em",
//     padding: "8px 50px",
//     textTransform: "capitalize",
//   },
// }));

export default function Page() {
  const [snack, setSnack] = useState(false);
  const [message, setMessage] = useState("");
  //let categorysList: Category[] = data;
  const router = useRouter();
  let schema = yup.object().shape({
    name: yup.string().required().min(3).max(60),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onTouched", resolver: yupResolver(schema) });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<Array<string>>([]);
  const [error, setError] = useState(false);

  const handleSnackOpen = (message) => {
    setSnack(true);
    setMessage(message);
  };

  const onSubmit = async (formData, event) => {
    if (submitting) {
      return false;
    }
    const values = {
      name: formData.name,

      status: "A",
    };
    setSubmitting(true);
    setServerErrors([]);
    setError(false);

    const response = await axios.post(`/api/repository`, values);

    if (response.data.errors) {
      setServerErrors(response.data.errors);
      setError(true);
    }

    setSubmitting(false);

    if (response.status === 201) {
      router.push("/dashboard");
      handleSnackOpen("Repository Successfully Added");
      event.target.reset();
    }
  };
  //   const classes = useStyles();

  return (
    <>
      <div className={styles.cat_wrap}>
        <div className={styles.left}></div>

        <div className={styles.right}>
          <div>
            <div
              style={{
                display:"flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Add Repository
              </div>
              <div style={{ fontSize: "1.3rem", paddingRight: "10px" }}>
                <Button
                  onClick={() => router.back()}
                  type="button"
                  variant="contained"
                  color="primary"
                  style={{marginRight: "10px"}}
                >
                  Back
                </Button>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGap}>
                  <TextField
                    type="text"
                    label="Repo Name"
                    margin="dense"
                    name="name"
                    variant="standard"
                    size="small"
                    fullWidth
                    InputProps={{
                      style: {
                        color: "#000000",
                        borderBottom: "1px solid #fff",
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "#000000" },
                    }}
                    style={{ borderRadius: "50px" }}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="white-error">{errors.name.message}</span>
                  )}
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
                    Add Repo
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
