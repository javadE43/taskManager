import React, { useCallback, useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IdlistContext from '../context/idList';
import { Divider, Grid, Link, Paper, Stack, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { useTheme } from '@emotion/react';
import { Scrollbar } from "react-scrollbars-custom";
import tmdbApi from '../api/tmdbApi'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
     width='88%'
    //  bgcolor='#ebebeb6b'
     sx={{
      position:"relative",
      overflow:"hidden",
      overflowY:'auto',
      marginRight:' -1.8rem',
     }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

 function VerticalTabs() {

  const theme=useTheme();
  const matches =useMediaQuery(theme.breakpoints.down('sm'));



  const [value, setValue] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [list, setList] = useState([]);
  const [task, setTask] = useState([]);
  const [idTask, setIdTask] = useState([]);
  const {_listId,setListId,task_id,setTask_id}=useContext(IdlistContext)
  const navigate=useNavigate()


  const selectedTask=(e,idTask)=>{
    e.preventDefault();
    setTask_id(idTask);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddList=useCallback(async (e)=>{
    let token_access=localStorage.getItem("access_token")
    let config={
      headers:{"x-access-token" : `${token_access}`}
    }
    let data=tmdbApi.getList(config);
    try {
      let res=(await data).data
      setList(res.data)
    } catch (error) {
      navigate('/login')
      throw new Error(error.message)
    }
  },[])

  const handleAddTask= async (_listId)=>{
    let token_access=localStorage.getItem("access_token")
    let config={
      headers:{"x-access-token" : `${token_access}`}
    }
    setListId(_listId)
    let data=tmdbApi.getAllTasks(_listId,config);
    try {
      let res=(await data).data
      setTask(res)
      setTask_id('')
    } catch (error) {
      navigate('/login')
      throw new Error(error.message)
    }
  }

  const handleChangeCompleted=async (e,taskID,_listId)=>{
    let token_access=localStorage.getItem("access_token")
    let config={
      headers:{"x-access-token" : `${token_access}`}
    }
    let listID;
    if(typeof _listId === "object"){
      listID=_listId[0]["_id"]
    }else{
      listID=_listId
    }
      setCompleted(!completed)
       let data= tmdbApi.patchTask(listID,taskID,{completed:completed},config)
      try {
        let res=(await data).data
        handleAddTask(listID)
      } catch (error) {
        throw new Error(error)
      }
      
  }
  const handleDeleteTask=async (e,taskID,_listId)=>{
      let token_access=localStorage.getItem("access_token")
      let config={
        headers:{"x-access-token" : `${token_access}`}
      }
      let listID;
      if(typeof _listId === "object"){
        listID=_listId[0]["_id"]
      }else{
        listID=_listId
      }
        // setCompleted(!completed)
          let data=tmdbApi.deleteTask(listID,taskID,config)
          try {
            let res=(await data).data
            handleAddTask(listID)
          } catch (error) {
            throw new Error(error)
          }
    }

  const handleonloadCopleted=async ()=>{
      let token_access=localStorage.getItem("access_token")
      let config={
        headers:{"x-access-token" : `${token_access}`}
      }
      let data=tmdbApi.getList(config);
       try {
        let res=(await data).data

        if(typeof _listId === "string" && _listId.length>0){
          handleAddTask(_listId)
          setListId(_listId)
          return
        }
         if(res){
          handleAddTask(res.data[0]["_id"])
          setListId(res.data)
          return 
         }
       } catch (error) {
        throw new Error(error)
       }
    }

  useEffect(() => {
    handleAddList()
  }, [task,completed])

  useEffect(() => {
    handleonloadCopleted()
  }, [])

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
           borderRight: 1,
           borderColor: 'divider',
           overflow:"hidden",
           overflowY:'auto',
           height:'100%',
           minWidth:"150px",
           maxWidth:"200px"
           }}
      >
        {
           list.length>0?
  
           
            list && list.map((item,index)=>(

              <Tab
              key={index}
              label={item.title}
              {...a11yProps(index)}
              sx={{
              fontSize:matches?"0.6rem":"0.7rem",
               }}
              onClick={(e)=>handleAddTask(item._id)}
              />
))
             
           
           :<Typography 
           fontSize={matches?"0.5rem":"0.6rem"}
           variant='h6'
           component="span"
            >
              To create a list, click on the add list button
          </Typography>
          }
      </Tabs>
    {
      list && list.map((item,index)=>(
        <TabPanel key={index} value={value} index={index} >
          {task? 
             <>{
              task&&task.map((task,index)=>(
                <Link 
                href='/' 
                key={index} 
                underline="none"
                onClick={(e)=>selectedTask(e,task._id)} 
                >
                <Paper 
                sx={{
                  padding:'0.7rem',
                  marginY:"0.5rem",
                  position:"relative",
                  background:completed?"#fff":"#fff",
                  border:task._id == task_id?"1px solid #4fcaa7":"none"
                  }}>
                 {task.completed && <Typography 
                 color="error" 
                 fontWeight='bold'
                 sx={{position:"absolute",
                 top:'0',
                 right:"50%",
                 transform:"translate(50%,0%)",
                  width:'100%',
                  height:'100%',
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  background:'#0c2b1f',
                  opacity:"0.8"
                 }}>completed</Typography>} 
                <Grid container>
                  <Grid item xs={8} sx={{marginY:'0.7rem'}}>
                     <Stack direction='row'>
                      <Typography color='#e1e1e1' component='span' marginRight='1rem'>Title</Typography>
                      <Typography color='primary' component='span'>  {task.title} </Typography>
                    </Stack> 
                  </Grid>
                  <Grid item xs={12}>
                  <Stack direction='row'>
                      <Typography color='#e1e1e1' component='span'  marginRight='1rem'>Des</Typography>
                      <Typography  component='span'> {task.description} </Typography>     
                    </Stack> 
                  </Grid>
                </Grid>
                <Box sx={{position:"absolute",top:"25px",right:"0",hight:"100%"}}>
                  <Stack direction='row'>
                      <IconButton aria-label="delete" onClick={(e)=>handleChangeCompleted(e,task._id,_listId)}>
                        {task.completed?<AssignmentTurnedInOutlinedIcon color='primary'/>
                        :
                        <AssignmentTurnedInOutlinedIcon color='error'/>
                        }
                      </IconButton>
                      <IconButton aria-label="delete" onClick={(e)=>handleDeleteTask(e,task._id,_listId)}>
                        <DeleteIcon color='error'/>
                    </IconButton>
                  </Stack>
                </Box>
              </Paper>
            </Link> 
              ))
            }
            </>
            :<Typography 
               fontSize={matches?"0.5rem":"0.6rem"}
               variant='h6'
               component="span"
              >To create a new task, hold the mouse over the button on the right side of the screen and click on the new icon.</Typography>}
      </TabPanel>
      ))
    }
    </Box>
  );
}


export default React.memo(VerticalTabs)

