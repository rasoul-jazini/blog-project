import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./styles/index.css";
import "./styles/fonts.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./mui/them";

const client = new ApolloClient({
  uri: "https://api-us-west-2.hygraph.com/v2/cl6w9fya446p101uq845zc9re/master",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
