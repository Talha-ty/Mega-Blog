import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/conf";
import { PostCard } from "../components/index";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import AppTheme from "../components/customization/AppTheme";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import MainContent from '../components/MainContent'
import Latest from "./Latest";

function Home(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
    const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <Header />
          <Container maxWidth="lg" component="main">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress size={40}/>
            </Box>
          </Container>
          <Footer />
        </AppTheme>
      </>
    );
  }

  if (!authStatus||posts.length === 0) {
    return (
      <>
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <Header />
          <Container maxWidth="lg" component="main">
            <Box
              sx={{
                py: 8,
                mt: 4,
                textAlign: "center",
                
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mt:"6",
                  "&:hover": {
                    color: "text.secondary",
                  },
                }}
              >
                Login to read and add posts
              </Typography>
            </Box>
          </Container>
          <Footer />
        </AppTheme>
      </>
    );
  }

  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <Header />
       <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
          <MainContent/>
           <Latest />
        </Container>
        <Footer />
      </AppTheme>
    </>
  );
}

export default Home;
