import { constant } from "../constant";
const erorrHandler = (err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode : 500;
    switch (statusCode) {
        case constant.VALIDATION_ERORR:
            res.json({
                Title:"validation erorr",
                message:err.message,
                stackTrace:err.stack,
            })
            
            break;

        case constant.NOT_FOUND:
            res.json({
                Title:"not found",
                message:err.message,
                stackTrace:err.stack,
            })
            
            break;

            case constant.UNAUTHERAIZED:
                res.json({
                    Title:"unautherized",
                    message:err.message,
                    stackTrace:err.stack,
                })
                
                break;
        
        case constant.FORBIDDEN:
            res.json({
                Title:"forbidden",
                message:err.message,
                stackTrace:err.stack,
            })
            
            break;
        case constant.SERVER_ERORR:
            res.json({
                Title:"intertnal server erorr",
                message:err.message,
                stackTrace:err.stack,
            })
            
            break;
        default:
            console.log("all ok")
            break;
    }
    
}