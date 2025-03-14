class ApiError extends  Error {
    constructor(
         statusCod,
         message="something went wrong",
         errors =[],
         stack =""
    ){
        super(message)
        this.statusCode = this.statusCode
        this.data =null
        this.message = message
        this. success = false;
        this.errors =  this.errors

        if(statck){
             this.stack = statck;
        }
        else{
            Error.captureStackTrace(this, this.constructor)

        }
    }
}

export{ApiError}