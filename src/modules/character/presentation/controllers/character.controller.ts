import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { CreateCharacterUseCase } from "../../application/use-cases/create-character.use-case";
import { CreateCharacterDto } from "../dtos/CreateCharacter.dto";
import { response, Response } from "express";
import { GetCharacterInformationsUseCase } from "../../application/use-cases/get-character-informations";
import { GetCharacterByIdUseCase } from "../../application/use-cases/get-character-by-id.use-case";
import { UpdateAdventurousNameUseCase } from "../../application/use-cases/update-adventurous-name.use-case";
import { UpdateAdventurousNameDto } from "../dtos/update-adventurous-name.dto";
import { RemoveCharacterUseCase } from "../../application/use-cases/remove-character.use-case";
import { GetMagicItemsPerCharacterUseCase } from "../../application/use-cases/get-magic-items-per-character.use-case";
import { GetChaarcterAmuletUseCase } from "../../application/use-cases/get-character-amulet.use-case";

@Controller('characters')
export class CharacterController {

    constructor(
        private readonly createCharacterUseCase: CreateCharacterUseCase,
        private readonly getCharacterInformationsUseCase: GetCharacterInformationsUseCase,
        private readonly getCharacterByIdUseCase: GetCharacterByIdUseCase,
        private readonly updateAdventurousNameUseCase: UpdateAdventurousNameUseCase,
        private readonly removeCharacterUseCase: RemoveCharacterUseCase,
        private readonly getMagicItemsPerCharacterUseCase: GetMagicItemsPerCharacterUseCase,
        private readonly getChaarcterAmuletUseCase: GetChaarcterAmuletUseCase,
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

    @Get('find/:id')
    async getCharacterById(@Param('id') id: string, @Res() response: Response) {
        const result = await this.getCharacterByIdUseCase.execute(id);
        return response.status(result.status).send(result.data);
    }

    @Put('changes/adventurous_name/:id')
    async updateCharacterAdventurousName(@Param('id') id: string, @Body() updateDto: UpdateAdventurousNameDto, @Res() response: Response) {
        const result = await this.updateAdventurousNameUseCase.execute(id, updateDto);
        return response.status(result.status).send(result.data);
    }

    @Delete('delete/:id')
    async removeCharacterById(@Param('id') id: string, @Res() response: Response) {
        const result = await this.removeCharacterUseCase.execute(id);
        return response.status(result.status).send(result.data);
    }

    @Get('magic_items/all/:id')
    async getMagicItemsPerCharacter(@Param('id') id: string, @Res() response: Response) {
        const result = await this.getMagicItemsPerCharacterUseCase.execute(id);
        return response.status(result.status).send(result.data);
    }

    @Get('amulet/:id')
    async getCharacterAmulet(@Param('id') id: string, @Res() response: Response) {
        const result = await this.getChaarcterAmuletUseCase.execute(id);
        return response.status(result.status).send(result.data);
    }
}