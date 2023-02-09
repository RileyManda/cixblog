import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import DraftsIcon from '@mui/icons-material/Drafts';
import FeedIcon from '@mui/icons-material/Feed';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
function Header() {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();

  let left = (
    <>
      <Link href='/'>
        {/* <Typography
          variant='h6'
          noWrap
          component='div'
          align='right'
          sx={{ display: { xs: 'none', sm: 'block' } }}
          data-active={isActive('/')}
        ></Typography> */}

        <IconButton
          size='large'
          color='inherit'
          href='/'
          data-active={isActive('/')}
        >
          <Badge badgeContent={4} color='error'>
            <FeedIcon />
          </Badge>
        </IconButton>
      </Link>
    </>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <>
        <Link href='/'>
          <a className='bold' data-active={isActive('/')}>
            Feed
          </a>
        </Link>
      </>
    );
    right = (
      <div className='right'>
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <>
        {/* <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link> */}
        <IconButton
          size='large'
          aria-label='show 4 new mails'
          color='inherit'
          href='/api/auth/signin'
        >
          <AccountCircleIcon />
        </IconButton>
      </>
    );
  }

  if (session) {
    left = (
      <>
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <IconButton
          size='large'
          color='inherit'
          href='/'
          data-active={isActive('/')}
        >
          <Badge badgeContent={4} color='error'>
            <FeedIcon />
          </Badge>
        </IconButton>

        <IconButton
          size='large'
          aria-label='show 4 new mails'
          color='inherit'
          href='/drafts'
          data-active={isActive('/drafts')}
        >
          <Badge badgeContent={4} color='error'>
            <DraftsIcon />
          </Badge>
        </IconButton>
      </>
    );
    right = (
      <>
        <Stack direction='row' spacing={2}>
          <Link href='/create'>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
            >
              <CreateIcon />
            </IconButton>
          </Link>

          <IconButton size='large' color='inherit' onClick={() => signOut()}>
            <LogoutIcon />
          </IconButton>
        </Stack>
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            CixBlog
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {left}
            {right}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
