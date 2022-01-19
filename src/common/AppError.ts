import { ErrorCodes } from '@/types/Error';

export default class AppError extends Error {
  public errorCode: number;

  public httpCode: number;

  private randCode: number;

  constructor(message: string, errorCode = ErrorCodes.GeneralError, httpCode = 500) {
    super(message);
    this.errorCode = errorCode;
    this.randCode = Math.random();
    this.httpCode = httpCode;
  }
}
