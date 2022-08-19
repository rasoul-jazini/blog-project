import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SEND_COMMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  text: "",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("نام کاربری ضروری می باشد.")
    .min(6, "نام کاربری شما باید دارای حداقل 6 کاراکتر باشد."),
  email: yup
    .string()
    .email("ایمیل شما نامعتبر است.")
    .required("ایمیل ضروری است."),
  text: yup
    .string()
    .required("پر کردن فیلد کامنت ضروری می باشد.")
    .min(15, "کامنت شما باید دارای حداقل 15 کاراکتر باشد."),
});

const CommentForm = ({ slug }) => {
  const sendCommentHandler = () => {
    if (formik.values.name || formik.values.email || formik.values.text) {
      if (Object.values(formik.errors).length !== 0) {
        toast.error(Object.values(formik.errors)[0]);
      } else {
        sendComment();
        toast.success("کامنت ارسال شد و منتظر تایید می باشد.");
        formik.resetForm();
      }
    } else {
      toast.error("لطفا تمام فیلدها را پر کنید.");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: sendCommentHandler,
    validationSchema,
  });

  const [sendComment, { loading }] = useMutation(SEND_COMMENT, {
    variables: {
      name: formik.values.name,
      email: formik.values.email,
      text: formik.values.text,
      slug,
    },
  });

  return (
    <Grid
      container
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0 4px 12px",
        borderRadius: 4,
        py: 1,
        mt: 5,
      }}
    >
      <Grid item xs={12} m={2}>
        <Typography component="p" variant="h6" fontWeight={700} color="primary">
          فرم ارسال کامنت
        </Typography>
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="نام کاربری"
          name="name"
          variant="outlined"
          sx={{ width: "100%" }}
          {...formik.getFieldProps("name")}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="ایمیل"
          name="email"
          variant="outlined"
          sx={{ width: "100%" }}
          {...formik.getFieldProps("email")}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="متن کامنت"
          name="text"
          variant="outlined"
          sx={{ width: "100%" }}
          {...formik.getFieldProps("text")}
          multiline
          minRows={4}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        {loading ? (
          <Button variant="contained" disabled>
            در حال ارسال ...
          </Button>
        ) : (
          <Button variant="contained" onClick={sendCommentHandler}>
            ارسال
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default CommentForm;
