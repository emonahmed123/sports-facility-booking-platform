/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextFunction , Request, Response } from 'express';
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (err:any, req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUNDS',
    error: '',
  });
  
};

export default notFound;
