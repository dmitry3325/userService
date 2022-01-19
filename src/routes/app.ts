import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * /health:
 *  get:
 *    description: Get a basic open service health check endpoint
 *    tags:
 *      - Application
 *    responses:
 *      200:
 *        description: Health check response
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 */
router.get('/health', (req: Request, res: Response) => {
  res.send({
    status: 'OK',
    message: 'No covid here',
  });
});

export default router;
