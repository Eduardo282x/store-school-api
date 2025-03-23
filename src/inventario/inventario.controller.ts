import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { DTOInventory } from 'src/dto/DTOProducts';

@Controller('inventory')
export class InventarioController {

    constructor(private inventoryService: InventarioService) {

    }

    @Get()
    async getInventory() {
        return await this.inventoryService.getInventory();
    }
    @Get('/available')
    async getInventoryAvailable() {
        return await this.inventoryService.getInventoryAvailable();
    }

    @Post()
    async saveInventario(@Body() inventario: DTOInventory) {
        return await this.inventoryService.saveInventario(inventario);
    }

    @Put('/:id')
    async updateInventario(@Body() inventario: DTOInventory, @Param('id') id: number) {
        return await this.inventoryService.updateInventario(inventario, id);
    }
}
