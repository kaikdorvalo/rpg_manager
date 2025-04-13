import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateMagicItemDto } from "../dtos/create-magic-item.dto";
import { CreateMagicItemUseCase } from "../../application/use-cases/create-magic-item.use-case";
import { ListMagicItemsUseCase } from "../../application/use-cases/list-magic-items.use-case";
import { GetMagicItemByIdUseCase } from "../../application/use-cases/get-magic-item-by-id.use-case";

@Controller('magic_items')
export class MagicItemController {

    constructor(
        private readonly createMagicItemUseCase: CreateMagicItemUseCase,
        private readonly listMagicItemsUseCase: ListMagicItemsUseCase,
        private readonly getMagicItemByIdUseCase: GetMagicItemByIdUseCase,
    ) { }

    @Post('create')
    async create(@Res() response: Response, @Body() createMagicItemDto: CreateMagicItemDto) {
        const result = await this.createMagicItemUseCase.execute(createMagicItemDto);
        return response.status(result.status).send(result.data);
    }

    @Get('list')
    async listItems(@Res() response: Response) {
        const result = await this.listMagicItemsUseCase.execute();
        return response.status(result.status).send(result.data);
    }

    @Get('find/:id')
    async getMagicItemById(@Param('id') id: string, @Res() response: Response) {
        const result = await this.getMagicItemByIdUseCase.execute(id);
        return response.status(result.status).send(result.data);
    }
}