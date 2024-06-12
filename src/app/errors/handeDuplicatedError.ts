import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handeDuplicatedError = (err:any) : TGenericErrorResponse =>{
 // Extract value within double quotes using regex
 const match = err.message.match(/"([^"]*)"/);

 // The extracted value will be in the first capturing group
 const extractedMessage = match && match[1];

 const errorSources: TErrorSource = [
   {
     path: '',
     message: `${extractedMessage} is already exists`,
   },
 ];

    const statusCode = 400
    return{
        statusCode,
        message : 'Invalid ID Error',
        errorSources 
      }
}
export default handeDuplicatedError