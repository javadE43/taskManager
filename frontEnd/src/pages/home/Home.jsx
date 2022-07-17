import { useTheme } from '@emotion/react'
import { Paper, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Header } from '../../components/header/Header'
import { Task } from '../../components/sectionTask/Task'

export const Home = () => {
  const theme=useTheme();
  const matches =useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Header/>
       <Container maxWidth='lg' sx={{padding:'3rem 0'}}>
        <Paper sx={{width:matches?'600px':"80%",margin:'auto'}}>
           <Task/>
        </Paper>
      </Container>    
    </>
  )
}

