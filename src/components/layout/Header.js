import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography component="h1" variant="h5" fontWeight="bold" flex={1}>
            <Link to="/" style={{ textDecoration: "none", color: "#fafafa" }}>
              وبلاگ برنامه نویسی
            </Link>
          </Typography>
          <Link to="/" style={{ textDecoration: "none", color: "#fafafa" }}>
            <BookIcon />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
