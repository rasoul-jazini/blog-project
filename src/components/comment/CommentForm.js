import { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SEND_COMMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";

const CommentForm = ({ slug }) => {
  const [formData, setFormData] = useState({ name: "", email: "", text: "" });
  const [pressed, setPressed] = useState(false);

  const [sendComment, { loading, data }] = useMutation(SEND_COMMENT, {
    variables: {
      name: formData.name,
      email: formData.email,
      text: formData.text,
      slug,
    },
  });

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const sendCommentHandler = () => {
    if (formData.name && formData.email && formData.text) {
      sendComment();
      setFormData({ name: "", email: "", text: "" });
      setPressed(true);
    } else {
      toast.error("لطفا تمام فیلدها را پر کنید.");
    }
  };

  useEffect(() => {
    if (data && pressed) {
      toast.success("کامنت ارسال شد و منتظر تایید می باشد.");
      setPressed(false);
    }
  }, [data, pressed]);

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
          value={formData.name}
          onChange={changeHandler}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="ایمیل"
          name="email"
          variant="outlined"
          sx={{ width: "100%" }}
          value={formData.email}
          onChange={changeHandler}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="متن کامنت"
          name="text"
          variant="outlined"
          sx={{ width: "100%" }}
          value={formData.text}
          onChange={changeHandler}
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
