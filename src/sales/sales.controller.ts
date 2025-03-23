import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { DTOSales } from 'src/dto/DTOSales';

@Controller('sales')
export class SalesController {

    constructor(private salesService: SalesService) {
        
    }

    @Get()
    async getSales() {
        return this.salesService.getSales();
    }

    @Post()
    async createSales(@Body() sales: DTOSales) {
        return this.salesService.createSales(sales);
    }
}
