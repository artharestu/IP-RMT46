module.exports = (error, req, res, next) => {
  let { status, message, name } = error;
  switch (name) {
    case 'SequelizeValidationError':
      status = 400;
      message = error.errors[0].message;
      break;
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeForeignKeyConstraintError':
    case 'InvalidData':
      status = 400;
      message = 'validation errors';
      break;
    case 'InvalidEmailPassword':
      status = 401;
      message = 'Invalid email or password';
      break;
    case 'Unauthorized':
    case 'JsonWebTokenError':
      status = 401;
      message = 'Unauthorized access';
      break;
    case 'Forbidden':
      status = 403;
      message = 'Forbidden access';
      break;
    case 'NotFound':
      status = 404;
      message = 'error not found';
      break;
    default:
      status = 500;
      message = 'Internal Server Error';
      break;
  }

  res.status(status).json({ message });
}