import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { GET_BLOGS_INFO } from "../../graphql/queries";
import CardEL from "../shared/CardEL";

const Blogs = () => {
  const { loading, data, error } = useQuery(GET_BLOGS_INFO);

  if (error) return <h3>Something went wrong...</h3>;

  if (loading) return <h3>Loading...</h3>;

  return (
    <Grid container spacing={3}>
      {data.posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={6} md={4}>
          <CardEL {...post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Blogs;
