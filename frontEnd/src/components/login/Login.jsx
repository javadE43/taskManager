import React, {useContext, useState,useRef, useEffect } from 'react'

import { Link,useNavigate } from 'react-router-dom'
import { LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Container, Grid, Paper, Stack, TextField, Typography, useTheme } from '@mui/material'
import { SnackbarProvider, useSnackbar } from 'notistack';

import tmdbApi from '../../api/tmdbApi'

import {StyleBox,StyleStack}from './index'

export const Login = () => {

  const navigast=useNavigate()
  const userRef=useRef();
  const errRef=useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [user,setUser]=useState('');
  const [pwd,setPwd]=useState('');
  const [errMsg,setErrMsg]=useState('');
  const [success,setSuccess]=useState('');

  const theme=useTheme();

  const handleClickVariant = (value,variant) =>{
    enqueueSnackbar(` ${value}!`, { variant });
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(pwd.length<8){
      handleClickVariant("password` (`123`) is shorter than the minimum allowed length (8)" ,"error")
      navigast('/login')
    return
    }

    let data= tmdbApi.login({ password:pwd,email:user})
   try {
    let header=(await data).head
    let res=(await data).data
      localStorage.setItem("access_token",header["x-access-token"])
      localStorage.setItem("access_token_refresh",header["x-refresh-token"])
      localStorage.setItem("loginId",res._id)
      navigast('/')
   } catch (error) {
    if(error.response.data =="The information entered is not correct"){
      navigast('/login')
      handleClickVariant(error.response.data ,"error")
      return
     }
    if(error.response.data.data[0] =="email is invalid"){
      navigast('/login')
      handleClickVariant(error.response.data.data[0] ,"error")
      return
     }
   }
  }

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
       setErrMsg('')
  }, [user,pwd])

return (
    <>
<Box sx={{background:'#4fcaa7',height:'100vh',overflow:'hidden'}}>
  <Container maxWidth='xs'>
    <Grid>
       <Paper elevation={10} sx={{
           padding:'20px',
           width:'80%',
           margin:'20px auto',
       }}>
    {success?
          <Box>
            <Typography component='h1'>you are logged in!</Typography>
          </Box>:
         (<>
           <Grid item>
            <Stack alignItems='center'>
                <Avatar sx={{background:"#d32f2f"}}><LockOutlined color='#f3f5f9'/></Avatar>
                   <Typography variant='h4'>Sign in</Typography> 
                   <p ref={errRef}>{errMsg}</p>
            </Stack>
           </Grid>
           <Box component='form' onSubmit={handleSubmit}>
             <TextField 
             sx={{marginTop:'1rem'}} 
             label='email' 
             type='email'
             placeholder='Enter email' 
             fullWidth 
             required
             ref={userRef}
             onChange={(e)=>setUser(e.target.value)}
             autoComplete='off'
             value={user}
             />    
             <TextField 
             sx={{marginTop:'1rem'}} 
             label='Password' 
             type='text' 
             placeholder='Enter password' 
             fullWidth 
             required
             onChange={(e)=>setPwd(e.target.value)}
             value={pwd}
             />
             <Button sx={{marginY:'1rem'}} type="submit" variant='contained' color='error' fullWidth>Sign in</Button>
            </Box>
             <Typography>
                 Do you have an account?
                 <Link to='/register'>
                    Sign up
                 </Link>
             </Typography>
           </>)}
       </Paper>
    </Grid>
  </Container>
  </Box>
  </>

  )
}




















  // const response= await axios.post('http://localhost:4000/api/auth/login',
  //    { password:pwd,email:user}
  //   )
  //   .then(res=>{
  //     localStorage.setItem("access_token",res.headers["x-access-token"])
  //     localStorage.setItem("access_token_refresh",res.headers["x-refresh-token"])
  //     localStorage.setItem("loginId",res.data._id)
  //     navigast('/')
  //     console.log(res)
  //   })
  //   .catch(err=>{
  //     throw new Error(err)
  //   })