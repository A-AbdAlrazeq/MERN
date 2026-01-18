const globalErrHandler = (err, req, res, next) => {
  //status
  const status = err?.status ? err?.status : "failed";
  const statusCode = err?.statusCode ? err.statusCode : 500;
  //message
  const message = err?.message;
  //stack
  const stack = err?.stack;
  const isProd = process.env.NODE_ENV === "production";
  res.status(statusCode).json({
    status,
    message,
    stack: isProd ? undefined : stack,
  });
};

//not found handler
const notFound = (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on the server`);
  err.statusCode = 404;
  next(err);
};

module.exports = { notFound, globalErrHandler };
