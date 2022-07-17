import React, { useEffect } from 'react'

import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import {useTheme}from '@mui/material/styles'


import VerticalTabs from '../../subcomponents/ListTasks';
import OptionMenu from '../../subcomponents/OptionMenu';
import Speeddial from '../../subcomponents/Speeddial';

import {StylePaper, StyleStack,StyleStackTask} from './index';


export const Task = () => {
  const theme=useTheme();
  const matches =useMediaQuery(theme.breakpoints.down('sm'));

  const navigate=useNavigate()
  const handleAddLis=()=>{
    navigate('/addlist')
  }
  useEffect(() => {
  
  }, [])
  return (
      <Box 
      maxHeight='490px'
      minHeight='300px'
      height='490px'
      overflow='hidden'
      padding='1rem'
      minWidth="600px"
      sx={{
        // overflowY:"auto"
      }}
      >
        <Stack direction='row' justifyContent='space-between' width='369px'>
        <Box sx={matches?{width:'20%'}:{width:'20%'}}>
            <Typography  fontWeight='bolder' variant='h6' color='#4fcaa7' component='span'>LISTS</Typography>
        </Box>
        <Box sx={matches?{width:'60%'}:{width:'50%'}}>
            <Typography  fontWeight='bolder' variant='h6' color='#4fcaa7' component='span'>TASKS</Typography>
        </Box>
        </Stack>
           <Grid container sx={{height:'83%'}}>
             <Grid item xs={12} sx={{height:"100%"}}>
                 <VerticalTabs/>
             </Grid>
           </Grid>
           <Stack>
        {/* <Box> */}
            <Speeddial/>
         {/* </Box> */}
        <Box height="10%" justifyContent='center' paddingX='1rem'>
                    <Button
                    size={matches?"small":'medium'}
                    variant="contained" 
                    onClick={handleAddLis}
                    >
                      Add List
                    </Button>
                  </Box>
        </Stack>
      </Box>
  )
}


