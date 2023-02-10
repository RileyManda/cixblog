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
  CardActionArea,
} from '@mui/material';
import { styled, Theme, createStyles } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ImagePlaceholder from '../assets/placeholder.jpg';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';



export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
    date: string;
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

  // const theme = createTheme();

  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  let initials = [...authorName.matchAll(rgx)] || [];
  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardActionArea
            sx={{ minWidth: 200, maxWidth: 275 }}
            component='a'
            onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
          >
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label='author'>
                    {initials}
                  </Avatar>
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.title}
                subheader='date'
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
                <Typography
                  sx={{ mb: 1.5 }}
                  color='text.secondary'
                  variant='subtitle1'>
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
          </CardActionArea>
        </Grid>
      </Grid>
    </>
  );
}
