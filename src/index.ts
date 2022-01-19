import express, { NextFunction, Request, Response } from 'express';

import routeInit from '@/routes';
import AppError from '@/common/AppError';
import ErrorResponse from '@/models/ErrorResponse';
import { ErrorCodes } from '@/types/Error';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../resources/doc.json';

const app = express();
const { PORT = 3000, NODE_ENV } = process.env;

app.use(express.json());

routeInit(app);

// Only show swagger if we're not in production.
/*if (NODE_ENV !== 'production') {
    // eslint-disable-next-line
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}*/

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const resBody = new ErrorResponse(err.message, err.errorCode || ErrorCodes.GeneralError);
  res.status(err.httpCode || 500).json(resBody);
  next(err);
};
app.use(errorHandler as express.ErrorRequestHandler);

// Only show swagger if we're not in production.
if (NODE_ENV !== 'production') {
  // eslint-disable-next-line
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

app.all('*', (req, res) => {
  res.status(404).json({
    status: '404',
    message: 'endpoint not found',
  });
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
