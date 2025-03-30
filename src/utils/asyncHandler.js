const asynHandler = (requestHandler) =>{ 
    return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err));    
  }  
}
export{asynHandler};


// const asyncHandler = (fn) => () => {};
// const asyncHandler = (fn) => (req, res, next) => {};