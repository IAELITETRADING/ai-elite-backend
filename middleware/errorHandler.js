exports.errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur serveur :', err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'stack masquée' : err.stack
  });
};
