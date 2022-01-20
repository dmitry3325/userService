import AppError from '@/common/AppError';
import { ErrorCodes } from '@/types/Error';
import { AbstractEntity } from '@/common/AbstractEntity';

export type EntityData = { [key: string]: string | number | boolean };

export type AbstractEntityType<T> = { new (data: EntityData): T };

export type EntityStorage = Map<string, EntityData>;

class Storage {
  private storage = new Map<string, EntityStorage>();

  public initEntityStorage(name: string): Storage {
    if (this.storage.has(name)) {
      return this;
    }

    this.storage.set(name, new Map());
    return this;
  }

  public create(entity: AbstractEntity): number {
    const entityStorage = this.getEntityStorage(entity.constructor.name);

    const key = (entityStorage.size + 1).toString();
    const toSave = Object.assign({}, entity.getData());
    toSave.id = parseInt(key);
    entityStorage.set(key, toSave);
    return toSave.id;
  }

  public update(id: number, entity: AbstractEntity, blockedFields: string[] = []): boolean {
    const entityStorage = this.getEntityStorage(entity.constructor.name);
    if (!id) {
      throw new AppError(`Entity id is missing`, ErrorCodes.StorageError, 400);
    }
    const oldData = entityStorage.get(id.toString());
    if (!oldData) {
      throw new AppError(`Entity id is missing`, ErrorCodes.StorageError, 400);
    }

    Object.entries(entity.getData()).forEach(([key, value]) => {
      if (
        typeof oldData[key] !== 'undefined' &&
        oldData[key] != value &&
        (key === 'id' || blockedFields.indexOf(key) !== -1)
      ) {
        throw new AppError(
          `Field "${key}" cant be updated for entity ${entity.constructor.name}`,
          ErrorCodes.StorageError,
          400,
        );
      }

      Object.assign(this, { [key]: value });
    });

    entityStorage.set(id.toString(), Object.assign(oldData, entity.getData()));
    return true;
  }

  public find<T>(type: AbstractEntityType<T>, id: number): T {
    const entityStorage = this.getEntityStorage(type.name);

    const data = entityStorage.get(id.toString());
    if (!data) {
      throw new AppError(`Entity id is missing`, ErrorCodes.StorageError, 400);
    }

    return new type(data);
  }

  public findAll<T>(type: AbstractEntityType<T>): T[] {
    const entityStorage = this.getEntityStorage(type.name);

    return Array.from(entityStorage.values()).map((data: EntityData) => {
      return new type(data);
    });
  }

  public findBy<T>(type: AbstractEntityType<T>, params: EntityData): T[] {
    const entityStorage = this.getEntityStorage(type.name);

    return Array.from(entityStorage.values())
      .filter((item: EntityData) => {
        let found = true;
        Object.entries(params).forEach(([key, value]) => {
          if (typeof item[key] !== 'undefined' && item[key] !== value) {
            return (found = false);
          }
        });
        return found;
      })
      .map((data: EntityData) => {
        return new type(data);
      });
  }

  private getEntityStorage(name: string): EntityStorage {
    if (!this.storage.has(name)) {
      this.initEntityStorage(name);
    }

    return <Map<string, EntityData>>this.storage.get(name);
  }
}

export default new Storage();
