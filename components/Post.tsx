import React, { useState } from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import {
  Card,
  CardActions,
  Avatar,
  IconButton,
  Grid,
  gridClasses,
  CardHeader,
  Typography,
  Button,
  CardMedia,
  CardContent,
  Paper,
} from '@mui/material';
import { styled, Theme, createStyles } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ImagePlaceholder from '../assets/placeholder.jpg';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
    createdAt: Date;
  } | null;
  content: string;
  published: boolean;
};

export default function Post({ post }) {
  const authorName = post.author ? post.author.name : 'Unknown author';
  const [spacing, setSpacing] = useState(2);
  const postDate = post.createdAt ? post.createdAt : 'date error';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSpacing(Number((event.target as HTMLInputElement).value));
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Grid container spacing={2} direction='row'>
        <Grid item xs={8}>
          <Card
            sx={{ minWidth: 200, maxWidth: 275 }}
            onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='authot'>
                  {authorName}
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='Shrimp and Chorizo Paella'
              subheader='September 14, 2016'
            />
            <CardMedia
              component='img'
              height='194'
              image='../assets/placeholder.jpg'
            />
            <CardContent>
              <Typography variant='h5' component='div'>
                {post.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                <small>By {authorName}</small>
              </Typography>
              <Typography paragraph>
                <ReactMarkdown children={post.content} />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
