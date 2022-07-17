
import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { Login } from '../components/login/Login'
import { Register } from '../components/register/Register'
import{Home} from '../pages/home/Home'
import { AddList } from '../subcomponents/AddList'
import { AddTask } from '../subcomponents/AddTask'
import { PatchTask } from '../subcomponents/PatchTask'
import { PutTask } from '../subcomponents/PutTask'

 const ConfigPages = () => {
  return (
    <div>
     <Routes>
         <Route path='/'element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/addlist' element={<AddList/>}/>
        <Route path='/addtask' element={<AddTask/>}/> 
        <Route path='/patchtask' element={<PatchTask/>}/> 
        <Route path='/puttask' element={<PutTask/>}/> 
     </Routes>
    </div>
  )
}

export default ConfigPages;