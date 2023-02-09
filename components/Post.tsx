import React, { useState } from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled, Theme, createStyles, makeStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

function Post({ post }) {
  const authorName = post.author ? post.author.name : 'Unknown author';
  const [spacing, setSpacing] = useState(2);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const jsx = `
<Grid container spacing={${spacing}}>
`;
  return (
    <div>
      <Grid spacing={2}>
        <Grid item xs={6}>
           <Card sx={{ minWidth: 275,maxWidth:275 }}
            onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
          >
            <CardMedia
              sx={{ height: 140 }}
              image='/static/images/cards/contemplative-reptile.jpg'
              title='green iguana'
            />
            <CardContent>
              <Typography variant='h5' component='div'>
                {post.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                <small>By {authorName}</small>
              </Typography>
              <Typography variant='body2'>
                <ReactMarkdown children={post.content} />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Post;
