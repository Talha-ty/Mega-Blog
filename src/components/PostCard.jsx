import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/conf';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';

function PostCard({ $id, title, featuredImage, content }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : '/placeholder-image.jpg';

  // Truncate visible text if HTML is long
  const truncated =
    content?.length > 300 ? content.substring(0, 300) + '...' : content;

  return (
    <Box sx={{ m: 2 }}>
      <Link
        to={`/post/${$id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card
          sx={{
            maxWidth: 345,
            borderRadius: 3,
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': { boxShadow: 6, transform: 'scale(1.02)' },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              image={imageUrl}
              alt={title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                textAlign="center"
                sx={{ fontWeight: 'bold' }}
              >
                {title}
              </Typography>

              {/* ✅ Render HTML safely here */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
                dangerouslySetInnerHTML={{ __html: truncated }}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Box>
  );
}

export default PostCard;



