import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/conf";
import AppTheme from "../components/customization/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Box from "@mui/material/Box";
import {  CircularProgress } from '@mui/material';

function AllPosts(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // ✅ Fetch inside useEffect
    appwriteService.getPosts().then((result) => {
      setLoading(true);
      if (result && result.documents) {
        setPosts(result.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
    {loading ?
    <div className="mt-24">
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
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
    </div>
    :
    <div className="mt-24">
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </AppTheme>
    </div>
    }
    </>
    
  );
}

export default AllPosts;
