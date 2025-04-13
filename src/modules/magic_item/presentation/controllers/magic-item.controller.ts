import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateMagicItemDto } from "../dtos/create-magic-item.dto";
import { CreateMagicItemUseCase } from "../../application/use-cases/create-magic-item.use-case";
import { ListMagicItemsUseCase } from "../../application/use-cases/list-magic-items.use-case";
import { GetMagicItemByIdUseCase } from "../../application/use-cases/get-magic-item-by-id.use-case";
import { AddCharacterMagicItem } from "../../application/use-cases/add-character-magic-item";
import { addCharacterMagicItemDto } from "../dtos/add-character-magic-item.dto";
import { RemoveCharacterMagicItemUseCase } from "../../application/use-cases/remove-character-magic_item.use-case";
import { RemoveCharacterMagicItemDto } from "../dtos/remove-character-magic-item.dto";

@Controller('magic_items')
export class MagicItemController {

    constructor(
        private readonly createMagicItemUseCase: CreateMagicItemUseCase,
        private readonly listMagicItemsUseCase: ListMagicItemsUseCase,
        private readonly getMagicItemByIdUseCase: GetMagicItemByIdUseCase,
        private readonly addCharacterMagicItem: AddCharacterMagicItem,
        private readonly removeCharacterMagicItemUseCase: RemoveCharacterMagicItemUseCase,
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

    @Post('add_to_character/:id')
    async AddMagicItemToCharacter(@Param('id') id: string, @Body() addMagicItemDto: addCharacterMagicItemDto, @Res() response: Response) {
        const result = await this.addCharacterMagicItem.execute(id, addMagicItemDto);
        return response.status(result.status).send(result.data);
    }

    @Delete('/remove_from_character/:id')
    async removeCharacterMagicItem(@Param('id') id: string, @Body() removeDto: RemoveCharacterMagicItemDto, @Res() response: Response) {
        const result = await this.removeCharacterMagicItemUseCase.execute(id, removeDto);
        return response.status(result.status).send(result.data);
    }
}