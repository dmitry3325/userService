import storage, { EntityData } from './Storage';
import AppError from '@/common/AppError';
import { ErrorCodes } from '@/types/Error';

export class AbstractEntity {
  public id!: number;
  protected _storage = storage;
  protected _blockToUpdate: string[] = [];

  public constructor(data = {}) {
    this._storage.initEntityStorage(this.constructor.name);
    this.setData(data);
  }

  public setData(data = {}): AbstractEntity {
    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof this[key as keyof AbstractEntity] !== 'undefined' &&
        (key === 'id' || this._blockToUpdate.indexOf(key) !== -1)
      ) {
        throw new AppError(
          `Field "${key}" cant be updated for entity ${this.constructor.name}`,
          ErrorCodes.EntityError,
          400,
        );
      }
      Object.assign(this, { [key]: value });
    });

    return this;
  }

  public validate(): boolean {
    return true;
  }

  public getData(): EntityData {
    const data: EntityData = {};
    Object.entries(this).forEach(([key, value]) => {
      if (key.charAt(0) !== '_') {
        data[key] = value;
      }
    });

    return data;
  }
}
