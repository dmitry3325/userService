/**
 * @swagger
 * definitions:
 *  BaseResponse:
 *    type: object
 *    properties:
 *      result:
 *        type: boolean
 *      data:
 *        type: object
 */

export interface BaseResponse<T> {
  result: boolean;
  data: T;
}
