import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { DTOProducts } from 'src/dto/DTOProducts';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {

    }

    @Get()
    async getProducts() {
        return this.productService.getProducts();
    }

    @Post()
    async createProducts(@Body() product: DTOProducts) {
        return this.productService.createProducts(product);
    }

    @Put('/:id')
    async updateProducts(@Body() product: DTOProducts, @Param('id') id: number) {
        return this.productService.updateProducts(product, id);
    }

    @Delete('/:id')
    async deleteProducts(@Param('id') id: number) {
        return this.productService.deleteProducts(id);
    }
}
