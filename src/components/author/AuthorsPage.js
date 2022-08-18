import { useQuery } from "@apollo/client";
import { Avatar, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import { GET_AUTHOR_INFO } from "../../graphql/queries";
import CardEl from "../shared/CardEL";
import Loader from "../shared/Loader";

const AuthorsPage = () => {
  const { slug } = useParams();
  const { loading, data, error } = useQuery(GET_AUTHOR_INFO, {
    variables: { slug },
  });

  if (loading) return <Loader />;

  if (error) return <h3>Something went wrong...</h3>;

  const { author } = data;

  return (
    <Container maxWidth="lg">
      <Grid container mt={10}>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar src={author.avatar.url} sx={{ width: 250, height: 250 }} />
          <Typography component="h3" variant="h5" fontWeight={700} mt={4}>
            {author.name}
          </Typography>
          <Typography component="p" variant="h5" color="text.secondary" mt={2}>
            {author.field}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(author.description.html),
            }}
          ></div>
        </Grid>
        <Grid item xs={12} mt={6}>
          <Typography component="h3" variant="h5" fontWeight={700}>
            مقالات {author.name}
          </Typography>
          <Grid container mt={2} spacing={2}>
            {author.posts.map((post) => (
              <Grid key={post.id} item xs={12} sm={6} md={4}>
                <CardEl
                  title={post.title}
                  coverPhoto={post.coverPhoto}
                  slug={post.slug}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorsPage;
