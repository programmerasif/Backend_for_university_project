import mongoose from "mongoose"
import { TGenericErrorResponse } from "../interface/error"

const handelCastError = (err:mongoose.Error.CastError): TGenericErrorResponse =>{
   const errorSources = [{
    path : err?.path,
    message : err.message
   }]
    const statusCode = 400
    return{
        statusCode,
        message : 'Invalid ID Error',
        errorSources 
      }
}
export default handelCastError