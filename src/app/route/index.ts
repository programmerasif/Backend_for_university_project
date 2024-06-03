import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.rout';
import { UserRoutes } from '../modules/user/user.rout';
import { AcademicSemisterRout } from '../modules/academicSemester/academicSemester.rout';

const route = Router();

const moduleRouts = [
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRout,
  },
];
moduleRouts.forEach(routes => route.use(routes.path, routes.route)); //here im using for each to avoid DRY all the route and path will coming ans set here like route.use("/Example",exampleRoutes)

export default route;
