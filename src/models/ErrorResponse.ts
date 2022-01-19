/**
 * @swagger
 * definitions:
 *  ErrorResponse:
 *    type: object
 *    properties:
 *      errorMessage:
 *        type: string
 *      errorCode:
 *        type: number
 */
export default class ErrorResponse {
  constructor(
    errorMessage: string,
    errorCode: number,
  ) {
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  public errorMessage: string;

  public errorCode: number;
}
