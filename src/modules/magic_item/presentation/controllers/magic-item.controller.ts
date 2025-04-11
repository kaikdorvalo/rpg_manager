import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateMagicItemDto } from "../dtos/create-magic-item.dto";
import { CreateMagicItemUseCase } from "../../application/use-cases/create-magic-item.use-case";

@Controller('magic_items')
export class MagicItemController {

    constructor(
        private readonly createMagicItemUseCase: CreateMagicItemUseCase
    ) { }

    @Post('create')
    async create(@Res() response: Response, @Body() createMagicItemDto: CreateMagicItemDto) {
        const result = await this.createMagicItemUseCase.execute(createMagicItemDto);
        return response.status(result.status).send(result.data);
    }
}