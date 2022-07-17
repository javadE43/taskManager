import React, { useContext, useState } from 'react'

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';

import IdlistContext from '../context/idList';

const actions = [
  { icon: <CreateOutlinedIcon />, name: 'put' },
  { icon: <CreateOutlinedIcon />, name: 'patch' },
  { icon: <AddOutlinedIcon />, name: 'new' },
];

export default function Speeddial() {

  const {_listId,setListId,task_id,setTask_id}=useContext(IdlistContext)
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();
  const hanldeUpdate=(name)=>{
    const handleClickVariant = (value,variant) =>{
      enqueueSnackbar(` ${value}!`, { variant },{autoHideDuration:2000});
    };
    switch (name) {
      case "new":
        navigate("/addtask")
        break;
      case "patch":
        if(typeof task_id =="string" && task_id.length>0){
          navigate("/patchtask")
        }else{
          handleClickVariant("choose Task","error")
        }
        break;
      case "put":
        if(typeof task_id =="string" && task_id.length>0){
          navigate("/puttask")
        }else{
          handleClickVariant("choose Task","error")
        }
        break;
    
      default:
        break;
    }
  }


  return (
    <Box sx={{ height: 0, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action,index) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=>hanldeUpdate(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
