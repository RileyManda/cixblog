import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import {
  Typography,
  Button,
  ButtonGroup,
  Input,
  TextField,
  Box,
  Grid,
  IconButton,
  Card,
} from '@mui/material';
import Router from 'next/router';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { Publish, Delete } from '@mui/icons-material';
import { red,green } from '@mui/material/colors';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <Typography variant='h6' noWrap>
          {title}
        </Typography>
        <Card>
          <Typography variant='h6' noWrap>
            By {props?.author?.name || 'Unknown author'}
          </Typography>
          <ReactMarkdown children={props.content} />
          {!props.published && userHasValidSession && postBelongsToUser && (
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => publishPost(props.id)}
            >
              <Publish sx={{ color: green[500] }} />
            </IconButton>
          )}
          {userHasValidSession && postBelongsToUser && (
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => deletePost(props.id)}
            >
              <Delete sx={{ color: red[500] }} />
            </IconButton>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Post;
