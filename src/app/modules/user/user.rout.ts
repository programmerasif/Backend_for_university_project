import express from 'express'
import { UsersControlers } from './user.controlar';
const rout = express.Router()

rout.post('/creat-student',UsersControlers.creatStudent);
export const UserRoutes = rout