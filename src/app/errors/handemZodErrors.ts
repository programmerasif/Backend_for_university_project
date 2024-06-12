import { ZodError, ZodIssue } from "zod"
import { TErrorSource, TGenericErrorResponse } from "../interface/error"

const handelZodError = (err: ZodError):TGenericErrorResponse =>{
    const errorSources : TErrorSource = err.issues.map((issues:ZodIssue) =>{
     return  {
       path: issues.path[issues.path.length-1],
       message: issues.message
     }
    })
   const statusCode = 400

   return{
     statusCode,
     message : 'Zod Validation Error',
     errorSources 
   }
 }
 export default handelZodError