import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const valideteRequest = (schema:AnyZodObject) =>{

    return async(req:Request,res:Response,next:NextFunction) =>{
        
        try {
            // here i am chacking the validation 
        // if the validation is ok then it utomaticly called next() methode 
        await schema.parseAsync({
            body: req.body
        })
        next()
        } catch (err) {
            next(err)
        }
    }
}
export default valideteRequest