
import  React,{useContext} from 'react';

import { useTheme } from '@emotion/react'
import { Paper, useMediaQuery } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const Header=()=>{
  const theme=useTheme();
  const matches =useMediaQuery(theme.breakpoints.down('sm'));

  const navigast=useNavigate()

    const handlelogout=()=>{
        localStorage.removeItem("access_token")
        localStorage.removeItem("access_token_refresh")
        localStorage.removeItem("loginId")
        navigast('/login')
    }

  return (
    <Box sx={{ flexGrow: 1 }} width={matches?"600px":"100%"}>
      <AppBar sx={{background:'#fff'}} position="static">
        <Toolbar variant="dense">
          <IconButton onClick={handlelogout} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <LogoutOutlinedIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            TaskManager
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}