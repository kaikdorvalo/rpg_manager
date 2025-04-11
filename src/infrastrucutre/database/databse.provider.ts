import { DataSource } from "typeorm";
import "dotenv/config";
import { Character } from "src/modules/character/domain/entities/character.entity";
import { MagicItem } from "src/modules/magic_item/domain/entities/magic-item.entity";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                schema: process.env.DATABASE_SCHEMA,
                entities: [
                    Character,
                    MagicItem
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];