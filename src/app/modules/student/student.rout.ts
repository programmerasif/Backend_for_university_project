import express, { Application, Request, Response } from 'express';
import { studentControlars } from './student.controlar';

const router = express.Router();

// will call the controlar function
// router.post('/create-student', studentControlars.creatStudent);
router.get('/', studentControlars.getAllStudent);
router.delete('/:studentId', studentControlars.deleteStudent);

export const studentRoutes = router;
