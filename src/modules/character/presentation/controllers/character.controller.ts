import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CreateCharacterUseCase } from "../../application/use-cases/create-character.use-case";
import { CreateCharacterDto } from "../dtos/CreateCharacter.dto";
import { Response } from "express";
import { GetCharacterInformationsUseCase } from "../../application/use-cases/get-character-informations";

@Controller('characters')
export class CharacterController {

    constructor(
        private readonly createCharacterUseCase: CreateCharacterUseCase,
        private readonly getCharacterInformationsUseCase: GetCharacterInformationsUseCase
    ) { }

    @Post('create')
    async create(@Res() response: Response, @Body() createCharacterDto: CreateCharacterDto) {
        const result = await this.createCharacterUseCase.execute(createCharacterDto);
        return response.status(result.status).send(result.data);
    }

    @Get('info/:id')
    async getCharacterInformations(@Param('id') id: string, @Res() response: Response) {
        const result = await this.getCharacterInformationsUseCase.execute(id);
        return response.status(result.status).send(result.data);
    }

}