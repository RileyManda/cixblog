import React from 'react';
import type { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from '@mui/material/Container';
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

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
  window?: () => Window;
  children: React.ReactElement;
};
const Blog: React.FC<Props> = (props: Props) => {
  return (
    <Layout>
      <div className='page'>
        <Typography variant='h6' noWrap>
          Public Feed
        </Typography>
        <main>
          <Grid container spacing={4}>
            {props.feed.map((post) => (
              <div key={post.id} className='post'>
                <Post post={post} />
              </div>
            ))}
          </Grid>
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
