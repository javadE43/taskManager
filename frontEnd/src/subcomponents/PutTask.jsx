import React, { useContext, useState } from 'react'

import { Button, Paper, SliderValueLabel, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import tmdbApi from '../api/tmdbApi'

import { useNavigate } from 'react-router-dom';

import IdlistContext from '../context/idList'

export const PutTask = () => {

  const {_listId,setListId,task_id,setTask_id}=useContext(IdlistContext)
  const navigate=useNavigate()
  const [value,setValue]=useState({
  title:'',
  description:'',
  completed:false
 })    

  const handleAddTask=async (e)=>{
    let token_access=localStorage.getItem("access_token")
    let config={
      headers:{"x-access-token" : `${token_access}`}
    }
    e.preventDefault();
    let listID;
    if(typeof _listId === "object"){
      listID=_listId[0]["_id"]
    }else{
      listID=_listId;
    }
    let res=tmdbApi.putTask(listID,task_id,value,config)
    try {
      let [data]=(await res).data
      let response=(await data).data
      navigate('/')

    } catch (error) {
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
                <Typography color='#4fcaa7' variant='h5' component='span'>TASK</Typography>
                <Box component='form' onSubmit={handleAddTask}>
                <Box>
                <TextField 
                    sx={{marginTop:'1rem'}} 
                    label='ADD TASK' 
                    type='text'
                    placeholder='Enter TASK' 
                    fullWidth 
                    required
                    onChange={(e)=>setValue({...value,title:e.target.value})}
                    autoComplete='off'
                    value={value.title}
                    /> 
                </Box>
                <Box>
                <TextField 
                    sx={{marginTop:'1rem'}} 
                    label='description' 
                    type='text'
                    placeholder='Enter description' 
                    fullWidth 
                    onChange={(e)=>setValue({...value,description:e.target.value})}
                    autoComplete='off'
                    value={value.description}
                    /> 
                </Box>

                <Box>
                  <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Label placement</FormLabel> */}
                    <FormControlLabel
                      value="top"
                      control={<Checkbox />}
                      label="completed"
                      labelPlacement="right"
                      checked={value.completed}
                      onChange={(e)=>setValue({...value,completed:e.target.checked})}
                    />
                </FormControl>
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
// e.preventDefault();
//   try {
//     const response= await axios.post(`http://localhost:4000/api/lists/task/${_id}/task`,
//     value,
//     {
//       headers:{"x-access-token" : `${token_access}`}
//     }
//     )
//     .then(res=>{
//       console.log(res.data)
//       setTask_id(res.data.data._id)
//       navigate('/')
//     })
//   } catch (error) {
//     if(error.response.data){
//       console.log(error.response.data)
//       navigate('/login')
//     }
//   }
// }
// const handleCancel=()=>{
// navigate('/')