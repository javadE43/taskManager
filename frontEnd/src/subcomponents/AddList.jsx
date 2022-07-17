import React, { useContext, useState } from 'react'

import { Button, Paper, SliderValueLabel, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import TextField from '@mui/material/TextField';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';

import tmdbApi from '../api/tmdbApi'
import IdlistContext from '../context/idList'

export const AddList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {_listId,setListId}=useContext(IdlistContext)
  const navigate=useNavigate()
  const [value,setValue]=useState({
  title:'',
  username:''
 })

 const handleClickVariant = (value,variant) =>{
  enqueueSnackbar(` ${value}!`, { variant },{autoHideDuration:2000});
};

  const handleAddList=async (e)=>{
    e.preventDefault();
    let token_access=localStorage.getItem("access_token")
    let config={
      headers:{"x-access-token" : `${token_access}`}
    }

    if(value.title.length>20){
      handleClickVariant("The number of characters entered exceeds the limit","error")
      return
    }
    if(value.username.length>20){
      handleClickVariant("The number of characters entered exceeds the limit","error")
      return
    }
    let data=tmdbApi.postlist(value,config);
    try {
      let res= (await data).data
      setListId(res.data._id)
      navigate('/')
    } catch (error) {
       if(error.response.data.message =="this task already registered"){
        navigate('/addlist')
        handleClickVariant(error.response.data.message ,"error")
        return
       }
       navigate('/login')
       throw new Error(error)
    }
  }

  const handleCancel=()=>{
    navigate('/')
  }

  return (
    <Box>
       <Container
       sx={{
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%,-50%)',
       }}
       
       
       maxWidth='xs'>
           <Paper 
             sx={{
                padding:'1rem'
             }}
            >
              <Box>
                <Typography color='#4fcaa7' variant='h5' component='span'>LIST</Typography>
                <Box component='form' onSubmit={handleAddList}>
                <Box>
                <TextField 
                    sx={{marginTop:'1rem'}} 
                    label='ADD LIST' 
                    type='text'
                    placeholder='Enter NAME LIST' 
                    fullWidth 
                    required
                    // ref={userRef}
                    onChange={(e)=>setValue({...value,title:e.target.value})}
                    // autoComplete='off'
                    value={value.title}
                    /> 
                </Box>
                <Box>
                <TextField 
                    sx={{marginTop:'1rem'}} 
                    label='UserName' 
                    type='text'
                    placeholder='Enter UserName' 
                    fullWidth 
                    required
                    // ref={userRef}
                    onChange={(e)=>setValue({...value,username:e.target.value})}
                    // autoComplete='off'
                    value={value.username}
                    /> 
                </Box>
                <Box 
                 
                 sx={{
                  marginY:'1rem'
                 }}

                 >
                  <Stack 
                   justifyContent='end'
                   direction='row'
                  >
                    <Button
                     sx={{marginX:"0.3rem"}}
                      variant="outlined"
                      type='submit'
                      // onClick={handleAddList}
                      >ADD</Button>
                    <Button 
                     sx={{marginX:"0.3rem"}}
                      variant="outlined"
                      onClick={handleCancel}
                      >
                        Cancel</Button>
                  </Stack>
                </Box>
                </Box>
              </Box>
           </Paper> 
       </Container>
    </Box>
  )
}



























// let token_access=localStorage.getItem("access_token")
// const config={
//   headers: {
//    ' x-access-token':token_access
//   }
//   } 
//   // console.log(token_access)
//   try {
//     const response= await axios.post('http://localhost:4000/api/lists',
//     value,
//     {
//       headers:{"x-access-token" : `${token_access}`}
//     }
//     )
//     .then(res=>{
//       console.log(res.data.data._id)
//       setID(res.data.data._id)
//       navigate('/')
//     })
//   } catch (error) {
//     if(error.response.data){
//       console.log(error.response.data)
//       navigate('/login')
//     }
//   }