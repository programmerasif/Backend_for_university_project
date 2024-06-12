import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.rout';
import { UserRoutes } from '../modules/user/user.rout';
import { AcademicSemisterRout } from '../modules/academicSemester/academicSemester.rout';
import { AcademicFacultyRout } from '../modules/academicFaculty/academicFaculty.rout';
import { AcademicDepertmentsRout } from '../modules/academicDepertment/academicDepertment.rout';
import { FacultyRoutes } from '../modules/Faculty/faculty.rout';
import { AdminRoutes } from '../modules/Admin/admin.rout';
import { CourseRoutes } from '../modules/course/course.rout';

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
  {
    path: '/academic-faculty',
    route: AcademicFacultyRout,
  },
  {
    path: '/academic-depertment',
    route: AcademicDepertmentsRout,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
];
moduleRouts.forEach(routes => route.use(routes.path, routes.route)); //here im using for each to avoid DRY all the route and path will coming ans set here like route.use("/Example",exampleRoutes)

export default route;
