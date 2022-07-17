// import {useSelector,useDispatch} from 'react-redux';
import React,{ useState,useEffect, useContext } from 'react';
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import { Box, Container, CssBaseline, Slide } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ConfigPages from './configpages';
import { IdlistProvider } from './context/idList';

function App() {
const Navigate =useNavigate()

useEffect(() => {
  const login=()=>{
    let token=localStorage.getItem("access_token")
    if(!token){
      Navigate('/login')
    }
  }
  login();
}, [])


  return (
    <SnackbarProvider 
    maxSnack={2}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
  }}
  TransitionComponent={Slide}
  autoHideDuration={1000}
    >
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <IdlistProvider>
           <ConfigPages/>
        </IdlistProvider>
      </ThemeProvider>
    </SnackbarProvider>
  )
}

export default App;
