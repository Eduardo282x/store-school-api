import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { DTOCarrito } from 'src/dto/DTOCarrito';

@Controller('carrito')
export class CarritoController {

    constructor(private carritoService: CarritoService) {

    }

    @Get()
    async getCarrito() {
        return this.carritoService.getCarrito();
    }

    @Post()
    async createCarrito(@Body() carrito: DTOCarrito) {
        return this.carritoService.createCarrito(carrito);
    }

    @Put('/:id')
    async updateCarrito(@Body() carrito: DTOCarrito, @Param('id') id: number) {
        return this.carritoService.updateCarrito(carrito, id);
    }

    @Delete('/:id')
    async deleteCarrito(@Param('id') id: number) {
        return this.carritoService.deleteCarrito(id);
    }
}
