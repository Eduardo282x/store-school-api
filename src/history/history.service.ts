import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse } from 'src/dto/DTOBase';
import { DTOHistoryFilter, DTOInventory } from 'src/dto/DTOProducts';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {

    constructor(private prismaService: PrismaService) {

    }

    async getHistory() {
        return await this.prismaService.history.findMany({
            include: {
                product: true
            }
        });
    }

    async getHistoryFilter(historyFilter: DTOHistoryFilter) {
        return await this.prismaService.history.findMany({
            include: {
                product: true
            },
            where: {
                date: { 
                    in: [historyFilter.dateStart, historyFilter.dateEnd]
                }
            }
        });
    }

    async saveHistory(history: DTOInventory) {
        try {
            await this.prismaService.history.create({
                data: {
                    date: new Date(),
                    productId: history.productId,
                    amount: history.amount,
                }
            });
            baseResponse.message = 'Historial guardado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }
}
