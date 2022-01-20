import express, { Request, Response } from 'express';
import AppError from '@/common/AppError';
import { ErrorCodes } from '@/types/Error';
import { Mod11 } from '@/tools/Mod11';
import UserService from '@/services/UserService';
import { EntityData } from "@/common/Storage";

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * /api/v1/open/users/:
 *  post:
 *    description: Create new user
 *    tags:
 *      - Users
 *    parameters:
 *    - name: userData
 *      in: body
 *      description: User Data
 *      schema:
 *        $ref: '#/definitions/User'
 *    responses:
 *      200:
 *        description: Create user result
 *        schema:
 *          $ref: '#/definitions/BaseResponse'
 *      400:
 *        description: An error has occurred
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 */
router.post('/users/', (req: Request, res: Response) => {
  if (typeof req.body === 'undefined') {
    throw new AppError('Missing body', ErrorCodes.RequestError, 400);
  }
  return res.send(userService.create(req.body));
});

/**
 * @swagger
 * /api/v1/open/users/{id}/:
 *  put:
 *    description: Update user
 *    tags:
 *      - Users
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      type: number
 *    - name: userData
 *      in: body
 *      description: User data
 *      schema:
 *        $ref: '#/definitions/User'
 *    responses:
 *      200:
 *        description: Update result data
 *        schema:
 *          $ref: '#/definitions/BaseResponse'
 *      400:
 *        description: An error has occurred
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 */
router.put('/users/:id/', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (typeof req.body === 'undefined') {
    throw new AppError('Missing body', ErrorCodes.RequestError, 400);
  }

  return res.send(userService.update(id, req.body));
});

/**
 * @swagger
 * /api/v1/open/users/:
 *  get:
 *    description: Get users list
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: Users list
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/User'
 *      400:
 *        description: An error has occurred
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 */
router.get('/users/', (req: Request, res: Response) => {
  return res.send(userService.findBy(req.query as EntityData));
});

/**
 * @swagger
 * /api/v1/open/users/{id}/:
 *  get:
 *    description: Get account details
 *    tags:
 *      - Users
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      type: number
 *    responses:
 *      200:
 *        description: User
 *        schema:
 *          $ref: '#/definitions/User'
 *      400:
 *        description: An error has occurred
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 */
router.get('/users/:id/', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  return res.send(userService.get(id));
});

/**
 * @swagger
 * /api/v1/open/random_ssn/:
 *  get:
 *    description: Get random ssn
 *    tags:
 *      - Helpers
 *    responses:
 *      200:
 *        description: Random norwegian ssn number
 *      400:
 *        description: An error has occurred
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 */
router.get('/random_ssn/', (req: Request, res: Response) => {
  return res.send({ ssn: Mod11.generateRandomSsn() });
});

export default router;
