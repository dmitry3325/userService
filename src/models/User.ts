import { UserType } from "@/types/User";
import { Currency, CurrencyCode } from "@/types/Currency";
import { AbstractEntity } from "@/common/AbstractEntity";
import AppError from "@/common/AppError";
import { Mod11 } from "@/tools/Mod11";
import { ErrorCodes } from "@/types/Error";

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      id:
 *        type: number
 *      accountNumber:
 *        type: string
 *        required: true
 *      type:
 *        type: string
 *        required: true
 *      name:
 *        type: string
 *        required: true
 *      currency:
 *        type: string
 *        required: true
 */
export class User extends AbstractEntity {
  public id!: number;

  public accountNumber!: string;

  public type!: UserType;

  public name!: string;

  public currency!: CurrencyCode;

  protected _blockToUpdate: string[] = ['accountNumber'];

  public validate(): boolean {
    if (!this.name || this.name.length <=3) {
      throw new AppError('User: "name" is not valid', ErrorCodes.EntityError, 400);
    }

    if (!this.accountNumber || !Mod11.validate(this.accountNumber)) {
      throw new AppError('User: "accountNumber" is not valid', ErrorCodes.EntityError, 400);
    }

    if (!Object.keys(Currency).includes(this.currency)) {
      throw new AppError('User: "currency" is not valid', ErrorCodes.EntityError, 400);
    }

    if(!Object.values(UserType).includes(this.type)) {
      throw new AppError('User: "type" is not valid', ErrorCodes.EntityError, 400);
    }

    return true;
  }
}
