const asyncHandler = (requestHandler) => (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err));    
     
}
export{asyncHandler};

// const asyncHandler = (fn) => () => {};
// const asyncHandler = (fn) => (req, res, next) => {};