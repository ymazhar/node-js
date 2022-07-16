function errorMiddleware(err, req, res, next) {
    console.log(err);
    console.log(req);
    console.log(res);
    next();
}

export default errorMiddleware;
