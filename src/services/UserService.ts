import storage, { EntityData } from '@/common/Storage';
import { User } from '@/models/User';
import AppError from '@/common/AppError';
import { ErrorCodes } from '@/types/Error';
import { BaseResponse } from '@/types/Common';

export default class UserService {
  private readonly storage = storage;

  public create(data = {}): BaseResponse<{ id: number }> {
    const user = new User(data);
    if (!user.validate()) {
      throw new AppError('Validation Error', ErrorCodes.ServiceError, 400);
    }
    const id = user.create();
    return { result: true, data: { id } };
  }

  public get(id: number): EntityData {
    return this.storage.find(User, id).getData();
  }

  public update(id: number, data: Partial<User>): BaseResponse<EntityData> {
    const user = this.storage.find(User, id);

    if (!user.setData(data).validate()) {
      throw new AppError('Validation Error', ErrorCodes.ServiceError, 400);
    }

    return { result: user.update(), data: user.getData() };
  }

  public getAll(): EntityData[] {
    return this.storage.findAll(User).map(user => user.getData());
  }
}
