import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/conf";
import AppTheme from "../components/customization/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import parse from "html-react-parser";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Box from "@mui/material/Box";
import {  CircularProgress } from '@mui/material';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const StyledParagraph = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'rgba(0, 0, 0, 0.7)',
}));
function AllPosts(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const handleBlur = () => setFocusedCardIndex(null);
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
       <Grid container spacing={2} columns={12}>
        {posts.map((post, index) => (
          <Grid key={post.$id} size={{ xs: 12, md: 6 }}>
            <Link
        to={`/post/${post.$id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
            <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === index ? 'Mui-focused' : ''}
            >
              <CardMedia
                component="img"
                alt={post.title}
                image={post.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : '/placeholder-image.jpg'}
                sx={{ aspectRatio: '16 / 9', borderBottom: '1px solid', borderColor: 'divider' }}
              />
              <StyledCardContent>
               
                <Typography gutterBottom variant="caption" component="div">{post.tag || 'General'}</Typography>
                <Typography gutterBottom variant="h6" component="div">{post.title}</Typography>

                  <StyledTypography
                    variant="body2"
                    component="div"
                     gutterBottom
                   
                  >{parse(post.content)}</StyledTypography>
              </StyledCardContent>
              
            </StyledCard>
          </Link>
           </Grid>
        ))}
         
      </Grid>
      </Container>
      <Footer />
    </AppTheme>
    </div>
    }
    </>
    
  );
}

export default AllPosts;
