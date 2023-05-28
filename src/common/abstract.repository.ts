import { HttpException, HttpStatus } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AbstractEntity } from '@app/common/abstract.entity';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { ResponseService } from '@app/services/response.service';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type DeepPartialCustom<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartialCustom<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartialCustom<U>>
    : DeepPartialCustom<T[P]> | T[P];
};

export class AbstractRepository<E extends AbstractEntity> extends Repository<E> {
  protected readonly _response: ResponseService;
  constructor(target: EntityTarget<E>, manager: EntityManager) {
    super(target, manager);
    this._response = new ResponseService();
  }

  async findOneEntity(options: FindOneOptions<E> = {}): Promise<E> {
    try {
      return await this.findOne(options);
    } catch (error) {
      throw new HttpException(
        this._response.exceptionResponse({
          message: 'Entity was not found',
          statusCode: HttpStatus.BAD_REQUEST,
          error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findManyEntities(options: FindManyOptions<E> = {}): Promise<E[]> {
    try {
      return await this.find(options);
    } catch (error) {
      throw new HttpException(
        this._response.exceptionResponse({
          message: 'Entities was not found',
          statusCode: HttpStatus.BAD_REQUEST,
          error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createOneEntity(dto: DeepPartialCustom<E>, relations: string[] = []): Promise<E> {
    try {
      const entity = this.create(dto);
      const createdEntity = await this.save(entity as any as DeepPartialCustom<E>);
      return this.findOne({ where: { id: createdEntity.id }, relations });
    } catch (error) {
      throw new HttpException(
        this._response.exceptionResponse({
          message: 'Failure entity create',
          statusCode: HttpStatus.BAD_REQUEST,
          error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateOneEntity(findConditions: FindOptionsWhere<E>, dto: QueryDeepPartialEntity<E>): Promise<E> {
    try {
      return (await this.update(findConditions, dto)).raw;
    } catch (error) {
      throw new HttpException(
        this._response.exceptionResponse({
          message: 'Failure entity update',
          statusCode: HttpStatus.BAD_REQUEST,
          error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateOneEntityById(id: string, dto: DeepPartialCustom<E>, options: FindOneOptions<E> = null): Promise<E> {
    try {
      let existingEntry = await this.findOneEntity({
        where: { id },
        ...options,
      });
      existingEntry = { ...existingEntry, ...dto };
      await this.save(existingEntry as unknown as DeepPartialCustom<E>);

      return existingEntry;
    } catch (error) {
      throw new HttpException(
        this._response.exceptionResponse({
          message: 'Failure entity update by id',
          statusCode: HttpStatus.BAD_REQUEST,
          error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createOrUpdateOneEntity(dto: DeepPartialCustom<E>, relations: string[] = []): Promise<E> {
    try {
      const entity = await this.findOneEntity({
        where: {
          id: dto.id,
        },
      });

      if (entity) {
        return await this.updateOneEntityById(entity.id, dto);
      }

      return await this.createOneEntity(dto);
    } catch (error) {
      throw new HttpException(
        this._response.exceptionResponse({
          message: 'Failure entity create or update',
          statusCode: HttpStatus.BAD_REQUEST,
          error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOneEntity(conditions: FindOptionsWhere<E>) {
    try {
      return await this.delete(conditions);
    } catch (error) {
      throw new HttpException(
        this._response.exceptionResponse({
          message: 'Failure entity delete',
          statusCode: HttpStatus.BAD_REQUEST,
          error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async softDeleteOneEntity(findConditions: FindOptionsWhere<E>): Promise<E> {
    const existingEntry = await this.findOneEntity({ where: findConditions });
    await this.softDelete(findConditions);
    return existingEntry;
  }

  protected throwError(message = '', error) {
    throw new HttpException(
      this._response.exceptionResponse({
        message: message,
        statusCode: HttpStatus.BAD_REQUEST,
        error,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
