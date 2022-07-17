import React,{ useRef, useState} from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { AddCircleOutlineOutlined, LockOutlined } from '@mui/icons-material'
import { Avatar,
   Box,
   Button, 
   Container,
   Grid,
   Paper,
   Stack,
   TextField,
   Typography } from '@mui/material';
   import {Link, useNavigate} from 'react-router-dom';
   
  import tmdbApi from '../../api/tmdbApi'


export const Register = () => {
  const Navigate =useNavigate()
  const errRef=useRef();
  const [errMsg,setErrMsg]=useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [ success,setsuccess ] = useState(false);
  const [value,setValue]=useState({
    email:'',
    password:'',
 })

 const handleClickVariant = (value,variant) =>{
  enqueueSnackbar(` ${value}!`, { variant });
};
const handleOnsubmit= async (e)=>{
  e.preventDefault();
  if(value.password.length<8){
    handleClickVariant("password` (`123`) is shorter than the minimum allowed length (8)" ,"error")
    Navigate('/register')
  return
  }
 let res= tmdbApi.register(value)
  try {
    let data=(await res).data
    if(data){
      Navigate('/login')
      handleClickVariant("Registration was successful" ,"success")
    }
  } catch (error) {
    if(error.response.data.message =="this email already registered"){
      Navigate('/register')
      handleClickVariant(error.response.data.message ,"error")
      return
     }
    if(error.response.data.data[0] =="email is invalid"){
      Navigate('/register')
      handleClickVariant(error.response.data.data[0] ,"error")
      return
     }

  }
}

  return (
    <>
    <Box sx={{background:'#4fcaa7',height:'100vh',overflow:'hidden'}}>
  <Container maxWidth='xs'>
    <Grid>
       <Paper elevation={10} sx={{
           padding:'20px',
           height:'auto',
           width:'350px',
           margin:'20px auto',
       }}>
           <Grid item>
            <Stack alignItems='center'>
                <Avatar sx={{background:"#d32f2f"}}><AddCircleOutlineOutlined color='#f3f5f9'/></Avatar>
                   <Typography variant='h4'>Sign up</Typography> 
                   <Typography sx={{marginTop:'0.7rem'}} fontWeight='700' variant='caption'>please fill this from to create an account !</Typography> 
                   <Link to='/login'>sign in</Link> 
                   <p ref={errRef}>{errMsg}</p>
            </Stack>
           </Grid>
           <form onSubmit={handleOnsubmit}>  
                <TextField
                 variant='standard'
                 sx={{marginTop:'1rem'}}
                 label='Email'
                 type='email'
                 placeholder='Enter Email'
                 fullWidth 
                 required
                 value={value.email}
                 onChange={(e)=>setValue({...value,email:e.target.value})}
                      />    
                <TextField
                 variant='standard'
                 sx={{marginTop:'1rem'}}
                 label='Password' 
                 type='Password' 
                 placeholder='Enter Password' 
                 fullWidth 
                 required
                 value={value.password}
                 onChange={(e)=>setValue({...value,password:e.target.value})}
                   />
                <Box marginTop='1rem'>
                      <Button variant='contained' type='submit' color='error'>Sign up</Button>
               </Box>
           </form>
       </Paper>
      </Grid>
    </Container>
    </Box>
    </>
  )
}










// const response=await axios.post('http://localhost:4000/api/auth/register',
// value)
// .then(res=>{
//   handleClickVariant('success')
// })
// .catch(err=>{console.log(err)})
// Navigate('/login')