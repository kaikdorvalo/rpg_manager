import { DeepPartial, DeleteResult, EntityManager, UpdateResult } from "typeorm";

export interface Repository<T> {
    create(entityLike: DeepPartial<T>, manager?: EntityManager): T;
    save(data: DeepPartial<T>, manager?: EntityManager): Promise<T>;
    findAll(manager?: EntityManager): Promise<T[]>;
    findById(id: string, manager?: EntityManager): Promise<T | null>;
    update(id: string, data: DeepPartial<T>, manager?: EntityManager): Promise<UpdateResult>;
    delete(id: string, manager?: EntityManager): Promise<DeleteResult>;
}