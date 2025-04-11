import { DataSource, DeepPartial, DeleteResult, EntityManager, EntityTarget, UpdateResult } from "typeorm";
import { Repository } from "./repository.interface";

export class Crud<T> implements Repository<T> {
    constructor(
        private datasource: DataSource,
        private entity: EntityTarget<T>
    ) { }

    create(entityLike: DeepPartial<T>, manager?: EntityManager): T {
        const repository = manager ? manager.getRepository(this.entity) : this.datasource.getRepository(this.entity);
        return repository.create(entityLike);
    }

    async save(data: DeepPartial<T>, manager?: EntityManager): Promise<T> {
        const repository = manager ? manager.getRepository(this.entity) : this.datasource.getRepository(this.entity);
        return await repository.save(data);
    }
    async findAll(manager?: EntityManager): Promise<T[]> {
        const repository = manager ? manager.getRepository(this.entity) : this.datasource.getRepository(this.entity);
        return await repository.find();
    }
    async findById(id: string, manager?: EntityManager): Promise<T | null> {
        const repository = manager ? manager.getRepository(this.entity) : this.datasource.getRepository(this.entity);
        return await repository.findOneBy({ id: id } as any);
    }
    async update(id: string, data: DeepPartial<T>, manager?: EntityManager): Promise<UpdateResult> {
        const repository = manager ? manager.getRepository(this.entity) : this.datasource.getRepository(this.entity);
        return await repository.update(id, data as any);
    }
    async delete(id: string, manager?: EntityManager): Promise<DeleteResult> {
        const repository = manager ? manager.getRepository(this.entity) : this.datasource.getRepository(this.entity);
        return await repository.delete({ id: id } as any);
    }

}