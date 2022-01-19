import { Express } from 'express';

import appCommon from './app';
import users from './users';

const init: (app: Express) => void = (app: Express) => {
  app.use('/', appCommon);
  app.use('/api/v1/', users);
};

export default init;
