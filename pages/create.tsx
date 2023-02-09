import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Typography, Button,ButtonGroup, Input, TextField, Box, Grid } from '@mui/material';
import Router from 'next/router';

function Draft() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <>
        <form onSubmit={submitData}>
          <Typography variant='h6' noWrap>
            New Draft
          </Typography>
          <Grid container alignItems='center' direction='column'>
            <TextField
              autoFocus
              id='outlined-basic'
              label='Title'
              variant='outlined'
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
              type='text'
              value={title}
            />
            <TextField
              multiline
              id='outlined-basic'
              label='Content'
              onChange={(e) => setContent(e.target.value)}
              placeholder='Content'
              rows={8}
              value={content}
            />
            <ButtonGroup>
              <Input
                disabled={!content || !title}
                type='submit'
                value='Create'
              />
              <Button
                className='back'
                href='#'
                onClick={() => Router.push('/')}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
        </form>
      </>
    </Layout>
  );
}

export default Draft;
