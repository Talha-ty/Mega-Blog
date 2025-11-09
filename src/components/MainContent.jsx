import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import parse from "html-react-parser";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import appwriteService from '../appwrite/conf'; // Make sure this is correct

// Styled components
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

// Author component
function Author({ authors }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar key={index} alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
        <Typography variant="caption">{authors.map((author) => author.name).join(', ')}</Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Search component
export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{ 'aria-label': 'search' }}
      />
    </FormControl>
  );
}

// MainContent component fetching dynamic posts
export default function MainContent({ $id, title, featuredImage, content }) {
  const [posts, setPosts] = React.useState([]);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  React.useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  const handleFocus = (index) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);
  const handleClick = () => console.info('You clicked the filter chip.');

  if (!posts.length) {
    return (
      <Box sx={{ width: '100%', py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Login to read posts</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>Blog</Typography>
        <Typography>Stay in the loop with the latest about our products</Typography>
      </div>

      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'row', gap: 1, width: '100%', overflow: 'auto' }}>
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, width: '100%', justifyContent: 'space-between', alignItems: { xs: 'start', md: 'center' }, gap: 4, overflow: 'auto' }}>
        <Box sx={{ display: 'inline-flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}>
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip onClick={handleClick} size="medium" label="Company" sx={{ backgroundColor: 'transparent', border: 'none' }} />
          <Chip onClick={handleClick} size="medium" label="Product" sx={{ backgroundColor: 'transparent', border: 'none' }} />
          <Chip onClick={handleClick} size="medium" label="Design" sx={{ backgroundColor: 'transparent', border: 'none' }} />
          <Chip onClick={handleClick} size="medium" label="Engineering" sx={{ backgroundColor: 'transparent', border: 'none' }} />
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'row', gap: 1, width: 'fit-content', overflow: 'auto' }}>
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2} columns={12}>
        {posts.map((post, index) => (
          <Grid key={post.$id} size={{ xs: 12, md: 6 }}>
            <Link
        to={`/post/${$id}`}
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
              <Author authors={post.authors || []} />     
            </StyledCard>
          </Link>
           </Grid>
        ))}
         
      </Grid>
    </Box>
  );
}
