import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse } from 'src/dto/DTOBase';
import { DTOInventory } from 'src/dto/DTOProducts';
import { HistoryService } from 'src/history/history.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventarioService {

    constructor(private prismaService: PrismaService, private historyService: HistoryService) {

    }

    async getInventory() {
        return await this.prismaService.inventory.findMany({ include: { product: true } });
    }
    async getInventoryAvailable() {
        return await this.prismaService.inventory.findMany({ include: { product: true }, where: { amount: { not: 0 } } });
    }

    async saveInventario(inventario: DTOInventory) {
        try {
            await this.prismaService.inventory.create({
                data: {
                    productId: inventario.productId,
                    amount: inventario.amount
                }
            });

            await this.historyService.saveHistory(inventario);

            baseResponse.message = 'Inventario guardado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async updateInventario(inventario: DTOInventory, id: number) {
        try {
            await this.prismaService.inventory.update({
                where: {
                    id
                },
                data: {
                    productId: inventario.productId,
                    amount: inventario.amount
                }
            });

            await this.historyService.saveHistory(inventario);

            baseResponse.message = 'Inventario guardado';
            return baseResponse;
        } catch (error) {

            badResponse.message = error.message;
            return badResponse;
        }
    }
}
