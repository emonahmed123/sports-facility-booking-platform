/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import hangelZodError from '../error/handleZodError';
import handleValidationError from '../error/ValidationError';
import handleCastError from '../error/handleCastError';
import AppError from '../error/AppError';
import handleDuplicateError from './handleDuplicateError';

const gobleErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simlifiedError = hangelZodError(err);

    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simlifiedError = handleValidationError(err);

    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,

    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
    // error: err,
  });
};

export default gobleErrorhandler;
