// handle errors
const express=require('express');
const router=express.Router();
const authRouter=require('./auth');
const userRouter=require('./user');
const taskmanager=require('./listTask');
const tasks=require('./tasks')
const adminRouter=require('./admin')
const error=require("./../middleware/error")
const {isLoggined,isAdmin}=require('./../middleware/auth')
// router.use('/user',isLoggined,userRouter)
router.use('/users/me/access-token',adminRouter)
router.use('/auth',authRouter)
router.use('/lists',taskmanager)
router.use('/lists/task',tasks)

router.use(error);

module.exports=router;