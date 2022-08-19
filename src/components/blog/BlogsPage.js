import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST_INFO } from "../../graphql/queries";
import Loader from "../shared/Loader";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box } from "@mui/system";
import sanitizeHtml from "sanitize-html";
import CommentForm from "../comment/CommentForm";
import Comments from "../comment/Comments";

const BlogsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_POST_INFO, {
    variables: { slug },
  });

  if (loading) return <Loader />;

  if (error) return <h3>Something went wrong...</h3>;

  const { post } = data;

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid
          item
          xs={12}
          mt={9}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            fontWeight={700}
          >
            {post.title}
          </Typography>
          <ArrowBackRoundedIcon onClick={() => navigate(-1)} />
        </Grid>
        <Grid item xs={12} mt={6}>
          <img
            src={post.coverPhoto.url}
            alt={post.slug}
            style={{ borderRadius: 15, width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center" gap={2} mt={7}>
          <Avatar src={post.author.avatar.url} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography component="p" variant="h5" fontWeight={700}>
              {post.author.name}
            </Typography>
            <Typography component="p" variant="p" color="text.secondary">
              {post.author.field}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(post.content.html),
            }}
          ></div>
        </Grid>
        <Grid item xs={12}>
          <CommentForm slug={slug} />
        </Grid>
        <Grid item xs={12}>
          <Comments slug={slug} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogsPage;
