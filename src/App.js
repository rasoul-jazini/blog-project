import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/home/HomePage";
import BlogsPage from "./components/blog/BlogsPage";
import AuthorsPage from "./components/author/AuthorsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs/:slug" element={<BlogsPage />} />
        <Route path="/authors/:slug" element={<AuthorsPage />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
