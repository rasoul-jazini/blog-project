import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST_INFO } from "../../graphql/queries";
import Loader from "../shared/Loader";

const BlogsPage = () => {
  const { slug } = useParams();
  const { loading, data, error } = useQuery(GET_POST_INFO, {
    variables: { slug },
  });
  console.log(data);

  if (loading) return <Loader />;

  if (error) return <h3>Something went wrong...</h3>;

  return <div>Blogs Page</div>;
};

export default BlogsPage;
